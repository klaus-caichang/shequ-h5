<template>
  <view>
    <view v-if="poType == 1 || poType == 0">
      <view class="uni-popup-dialog">
        <view class="task">
          <image class="Rotation" :src="$oss('level/sun.png')" />
          <img :src="$oss('level/gou.png')" />
        </view>
        <view class="uni-dialog-title">
          <text class="uni-dialog-title-text">完成{{ contentData.taskName }}</text>
        </view>
        <view class="uni-dialog-title">
          <view class="experience"
            >获得<transition name="slide-fade">
              <view
                v-if="isShow"
                style="
                  display: inline-block;
                  white-space: nowrap;
                  color: #ffb000;
                  padding: 0 5px;
                "
                >+{{ contentData.expVal }}</view
              > </transition
            >经验值</view
          >
        </view>
        <view class="uni-dialog-title" v-if="poType === 0">
          <text v-if="contentData.continueData.continuationSign" class="experience"
            >连续签到<text style="color: #ffb000; padding: 0 5px">{{
              contentData.continueData.userContinuationSignDay
            }}</text
            >天</text
          >
          <text v-if="contentData.continueData.continuationSign" class="experience"
            >, 额外获得<text style="color: #ffb000; padding: 0 5px">{{
              contentData.continueData.continuousSingExperience
            }}</text
            >经验值</text
          >
        </view>
        <view class="uni-dialog-contentTwo">
          <img class="headImg" :src="userInfo.headImg" />
          <view class="exp"
            >我的经验值：
            <transition name="slide-fade">
              <text v-if="isShow">
                {{ gradeData.experience }}
              </text>
            </transition>
          </view>
          <progress
            class="progress"
            stroke-width="8"
            border-radius="4px"
            :active="true"
            active-mode="forwards"
            backgroundColor="#FFF"
            :percent="
              ((gradeData.experience - gradeData.currentLevelExperience) /
                (gradeData.nextLevelExperience - gradeData.currentLevelExperience)) *
                100 || 0
            "
          ></progress>
          <view class="img"><img :src="$oss('level/levelIcon.png')"/></view>
          <text class="levelOne">Lv{{ gradeData.gradeLevel }}</text>
          <text class="levelTwo">Lv{{ gradeData.gradeLevel + 1 }}</text>
        </view>
        <view class="uni-dialog-button-group">
          <view class="uni-dialog-button" @click="close">
            <text class="uni-dialog-button-text">收下</text>
          </view>
          <view v-if="!pageLevel" class="uni-dialog-button uni-border-left">
            <text class="uni-dialog-button-text uni-button-color" @click="goLevel">查看我的等级</text>
          </view>
        </view>
      </view>
    </view>
    <view v-if="poType == 3">
      <view class="uni-popup-dialog-upgrade" :style="`background-image:url(${$oss('level/levelBack.png')});`">
        <view class="levelUpgrade"><img :src="$oss('level/levelUpgrade.png')"/></view>
        <text class="textUpgrade">恭喜你升级啦</text>
        <view class="userUpgrade">
          <img class="img1" :src="$oss('level/gou.png')" />
          <view class="textName">{{ gradeData.nick }}</view>
          <view class="textLevel" @click="getShow">
            <transition name="slide-fade">
              <text v-if="show"> Lv{{ level }} </text>
            </transition>
          </view>
        </view>
        <view v-if="pageLevel" class=" btn1" @click="close">确定</view>
        <view v-else
          ><view class="btn2" @click="close">确定</view><view class="btn3" @click="goLevel">查看我的等级</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
/**
 * PopUp 弹出层-对话框样式
 * @description 弹出层-对话框样式
 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
 * @property {Boolean} beforeClose 是否拦截取消事件
 * @event {Function} close 点击取消按钮触发
 */
import { mapGetters } from 'vuex';
import { queryUserGrade } from '@/api/grade';
import { SET_USERLEVEL } from '@/store/types';

