<template>
  <view class="content">
    <img class="img" src="./img/copy2.jpg" alt="复制get一下" />
    <div class="btn btn1" @click="handleClick1"></div>
    <!-- <div class="btn btn2" @click="handleClick2"></div> -->
  </view>
</template>

<script>
import Clipboard from '@/utils/clipboard';

export default {
  data() {
    return {
      downSrc: '',
      openId: '',
    };
  },
  onLoad({ openId }) {
    this.openId = openId;
  },

  mounted() {
    this.$statistic({
      event_id: 'SQH-0016-V0001',
      event_name: '小程序引流APP下载页曝光',
      event_attr: {
        openId: this.openId,
      },
    });
  },
  methods: {
    handleClick1() {
      const res = uni.getSystemInfoSync();
      if (res.platform === 'android') {
        // this.btn = '立即下载安装包';
        this.downSrc = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.tzedu.getonce';
      } else {
        // this.btn = '前往App Store';
        this.downSrc =
          'https://apps.apple.com/cn/app/get%E4%B8%80%E4%B8%8B-%E5%9C%A8%E7%BA%BF%E5%AD%A6%E4%B9%A0%E4%BA%A4%E6%B5%81%E7%A4%BE%E5%8C%BA/id1580664908';
      }
      Clipboard.copy(this.downSrc);
      this.$statistic({
        event_id: 'SQH-0016-E0001',
        event_name: '复制链接到浏览器按钮点击事件',
        event_attr: {
          openId: this.openId,
        },
      });
      this.$toast('复制成功，请前往浏览器打开');
    },
    handleClick2() {
      Clipboard.copy('Get一下');
      this.$statistic({
        event_id: 'SQH-0016-E0002',
        event_name: '复制名称到应用市场按钮点击事件',
        event_attr: {
          openId: this.openId,
        },
      });
      this.$toast('复制成功，请前往商城下载');
    },
  },
};
</script>

<style scoped lang="less">
.content {
  position: relative;
  .img {
    display: block;
    width: 100%;
    border: 0;
  }
  .btn {
    width: 100%;
    height: 100px;
    position: absolute;
    z-index: 2;
    left: 0;
    bottom: 0;
    opacity: 0.5;
  }
  .btn1 {
    top: 340px;
  }
  .btn2 {
    bottom: 0;
  }
}
</style>
