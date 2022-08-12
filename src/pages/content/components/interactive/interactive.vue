<template>
  <view class="wrapper">
    <view class="doDetails flex flex-between flex-middle">
      <view class="flex-1">
        <button
          class="button"
          @click="onclick"
        >
          <img
            class="img"
            src="@/static/img/flowInteract/share.png"
          />分享
        </button>
      </view>
      <text class="text"></text>
      <view class="flex-1">
        <button
          class="button"
          @click="onclick"
        >
          <img
            class="img"
            src="@/static/img/flowInteract/comment.png"
          />评论
        </button>
      </view>
      <text class="text"></text>
      <view class="flex-1">
        <button
          class="button"
          @click="onclick"
        >
          <img
            class="img"
            src="@/static/img/flowInteract/thumbs.png"
          />点赞
        </button>
      </view>
      <text class="text"></text>
      <view class="flex-1">
        <button
          class="button"
          @click="onclick"
        >
          <img
            class="img"
            :src="$ossmp('icon/collect-icon.png')"
          />收藏
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'doDetails',
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    statistic: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    data: {
      handler(val) {
        const { praiseCount, isPraise, contentId, isAnswer } = val;
        this.info = { praiseCount, isPraise };
        this.apiData = { contentId, isAnswer };
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      info: {
        praiseCount: this.data.praiseCount,
        isPraise: this.data.isPraise,
      },
      apiData: {},
    };
  },
  methods: {
    onclick() {
      this.$emit('openApp');
    },
    onComment() {
      this.$emit('comment');
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 4px 0;
}
.doDetails {
  text-align: center;
  .text {
    width: 1px;
    height: 16px;
    background: #f1f1ed;
  }
}
.button {
  font-size: 12px;
  display: inline-block;
  height: 16px;
  line-height: 16px;
  width: 50px;
  text-align: center;
  padding: 0;
  margin: 0;
  font-weight: 400;
  // color: #47433a;
  // background: white;
  .img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 4px;
  }
  &::after {
    border: none;
  }
}
</style>
