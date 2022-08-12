<template>
  <view class="flex flex-middle">
    <view class="user-info flex flex-middle" @click="jumpPage">
      <view class="image">
        <avatar :info="data" :img-size="28"></avatar>
      </view>
      <view class="info__name">{{ data.bbsNick }}</view>
    </view>
    <view
      v-if="userInfo.uid !== data.authorUserId"
      class="info__follow"
      :class="{ 'info__un-follow': value === 0 }"
      @click="onFollow"
    >
      {{ value === 1 ? '已关注' : '关注' }}
    </view>
  </view>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ContentTop',
  props: {
    // isFollow-1：已关注 2：未关注
    data: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    jumpPage() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
    onFollow() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
  },
};
</script>
<style lang="scss" scoped>
.user-info {
  margin-right: 20px;
  .image {
    margin-right: 5px;
  }
}
.info {
  &__name {
    width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: bold;
    font-size: 14px;
  }
  &__follow {
    width: 48px;
    height: 24px;
    border: 1px solid #161413;
    border-radius: 13px;
    line-height: 24px;
    text-align: center;
    font-size: 12px;
  }
  &__un-follow {
    color: #ffffff;
    background: #161413;
  }
}
</style>
