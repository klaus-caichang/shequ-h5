<template>
  <view class="accept-invita-page">
    <view class="accept-invita-content">
      <view class="accept-invita-header">
        <view class="accept-invita-bg">
          <img class="get-log" src="../../static/get-logo.png" alt="" />
          <view class="get-text"
            ><span class="">{{ inviteType === 2 ? '邀请' : '注册' }}</span
            >成功，立刻前往社区</view
          >
          <view class="accept-invita-btn">
            <button class="btn-count" type="primary" @click="handleInvita">
              打开App
            </button>
          </view>
        </view>
      </view>
      <view class="accept-invita-img">
        <view class="accept-invita-info">
          <view class="">您好！</view>
          <view class="accept-invita-line"
            >我是<span class="line-name">{{ name }}</span
            ><span v-if="inviteType === 2"> 老师</span></view
          >
          <view class="">邀请您加入 Get一下 社区</view>
        </view>
      </view>
      <view class="accept-invita-footer"> </view>
    </view>
    <uni-popup ref="popup" type="center" :animation="false">
      <view class="popup-count-add">
        <view class="popup-left">
          <img class="img" src="../../static/collect-coupons.png" alt="" />
        </view>
        <view class="popup-right">
          <view class="">成功加入</view>
          <view class="">恭喜你获得20张投票券</view>
        </view>
        <view class="del-count" @click="handleDel">
          <img class="del-img" src="../../static/del-icon.png" alt="" />
        </view>
      </view>
    </uni-popup>
    <!-- 下载app -->
    <Download ref="donwload" />
  </view>
</template>

<script>
import openclient from './openclient';
import { isIOS } from '@/utils/env';
import Download from '@/components/download/download.vue';
export default {
  components: { Download },
  data() {
    return {
      inviteId: null,
      inviteType: null,
      name: '',
    };
  },
  onLoad(option) {
    if (option.id) {
      this.inviteId = Number(option.id);
    }
    if (option.type) {
      this.inviteType = Number(option.type);
    }
    if (option.name) {
      this.name = option.name;
    }
  },
  methods: {
    handleInvita() {
      if (isIOS) {
        this.$refs.donwload.goDownLoad();
      } else {
        openclient(false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.accept-invita-page {
  width: 100%;
  height: 100%;
  background: #553df6;
  overflow-y: hidden;
  position: relative;
  .accept-invita-content {
    .accept-invita-header {
      width: 100%;
      height: 286px;
      .accept-invita-bg {
        width: 750rpx;
        height: 286px;
        background-image: url('../../static/result-header-bg.png');
        background-repeat: no-repeat;
        background-position: 122rpx -140rpx;
        background-size: 576rpx 100%;
        text-align: center;
        .get-log {
          width: 184rpx;
          height: 184rpx;
          margin-top: 174rpx;
        }
        .get-text {
          font-size: 17px;
          font-weight: 500;
          text-align: left;
          color: #fff100;
          line-height: 24px;
          text-align: center;
          margin-top: 52rpx;
        }
        .accept-invita-btn {
          width: 590rpx;
          margin: 0 auto;
          height: 96rpx;
          .btn-count {
            width: 100%;
            height: 100%;
            background: #fff100;
            border-radius: 30rpx;
            line-height: 96rpx;
            font-size: 34rpx;
            font-weight: 600;
            text-align: center;
            color: #161413;
            margin-top: 30rpx;
          }
        }
      }
    }
    .accept-invita-img {
      margin: 0 auto;
      margin-top: 67rpx;
      width: 620rpx;
      height: 676rpx;
      background-image: url('../../static/envelope.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .accept-invita-info {
        font-size: 28rpx;
        font-weight: 400;
        text-align: left;
        color: #47433a;
        line-height: 28rpx;
        padding-top: 74rpx;
        padding-left: 90rpx;
        .accept-invita-line {
          margin: 28rpx 0;
          .line-name {
            color: #f25959;
            margin-left: 14rpx;
            margin-right: 14rpx;
          }
        }
      }
    }
    .accept-invita-footer {
      position: absolute;
      width: 100%;
      height: 414rpx;
      background-image: url('../../static/footer-img.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      bottom: 0;
    }
  }
  .popup-count-add {
    position: relative;
    width: 454rpx;
    height: 112rpx;
    background: #ed4242;
    border: 4rpx solid #000000;
    border-radius: 20rpx;
    font-size: 24rpx;
    font-weight: 500;
    text-align: left;
    color: #fff100;
    margin-left: 40rpx;
    .popup-left {
      position: absolute;
      left: -108rpx;
      top: -50rpx;
      .img {
        width: 278rpx;
        height: 160rpx;
      }
    }
    .popup-right {
      position: absolute;
      right: 60rpx;
      margin-top: 20rpx;
    }
    .del-count {
      position: absolute;
      top: -10rpx;
      right: -4rpx;
    }
    .del-img {
      width: 32rpx;
      height: 32rpx;
    }
  }
  .popup-count-invate {
    position: relative;
    width: 227px;
    height: 76px;
    background: #ed4242;
    border: 4rpx solid #000000;
    border-radius: 20rpx;
    font-size: 24rpx;
    font-weight: 600;
    text-align: left;
    color: #fff100;
    margin-left: 40rpx;
    .popup-left {
      position: absolute;
      left: -68rpx;
      top: -80rpx;
      .img {
        width: 115px;
        height: 117px;
      }
    }
    .popup-right {
      position: absolute;
      right: 20rpx;
      margin-top: 20rpx;
      .popup-right-title {
        font-size: 17px;
        font-weight: 600;
        text-align: left;
        color: #fff100;
        line-height: 18px;
        margin-bottom: 5px;
      }
      .popup-right-subtitle {
        font-size: 12px;
        font-weight: 400;
        text-align: left;
        color: #fff100;
        line-height: 12px;
      }
    }
    .del-count {
      position: absolute;
      top: -10rpx;
      right: -4rpx;
    }
    .del-img {
      width: 32rpx;
      height: 32rpx;
    }
  }
}
</style>
