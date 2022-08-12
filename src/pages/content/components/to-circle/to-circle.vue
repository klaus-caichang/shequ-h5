<template>
  <view class="circle flex-inline flex-middle" v-if="circleObj.circleId" @click.stop="toCircle">
    <image class="circle_img_R" :src="$oss('icon/cIcon1.png')" />
    <text class="circle_left">{{ circleObj.circleName || '' }}</text>
    <text class="circle_right">{{ circleObj.circleUserNumber || 0 }}人已加入</text>
    <image class="circle_img_L" :src="$oss('icon/cLeft1.png')" />
    <view class="circle-view border-half"></view>
  </view>
</template>

<script>
export default {
  name: 'to-circle',
  props: {
    circleObj: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    toCircle() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
  },
};
</script>

<style lang="scss" scoped>
.circle {
  // min-width: 158px;
  max-width: 310px;
  height: 24px;
  background: #fbfdff;
  // border: 0.1px solid #f1f1ed;
  border-radius: 13px;
  font-size: 12px;
  padding: 0 8px;
  position: relative;

  &_left {
    color: #00adff;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 200px;
    overflow: hidden;
    padding: 0 3px;
  }

  &_right {
    color: #62beff;
  }

  &_img_R {
    width: 14px;
    height: 14px;
  }

  &_img_L {
    width: 12px;
    height: 12px;
  }
}
.circle-view {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0 -8px;
  &::before {
    border-radius: 52rpx;
    border-color: #f1f1ed;
  }
}
// 兼容iphone6，iphone7，iphone8s ：
@media (device-height: 667px) and (-webkit-min-device-pixel-ratio: 2) {
  .circle {
    border: 0.1px solid #ebf3ff;
  }
  .circle-view {
    display: none;
  }
}
</style>
