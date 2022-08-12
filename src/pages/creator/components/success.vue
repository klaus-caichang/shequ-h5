<template>
  <view class="success">
    <view class="top">
      <image :src="$oss('creator/success.png')" class="img" />
      <text class="text">提交成功</text>
    </view>
    <view class="txt">-我们会在三个工作日内审核完成-</view>
    <tip class="tip-wrapper" />
    <view class="btn-wrapper">
      <view class="btn" @click="$emit('popClose')">耐心等待</view>
    </view>
  </view>
</template>
<script>
import Tip from './tip';

export default {
  components: {
    Tip,
  },
};
</script>
<style lang="scss" scoped>
.success {
  padding: 37px 0 26px 0;
  width: 320px;
  background: #ffffff;
  border-radius: 8px;
  text-align: center;
}
.top {
  margin-bottom: 26px;
  > .img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    margin-right: 10px;
  }
  > .text {
    font-size: 17px;
    font-weight: bolder;
    text-align: center;
    color: #353535;
  }
}
.txt {
  font-size: 14px;
  color: #161413;
  margin-bottom: 13px;
}
.tip-wrapper {
  margin-bottom: 16px;
}
.btn-wrapper {
  text-align: center;
  .btn {
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    color: #161413;
    padding: 8px 31px;
    background: #fff100;
    border-radius: 20px;
  }
}
</style>
