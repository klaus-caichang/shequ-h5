<template>
  <view class="poster-page">
    <view class="container" @click="handleContainerClick">
      <img class="fluid-img" :src="poster" alt="" />
    </view>
  </view>
</template>
<script>
// import { getSignature } from '@/api/signature';
// import { publicAppId } from '@/utils/config';

export default {
  data() {
    return {
      poster: '',
    };
  },

  onLoad({ poster }) {
    // this.setWeichatConfig();
    this.poster = decodeURIComponent(poster);
  },

  methods: {
    handleContainerClick() {
      this.jweixin.miniProgram.navigateTo({
        url: '/pages/index/index',
      });
    },

    // async setWeichatConfig() {
    //   // 调用后端接口通过权限签名算法获取签名
    //   const res = await getSignature({
    //     url: location.href,
    //   });
    //   const { timestamp, nonceStr, signature } = res && res.data;
    //   // 引入如下JS文件,与微信JS-SDK类似
    //   const jsdk = `https://res.wx.qq.com/open/js/jweixin-1.6.0.js`;
    //   const script = document.createElement('script');
    //   script.src = jsdk;
    //   document.body.appendChild(script);
    //   script.onload = () => {
    //     const payload = {
    //       debug: false, // 调试时可开启
    //       appId: publicAppId, // <!-- replace -->
    //       timestamp: Number(timestamp), // 必填，填任意数字即可
    //       nonceStr, // 必填，填任意非空字符串即可
    //       signature, // 必填，填任意非空字符串即可
    //       jsApiList: ['previewImage'], // 必填，随意一个接口即可
    //       openTagList: ['wx-open-launch-weapp'], // 填入打开小程序的开放标签名
    //     };
    //     // 通过config接口注入权限验证配置并申请所需开放标签
    //     window.wx.config(payload);
    //   };
    // },
  },
};
</script>
<style lang="less" scoped>
.fluid-img {
  display: block;
  width: 100%;
}
</style>
