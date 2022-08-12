<template>
  <view class="comment-reply" @click.stop="toComment">
    <view class="txt ellipsis__line-2" v-for="item in filterList" :key="item.commentId">
      <text class="nickname">{{ item.bbsNick }}{{ item.replyUserBbsNick ? '' : '：' }}</text>
      <template v-if="item.replyUserBbsNick">
        <text style="margin-right: 4px">回复</text>
        <text class="nickname">{{ item.replyUserBbsNick }}：</text>
      </template>
      <text-view :dt="item.replyContent" :at-user-list="item.atUserList" :font-size="12"></text-view>
    </view>
    <view class="conversation" v-show="replyList.length > 2"
      >查看对话（
      <text>{{ replyCount - 2 }}</text>
      ）<img class="img" :src="$ossmp('icon/right.png')" />
    </view>
  </view>
</template>

<script>
import TextView from '../text-view/text-view.vue'

export default {
  name: 'comment-reply',
  components: { TextView },
  props: {
    replyCount: {
      type: Number,
      default: 0,
    },
    replyList: {
      type: Array,
      default() {
        return [];
      },
    },
    isSpecialComment: {
      type: String,
      default: '0',
    },
    contentId: {
      type: String,
      default: '',
    },
  },
  computed: {
    filterList() {
      const len = this.replyList.length;
      const max = 2;
      if (len > max) {
        return this.replyList.slice(0, 2);
      }
      return this.replyList;
    },
  },
  methods: {
    toComment() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-reply {
  font-size: 24rpx;
  background: #f8f8f8;
  border-radius: 10px;
  padding: 10px 10px;

  .txt {
    font-size: 24rpx;
    line-height: 18px;
    color: #47433a;
    line-height: 18px;
    .nickname {
      color: #4e87c6;
    }
  }

  .conversation {
    font-size: 24rpx;
    color: #8e8c86;
    font-weight: bold;
    .img {
      width: 12px;
      height: 12px;
      vertical-align: middle;
      transform: translateY(-1px);
    }
  }
}
</style>
