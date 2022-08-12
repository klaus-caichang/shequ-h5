<template>
  <view class="invite-friends">
    <view class="header-wrapper">
      <view class="header flex flex-middle">
        <view class="avator">
          <view class="imgs img-bg"></view>
          <Avator class="imgs" :imgUrl="userInfo.bbsIcon" :vUrl="userInfo.userIdentityIcon" />
        </view>
        <view class="info">
          <view class="name">{{ userInfo.bbsNick }}</view>
          <view class="num">您已加入"Get一下"社区{{ bbsDays }}天</view>
          <view class="num">累计邀请 {{ InviteFriend.userNum || 0 }} 位好友注册</view>
        </view>
      </view>
    </view>
    <view class="process">
      <image class="line2" src="@/static/artFestival/line2.png" mode="widthFix" />
      <image class="headset" src="@/static/artFestival/headset.png" mode="widthFix" />
      <image class="img" :src="$oss('inviteFriends/process.png')" mode="widthFix" />
    </view>
    <view class="box-wrapper">
      <image class="label" :src="$oss('inviteFriends/card-hy.png')" mode="widthFix" />
      <img class="girl" :src="$oss('inviteFriends/girl.png')" alt="widthFix" />
      <view class="register">
        <view class="data flex flex-around">
          <view class="item">
            <view class="num">{{ InviteFriend.userNum || 0 }}<span>位</span></view>
            <view class="des">已邀请好友</view>
          </view>
          <!-- <view class="item">
            <view class="num">{{ InviteFriend.knowledgeNum || 0 }}</view>
            <view class="des">累计碎片奖励</view>
          </view> -->
          <view class="item">
            <view class="num">{{ InviteFriend.voteTicketNum || 0 }}</view>
            <view class="des">累计投票券奖励</view>
          </view>
        </view>
        <view class="btns flex flex-between">
          <!-- 复制邀请链接 -->
          <CopyLinkBtn :type="isTeacher ? 2 : 1" :name="userInfo.bbsNick" :userId="userInfo.uid" />
          <view class="record-btn" @click="openRecord(1)">
            查看记录
          </view>
        </view>
      </view>
    </view>
    <view class="box-wrapper" v-if="isTeacher">
      <image class="label" :src="$oss('inviteFriends/card-xy.png')" mode="widthFix" />
      <img class="boy" :src="$oss('inviteFriends/boy.png')" alt="widthFix" />
      <view class="register">
        <view class="data flex flex-around">
          <view class="item">
            <view class="num">{{ InviteStudent.userNum || 0 }}<span>位</span></view>
            <view class="des">已邀请学员</view>
          </view>
          <view class="item">
            <view class="num">{{ InviteStudent.knowledgeNum || 0 }}</view>
            <view class="des">累计碎片奖励</view>
          </view>
          <view class="item">
            <view class="num">{{ InviteStudent.voteTicketNum || 0 }}</view>
            <view class="des">累计投票券奖励</view>
          </view>
        </view>
        <view class="btns flex flex-between">
          <!-- 复制邀请链接 -->
          <CopyLinkBtn :type="2" :name="userInfo.bbsNick" :userId="userInfo.uid" />
          <view class="record-btn" @click="openRecord(2)">
            查看记录
          </view>
        </view>
      </view>
    </view>
    <view class="rule">
      <image class="line2" src="@/static/artFestival/line2.png" mode="widthFix" />
      <image class="line" src="@/static/artFestival/line.png" mode="widthFix" />
      <view class="title">邀请规则</view>
      <view class="rule-item">
        1.邀请注册奖励仅限未注册Get一下新用户；
      </view>
      <view class="rule-item">
        2.每日前3名邀请用户注册成功，可获得20张第四届文化艺术节活动榜单投票券，被邀请人也可获得20张投票券；
      </view>
      <view class="rule-item">
        3.知识碎片可在"Get一下"社区碎片中心兑换商品；
      </view>
      <view class="rule-item">
        4.VIP老师邀请学员进入社区绑定师徒关系成功，可获得100知识碎片、老师可获得50张第四届文化艺术节活动榜单投票券，学员可获得10张投票券；
      </view>
      <view class="rule-item">
        5.获得第四节文化艺术节活动榜单投票券仅在比赛期间有效为参赛作品投票使用；
      </view>
      <view class="rule-item">
        6.在参与活动过程中，如发现违规行为（违规行为包括但不限于恶意批量注册、无效手机、虚假信息等）我们将会对违规账户进行必要限制措施，并撤销获得的相关奖励；
      </view>
    </view>
    <view class="box-wrapper no-mar" v-if="isTeacher">
      <image class="clock" src="@/static/artFestival/clock.png" mode="widthFix" />
      <image class="man" src="@/static/artFestival/man.png" mode="widthFix" />
      <image class="label" :src="$oss('inviteFriends/card-sp.png')" mode="widthFix" />
      <view class="register box-sp">
        <view class="header flex flex-right">
          <span>*仅限老师参与</span>
        </view>
        <view class="main">
          <view class="text">累计投票券</view>
          <view class="num">{{ voteTicketNum }}</view>
          <view class="text">{{ beginTime | getLocalTime }} 至 {{ endTime | getMonthTime }}开启兑换</view>
        </view>
        <view class="exchange-btn" :class="status === 1 && 'active'" @click="exchangeKnowledge">{{
          exchangeId === 0 ? '1:1兑换为知识碎片' : '已兑换'
        }}</view>
      </view>
    </view>
    <UniPopup ref="insidePop" type="center">
      <RecordPopup v-if="flag === 'record'" :userType="selectType" @close="closeAction" />
      <TipPop v-else-if="flag === 'tip'" @close="closeAction" />
    </UniPopup>
    <!-- 广告位 -->
    <Advertpace :imgUrl="$oss('adsense/fuli.png')" />
    <Download />
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import Advertpace from '@/components/advert-space/advert-space';
import Avator from '@/components/avator/avator.vue';
import UniPopup from '@/components/uni-popup/uni-popup';
import Download from '@/components/download/download.vue';
import { listArtUserInviteStats, getUserExchangeKnowledgeDetail, exchangeKnowledge } from '@/api/artFestival.js';
import { getUserFirstVisit } from '@/api/guide';
import RecordPopup from './components/recordPopup.vue';
import TipPop from './components/tipPop.vue';
import CopyLinkBtn from '../components/copy-link-btn/copy-link-btn.vue';

