<template>
  <view class="reply flex flex-top">
    <view class="avatar">
      <avatar :info="replyData" size="mini" :img-size="22"></avatar>
    </view>
    <view class="flex-1 flex">
      <image class="bubble" :src="$oss('icon/bubble.png')" />
      <view class="comment flex-1">
        <view class="name flex flex-middle">
          <text>{{ replyData.bbsNick || '' }}</text>
          <image class="level" :src="replyData.levelIcon" v-if="replyData.levelIcon" />
          <image class="medal" :src="replyData.medalIcon" v-if="replyData.levelIcon" />
        </view>
        <view class="content ellipsis__line-2">
          <text-view :dt="replyData.commentContent || replyData.content || ''" :at-user-list="replyData.atUserList" />
          <media-icon
            class="mIcon"
            v-if="replyData.medias"
            :type="replyData.commentMedia"
            :medias="replyData.medias"
            :statisticData="newStatisticData"
          ></media-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'reply',
  components: {},
  props: {
    replyData: {
      type: Object,
      default() {
        return {};
      },
    },
    statisticData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    newStatisticData() {
      return {
        ...this.statisticData,
        medias: this.replyData.medias,
      };
    },
    // 创作者特权 昵称变色
    isCreatorPrivilege() {
      return this.replyData.creatorIdentityLevelVO && this.replyData.creatorIdentityLevelVO.creatorPrivilege;
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.reply {
  .avatar {
    margin-top: 4px;
    margin-right: -10px;
  }

  .bubble {
    width: 13px;
    height: 11px;
  }

  .comment {
    opacity: 1;
    background: #f8f8f8;
    border-radius: 0 10px 10px 10px;
    padding: 12px;

    .name {
      font-size: 12px;
      color: #4e87c6;
      margin-bottom: 8px;
      //   > .image {
      //     vertical-align: middle;
      //   }
      .level {
        width: 29px;
        height: 12px;
        margin: 0 2px;
      }
      .medal {
        width: 18px;
        height: 18px;
      }
    }

    .txt {
      align-content: baseline;
      font-size: 14px;
      color: #47433a;
    }
    .mIcon {
      position: relative;
      top: 4px;
    }
  }
}
</style>
