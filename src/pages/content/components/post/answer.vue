<template>
  <view class='answer flex flex-between flex-middle'>
    <view class='left'>{{ num }}个已答</view>
    <view class='right flex flex-middle'>
      <image class='right_img' :src="$oss('icon/answer.png')" />
      <text class='right_text' @click='onReply'>回答</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'answer',
  props: {
    num: {
      type: Number,
      default: 10,
    },
    item:{}
  },
  methods:{
    onReply(){
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    }
  }
};
</script>

<style lang='scss' scoped>
.answer {
  height: 38px;
  background: #f6fcf7;
  border-radius: 10px;
  padding: 0 10px;
  position: relative;
  .left {
    font-size: 12px;
    color: #52a56b;
  }

  .right {
    height: 24px;
    opacity: 1;
    background: #ffffff;
    border-radius: 12px;
    padding: 0 10px;

    &_img {
      width: 14px;
      height: 14px;
      padding-right: 2px;
    }

    &_text {
      text-align: left;
      font-size: 12px;
      color: #52a56b;
    }
  }
}
</style>
