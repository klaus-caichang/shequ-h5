<template>
  <view class="answer flex flex-between flex-middle" @click="onclick">
    <view class="left">{{ num }}已答</view>
    <view class="right flex flex-middle">
      <image mode="aspectFill" lazy-load class="right_img" :src="$ossmp('icon/answer.png')" />
      <button class="right_text" hover-class="none" open-type="share">邀请回答</button>
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
  },
  methods: {
    onclick() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    }
  }
};
</script>

<style lang="scss" scoped>
.answer {
  height: 38px;
  background: #f6fcf7;
  border-radius: 10px;
  padding: 0 10px;

  .left {
    font-size: 14px;
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
  // 默认样式
  button {
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1px;
    padding-right: 1px;
    box-sizing: border-box;
    font-size: 18px;
    text-align: center;
    text-decoration: none;
    line-height: 1;
    border-radius: 5px;
    -webkit-tap-highlight-color: transparent;
    overflow: hidden;
    color: #000000;
    background-color: #fff;
  }
  // 边框样式
  button::after {
    border: 0;
  }
  // 禁用时样式
  button[disabled] {
    background-color: #fff;
    color: #666;
  }
  // 点击时样式
  .button-hover {
    color: rgba(0, 0, 0, 0.6);
    background-color: #fff;
  }
}
</style>
