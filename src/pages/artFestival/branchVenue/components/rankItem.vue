<template>
  <view class="rank-item flex flex-middle" :class="isMe && 'is-me'">
    <image v-if="isMe" class="icon-me-rank" src="@/static/artFestival/me-pm.png" mode="widthFix" />
    <view class="num">
      <image
        v-if="sort && sort < 4 && !isMe && !isSearch && tabName === 0"
        class="img"
        :src="require(`@/static/artFestival/${sort}.png`)"
        mode="widthFix"
      />
      <span v-else-if="!tabName">{{ sort || '--' }}</span>
    </view>
    <view class="avator">
      <Avator :imgUrl="info.authorHeadIcon" :vUrl="info.authorUserIdentityIcon" />
    </view>
    <view class="info">
      <view class="name ellipsis">{{ info.authorBbsNick }}</view>
      <view class="votes"
        >票数：<span>{{ info.votesNumber }}</span></view
      >
      <view v-if="info.teacherNick" class="teacher">导师：{{ info.teacherNick }}</view>
    </view>
    <view class="btns">
      <view class="btn look-detail" @click="lookDetail">查看作品</view>
      <view class="btn vote" @click="openVote(info)">投票</view>
    </view>
  </view>
</template>

<script>
import Avator from '@/components/avator/avator.vue';
import { mapGetters } from 'vuex';
export default {
  components: { Avator },
  props: {
    info: {
      type: Object,
      default: () => {},
    },
    isMe: {
      type: Boolean,
      default: false,
    },
    sort: {
      type: Number,
      default: null,
    },
    tabType: {
      type: String,
      default: '1',
    },
    isSearch: {
      type: Boolean,
      default: false,
    },
    isOpen: {
      type: Number,
      default: 0,
    },
    tabName: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    openVote(data) {
      switch (this.isOpen) {
        // 活动未开始
        case 0:
          this.$toast('提示：投票未开始');
          break;
        // 活动进行中
        case 2:
          if (!this.token) {
            this.$store.dispatch('toLogin');
            return;
          }
          this.$emit('openVote', { data });
          break;
        // 活动已结束
        case 1:
          this.$toast('提示：投票已结束');
          break;
        default:
          break;
      }
    },
    lookDetail() {
      uni.navigateTo({
        url: `/pages/artFestival/cultureDetails/details?type=${this.tabType}&contentId=${this.info.contentId}&authorUserId=${this.info.authorUserId}`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.rank-item {
  position: relative;
  padding: 0 12px;
  height: 88px;
  font-size: 12px;
  color: #47433a;
  .icon-me-rank {
    position: absolute;
    top: 0;
    left: 0;
    width: 53px;
  }
  .num {
    width: 28px;
    // color: #161413;
    font-size: 14px;
    font-weight: bold;
    .img {
      width: 20px;
    }
  }
  .avator {
    margin-right: 10px;
    width: 50px;
    height: 50px;
  }
  .info {
    margin-right: 17px;
    width: 112px;
    .name {
      margin-bottom: 2px;
      font-size: 14px;
      font-weight: bold;
    }
    .votes {
      margin-bottom: 2px;
      span {
        color: #f25959;
      }
    }
  }
  .btns {
    .btn {
      width: 66px;
      line-height: 26px;
      border: 1px solid #0f123a;
      border-radius: 14px;
      text-align: center;
    }
    .look-detail {
      margin-bottom: 10px;
      background: #fff100;
      color: #161413;
    }
    .vote {
      background: #ec5da4;
      color: #ffffff;
    }
  }
}
.is-me {
  background: #6449d3;
  color: #ffffff;
}
</style>
