<template>
  <view class="main guide-page">
    <view class="title-count">
      <img
        class="title-img"
        src="https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/guide/community-guide-title.png"
        alt=""
      />
    </view>
    <view class="swiper">
      <swiper
        class="swiper-list"
        :indicator-dots="!disableTouch"
        indicator-color="#FFFFFF"
        indicator-active-color="#161413"
        duration="800"
        :current="currentIndex"
        :disable-touch="disableTouch"
      >
        <swiper-item class="step1">
          <view class="interface-count">
            <view class=""
              >嗨，<text decode>&nbsp;</text><text class="theme-pink space">{{ userInfo.bbsNick }}</text></view
            >
            <view v-if="userInfo.bbsDays" class=""
              >今天是你加入社区的第<text class="theme-pink f-20 space">{{ userInfo.bbsDays }}</text
              >天</view
            >
            <view v-if="userInfo.contentCount" class=""
              >在这段时间里，你发布了<text class="theme-pink f-20 space">{{ userInfo.contentCount }}</text> 篇内容</view
            >
            <view v-if="userInfo.praiseCount" class=""
              >点赞了<text class="theme-pink f-20 space">{{ userInfo.praiseCount }}</text
              >个精彩帖子</view
            >
            <view v-if="userInfo.commentCount" class=""
              >参与了<text class="theme-pink f-20 space">{{ userInfo.commentCount }}</text
              >个帖子的评论</view
            >
            <view class="">社区也因你的陪伴而日益强大</view>
          </view>
        </swiper-item>
        <swiper-item class="step2">
          <view class="interface-count">
            <view class="">为了更好地服务大家 </view>
            <view class="">社区已升级为“<text class="theme-pink">Get一下</text>”</view>
            <view class="">在这里，你可以轻松Get想要的</view>
            <view class="">TA从“<text class="theme-pink">小白到大牛</text>”的学习经历和心得</view>
            <view class=""> 还能和同行大牛无障碍交流 </view>
            <view class="">和有着相同兴趣爱好的朋友一起成长</view>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="btn-count" :class="isPc ? 'ispc' : ''">
      <!-- 微信外部部网页打开并且不是PC的情况 -->
      <view v-if="!isWeixin && !isPc">
        <view class="btn-title">前往Get一下微信小程序</view>
        <view class="btn-sub">
          <img
            src="https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/guide/get-btn.png"
            class="btn zwyHover1"
            style="--count: infinite"
            @click="toWxMinApp"
          />
        </view>
      </view>
      <!-- 用电脑浏览器打开 -->
      <view v-if="isPc">
        <view class="qr-count">
          <img
            class="qr-img"
            src="https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/guide/qrcode.png"
            alt=""
          />
        </view>
        <view class="btn-title">扫码前往Get一下微信小程序</view>
      </view>
      <!-- 微信内部网页打开 -->
      <WeappButton v-if="isWeixin" :path="path"></WeappButton>
    </view>
    <!--权限提示弹窗-->
    <view class="pop-count">
      <uni-popup ref="insidePop" type="center">
        <view class="pop-content">
          <view class="pop-header">
            <img
              class="pop-img"
              src="https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/guide/pop-top-bg.png"
              alt=""
            />
            <view class="version">6.5.6</view>
          </view>
          <view class="pop-body">
            <view class="pop-top-title">
              <view class="pop-title">更新最新版本，体验全新社区</view>
              <view class="pop-title">快来Get一下吧~</view>
            </view>
            <view class="pop-sub-title">
              <view class="pop-tip">前往我的-个人设置-点击底部的</view>
              <view class="pop-tip"><text class="update">“检查更新” </text>到最新版本</view>
            </view>
          </view>
          <view class="pop-footer">
            <view class="pop-left-btn" @click="hiddlePop">我知道了</view>
            <view class="pop-right-btn" @click="jumpUpgrade">去更新</view>
          </view>
        </view>
      </uni-popup>
    </view>
  </view>
