<template>
  <view class="avator">
    <image class="img" :class="noBor && 'no-bor'" :src="imgUrl" :style="{ borderColor }" mode="aspectFill" />
    <image v-if="vUrl" class="icon-v" :src="vUrl" />
  </view>
</template>

<script>
export default {
  // 文化艺术节头像
  name: 'Avator',
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    borderColor: {
      type: String,
      default: '#161413'
    },
    // 是否需要边框
    noBor: {
      type: Boolean,
      default: false
    },
    // 身份标识图片地址
    vUrl: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.avator {
  position: relative;
  width: 100%;
  height: 100%;
  .img {
    width: 100%;
    height: 100%;
    border: 2px solid #161413;
    border-radius: 50%;
    box-sizing: border-box;
  }
  .no-bor {
    border: 0;
  }
  .icon-v {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 32%;
    height: 32%;
  }
}
</style>
