<template>
  <view class="wrapper">
    <view class="download-tab flex flex-between flex-middle">
      <image class="img" :src="$oss('common/logo.png')" mode="widthFix" />
      <view class="btn" @click="download">打开app</view>
    </view>
    <!-- <view v-if="showMask" class="mask flex" @click="showMask = false">
      <view class="txt">点击右上角按钮，然后在弹出的菜单中，点击在浏览器中打开，即可。</view>
      <image class="img" :src="$oss('detail/arrow.png')" mode="widthFix" />
    </view> -->
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
const pagesMap = {
  'pages/content/PostDetail': 'getit://push/invitationDetail',
  'pages/content/MoodDetail': 'getit://push/invitationDetail',
  'pages/content/QuestionDetail': 'getit://push/questionsDetail',
  'pages/content/AnswerDetail': 'getit://push/answersDetail',
  'pages/content/ArticleDetail': 'getit://push/articleDetail',
}
const downloadUrl = 'https://sj.qq.com/myapp/detail.htm?apkName=com.tzedu.getonce&info=CF6C8809E105D074947A51B4E90370FC'
export default {
  data() {
    return {
      appUrl: '',
      timer: null,
    }
  },
  computed: {
    ...mapGetters(['isAndroid'])
  },
  mounted() {
    const pages = getCurrentPages();
    const current = pages[pages.length - 1];
    this.appUrl = `getonce://com.tzedu.getonce?path=${window.btoa(`${pagesMap[current.route]}?id=${current.options.id}`)}`
    const that = this;
    document.addEventListener('visibilitychange', function () {
      if (that.timer) {
        clearTimeout(that.timer)
      }
    }, false);
  },
  methods: {
    download() {
      let that = this
      if (this.isAndroid) { //  安卓处理
        let ifr = document.createElement('iframe');
        ifr.src = this.appUrl;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
        this.timer = window.setTimeout(function () {  //  未安装的情况
          document.body.removeChild(ifr);
          //  提示下载
          that.$toast('未安装APP即将跳转到下载页')
          window.location = downloadUrl
        }, 3000)
      } else {  //  IOS处理
        window.location = this.appUrl
        that.timer = setTimeout(function () { //  未安装的情况
          that.$toast('未安装APP即将跳转到下载页')
          window.location = downloadUrl
        }, 3000);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.download-tab {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  padding: 0 15px;
  width: 100%;
  height: 44px;
  background: rgba(0,0,0,0.5);
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  .img {
    width: 106px;
  }
  .btn {
    // width: 77px;
    padding: 0 10px;
    line-height: 25px;
    background: #fff100;
    border-radius: 13px;
    text-align: center;
  }
}
</style>