export default {
  components: { UniPopup, RecordPopup, TipPop, Download, Advertpace, CopyLinkBtn, Avator },
  data() {
    return {
      flag: 'record',
      isTeacher: false,
      voteTicketNum: 0,
      // 邀请好友数详情
      InviteFriend: {},
      // 邀请学员数详情
      InviteStudent: {},
      // 兑换是否开始
      openAction: false,
      beginTime: null,
      endTime: null,
      selectType: null,
      // 用户加入多少天
      bbsDays: 0,
      venue: 1,
      // 兑换是否开启
      status: null,
      // 是否兑换
      exchangeId: 0,
    };
  },
  computed: {
    ...mapGetters(['userInfo', 'token']),
  },
  onLoad({ venue }) {
    if (venue) this.venue = venue;
  },
  created() {
    if (!this.token) {
      this.$store.dispatch('toLogin');
      return;
    }
    this.checkTime();
    this.userFirstVisit();
    this.getUserExchangeKnowledgeDetail();
    this.listArtUserInviteStats();
  },
  methods: {
    // 埋点
    init_statistic() {
      return {
        event_name: '邀请好友页',
        event_id: 'SQH_0003_V0001',
        event_attr: {
          venue: this.venue,
        },
      };
    },
    // 获取用户加入多少天
    async userFirstVisit() {
      const { data } = await getUserFirstVisit();
      this.bbsDays = data && data.bbsDays;
    },
    // 判断兑换碎片时间是否在2021.11.12-2021.11.30
    checkTime() {
      const newTime = new Date().getTime();
      if (newTime >= this.beginTime && newTime <= this.endTime) {
        this.openAction = true;
      }
    },
    // 获取累积知识碎片
    async getUserExchangeKnowledgeDetail() {
      const { data } = await getUserExchangeKnowledgeDetail();
      const { isTeacher, voteTicketNum, beginTime, endTime, status, exchangeId } = data;
      this.isTeacher = isTeacher;
      this.voteTicketNum = voteTicketNum;
      this.beginTime = beginTime;
      this.endTime = endTime;
      this.status = status;
      this.exchangeId = exchangeId;
    },
    // 老师兑换知识碎片
    async exchangeKnowledge() {
      if (this.status === 1 && this.exchangeId === 0) {
        const { data } = await exchangeKnowledge();
        if (data) {
          this.exchangeId++;
          this.exchangeAction();
        } else {
          this.$toast('兑换失败');
        }
      }
    },
    // 查询邀请详情
    async listArtUserInviteStats() {
      const { data } = await listArtUserInviteStats();
      console.log('详情', data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].sceneType === 1) this.InviteFriend = data[i];
        else this.InviteStudent = data[i];
      }
    },
    openRecord(type) {
      this.flag = 'record';
      this.selectType = type;
      this.$refs.insidePop.open();
    },
    closeAction() {
      this.$refs.insidePop.close();
    },
    exchangeAction() {
      this.flag = 'tip';
      this.$refs.insidePop.open();
    },
  },
};
</script>

