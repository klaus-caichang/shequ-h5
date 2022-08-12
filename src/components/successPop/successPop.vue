<template>
  <view class="success-pop">
    <view class="header flex flex-middle flex-between">
      <view class="title">提示</view>
      <image class="icon-close" src="@/static/artFestival/close2.png" mode="widthFix" @click="close" />
    </view>
    <image class="icon-suc" src="@/static/artFestival/success.png" mode="widthFix" />
    <view class="tip-txt">
      为<span>{{ name }}</span>投<span>{{ voteNum }}</span>票成功！
    </view>
  </view>
</template>

<script>
export default {
  // 投票成功提示弹窗
  name: 'SuccessPop',
  props: {
    name: {
      type: String,
      default: '',
    },
    voteNum: {
      type: Number,
      default: 0
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="less" scoped>
.success-pop {
  width: 278px;
  height: 172px;
  background: #ffffff;
  border-radius: 15px;
  font-size: 14px;
  .header {
    padding: 0 17px 0 20px;
    height: 56px;
    .title {
      font-weight: bold;
      color: #161413;
    }
    .icon-close {
      width: 20px;
    }
  }
  .icon-suc {
    display: block;
    margin: 0 auto;
    width: 50px;
  }
  .tip-txt {
    margin-top: 22px;
    color: #47433A;
    text-align: center;
    span {
      margin: 0 6px;
      color: #F25959;
    }
  }
}
</style>
