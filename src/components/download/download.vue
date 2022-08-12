<template>
  <view class="appDownLoad" v-if="changeBrowserEnv" @click="goDownLoad">
    <image :src="$oss('downLoadC/APPdwonLoad.png')" class="APPdownloadImg"/>
    <view class="downLoadBtn"></view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
      return {
        isLogin:true
      };
    },
    computed: {
      ...mapGetters([ 'browserEnv' ]),
      changeBrowserEnv() {
        if ([7, 8].includes(this.browserEnv)) {
          return false;
        } else return true;
      }
    },
    onLoad() {
       // #ifdef MP ||  APP-PLUS
      this.isLogin = false
       // #endif
    },
    methods: {
      goDownLoad(){
        uni.navigateTo({
          url: '/pages/downLoadPage/index'
        });
      }
    }
};
</script>

<style scoped lang="less">
.appDownLoad{
  position: fixed;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 85px;
  z-index: 1;
  .APPdownloadImg{
    width: 100%;
    height: 100%;
  }
  .downLoadBtn{
    position: absolute;
    right: 10px;
    top: 35px;
    width: 92px;
    height: 32px;
    border-radius: 16px;
  }
}
</style>
