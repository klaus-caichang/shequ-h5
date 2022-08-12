<template>
  <view class="wrapper">
    <uni-popup ref="popup" type="center" @change="changePop">
      <view class="download-pop">
        <image class="bg" :src="$oss('detail/bg.png')" />
        <image class="icon-close" :src="$oss('detail/close.png')" @click="close" />
        <view class="wrapper flex flex-column flex-middle flex-center">
          <image class="main-img" :src="$oss('detail/icon.png')" />
          <view class="title">TA是怎么做到的？来Get 一下</view>
          <!-- <view class="des">TA是怎么做到的？来Get 一下</view> -->
          <view class="line"></view>
          
          <view class="btn-box flex flex-center" :class="isWeixin && 'flex-between'">
            <view class="btn" @click="download">打开App</view>
            <!-- 微信内部网页打开 -->
            <ComButton v-if="isWeixin" :path="path" />
          </view>
          <!-- <view v-else class="btn" @click="download">立即下载</view> -->
        </view>
      </view>
    </uni-popup>
    <!-- <view v-if="showMask" class="mask flex" @click="showMask = false">
      <view class="txt">点击右上角按钮，然后在弹出的菜单中，点击在浏览器中打开，即可。</view>
      <image class="img" :src="$oss('detail/arrow.png')" mode="widthFix" />
    </view> -->
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import ComButton from '../ComButton.vue';
const pagesMap = {
  'pages/content/PostDetail': 'getit://push/invitationDetail',
  'pages/content/MoodDetail': 'getit://push/invitationDetail',
  'pages/content/QuestionDetail': 'getit://push/questionsDetail',
  'pages/content/AnswerDetail': 'getit://push/answersDetail',
  'pages/content/ArticleDetail': 'getit://push/articleDetail',
}

export default {
  components: { ComButton },
  data() {
    return {
      path: '/pages/index/index',
      appUrl: '',
      showMask: false,
    }
  },
  computed: {
    ...mapGetters(['isWeixin'])
  },
  mounted() {
    const pages = getCurrentPages();
    const current = pages[pages.length - 1];
    this.path = current.__page__.fullPath.replace('pages', 'subpkgDetail');
    this.appUrl = `getonce://com.tzedu.getonce?path=${window.btoa(`${pagesMap[current.route]}?id=${current.options.id}`)}`
    this.$bus.$on('OPEN_DOWNLOAD_POP', () => {
      // this.open();
    })
  },
  methods: {
    download() {
      if (this.isWeixin) {
        this.showMask = true;
      } else {
        // location.href = 'https://sj.qq.com/myapp/detail.htm?apkName=com.tzedu.getonce&info=CF6C8809E105D074947A51B4E90370FC'
        location.href = this.appUrl;
        this.close();
      }
    },
    open() {
      this.$refs.popup.open();
    },
    close() {
      this.$refs.popup.close();
    },
    changePop({ show }) {
      if(!show) this.showMask = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.mask {
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 15px 0 30px;
  background: rgba($color: #000000, $alpha: 0.5);
  width: 100vw;
  height: 100vh;
  .txt {
    margin-top: 25px;
    color: #FFFFFF;
    font-size: 16px;
  }
  .img {
    width: 80px;
  }
}
.download-pop {
  position: relative;
  width: 278px;
  height: 262px;
  padding: 0 15px;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .icon-close {
    z-index: 1;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
  }
  .wrapper {
    position: relative;
    color: #47433A;
    height: 100%;
    .main-img {
      width: 92px;
      height: 98px;
    }
    .title {
      font-size: 17px;
      font-weight: bold;
    }
    .des {
      font-size: 12px;
    }
    .line {
      margin: 15px 0 30px 0;
      width: 100%;
      height: 1px;
      background: #FFFFFF;
    }
    .btn-box {
      width: 100%;
    }
    .btn {
      width: 118px;
      line-height: 32px;
      background: #ffffff;
      border-radius: 17px;
      text-align: center;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
