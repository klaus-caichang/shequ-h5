<template>
  <view class="btn" @click="$emit('showRule')">
    <image :src="$oss('creator/ques.png')" class="img" />
    <text>活动说明</text>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.btn {
  display: inline-block;
  width: 74px;
  opacity: 1;
  background: #47433a;
  border-radius: 100px 0px 0px 100px;
  font-size: 12px;
  color: #fff100;
  padding: 4px 4px 4px 0;
  > .img {
    width: 14px;
    height: 14px;
    margin-right: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
}
</style>
