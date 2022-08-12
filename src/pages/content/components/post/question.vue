<template>
  <view v-if="item.contentType === 4" @click.stop="onReply" class="answer flex flex-between flex-middle">
    <view class="question">来自问题</view>
    <view class="left ellipsis">{{ item.question.title }}</view>
    <view class="right flex flex-middle">
      <image class="right_img" :src="$oss('icon/answer.png')" />
      <text class="right_text">{{ item.question.answerCount || 0 }} 回答</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'answer',
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    onReply() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
  },
};
</script>

<style lang="scss" scoped>
.answer {
  height: 46px;
  background: #f6fcf7;
  border-radius: 10px;
  padding: 0 10px;
  position: relative;
  margin-top: 10px;
  .question {
    position: absolute;
    height: 11px;
    opacity: 1;
    line-height: 5px;
    background: #98efb3;
    font-size: 12px;
    color: #161413;
    top: 0;
    left: 0;
    padding: 0 5px;
    font-weight: bold;
  }
  .left {
    font-size: 12px;
    color: #47433a;
    padding-top: 3px;
  }

  .right {
    height: 24px;
    opacity: 1;
    background: #ffffff;
    border-radius: 12px;
    padding: 0 10px;
    flex-shrink: 0;

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
