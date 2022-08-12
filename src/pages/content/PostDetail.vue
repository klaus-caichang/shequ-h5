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
          <!-- 帖子内容 -->
          <ContentDetail :data="details"></ContentDetail>
        </view>
        <!-- <view v-if="details.subjectId || details.nextContentId" class="detail-special-btns">
          <SpecialBtns
            :subject-id="details.subjectId"
            :next-id="details.nextContentId"
            :next-type="details.nextContentType"
            :cover="details.subjectCover"
          />
        </view>
        <view class="line-half"></view>
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
      <!-- 去评论 -->
      <CommentBar v-if="isWeixin" @openApp="openPop" />
    </template>
    <!-- 去下载弹窗 -->
    <DownloadPop ref="dowPop" />
  </view>
</template>
<script>
import { mapGetters } from 'vuex';
import mixinDetail from './mixins/index';
import ContentDetail from './components/content-detail';
import SpecialBtns from './components/special-btns.vue';
import LoadingImg from './components/loading-img';
import Interactive from './components/interactive/interactive.vue'
import Comment from './components/comment/comment.vue';
import DownloadTab from './components/download-tab/download-tab'
import CommentBar from './components/comment-bar/comment-bar.vue'
import DownloadPop from './components/download-pop/download-pop.vue'

export default {
  name: 'PostDetail',
  components: { ContentDetail, SpecialBtns, LoadingImg, Interactive, Comment, DownloadTab, CommentBar, DownloadPop },
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
  },
};
</script>
<style lang="scss" scoped>
.post-detail {
  padding: 0 0 50px 0;
  background: #f8f8f8;
  min-height: 100vh;
  .content-box {
    background: #fff;
    margin-bottom: 15px;
  }
  .post {
    &__header {
      padding: 10px 15px;
    }
    &__center {
      padding: 15px;
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
