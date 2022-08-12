<template>
  <view class="piece-rule">
    <img class="bg" src="../../static/img/knowledge.gif" />

    <div class="bt" @click="toLink"></div>
  </view>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  onShow() {
    if (parseInt(this.terminalType, 10) === 2 || parseInt(this.terminalType, 10) === 3) {
      JsCallSystemTitle.postMessage('碎片规则');
    }
  },
  computed: {
    ...mapGetters(['terminalType']),
  },
  methods: {
    toLink() {
      window.location.href = `https://mp.weixin.qq.com/s/-eqPkVrZODgHQ7TbJFbzng`;
      // window.open('https://mp.weixin.qq.com/s/-eqPkVrZODgHQ7TbJFbzng');
    },
  },
};
</script>
<style lang="scss" scoped>
.piece-rule {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  // height: 1271px;
  position: relative;
  // background-image: url('https://tzedu-hd02-frontend-oss-bucket01.oss-cn-shanghai.aliyuncs.com/tz-community-h5/images/know/knowledge.jpg');
  // background-size: contain;
  // background-repeat: no-repeat;
  .bg {
    display: block;
    width: 100%;
  }
  .bt {
    position: absolute;
    width: 240px;
    height: 70px;
    margin: 0 auto;
    bottom: 1.5%;
    left: 0;
    right: 0;
  }
}
</style>
