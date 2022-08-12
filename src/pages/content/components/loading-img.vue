<template>
  <view class="loading-img">
    <image v-if="type === 1" class="img" :src="$ossmp('skeletonDiagram/post.png')" mode="" />
    <image v-else class="answer-img" :src="$ossmp('skeletonDiagram/answer.png')" mode="" />
  </view>
</template>

<script>
export default {
  props: {
    type: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-img {
  // position: fixed;
  // top: 88px;
  // left: 0;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  z-index: 2;
  .img {
    width: 100vw;
    height: 513px;
  }
  .answer-img {
    width: 100vw;
    height: 413px;
  }
}
</style>
