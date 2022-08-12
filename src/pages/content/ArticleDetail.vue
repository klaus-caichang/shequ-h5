<template>
  <view class="post-detail" :class="!isWeixin && 'pad-top'">
    <!-- app下载 -->
    <DownloadTab v-if="!isWeixin" />
    <!-- 骨架图 -->
    <loading-img v-if="loadingFlag" />
    <template v-else>
      <view class="content-box">
        <!-- 帖子详情 -->
        <view class="post__header">
          <!-- 用户信息 -->
          <user-info :user-data="details" :contentId="id">
            <!-- <attention :userId="details.authorUserId" v-model="details.isFollow"></attention> -->
            <template v-slot:status>
              <text>{{ details.userHide === 0 ? '' : '仅自己可见' }}</text>
            </template>
          </user-info>
        </view>
        <view class="line-half"></view>
        <view class="post__center">
          <view class="post__center__title">{{ details.title }}</view>
          <view class="subtitle" v-if="details.subtitle">{{ details.subtitle }}</view>
          <!-- <view class="post__center__summary"
            >这是副标题副标题副标题这是副标题副标题副标题这是副标题副标题副标题这是副标题副标题副标题这是副标题副标题副标题这是副标题副标题副标题这是副标题副标题副标题</view
          > -->
          <!-- 帖子内容 -->
          <TextViewRich :content="details.richtext" />
        </view>
        <!-- <view v-if="details.subjectId || details.nextContentId" class="detail-special-btns">
          <SpecialBtns
            :subject-id="details.subjectId"
            :next-id="details.nextContentId"
            :next-type="details.nextContentType"
            :cover="details.subjectCover"
          />
        </view> -->
        <!-- <view class="line-half"></view>
        <view class="post__bottom">
          <interactive :data="interactiveInfo" :statistic="details" @comment="onComment" @openApp="openPop"></interactive>
        </view> -->
      </view>
      <!-- 评论组件 -->
      <view class="post__comment">
        <view v-for="(item, index) in cList" :key="item.commentId">
          <view class="line-half" v-if="index !== 0"></view>
          <comment
            :content-id="id"
            @comment="onReplyShow(index)"
            :list="item"
            :num.sync="item.praiseCount"
            v-model="item.isPraise"
          ></comment>
        </view>
      </view>
      <!-- 展开  -->
      <!-- <div class="see-more-count flex flex-center" v-if="isSeeMore" @click="seeMore">
        <div class="see-more">查看更多</div>
        <div class="see-more-img"><img class="img" src="../../static/img/message/see-more.png" alt="" /></div>
      </div> -->
    </template>
    <!-- 去评论 -->
    <CommentBar v-if="isWeixin" @openApp="openPop" />
    <!-- 去下载弹窗 -->
    <DownloadPop ref="dowPop" />
  </view>
</template>
<script>
import { mapGetters } from 'vuex';
import mixinDetail from './mixins/index';
import TextViewRich from './components/text-view-rich/index.vue';
import SpecialBtns from './components/special-btns.vue';
import LoadingImg from './components/loading-img';
import Interactive from './components/interactive/interactive.vue'
import Comment from './components/comment/comment.vue';
import DownloadTab from './components/download-tab/download-tab'
import CommentBar from './components/comment-bar/comment-bar.vue'
import DownloadPop from './components/download-pop/download-pop.vue'
export default {
  name: 'PostDetail',
  components: { TextViewRich, SpecialBtns, LoadingImg, Interactive, Comment, DownloadTab, CommentBar, DownloadPop },
  mixins: [mixinDetail],
  computed: {
    ...mapGetters(['safeAreaBottom']),
    footHeight() {
      return parseInt(this.safeAreaBottom) * 2 + 100 + 'rpx';
    },
  },
  data() {
    return {
      id: null,
      upOption: {
        noMoreSize: 2,
        empty: {
          tip: '', // 提示
        },
      },
    };
  },
  onLoad({ id, subjectId }) {
    this.id = id;
    this.subjectId = subjectId || null;
    this.init();
  },
  onPageScroll({ scrollTop }) {
    this.showTop = Math.floor(scrollTop) >= 50;
  },
  methods: {
    async init() {
      this.getDetails();
    },
    getShareParams() {
      return {
        title: this.details.title.slice(0, 25),
        imageUrl: this.details.coverImage,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.post-detail {
  padding: 0 0 50px 0;
  background: #f8f8f8;
  min-height: 100vh;
  line-height: 1.6;
  .content-box {
    background: #fff;
    margin-bottom: 15px;
    .subtitle {
      width: 345px;
      color: #8e8c86;
      font-size: 12px;
      padding: 8px 8px;
      line-height: 16px;
      opacity: 1;
      background: #f8f8f8;
      border-radius: 5px;
      text-align: left;
      margin: 10px 0 15px 0;
    }
  }
  .post {
    &__header {
      padding: 10px 15px;
    }
    &__center {
      padding: 15px;
      &__title {
        font-size: 17px;
        line-height: 27px;
        font-weight: 600;
      }
      &__summary {
        font-size: 14px;
        color: #8e8c86;
        background-color: #f8f8f8;
        // line-height: 27px;
        padding: 9px 3px;
        text-align: center;
        border-radius: 6px;
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
    &__bottom {
      padding: 5px 0;
    }
  }
  .bar-text {
    font-size: 17px;
    font-weight: bold;
  }
  .detail-special-btns {
    margin: 0 0 12px 15px;
  }
}
.pad-top {
  padding-top: 44px;
}
</style>
