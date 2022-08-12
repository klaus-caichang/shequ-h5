<template>
  <view
    class="post post-item"
    :class="{ pt26: showRecommendIcon, 'margin-center': marginCenter, 'border-radius': borderRadius }"
    @click="toDetail"
  >
    <image v-if="showRecommendIcon" class="recommend-image" :src="item.recommendIcon"></image>
    <!--  贴子   -->
    <card
      v-if="item.contentType === CREATE_TYPE.POST"
      :item="item"
      :postType="postType"
      :show-more-icon="showMoreIcon"
      @popManage="popManage"
    ></card>
    <!--  动态   -->
    <mood
      v-if="item.contentType === CREATE_TYPE.MOOD"
      :item="item"
      :postType="postType"
      :show-more-icon="showMoreIcon"
      @popManage="popManage"
    ></mood>
    <!--  问答（问）   -->
    <question
      v-if="item.contentType === CREATE_TYPE.QUSTION"
      :item="item"
      :postType="postType"
      :show-more-icon="showMoreIcon"
      @popManage="popManage"
    ></question>
    <!--  问答（答）   -->
    <answer
      v-if="item.contentType === CREATE_TYPE.ANSWER"
      :item="item"
      :postType="postType"
      :show-more-icon="showMoreIcon"
      @popManage="popManage"
    ></answer>
    <!--  文章   -->
    <article-post
      v-if="item.contentType === CREATE_TYPE.ARTICLE"
      :item="item"
      :postType="postType"
      :show-more-icon="showMoreIcon"
      @popManage="popManage"
    ></article-post>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import card from './components/card-post';
import mood from './components/mood-post';
import question from './components/question-post';
import answer from './components/answer-post';
import ArticlePost from './components/article-post';
import { CREATE_TYPE, CONTENT_MEDIA } from '@/constants/common';

//内容类型 1-贴子，2-动态，3-问答(问),4-问答(答),5-文章
const contentType = ['PostDetail', 'MoodDetail', 'QuestionDetail', 'AnswerDetail', 'ArticleDetail'];
export default {
  name: 'post',
  components: { answer, question, card, mood, ArticlePost },
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    // 帖子类型 circle：圈子 topic：话题 circleDetail:圈子详情 search:搜索页面 recommend:详情页推荐位
    postType: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: -1,
    },
    showMoreIcon: {
      type: Boolean,
      default: false,
    },
    // 居中两边留白
    marginCenter: {
      type: Boolean,
      default: true,
    },
    // 圆角
    borderRadius: {
      type: Boolean,
      default: true,
    },
    // 推荐算法recTraceId （仅推荐算法推荐的数据此字段才有值）
    recTraceId: {
      type: String,
      default: null,
    },
    // 推荐详情页类型
    detailType: {
      type: Number,
      default: null,
    },
    // 问题ID
    questionId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return { CREATE_TYPE };
  },
  computed: {
    ...mapGetters(['userInfo']),
    // 内容展示推荐图标
    showRecommendIcon() {
      const { recommend, recommendIcon } = this.item;
      return recommend === 1 && recommendIcon;
    },
  },
  methods: {
    toDetail() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
    popManage() {
      this.$emit('popManage', this.item);
    },
  },
};
</script>

<style lang="scss" scoped>
.pt26 {
  padding-top: 26px !important;
}
.margin-center {
  margin: 0 15px;
}
.border-radius {
  border-radius: 15px;
}
.post {
  background: #ffffff;
  padding: 15px;
  position: relative;
  .recommend-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 35px;
    height: 20px;
  }
}
</style>
