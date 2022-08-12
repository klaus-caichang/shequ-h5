<template>
  <view class="comment-bar flex flex-middle flex-center">
    <!-- <view class="btn" @click="goApp">ta是怎么做到的，来get一下吧</view> -->
    <!-- 开放标签直接写会提示标签不存在，不显示，需通过v-html导入 -->
    <view class="comp-weapp-button" v-html="wxOpenTags" @click="sandStatistic"></view>
  </view>
</template>

<script>
import { getSignature } from '@/api/signature';
import { publicAppId, mpAppIdOrigin } from '@/utils/config';
export default {
  name: 'ComButton',
  // props: {
  //   path: {
  //     type: String,
  //     default: '',
  //   },
  // },
  data() {
    return {
      wxOpenTags: '',
      path: ''
    };
  },
  watch: {
    path() {
      this.initHtml();
    },
  },
  created() {
    const pages = getCurrentPages();
    const current = pages[pages.length - 1];
    this.path = current.__page__.fullPath.replace('pages', 'subpkgDetail');
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
              padding: 0 10px;
              width: 345px;
              line-height: 32px;
              background: #fff100;
              border-radius: 16px;
              text-align: center;
              font-weight: bold;
              font-size: 14px;
              color: #161413;
            }
          </style>
          <view class="btn">ta是怎么做到的，来get一下吧</view>
        </template>
      </wx-open-launch-weapp>`;
    },
    sandStatistic() {},
    goApp() {
      this.$emit('openApp');
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-bar {
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: #ffffff;
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.1);
  .btn {
    width: 345px;
    line-height: 32px;
    background: #fff100;
    border-radius: 16px;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    color: #161413;
  }
}
</style>