<style lang="less" scoped>
.invite-friends {
  min-height: 100vh;
  padding-bottom: 70px;
  background: #261c75;
  .header-wrapper {
    padding: 10px 4px;
    .header {
      width: 100%;
      height: 131px;
      padding: 30px 23px;
      background: url(http://tzedu-hd02-frontend-oss-bucket01.oss-cn-shanghai.aliyuncs.com/tz-community-h5/images/inviteFriends/header-bg.png);
      background-size: cover;
      box-sizing: border-box;
      .avator {
        position: relative;
        margin-right: 12px;
        .imgs {
          width: 58px;
          height: 58px;
          // border: 2px solid #161413;
          border-radius: 50%;
        }
        .img-bg {
          position: absolute;
          top: 3px;
          left: 3px;
          background: #fff100;
        }
      }
      .info {
        color: #ffffff;
        .name {
          font-size: 17px;
          font-weight: bold;
          margin-bottom: 3px;
        }
        .num {
          margin-bottom: 5px;
          font-size: 12px;
        }
      }
    }
  }
  .process {
    position: relative;
    height: 82px;
    padding: 16px 8px;
    box-sizing: border-box;
    .line2 {
      position: absolute;
      left: 0;
      top: -41px;
      width: 74px;
    }
    .headset {
      position: absolute;
      right: 0;
      bottom: -20px;
      width: 41px;
    }
    .img {
      width: 100%;
    }
  }
  .box-wrapper {
    position: relative;
    padding: 0 10px;
    margin-bottom: 26px;
    .label {
      position: absolute;
      left: 0;
      top: 0;
      width: 132px;
    }
    .girl {
      position: absolute;
      left: 0px;
      bottom: 4px;
      width: 81px;
    }
    .boy {
      position: absolute;
      right: -22px;
      bottom: 3px;
      width: 74px;
    }
    .register {
      padding: 49px 16px 14px 16px;
      height: 191px;
      background: #ffffff;
      border: 4px solid #000000;
      border-radius: 15px;
      box-sizing: border-box;
      .data {
        .item {
          .num {
            margin-bottom: 10px;
            font-size: 20px;
            color: #1400ff;
            font-weight: bold;
            text-align: center;
            span {
              font-size: 14px;
            }
          }
          .des {
            font-size: 12px;
            color: #8e8c86;
          }
        }
      }
      .btns {
        margin-top: 24px;
        .record-btn {
          width: 115px;
          line-height: 42px;
          background: #f1f1ed;
          border: 2px solid #000000;
          border-radius: 10px;
          font-size: 14px;
          font-weight: bold;
          color: #161413;
          text-align: center;
          z-index: 1;
        }
      }
    }
    .box-sp {
      height: 201px;
      padding: 12px 10px 26px 20px;
      background: #1b44c6;
      color: #ffffff;
      font-size: 12px;
      .main {
        margin-top: 25px;
        .num {
          margin-bottom: 5px;
          line-height: 33px;
          font-size: 24px;
          font-weight: bold;
          color: #fff100;
        }
      }
      .exchange-btn {
        margin-top: 10px;
        width: 138px;
        line-height: 42px;
        background: #fff100;
        border: 2px solid #000000;
        border-radius: 10px;
        opacity: 0.5;
        font-size: 14px;
        color: #161413;
        font-weight: bold;
        text-align: center;
      }
      .active {
        opacity: 1;
      }
    }
    .clock {
      position: absolute;
      left: 3px;
      top: -20px;
      width: 68px;
    }
    .man {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 102px;
    }
  }
  .no-mar {
    margin-bottom: 0;
  }
  .rule {
    position: relative;
    padding: 0 20px;
    color: #ffffff;
    font-size: 12px;
    margin-bottom: 30px;
    .line {
      position: absolute;
      left: 0;
      top: 50%;
      width: 65px;
      transform: translateY(-50%);
    }
    .line2 {
      position: absolute;
      left: 0;
      top: -29px;
      width: 71px;
    }
    .title {
      margin-bottom: 22px;
      font-size: 17px;
      text-align: center;
    }
    &-item {
      position: relative;
      margin-bottom: 9px;
    }
  }
}
</style>
