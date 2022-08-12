<template>
  <view class="userInfo flex flex-middle flex-between">
    <view class="flex flex-middle" @click.stop="toPersonal">
      <view class="userInfo-avatar">
        <avatar :info="userData"></avatar>
      </view>
      <view>
        <view class="name">
          <text :class="!bigFont && 'small'" :style="isCreatorPrivilege ? 'color: #835E18;' : ''">{{
            userData.bbsNick || ''
          }}</text>
          <image class="level" :src="userData.levelIcon" v-if="userData.levelIcon" />
          <image class="medal" :src="userData.medalIcon" v-if="userData.medalIcon" />
        </view>
        <view class="flex flex-middle time">
          <text :class="!bigFont && 'small-time'">{{ userData.gmtCreate | parseCreate }}</text>
          <view class="status" :class="!bigFont && 'small-time'">
            <slot name="status" />
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
import { mapGetters } from 'vuex';
import Avatar from '../avatar/avatar.vue'

export default {
  name: 'userInfo',
  components: { Avatar },
  props: {
    userData: {
      type: Object,
      default() {
        return {};
      },
    },
    // 是否触发点击事件
    isClick: {
      type: Boolean,
      default: true,
    },
    // 是否为大型字号
    bigFont: {
      type: Boolean,
      default: true,
    },
    // 用户信息组件所在内容的id
    contentId: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters(['userInfo']),
    userId() {
      const uid = this.userData.userId || this.userData.authorUserId;
      return uid;
    },
    headerImg() {
      if (this.userData.bbsIcon) {
        return this.userData.bbsIcon;
      } else {
        return this.$oss('challenge/medal-more.png');
      }
    },
    // 创作者特权 昵称变色
    isCreatorPrivilege() {
      return this.userData.creatorIdentityLevelVO && this.userData.creatorIdentityLevelVO.creatorPrivilege;
    },
  },
  data() {
    return {};
  },
  methods: {
    toPersonal() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
  },
};
</script>

<style lang="scss" scoped>
.userInfo {
  .userInfo-avatar {
    margin-right: 5px;
  }

  .name {
    font-size: 14px;
    color: #161413;
    display: flex;
    align-items: center;

    .level {
      width: 33px;
      height: 14px;
      margin: 0 2px;
    }

    .medal {
      width: 18px;
      height: 18px;
    }
  }

  .small {
    font-size: 12px;
  }

  .time {
    font-size: 12px;
    color: #8e8c86;
  }

  .small-time {
    font-size: 10px;
  }

  .status {
    margin-left: 5px;
  }
}
</style>
