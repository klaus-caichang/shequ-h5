<template>
  <view :class="size" v-show="show" v-if="userInfo.uid !== userId" @click.stop="follow">
    <slot>
      <view v-if="value !== 1" class="follow">关注</view>
      <view v-else class="unfollow">已关注</view>
    </slot>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'userInfo',
  computed: {
    ...mapGetters(['userInfo']),
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    isShow: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
      default: 'main',
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
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 48px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  text-align: center;
  font-weight: bold;
}
.big {
  width: 60px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  text-align: center;
}
.mini {
  width: 24px;
  height: 14px;
  line-height: 14px;
  font-size: 12px;
  text-align: center;
}
.follow {
  background: #fff100;
  color: #161413;
  border-radius: 50px;
  font-weight: bold;
}

.unfollow {
  background: #f1f1ed;
  color: #8e8c86;
  border-radius: 50px;
}
</style>
