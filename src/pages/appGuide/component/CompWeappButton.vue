<template>
  <!-- 开放标签直接写会提示标签不存在，不显示，需通过v-html导入 -->
  <view class="comp-weapp-button" v-html="wxOpenTags" @click="sandStatistic"></view>
</template>
<script>
import { getSignature } from '@/api/signature';
import { publicAppId, mpAppIdOrigin } from '@/utils/config';
export default {
  name: 'WeappButton',
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
            .btn-title {
              font-size: 12px;
              font-weight: 400;
              display: flex;
              justify-content: center;
              color: #161413;
              line-height: 12px;
            }
            .btn-sub {
              display: flex;
              justify-content: center;
            }
            .btn-open-weapp{
              width: 193px;
              height: 45px;
              margin-top: 10px;
            }
            :focus {
              outline-width: 0;
            }
            @keyframes zwyHover1 {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(0.9);
            }
            100% {
              transform: scale(1);
            }
          }
          .zwyHover1 {
            --count: infinite;
            animation: zwyHover1 1.1s var(--count) !important;
          }
          </style>
          <view class="btn-title">前往Get一下微信小程序</view>
            <view class="btn-sub">
              <img src="https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/guide/badge-btn.png" class="btn-open-weapp zwyHover1" style="--count:infinite;"/>
            </view>
        </template>
      </wx-open-launch-weapp>`;
    },
    sandStatistic() {
      this.$statistic({
        event_id: 'SQX-0015-E0001',
        event_name: '潭州课堂中转页-GET按钮点击事件',
      });
    },
  },
};
</script>

<style scoped>
.comp-weapp-button {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
