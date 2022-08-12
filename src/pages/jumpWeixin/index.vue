<template>
  <view class="main guide-page">
    <view class="title-count">
      <img
        class="title-img"
        src="https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/guide/community-guide-title.png"
        alt=""
      />
    </view>
    <view class="btn-count">
      <view class="btn-title">前往Get一下微信小程序</view>
      <view class="btn-sub">
        <img
          src="https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/guide/get-btn.png"
          class="btn zwyHover1"
          style="--count: infinite"
          @click="onOpenWeixin"
        />
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      weixinPath: 'pages/index/index',
    };
  },
  async onLoad(option) {
    // if (!this.userId && this.token) {
    //   await this.$store.dispatch('getUserInfo');
    // }
    if (option.weixinPath) {
      this.weixinPath = option.weixinPath;
    }
  },
  methods: {
    // 打开微信小程序
    onOpenWeixin() {
      window.JsOpenMiniApplet.postMessage(JSON.stringify({ path: this.weixinPath }));
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
