<template>
  <view class="answer-detail" :class="!isWeixin && 'pad-top'">
    <!-- app下载 -->
    <DownloadTab v-if="!isWeixin" />
    <!-- 骨架图 -->
    <loading-img :type="2" v-if="loadingFlag" />
    <template v-else>
      <view class="content-box">
        <!-- 问答标题 -->
        <view class="answer__title">{{ qTitle }}</view>
        <view class="line-half"></view>
        <!-- 答案详情 -->
        <view class="answer__content">
          <view class="info">
            <!-- 用户信息 -->
            <user-info :user-data="details" :contentId="id">
              <!-- <attention v-model="details.isFollow" :userId="details.authorUserId"></attention> -->
              <template v-slot:status>
                <text>{{ details.userHide === 0 ? '' : '仅自己可见' }}</text>
                <text>{{ details.auditStatus !== 0 ? '审核中' : '' }}</text>
              </template>
            </user-info>
          </view>
          <!-- 答案内容 -->
          <ContentDetail :data="details" :show-title="false"></ContentDetail>
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
        <view class="answer__bottom">
          <interactive
            v-if="interactiveInfo.contentId"
            :data="interactiveInfo"
            :statistic="details"
            @comment="onComment"
            @openApp="openPop"
          ></interactive>
        </view> -->
      </view>
      <!-- 此处为评论组件 -->
      <view class="answer__comment">
        <view v-for="(item, index) in cList" :key="item.commentId">
          <view class="line-half"></view>
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
import { getDetails } from '@/api/detail';
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
  name: 'AnswerDetail',
  components: { ContentDetail, SpecialBtns, LoadingImg, Interactive, Comment, DownloadTab, CommentBar, DownloadPop },
  mixins: [mixinDetail],
  data() {
    return {
      id: null, // 问答（答）id
      qId: null, // 问答（问）id
      qTitle: '', // 问答（问）标题
      upOption: {
        noMoreSize: 2,
        empty: {
          tip: '', // 提示
        },
      },
    };
  },
  onLoad({ questionId, id, subjectId }) {
    this.id = id;
    this.qId = questionId;
    this.subjectId = subjectId || null;
    this.init();
  },
  onPageScroll({ scrollTop }) {
    this.showTop = Math.floor(scrollTop) >= 80;
  },
  methods: {
    async init() {
      this.getDetails();
      this.getQustion();
    },
    // 获取问答（问）标题
    async getQustion() {
      const {
        data: { title },
      } = await getDetails({ id: this.qId });
      this.qTitle = title;
    },
  },
};
</script>
<style lang="scss" scoped>
.answer-detail {
  padding: 0 0 50px 0;
  background: #f8f8f8;
  min-height: 100vh;
  .bar-text {
    font-size: 17px;
    font-weight: bold;
  }
  .nav-img {
    width: 12px;
    height: 24px;
    margin: 0 14px 0 16px;
  }
  .bar-content {
    width: 218px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .content-box {
    background: #ffffff;
    margin-bottom: 15px;
  }
  .answer {
    &__bar {
      font-weight: bold;
      font-size: 17px;
    }
    &__scroll {
      height: 800px;
    }
    &__content {
      background: #fffef9;
      padding: 15px;
      .info {
        margin-bottom: 10px;
      }
    }
    &__title {
      padding: 15px;
      color: #161413;
      font-size: 14px;
    }
    &__bottom {
      padding: 5px 0;
    }
  }
  .detail-special-btns {
    margin: 0 0 12px 15px;
  }
}
.pad-top {
  padding-top: 44px;
}
</style>
