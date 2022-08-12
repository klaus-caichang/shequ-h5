<template>
  <view class="tip-pop">
    <image class="sp" src="@/static/artFestival/sp.png" mode="widthFix" />
    <image class="close" src="@/static/artFestival/close.png" mode="widthFix" @click="close" />
    <view class="top">兑换成功</view>
    <view class="des">请前往Get一下App“我的- 知识碎片”中查看</view>
  </view>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="less" scoped>
.tip-pop {
  position: relative;
  padding: 12px 12px 0 62px;
  width: 227px;
  height: 91px;
  background: #ed4242;
  border: 2px solid #000000;
  border-radius: 10px;
  color: #FFF100;
  box-sizing: border-box;
  .sp {
    position: absolute;
    left: -34px;
    top: -57px;
    width: 116px;
  }
  .close {
    position: absolute;
    right: -4px;
    top: -7px;
    width: 16px;
  }
  .top {
    margin-bottom: 9px;
    font-size: 14px;
    font-weight: bold;
  }
  .des {
    font-size: 12px;
  }
}
</style>
