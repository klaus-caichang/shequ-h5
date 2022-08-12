<template>
  <view class="content" :style="`background-image: url(${$oss(imgPath)});`">
    <view class="logo">
      <image :src="$oss('downLoadPage/logo.png')" class="downLoadImg" />
    </view>
    <view class="downLoad">
      <p>Get一下 APP</p>
      <p>Ta是怎么做到的，来Get一下</p>
      <view class="downLoadBtn" @click="goDownLoad">{{ btn }}</view>
    </view>
  </view>
</template>

<script>
import Clipboard from '@/utils/clipboard';

const isInWechatMP = () => {
  return (
    (navigator.userAgent.match(/micromessenger/i) && navigator.userAgent.match(/miniprogram/i)) ||
    window.__wxjs_environment === 'miniprogram'
  );
};

export default {
  data() {
    return {
      platform: '',
      btn: '',
      imgPath: '',
      downSrc: '',
      isWeapp: isInWechatMP(),
    };
  },
  mounted() {
    this.getInFo();
  },
  methods: {
    getInFo() {
      const res = uni.getSystemInfoSync();
      if (res.platform == 'android') {
        this.btn = '立即下载安装包';
        this.imgPath = 'downLoadPage/android.png';
        this.downSrc = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.tzedu.getonce';
      } else if (res.platform == 'ios') {
        this.btn = '前往App Store';
        this.imgPath = 'downLoadPage/Apple.png';
        this.downSrc =
          'https://apps.apple.com/cn/app/get%E4%B8%80%E4%B8%8B-%E5%9C%A8%E7%BA%BF%E5%AD%A6%E4%B9%A0%E4%BA%A4%E6%B5%81%E7%A4%BE%E5%8C%BA/id1580664908';
      } else if (res.platform == 'WEIXIN') {
        this.btn = '前往应用宝安装';
        this.imgPath = 'downLoadPag/应用宝.png';
        this.downSrc = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.tzedu.getonce';
      }
      if (this.isWeapp || res.platform == 'ios') {
        this.btn = '复制链接下载';
      }
    },
    goDownLoad() {
      const res = uni.getSystemInfoSync();
      if (this.isWeapp || res.platform == 'ios') {
        Clipboard.copy('https://a.app.qq.com/o/simple.jsp?pkgname=com.tzedu.getonce');
        this.$toast('复制成功，请前往浏览器打开');
      } else {
        window.location.href = this.downSrc;
      }
    },
    init_statistic() {
      return {
        event_name: '下载APP页',
        event_id: 'SQH_0004_V0001',
      };
    },
  },
};
</script>

<style scoped lang="less">
.content {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
  overflow: hidden;
  .logo {
    width: 136px;
    height: 136px;
    margin: 100px auto 0px;
    .downLoadImg {
      width: 100%;
      height: 100%;
    }
  }
  .downLoad {
    margin-top: -10px;
    p {
      text-align: center;
    }
    p:nth-of-type(1) {
      font-weight: 500;
      color: #161413;
      line-height: 17px;
      font-size: 17px;
    }
    p:nth-of-type(2) {
      font-weight: 400;
      color: #8e8c86;
      line-height: 20px;
      font-size: 14px;
      margin-top: 3px;
    }
    .downLoadBtn {
      margin: 17px auto 40px;
      width: 160px;
      height: 45px;
      background: #0074ff;
      border-radius: 22px;
      text-align: center;
      line-height: 45px;
      font-weight: 600;
      text-align: center;
      color: #ffffff;
      font-size: 17px;
    }
  }
}
</style>
