<template>
  <view :class="size" v-show="show" @click.stop="follow">
    <view v-if="value !== 1" class="follow">加入{{ size === 'big' ? '' : '圈子' }}</view>
    <view v-else class="unfollow border-half">进圈</view>
  </view>
</template>

<script>

export default {
  name: 'circle-follow',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    isShow: {
      type: Boolean,
      default: true,
    },
    circleId: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'main',
    },
    circleTab: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    follow() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 60px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  text-align: center;
  font-weight: bold;
}
.big {
  width: 60px;
  height: 28px;
  line-height: 28px;
  font-size: 12px;
  text-align: center;
  font-weight: bold;
}
.follow {
  background: #fff100;
  color: #161413;
  border-radius: 50px;
}

.unfollow {
  color: #161413;
  &:before {
    border-radius: 50px;
  }
}
</style>
