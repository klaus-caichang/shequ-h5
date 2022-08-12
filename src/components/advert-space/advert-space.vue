<template>
  <view class="advert-space" @click="jumpAction">
    <image class="img" :src="imgUrl" mode="widthFix" />
  </view>
</template>

<script>
export default {
  // 悬浮广告位
  name: 'AdvertSpace',
  props: {
    jumpUrl: {
      type: String,
      default: ''
    },
    imgUrl: {
      type: String,
      default: 'https://tzedu-hd02-frontend-oss-bucket01.oss-cn-shanghai.aliyuncs.com/tz-community-h5/images/branchVenue/advert-space.png'
    }
  },
  data() {
    return {
      url: ''
    }
  },
  created() {
    this.getPage();
  },
  methods: {
    // 跳转至广告页
    jumpAction() {
      window.location.href = this.url;
    },
    getPage() {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length -1];
      const route = pages[pages.length -1].route;
      switch (route) {
        // 分会场
        case 'pages/artFestival/branchVenue/index':
          switch (currentPage.options.type) {
            // 语言
            case '1':
              this.url = 'https://mz.tanzhouedu.com/?s=e928e4756b7ccd52';
              break;
            // 美术
            case '2':
              this.url = 'https://mz.tanzhouedu.com/?s=e928e4756b7ccd52';
              break;
            // 播音
            case '3':
              this.url = 'https://mz.tanzhouedu.com/?s=e928e4756b7ccd52';
              break;
            // 音乐
            case '4':
              this.url = 'https://mz.tanzhouedu.com/?s=e928e4756b7ccd52';
              break;
            // 软件
            case '5':
              this.url = 'https://mz.tanzhouedu.com/?s=e928e4756b7ccd52';
              break;
            default:
              break;
          }
          break;
        // 主会场
        case 'pages/artFestival/mainVenue/index':
          this.url = 'https://mz.tanzhouedu.com/?s=e928e4756b7ccd52'
          break;
        // 作品详情页
        case 'pages/artFestival/cultureDetails/details':
          switch (currentPage.options.type) {
            case '1':
              this.url = 'https://mz.tanzhouedu.com/?s=c9d1d89aca129535';
              break;
            case '2':
              this.url = 'https://mz.tanzhouedu.com/?s=9594529c3afec09b';
              break;
            case '3':
              this.url = 'https://mz.tanzhouedu.com/?s=331091f3b753d5a1';
              break;
            case '4':
              this.url = 'https://mz.tanzhouedu.com/?s=d2e66491e40545a2';
              break;
            case '5':
              this.url = 'https://mz.tanzhouedu.com/?s=8b163ce83ff0068c';
              break;
            default:
              break;
          }
          break;
        // 邀请页
        case 'pages/artFestival/inviteFriends/index':
          this.url = 'https://mz.tanzhouedu.com/?s=85d4f026a9e69036';
          break;
        // 接受邀请页
        case 'pages/acceptInvita/index':
          switch (currentPage.options.type) {
            // 邀请注册
            case '1':
              this.url = 'https://mz.tanzhouedu.com/?s=85d4f026a9e69036';
              break;
            // 邀请学员
            case '2':
              this.url = 'https://mz.tanzhouedu.com/?s=85d4f026a9e69036';
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.advert-space {
  position: fixed;
  bottom: 107px;
  right: 0;
  z-index: 1;
  .img {
    width: 96px;
  }
}
</style>
