<template>
  <view class="flex flex-row tab">
    <view
      class="item"
      v-for="(item, index) in tabs"
      :key="index"
      :class="{ active: current === index }"
      @click="tabClick(index)"
    >
      {{ item }}
    </view>
  </view>
</template>
<script>
export default {
  props: {
    current: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // tabs: ['身份概述', '权益分红', '创作要求', '报名方式'],
      tabs: ['身份概述', '权益分红', '创作要求'],
    };
  },
  methods: {
    tabClick(index) {
      this.$emit('changeTab', index);
    },
  },
};
</script>
<style lang="scss" scoped>
.tab {
  padding: 15px 0;
  margin: 0 15px;
}
.item {
  white-space: nowrap;
  padding: 4px 9px;
  background: #ffffff;
  border: 1px solid #ff8f00;
  border-radius: 18px;
  font-size: 14px;
  color: #ff8f00;
  margin-right: 12px;
  &:last-child {
    margin-right: 0;
  }
  &.active {
    background: #ff8f00;
    color: white;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 42%;
      bottom: -5px;
      width: 0;
      height: 0;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 7px solid #ff8f00;
    }
  }
}
</style>
