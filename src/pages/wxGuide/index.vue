<template>
  <view class="main-page guide-page">
    <view class="main">
      <view class="title-count">
        <img
          class="title-img"
          src="https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/guide/community-guide-title.png"
          alt=""
        />
      </view>
      <view class="swiper" :class="targetCurrent === 1 ? '' : 'swiper-bg'">
        <swiper
          class="swiper-list"
          indicator-dots
          indicator-color="#FFFFFF"
          indicator-active-color="#161413"
          duration="800"
          :disable-touch="disableTouch"
          @change="swiperChange"
        >
          <!-- 一 -->
          <swiper-item class="step1">
            <view class="interface-count">
              <view class="">欢迎回到<text class="theme-pink">“Get一下”</text></view>
              <view class="">再次相遇</view>
              <view class="">我们准备了一份小惊喜</view>
              <view class="">希望你能够喜欢</view>
            </view>
          </swiper-item>
          <!-- 二 -->
          <swiper-item class="step">
            <view class="interface-count">
              <view class="">礼物1：</view>
              <view class="">在我们过去的那段日子里</view>
              <view class="">我们设计了<text class="theme-pink space">8</text>枚勋章</view>
              <view class="">但它们不能再以旧模样陪伴你</view>
            </view>
            <view class="badge-count">
              <div class="badge-img" id="demoCanvas"></div>
              <!-- <img :src="badge" mode="" /> -->
            </view>
          </swiper-item>
          <!-- 三 -->
          <swiper-item class="step3">
            <view class="interface-count">
              <view class="">礼物2：</view>
              <view class="">签到打卡发生了一些小变化</view>
              <view class="">我们在页面里隐藏了一份小惊喜</view>
              <view class="">记得去挑战<text class="theme-pink">【签到】</text>打卡</view>
              <view class="">探索更多惊喜吧！</view>
            </view>
          </swiper-item>
          <!-- 四 -->
          <swiper-item class="step6">
            <view class="interface-count">
              <view class="">全新社区，精彩起航</view>
              <view class="">更实用的功能</view>
              <view class="">更丰富的学习内容</view>
              <view class="">更多样的权益</view>
              <view class="">等待你的探索</view>
            </view>
          </swiper-item>
        </swiper>
      </view>
      <view class="btn-count">
        <view class="btn-sub">
          <img
            v-show="targetCurrent === 1"
            src="https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/guide/badge-btn.png"
            class="btn zwyHover1"
            @click="toWholeMedal"
          />
          <img
            v-show="targetCurrent === 3"
            src="https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/guide/trend-btn.png"
            class="btn zwyHover1"
            @click="toCreateMood"
          />
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { mapGetters } from 'vuex';
import { getUserFirstVisit } from '@/api/guide';
import { topicList } from '@/utils/topic';
export default {
  data() {
    return {
      disableTouch: false,
      targetCurrent: 0,
      //   是否显示过动画
      isShowSvga: true,
      topicId: '253',
      badge: '',
    };
  },
  computed: {
    ...mapGetters(['token', 'browserEnv', 'userId']),
  },
  async onLoad() {
    console.log('onLoad');
    try {
      webViewCall({
        method: 'JsCallNavBarStatus',
        params: { status: 1 }, // 0是隐藏，1是显示
        platform: this.browserEnv,
      });
    } catch (e) {}
    if (this.token) {
      getUserFirstVisit({
        firstVisit: true,
      });
    }
    if (!this.userId && this.token) {
      await this.$store.dispatch('getUserInfo');
    }
    this.postStatistic();
  },
  methods: {
    async postStatistic() {
      this.$statistic({
        event_id: 'SQX-0015-V0002',
        event_name: '社区欢迎页曝光',
      });
    },
    swiperChange(event) {
      this.targetCurrent = event.detail.current;
      if (this.targetCurrent === 1 && this.isShowSvga) {
        const player = new SVGA.Player('#demoCanvas');
        player.clearsAfterStop = false;
        player.fillMode = 'Forward ';
        player.loops = 1;
        const _that = this;
        const parser = new SVGA.Parser('#demoCanvas'); // 如果你需要支持 IE6+，那么必须把同样的选择器传给 Parser。
        parser.load(
          'https://frontend-static-cdn.shiguangkey.com/tz-community-mp/images/banner/huanying4.svga',
          function (videoItem) {
            player.setVideoItem(videoItem);
            player.startAnimation();
            _that.isShowSvga = false;
          }
        );
      }
    },
    toWholeMedal() {
      this.$statistic({
        event_id: 'SQX-0015-E0002',
        event_name: '社区欢迎页-查看勋章按钮点击事件',
      });
      if (this.token) {
        this.jweixin.miniProgram.navigateTo({
          url: `/pages/challenge/wholeMedal/index`,
        });
      } else {
        this.jweixin.miniProgram.navigateTo({
          url: `/pages/login/index`,
        });
      }
    },
    toCreateMood() {
      this.$statistic({
        event_id: 'SQX-0015-E0003',
        event_name: '社区欢迎页-发布动态按钮点击事件',
      });
      if (this.token) {
        const topicIndex = Math.floor(Math.random() * topicList.length);
        this.jweixin.miniProgram.redirectTo({
          url: `/pages/createContent/createMood?topicId=${this.topicId}&topicContent=${topicList[topicIndex].topicContent}`,
        });
      } else {
        this.jweixin.miniProgram.navigateTo({
          url: `/pages/login/index`,
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import url(../../style/guide.less);
page {
  width: 20rem;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  background-color: #f3f5f7;
}
.main-page {
  width: 100%;
  height: 100%;
}
.pc-tip {
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
}
.main {
  width: 100%;
  height: 100%;
  padding: 0;
  background: #fff100;
  background-image: url('https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/guide/step1bg.png');
  background-position: top;
  background-repeat: no-repeat;
  background-size: 375px;
  position: relative;
  .theme-pink {
    color: #f25959;
    font-weight: 700;
  }
  .space {
    margin-left: 5px;
    margin-right: 5px;
  }
  .f-24 {
    font-size: 24px;
    font-weight: 700;
  }
  .title-count {
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    color: #161413;
    line-height: 16px;
    padding-left: 30px;
    padding-top: 25px;
    .title-img {
      width: 286px;
      height: 62px;
      // margin-top: 12px;
    }
  }
  .swiper-bg {
    background-image: url('https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/guide/guide-sub-bg.png');
    background-position: 0% 100%;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .swiper {
    width: 100%;
    height: calc(100% - 89px);
    .swiper-list {
      width: 100%;
      height: 100%;
      .step1 {
        background-image: url('https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/guide/guide3.png');
        background-position: 0 60%;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      .step3 {
        background-image: url('https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/guide/guide4.png');
        background-position: 0 60%;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      .step6 {
        background-image: url('https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/guide/guide5.png');
        background-position: 0 60%;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      .interface-count {
        padding-left: 30px;
        margin-top: 50px;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: #161413;
        line-height: 24px;
      }
      .badge-count {
        // display: flex;
        // justify-content: center;
        margin-top: 20px;
        display: flex;
        justify-content: center;
        .badge-img {
          width: 350px;
          height: 295px;
        }
      }
    }
  }
  .btn-count {
    position: absolute;
    bottom: 45px;
    left: 0;
    right: 0;
    .btn-title {
      font-size: 12px;
      font-weight: 400;
      text-align: center;
      color: #161413;
      line-height: 12px;
    }
    .btn-sub {
      display: flex;
      justify-content: center;
    }
    .btn {
      width: 193px;
      height: 45px;
      margin-top: 10px;
    }
  }
}
.swiper-item {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
