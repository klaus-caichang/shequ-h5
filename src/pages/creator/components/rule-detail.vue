<template>
  <view class="rule">
    <view class="img-wrapper">
      <image :src="$oss('creator/ruleTip.png')" class="img" />
    </view>
    <view class="text">
      <view class="line">1. 申请成为内容创作者，工作人员会在1-3个工作日内处理</view>
      <view class="line"
        >2. 一旦发现任何违规行为，包括但不限于刷赞刷评论等行为，我们将回收所有奖励，并且取消违规用户参与资格</view
      >
      <view class="line">3. 发布的内容无不雅内容、未违反国家有关政策法规</view>
      <view class="line">4. 本活动最终解释权归“Get一下”社区所有</view>
    </view>
    <view class="btn-wrapper">
      <view class="btn" @click="$emit('popClose')">知道了</view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.rule {
  width: 284px;
  background: #ffffff;
  border-radius: 8px;
  padding-bottom: 18px;
  > .img-wrapper {
    text-align: center;
    position: relative;
    top: -16px;
    > .img {
      width: 220px;
      height: 39px;
    }
  }
  .text {
    font-size: 14px;
    color: #47433a;
    line-height: 20px;
    text-align: left;
    padding: 0 25px 10px 25px;
    .line {
      margin-bottom: 3px;
    }
  }
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