export default {
  name: 'uniPopupTask',
  props: {
    /**
     * 对话框标题
     */
    title: {
      type: String,
      default: '完成学历认证任务',
    },
    /**
     * 拦截取消事件 ，如果拦截取消事件，必须监听close事件，执行 done()
     */
    beforeClose: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      level: 1, // 等级
      poType: 1, // 弹窗类型 0:签到活动 1:完成任务 2:新春弹窗 3:等级升级
      pageLevel: false, //是否为在等级中心页面升级的弹窗
      show: true, //等级显示
      isShow: false, // 经验
      contentData: {
        content: { expVal: 1, taskName: '鱼摆摆测试任务', taskId: 12345 },
        expire: 5,
        popupType: 1,
        // 签到连续签到
        continueData: {
          continuationSign: false, // 是否完成连续签到
          continuousSingExperience: 0, // 连续签到获取经验值
          singExperience: 0, // 	签到经验值
          userContinuationSignDay: 0, // 	用户已经连续签到连续签到
        },
      },
      gradeData: {
        account: 't0398602795',
        currentLevelExperience: 11,
        experience: 20,
        gradeColor: null,
        gradeLevel: 2,
        gradeName: null,
        id: 289,
        nextLevelDifferential: 1,
        nextLevelExperience: 21,
        nick: '长沙吴彦祖',
        prevLevelExperience: 0,
        queryLevelExperience: null,
        todayAddExperience: 10,
      }, // 获取当前等级
    };
  },
  inject: ['popup'],
  watch: {
    taskData: {
      handler() {
        this.init();
        this.getShow();
      },
      deep: true,
    },
  },
  created() {
    // 对话框遮罩不可点击
    this.popup.mkclick = false;
    this.init();
  },
  mounted() {
    this.isShow = !this.isShow;
    this.getShow();
  },
  computed: {
    ...mapGetters(['taskData', 'userInfo', 'userId']),
  },
  methods: {
    /**
     * 关闭弹窗
     */
    close() {
      if (this.beforeClose) {
        this.$emit('close', () => {
          this.popup.close();
        });
        return;
      }
      this.popup.close();
    },
    // 等级动效变化
    getShow() {
      this.show = !this.show;
      this.level += 1;
      setTimeout(res => {
        this.show = !this.show;
      }, 500);
    },
    // 获取等级
    async getGrade() {
      const { data } = await queryUserGrade();
      this.gradeData = data;
      this.$store.commit(SET_USERLEVEL, data.gradeLevel);
    },
    // 跳转等级页面
    goLevel() {
      this.close();
      uni.navigateTo({
        url: `/pages/personal/level`,
      });
    },
    // 初始化数据
    init() {
      this.getGrade();
      this.contentData = this.taskData.content.content;
      this.poType = this.taskData.content.popupType;
      if (this.poType === 3) {
        this.level = this.contentData.level - 1;
      } else {
        this.level = this.gradeData.gradeLevel - 1;
      }
      this.pageLevel = this.$Route.path === '/pages/personal/level';
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  border: 0px;
}

.uni-popup-dialog {
  width: 260px;
  background: #fff;
  border-radius: 10px;
  padding-bottom: 20px;
}
.task {
  display: flex;
  justify-content: center;
  position: relative;
  image {
    width: 157px;
    height: 157px;
    margin-top: -77px;
  }
  img {
    position: absolute;
    width: 94px;
    height: 94px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: -44px;
  }
  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(45deg);
    }
  }
  .Rotation {
    -webkit-transform: rotate(45deg);
    animation: rotation 1.5s ease-in-out;
    animation-delay: 0s;
  }
}

.uni-dialog-title {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  justify-content: center;
  padding-top: 3px;
}

.uni-dialog-title-text {
  opacity: 0.8;
  font-size: 18px;
  font-weight: 600;
  color: #303943;
  line-height: 25px;
  margin: -28px 15px 0 15px;
  text-align: center;
}
.experience {
  font-size: 14px;
  font-weight: 400;
  text-align: justify;
  color: #303943;
  line-height: 14px;
  margin-bottom: 10px;
}

