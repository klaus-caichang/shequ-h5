<template>
  <view class="question-detail" :class="!isWeixin && 'pad-top'">
    <!-- app下载 -->
    <DownloadTab v-if="!isWeixin" />
    <!-- 骨架图 -->
    <loading-img v-if="loadingFlag" />
    <template v-else>
      <view class="question__detail">
        <view class="detail-header">
          <!-- 用户信息 -->
          <user-info :user-data="details" :contentId="id">
            <!-- <attention :userId="details.authorUserId" v-model="details.isFollow"></attention> -->
            <template v-slot:status>
              <text>{{ details.userHide === 0 ? '' : '仅自己可见' }}</text>
            </template>
          </user-info>
        </view>
        <view class="line-half"></view>
        <view class="detail-center">
          <!-- 问答内容 -->
          <ContentDetail :data="details"></ContentDetail>
          <!-- <view class="get" v-if="details.circleId">
            <get-bt :data="interactiveInfo" @click="$store.commit(SET_GET_TITLE, interactiveInfo.content)"></get-bt>
          </view> -->
        </view>
        <!-- <view class="detail-opration-line pl15 pr15 flex flex-middle flex-between">
          <SpecialBtns
            v-if="details.subjectId || details.nextContentId"
            :subject-id="details.subjectId"
            :next-id="details.nextContentId"
            :next-type="details.nextContentType"
            :cover="details.subjectCover"
          />
        </view>
        <view class="detail-bottom">
          <answer :num="details.answerCount"></answer>
        </view> -->
      </view>
      <!-- 评论-答案 -->
      <view class="question__comment">
        <view :id="idContent" v-for="item in list" :key="item.contentId" @click="toAnswerDetail(item)">
          <view class="line-half"></view>
          <view class="comment-item">
            <user-info :user-data="item" :contentId="id">
              <template v-slot:status>
                <text>{{ item.auditStatus !== 0 ? '审核中' : '' }}</text>
              </template>
              <view class="flex flex-middle">
                <image v-show="item.isTop" class="tui" :src="$ossmp('icon/tui.png')" />
                <attention
                  v-show="item.isFollow === 0"
                  v-model="item.isFollow"
                  :userId="item.authorUserId"
                ></attention>
              </view>
            </user-info>
            <view class="comment-center">
              <ContentDetail :data="item" :show-title="false" :show-circle="false"></ContentDetail>
            </view>
            <!-- <do-post :data="item" @comment="toAnswerDetail(item)"></do-post> -->
            <view class="comment-reply" v-if="arrayNotEmpty(item.comments)">
              <reply :reply-data="item.comments[0]"></reply>
            </view>
          </view>
        </view>
      </view>
      <!-- 展开  -->
      <!-- <div class="see-more-count flex flex-center" v-if="isSeeMore" @click="seeMore">
        <div class="see-more">查看更多</div>
        <div class="see-more-img"><img class="img" src="../../static/img/message/see-more.png" alt="" /></div>
      </div> -->
      <!-- 去评论 -->
      <CommentBar v-if="isWeixin" @openApp="openPop" />
      <!-- 去下载弹窗 -->
      <DownloadPop ref="dowPop" />
    </template>
  </view>
</template>
<script>
import { mapGetters } from 'vuex';
import { getAnserList } from '@/api/detail';
import mixinDetail from './mixins/index';
import ContentDetail from './components/content-detail';
import SpecialBtns from './components/special-btns.vue';
// import { SET_GET_TITLE } from '@/store/types';
import Answer from './components/answer/answer.vue';
import Reply from './components/reply/reply.vue'
import LoadingImg from './components/loading-img';
import Interactive from './components/interactive/interactive.vue'
import Comment from './components/comment/comment.vue';
import DownloadTab from './components/download-tab/download-tab'
import CommentBar from './components/comment-bar/comment-bar.vue'
import DownloadPop from './components/download-pop/download-pop.vue'

export default {
  name: 'QuestionDetail',
  components: { ContentDetail, SpecialBtns, LoadingImg, Interactive, Comment, DownloadTab, CommentBar, Answer, Reply, DownloadPop },
  mixins: [mixinDetail],
  computed: {
    ...mapGetters(['safeAreaBottom']),
    footHeight() {
      return parseInt(this.safeAreaBottom) * 2 + 100 + 'rpx';
    },
  },
  data() {
    return {
      // SET_GET_TITLE,
      // 问题列表相关项
      id: null,
      list: [],
      isSeeMore: false, // 查看更多
      upOption: {
        noMoreSize: 2,
        empty: {
          tip: '', // 提示
        },
      },
      pageSize: 5,
    };
  },
  onLoad({ id, recTraceId, subjectId }) {
    this.id = id;
    this.subjectId = subjectId || null;
    // 当前内容为推荐内容->recTraceId推荐算法ID
    this.recTraceIdQuery = recTraceId ? `&recTraceId=${recTraceId}` : '';
    this.init();
  },
  methods: {
    init() {
      this.getDetails();
    },
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    async upCallback(page = { num: 1, size: 10 }) {
      const pages = {
        pageIndex: page.num,
        pageSize: this.pageSize,
      };
      try {
        const { data } = await getAnserList({ id: this.id, ...pages });
        this.getAnserList(data, page);
      } catch (e) {
        this.mescroll && this.mescroll.endErr();
      }
    },
    // 获取答案列表
    async getAnserList(data, page) {
      // 默认加载5条，点击加载更多获取10条每页
      if (data.pageSize === 5 && data.totalItem > 5) {
        this.isSeeMore = true;
        this.pageSize = 10;
      } else {
        this.isSeeMore = false;
      }
      let curPageLen = data.list && data.list.length;
      let totalPage = data.totalPage;
      if (page.num == 1) this.list = [];
      this.list = this.list.concat(data.list);
      this.mescroll && this.mescroll.endByPage(curPageLen, totalPage);
    },
    seeMore() {
      // this.upCallback();
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
    arrayNotEmpty(val) {
      return Array.isArray(val) && val.length;
    },
    // 跳转答案详情
    toAnswerDetail(item) {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
  },
};
</script>
<style lang="scss" scoped>
.question-detail {
  padding: 0 0 50px 0;
  background: #f8f8f8;
  min-height: 100vh;
  .question {
    &__detail {
      background: #ffffff;
    }
  }
  .detail-header {
    padding: 10px 15px;
  }
  .detail-center {
    padding: 15px;
    position: relative;
  }
  .detail-bottom {
    padding: 0 15px 15px 15px;
  }
  .comment-item {
    padding: 15px 30px;
    background: #fffef9;
    .tui {
      width: 43px;
      height: 36px;
      margin-right: 20px;
    }
  }
  .comment-center {
    margin: 10px 0 10px 0;
  }
  .comment-reply {
    margin-top: 15px;
  }
  .bar-text {
    font-size: 17px;
    font-weight: bold;
  }
  .like {
    .cWight {
      width: 50px;
      margin-left: 42px;
    }
  }
  .get {
    position: absolute;
    bottom: 20px;
    right: 15px;
  }
  .isGet {
    overflow: hidden;
    text-align: right;
  }
  .pl15 {
    padding-left: 15px;
  }
  .pr15 {
    padding-right: 15px;
  }
  .detail-opration-line {
    width: 100%;
    padding-bottom: 10px;
  }
}
.pad-top {
  padding-top: 44px;
}
</style>
