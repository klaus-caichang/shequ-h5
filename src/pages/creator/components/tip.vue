<template>
  <view>
    <view class="tip first">
      添加审核人员微信号：
      <text class="black">{{ weixin }}</text>
      <text class="copy" @click="copy">复制</text>
    </view>
    <view class="tip">可加速通过</view>
  </view>
</template>
<script>
import Clipboard from '@/utils/clipboard';
export default {
  data() {
    return {
      weixin: 'tzpinkls',
    };
  },
  methods: {
    copy() {
      Clipboard.copy(this.weixin);
      this.$toast('复制成功');
    },
  },
};
</script>
<style lang="scss" scoped>
.tip {
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: #8e8c86;
  &.first {
    margin-bottom: 2px;
  }
  .black {
    color: rgba(71, 67, 58, 1);
    text-decoration: underline;
  }
  .copy {
    font-size: 12px;
    color: #ffb700;
    padding: 4px 10px;
    background: rgba(255, 183, 0, 0.1);
    border: 1px solid #ffb700;
    border-radius: 5px;
    margin-left: 10px;
    position: relative;
    top: 2px;
  }
}
</style>
