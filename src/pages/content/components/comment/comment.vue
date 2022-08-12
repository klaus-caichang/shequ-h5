<template>
  <view class="comment" @click.stop="$emit('comment')">
    <user-info class="user" :user-data="list" :big-font="false" :content-id="contentId">
      <button
        class="button"
        @click="onclick"
      >
        <img
          class="img"
          src="@/static/img/flowInteract/thumbs.png"
        />点赞
      </button>
      <template v-slot:status>
        <text>{{ list.auditStatus !== 0 ? '审核中' : '' }}</text>
      </template>
    </user-info>
    <view class="content">
      <!-- 评论组件-->
      <view class="text-view">
        <text-view :dt="list.commentContent" :at-user-list="list.atUserList" />
      </view>

      <!-- 图片或语音插槽-->
      <slot />
      <view v-if="list.commentMedia === 4 || list.commentMedia === 2" class="media-box">
        <sound-playing v-if="list.commentMedia === 4" :audio="list.mediaList[0]" :statistic-data="list"></sound-playing>
        <image-view v-else-if="list.commentMedia === 2" :data="list.mediaList" :statistic-data="list" />
      </view>
      <!-- 回复组件-->
      <comment-reply
        v-if="list.replyList.length"
        :is-special-comment="apiData.isSpecialComment ? '1' : '0'"
        :reply-list="list.replyList"
        :reply-count="list.replyCount"
        :content-id="contentId"
      />
    </view>
  </view>
</template>

<script>
import TextView from '../text-view/text-view.vue'
import CommentReply from '../comment-reply/comment-reply.vue'
export default {
  name: 'Comment',
  components: { TextView, CommentReply },
  props: {
    list: {
      type: Object,
      default() {
        return {};
      },
    },
    num: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: null,
    },
    contentId: {
      type: String,
      default: '',
    },
  },
  computed: {
    apiData() {
      return {
        isAnswer: getCurrentPages()
          .pop()
          .route.includes('answer'),
        isSpecialComment: getCurrentPages()
          .pop()
          .route.includes('subpkgDetail/special'),
        contentId: this.list.commentId,
      };
    },
    selected: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    praiseNum: {
      get() {
        return this.num;
      },
      set(val) {
        this.$emit('update:num', val);
      },
    },
  },
  methods: {
    onclick() {}
  }
};
</script>

<style lang="scss" scoped>
.comment {
  background: #ffffff;
  padding: 15px;

  .user {
    margin-bottom: 15px;
  }

  .content {
    margin-left: 32px;
    .text-view {
      margin: 10px 0;
    }
  }

  .txt {
    font-size: 28rpx;
    color: #1f1c1a;
  }
  .media-box {
    margin-bottom: 10px;
  }
}
.doDetails {
  text-align: center;
  .text {
    width: 1px;
    height: 16px;
    background: #f1f1ed;
  }
}
.button {
  font-size: 12px;
  display: inline-block;
  height: 16px;
  line-height: 16px;
  width: 50px;
  text-align: center;
  padding: 0;
  margin: 0;
  font-weight: 400;
  // color: #47433a;
  // background: white;
  .img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 4px;
  }
  &::after {
    border: none;
  }
}
</style>
