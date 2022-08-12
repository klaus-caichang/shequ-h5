<template>
  <view class="special-btns flex flex-middle">
    <view v-if="subjectId" class="btn mt15 flex flex-middle flex-center" @click="toSpecial">
      <image class="image br5" mode="aspectFill" :src="cover"></image>
      <view>查看专题</view>
    </view>
    <view v-if="nextId" class="btn wt100 flex flex-middle flex-center" @click="toDetail">
      <image class="image" :src="$ossmp('common/next_content_icon.png')"></image>
      <view>下一篇</view>
    </view>
  </view>
</template>
<script>
import { CREATE_TYPE } from '@/constants/common';
export default {
  props: {
    cover: {
      type: String,
      default: '',
    },
    subjectId: {
      type: Number,
      default: null,
    },
    // 下一篇内容id
    nextId: {
      type: Number,
      default: null,
    },
    nextQuestionId: {
      type: Number,
      default: null,
    },
    // 下一篇内容类型
    nextType: {
      type: Number,
      default: null,
    },
  },
  methods: {
    toSpecial() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
    toDetail() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
  },
};
</script>
<style lang="scss" scoped>
.special-btns {
  .image {
    width: 20px;
    height: 20px;
    margin-right: 7px;
  }
  .mt15 {
    margin-right: 15px;
  }
  .br5 {
    border-radius: 5px;
  }
  .btn {
    width: 108px;
    height: 36px;
    background: #f8f8f8;
    border-radius: 10px;
    font-size: 12px;
    color: #47433a;
  }
  .wt100 {
    width: 100px !important;
  }
}
</style>
