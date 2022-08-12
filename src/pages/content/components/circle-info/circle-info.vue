<template>
  <view class="userInfo flex flex-middle flex-between">
    <view class="flex flex-middle" @click.stop="toDetails">
      <image
        class="avatar"
        :class="{ bigImg: bigImg }"
        mode="aspectFill"
        :src="userData.circleImg | imgCompress(`/resize,h_142,w_142,m_mfit`)"
      />
      <view class="flex-1">
        <view class="name">{{ userData.circleName }}</view>
        <view class="flex flex-middle num">
          <text class="num_txt">{{ userData.circleUserNumber || 0 }}人已加入</text>
          <view class="flex flex-middle">
            <view style="height: 8px;width: 1px;background-color: #f1f1ed"></view>
            <view class="num_hot">{{ userData.circleHotNumber || 0 }}热度</view>
          </view>
        </view>
      </view>
    </view>
    <view class="right">
      <slot />
    </view>
  </view>
</template>

<script>
export default {
  name: 'circleInfo',
  props: {
    userData: {
      type: Object,
      default() {
        return {};
      },
    },
    bigImg: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toDetails() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
  },
};
</script>

<style lang="scss" scoped>
.userInfo {
  background-color: white;

  .avatar {
    width: 28px;
    height: 28px;
    border-radius: 5px;
    margin-right: 5px;
  }
  .bigImg {
    width: 40px;
    height: 40px;
  }

  .name {
    font-size: 14px;
    color: #161413;
    margin-bottom: 5px;
  }

  .num {
    font-size: 10px;
    color: #8e8c86;

    &_txt {
      padding-right: 5px;
    }

    &_hot {
      padding-left: 5px;
    }
  }
}
</style>
