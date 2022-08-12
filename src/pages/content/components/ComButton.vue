<template>
  <!-- 开放标签直接写会提示标签不存在，不显示，需通过v-html导入 -->
  <view class="comp-weapp-button" v-html="wxOpenTags" @click="sandStatistic"></view>
</template>
<script>
import { getSignature } from '@/api/signature';
import { publicAppId, mpAppIdOrigin } from '@/utils/config';
export default {
  name: 'ComButton',
  props: {
    path: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      wxOpenTags: '',
    };
  },
  watch: {
    path() {
      this.initHtml();
    },
  },
  async mounted() {
    this.initHtml();
    // 调用后端接口通过权限签名算法获取签名
    const res = await getSignature({
      url: location.href,
    });
    const { timestamp, nonceStr, signature } = res && res.data;
    // 引入如下JS文件,与微信JS-SDK类似
    const jsdk = `https://res.wx.qq.com/open/js/jweixin-1.6.0.js`;
    const script = document.createElement('script');
    script.src = jsdk;
    document.body.appendChild(script);
    script.onload = () => {
      const payload = {
        debug: false, // 调试时可开启
        appId: publicAppId, // <!-- replace -->
        timestamp: Number(timestamp), // 必填，填任意数字即可
        nonceStr, // 必填，填任意非空字符串即可
        signature, // 必填，填任意非空字符串即可
        jsApiList: ['previewImage'], // 必填，随意一个接口即可
        openTagList: ['wx-open-launch-weapp'], // 填入打开小程序的开放标签名
      };
      // 通过config接口注入权限验证配置并申请所需开放标签
      window.wx.config(payload);
    };
  },
  methods: {
    initHtml() {
      console.log(this.path);
      this.wxOpenTags = `
      <wx-open-launch-weapp id="launch-btn" username="${mpAppIdOrigin}" path="${this.path}">
        <template>
          <style>
            .btn {
              display: block;
              width: 118px;
              line-height: 32px;
              background: #ffffff;
              border-radius: 17px;
              text-align: center;
              font-size: 14px;
              font-weight: bold;
            }
          </style>
          <view class="btn">打开小程序</view>
        </template>
      </wx-open-launch-weapp>`;
    },
    sandStatistic() {},
  },
};
</script>

<style scoped>
/* .comp-weapp-button {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
} */
</style>