</template>
<script>
import { mapGetters } from 'vuex';
import WeappButton from './component/CompWeappButton';
import { mpWelcomeLink } from '@/utils/config';
import { getUdbWechatScheme, getUserFirstVisit, getContentAndCommtentNum } from '@/api/guide';
import { webViewCall } from '@/utils';
import { isIOS } from '@/utils/env';
import uniPopup from '@/components/uni-popup/uni-popup';
// 生成的永久有效的跳转地址。
const WEIXINLINK = 'weixin://dl/business/?t=YvBVgUA0hDb';
export default {
  components: { WeappButton, uniPopup },
  data() {
    return {
      uid: '',
      version: 0,
      disableTouch: false,
      currentIndex: 0,
      weixinLink: WEIXINLINK,
      userInfo: {
        name: '',
        bbsNick: '',
        bbsDays: 0,
        commentCount: 0,
        contentCount: 0,
        praiseCount: 0,
      },
      path: '/pages/index/index',
      smsId: 0,
    };
  },
  computed: {
    ...mapGetters([
      'token',
      'envReady',
      'isWeixin',
      'isApp',
      'isPc',
      'isAndroid',
      'isMobile',
      'isMp',
      'browserEnv',
      'userId',
    ]),
  },
  watch: {
    envReady: {
      handler(newVal) {
        console.log('newVal', newVal);
        if (newVal) {
          const birthday = new Date().getMinutes();
          this.init();
          this.postStatistic();
        }
      },
      immediate: true,
    },
    token() {
      this.init();
    },
  },
  async onLoad(option) {
    // 判断是否登录111
    // this.init();
    if (!this.userId && this.token) {
      await this.$store.dispatch('getUserInfo');
    }
    if (this.isAndroid) {
      window.CallJsAppInfo = data => {
        // app版本
        this.version = data && JSON.parse(data).version;
      };
      webViewCall({
        method: 'JsCallAppInfo',
        platform: 2,
      });
    }
    // 自动跳转到微信小程序，无需用户点击
    if (this.$route.query.autoPlay) {
      this.setLocationHref();
    }
    if (this.$route.query.weixinLink) {
      const url = decodeURIComponent(this.$route.query.weixinLink);

      this.weixinLink = this.$route.query.weixinLink;
      this.setLocationHref(url);
    }

    if (option.c) {
      this.smsId = option.c;
    }
  },
  onShow() {},
  methods: {
    // 版本比较
    version_compare(v1, v2) {
      //将两个版本号拆成数组
      var arr1 = v1.split('.'),
        arr2 = v2.split('.');
      var minLength = Math.min(arr1.length, arr2.length);
      //依次比较版本号每一位大小
      for (var i = 0; i < minLength; i++) {
        if (parseInt(arr1[i]) != parseInt(arr2[i])) {
          return parseInt(arr1[i]) > parseInt(arr2[i]) ? 1 : -1;
        }
      }
      // 若前几位分隔相同，则按分隔数比较。
      if (arr1.length == arr2.length) {
        return 0;
      } else {
        return arr1.length > arr2.length ? 1 : -1;
      }
    },
    hiddlePop() {
      this.$statistic({
        event_id: 'SQX-0015-E0004',
        event_name: '潭州课堂中转页-升级按钮点击取消事件',
      });
      this.$refs.insidePop.close();
    },
    jumpUpgrade() {
      this.$statistic({
        event_id: 'SQX-0015-E0005',
        event_name: '潭州课堂中转页-升级按钮点击去更新事件',
      });
      webViewCall({
        routeInfo: '', // 默认navigateTo跳转页面
        className: 'com.sgkt.phone.ui.activity.SettingActivity',
        params: {},
        platform: 2,
      });
    },
    async postStatistic() {
      this.$statistic({
        event_id: 'SQX-0015-V0001',
        event_name: '潭州课堂中转页曝光',
      });
    },
    init() {
      if (this.token) {
        this.currentIndex = 0;
        this.disableTouch = false;
        this.userFirstVisit();
      } else {
        this.currentIndex = 1;
        this.disableTouch = true;
        const { webviewLink } = this.$route.query;
        if (this.isWeixin && webviewLink) {
          this.path = `/pages/webview/index?link=${encodeURIComponent(webviewLink)}`;
        } else {
          this.weixinLink = WEIXINLINK;
        }
      }
    },
    async userFirstVisit() {
      const { data } = await getUserFirstVisit();
      this.userInfo.bbsDays = data && data.bbsDays;
      this.userInfo.bbsNick = data && data.bbsNick;
      // 老用户需要获取对应的数据，否则就直接显示第二页
      if (data && data.bbsOldUser) {
        this.getUserInfo();
      } else {
        this.currentIndex = 1;
        this.disableTouch = true;
      }
      if (this.isWeixin) {
        this.path = `/pages/index/index?token=${this.token}${
          data && data.firstVisit === 0 && data.bbsOldUser ? `&webviewLink=${mpWelcomeLink}` : ''
        }`;
      } else {
        // 只有是老用户并且首次进入才会携带webviewLink
        if (data && data.firstVisit === 0 && data.bbsOldUser) {
          await this.udbWechatScheme(true);
        } else {
          await this.udbWechatScheme();
        }
      }
    },
    async udbWechatScheme(flag) {
      const prams = {
        path: '/pages/index/index',
        query: `token=${this.token}${flag ? `&webviewLink=${mpWelcomeLink}` : ''}`,
      };
      const { data } = await getUdbWechatScheme(prams);
      this.weixinLink = data && data.link;
    },
    async getUserInfo() {
      const { data } = await getContentAndCommtentNum();
      if (data) {
        this.userInfo.commentCount = data.commentCount;
        this.userInfo.contentCount = data.contentCount;
        this.userInfo.praiseCount = data.praiseCount;
      }
    },
    toWxMinApp() {
      // 微信外部跳转到小程序首页
      this.$statistic({
        event_id: 'SQX-0015-E0001',
        event_name: '潭州课堂中转页-GET按钮点击事件',
      });

      if (this.isAndroid) {
        const isSubVersion = this.version_compare(this.version, '6.5.6');
        if (isSubVersion === -1) {
          this.$refs.insidePop.open();
        } else {
          this.setLocationHref();
        }
      } else {
        this.setLocationHref();
      }
    },

    setLocationHref(url = this.weixinLink) {
      if (url) {
        location.href = url;
        setTimeout(() => {
          if (!isIOS) {
            // 安卓设备使用 iframe 的形式多唤醒一次
            const ifr = document.createElement('iframe');
            ifr.src = url;
            ifr.style.display = 'none';
            ifr.setAttribute('target', 'self');
            document.body.appendChild(ifr);
          }
          if (this.smsId) {
            // 短信模板进入 SQH-0015-E0001
            this.$statistic({
              event_id: 'SQH-0015-E0001',
              event_name: '潭州课堂中转页-GET按钮点击事件',
              event_attr: {
                sms_id: this.smsId,
              },
            });
          }
        }, 200);
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
  .f-20 {
    line-height: 18px;
    font-weight: 700;
    font-size: 20px;
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
  .swiper {
    width: 100%;
    height: calc(100% - 89px);
    background-image: url('https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/guide/guide-sub-bg.png');
    background-position: 0% 100%;
    background-repeat: no-repeat;
    background-size: 100%;
    .swiper-list {
      width: 100%;
      height: 100%;
      .step1 {
        background-image: url('https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/guide/guide1.png');
        background-position: 0 68%;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      .step2 {
        background-image: url('https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/guide/guide2.png');
        background-position: 0 68%;
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
    }
  }
  .btn-count {
    position: absolute;
    bottom: 45px;
    left: 0;
    right: 0;
    height: 67px;
    &.ispc {
      height: 140px;
    }
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
    .qr-count {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
      .qr-img {
        width: 115px;
        height: 115px;
      }
    }
  }
  .pop-count {
    .pop-content {
      .pop-header {
        height: 174px;
        .pop-img {
          width: 280px;
          height: 174px;
        }
        .version {
          position: absolute;
          font-size: 17px;
          text-align: center;
          top: 77px;
          left: 18px;
          color: #ffffff;
          line-height: 17px;
        }
      }
      .pop-body {
        background: #ffffff;
        height: 115px;
        margin-top: -10px;
        .pop-top-title {
          font-size: 17px;
          font-weight: 600;
          text-align: center;
          color: #161413;
          line-height: 17px;
          .pop-title {
            margin-bottom: 8px;
          }
        }
        .pop-sub-title {
          font-size: 14px;
          font-weight: 400;
          text-align: center;
          color: #161413;
          line-height: 14px;
          margin-top: 20px;
          .pop-tip {
            margin-bottom: 8px;
          }
          .update {
            color: rgba(242, 89, 89, 1);
          }
        }
      }
      .pop-footer {
        display: flex;
        justify-content: center;
        font-size: 14px;
        line-height: 36px;
        background: #ffffff;
        padding-bottom: 25px;
        border-radius: 0 0 18px 18px;
        .pop-left-btn {
          width: 100px;
          height: 36px;
          color: #47433a;
          text-align: center;
          background: #ffffff;
          border: 1px solid #eaebec;
          border-radius: 19px;
          margin-right: 22px;
        }
        .pop-right-btn {
          width: 100px;
          height: 36px;
          text-align: center;
          color: #ffffff;
          background: #fa7d78;
          border-radius: 18px;
        }
      }
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