.uni-dialog-content {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 15px 15px 15px;
}
.uni-dialog-contentTwo {
  width: 220px;
  height: 99px;
  background: #f8f8f8;
  border-radius: 10px;
  position: relative;
  margin: 2px auto 15px auto;
  .headImg {
    width: 32px;
    height: 32px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    position: absolute;
    margin: 8px 169px 59px 19px;
  }
  .exp {
    height: 12px;
    font-size: 12px;
    text-align: left;
    color: #945732;
    line-height: 12px;
    position: absolute;
    margin-top: 19px;
    margin-left: 58px;
  }
  .progress {
    width: 159px;
    height: 8px;
    background: #ffffff;
    border-radius: 4px;
    position: absolute;
    margin-top: 55px;
    margin-left: 21px;
  }
  .img {
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    background: #ffffff;
    border-radius: 50%;
    position: absolute;
    margin-top: 46px;
    margin-left: 177px;
    img {
      width: 16px;
      height: 16px;
      margin-top: -3px;
    }
  }
  .levelOne {
    height: 12px;
    font-size: 12px;
    text-align: center;
    color: #945732;
    line-height: 12px;
    position: absolute;
    margin-top: 73px;
    margin-left: 21px;
  }
  .levelTwo {
    height: 12px;
    font-size: 12px;
    text-align: center;
    color: #945732;
    line-height: 12px;
    position: absolute;
    margin-top: 73px;
    margin-left: 180px;
  }
}
::v-deep .uni-progress-bar {
  border-radius: 4px;
  .uni-progress-inner-bar {
    background: linear-gradient(151deg, #ffb288 17%, #f67437 84%);
    border-radius: 4px;
  }
}

.uni-dialog-content-text {
  font-size: 14px;
  color: #6e6e6e;
}

.uni-dialog-button-group {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  justify-content: center;
  width: 220px;
  margin: 0 auto;
}

.uni-dialog-button {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 85px;
  background: #f7cca5;
  border-radius: 22px;
  font-size: 16px;
}

.uni-border-left {
  width: 145px;
  background: linear-gradient(151deg, #ffb288 17%, #f67437 84%);
  box-shadow: 0px 1px 3px 0px #e7742f inset;
  margin-left: 15px;
}

.uni-dialog-button-text {
  font-size: 14px;
}

.uni-button-color {
  color: #ffffff;
}

.uni-dialog-input {
  flex: 1;
  font-size: 14px;
}

.uni-popup__success {
  color: $uni-color-success;
}

.uni-popup__warn {
  color: $uni-color-warning;
}

.uni-popup__error {
  color: $uni-color-error;
}

.uni-popup__info {
  color: #909399;
}

//升级弹窗
.uni-popup-dialog-upgrade {
  width: 346px;
  height: 258px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  position: relative;
  .levelUpgrade img {
    width: 81px;
    height: 87px;
    position: absolute;
    margin-top: -22px;
    left: 50%;
    transform: translate(-50%);
    -webkit-transform: translate(-50%);
  }
  .textUpgrade {
    height: 22px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: #945732;
    line-height: 22px;
    position: absolute;
    top: 67px;
    left: 50%;
    transform: translate(-50%);
    -webkit-transform: translate(-50%);
  }
  .userUpgrade {
    height: 54px;
    background: #f7c3ae;
    border-radius: 6px;
    position: absolute;
    padding: 0 18px;
    top: 98px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 60px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #945732;
    .textName {
      font-size: 14px;
      margin: 0 8px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: 600;
    }
    .textLevel {
      font-size: 24px;
      font-weight: bold;
      font-family: DIN;
    }
    .img1 {
      width: 34px;
      height: 34px;
      border: 2px solid #ffffff;
      border-radius: 50%;
    }
  }
  .btn1 {
    width: 100px;
    height: 40px;
    background: #f7cca5;
    border-radius: 22px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: #945732;
    position: absolute;
    top: 116px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .btn2 {
    width: 68px;
    height: 40px;
    background: #f7cca5;
    border-radius: 22px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: #945732;
    position: absolute;
    margin-top: 167px;
    margin-left: 64px;
  }
  .btn3 {
    width: 134px;
    height: 40px;
    background: linear-gradient(151deg, #ffb288 17%, #f67437 84%);
    border-radius: 22px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    position: absolute;
    margin-top: 167px;
    margin-left: 147px;
  }
}

//加经验动画
.slide-fade-enter-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
  transform: scale(1.1);
}

.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-enter {
  transform: translateY(10px);
  opacity: 0;
}
</style>
