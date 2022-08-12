// 详情页公用混入
// 分享/监听登录事件/用户详情/内容详情
import { CONTENT_MEDIA, OSSURL, EVENTBUS, EXAMINE_STATUS } from '@/constants/common';
import { getDetails, getContentIdForDetailRecommend, getAnswerIdForDetailRecommend } from '@/api/detail';

export default {
  data() {
    return {
      details: {}, // 帖子/问答/动态-内容详情
      recommendDetail: null, // 详情页 推荐位帖子/问答/动态-内容详情
      recommendType: 0, // 类型：0-下一条， 1-上一条 ，3-大数据推荐
      recTraceId: '',  // 推荐算法recTraceId （仅推荐算法推荐的数据此字段才有值）
      recommendMap: {
        0: '下一条',
        1: '上一条'
      },
      recommendContentId: '',
      showTop: false,
      stopShare: false,
      loadingFlag: true,

    };
  },
  computed: {
    // 点赞信息
    interactiveInfo() {
      const { contentId, praiseCount, isPraise, commentCount, title, content } = this.details;
      return {
        contentId,
        praiseCount,
        isPraise,
        commentCount,
        title,
        content,
        isAnswer: getCurrentPages()
          .pop()
          .route.includes('answer'),
      };
    },
  },
  methods: {
    openPop() {
      this.$refs.dowPop.open();
    },
    async downCallback() {
      await this.init();
      if (this.mescroll && this.mescroll.optUp && this.mescroll.optUp.use) {
        this.mescroll.resetUpScroll();
      } else {
        setTimeout(() => {
          this.mescroll && this.mescroll.endSuccess();
        }, 500);
      }
    },
    // 获取内容
    async getDetails() {
      const params = { id: this.id };
      Object.assign(params, this.subjectId ? { subjectId: this.subjectId } : {});
      const { data } = await getDetails(params);
      // 判断内容是否设置了隐藏
      if (data.userHide && data.authorUserId !== this.$store.getters.userInfo.uid) {
        this.$toast({
          title: '该内容被作者设置为隐藏',
          duration: 2000,
        });
        setTimeout(() => {
          this.$navigateBack();
        }, 2000);
      } else if (data.isDeleted) {
        this.$toast({
          title: '该内容已删除',
          duration: 2000,
        });
        setTimeout(() => {
          this.$navigateBack();
        }, 2000);
      } else {
        if (data.auditStatus !== EXAMINE_STATUS.PASSED) {
          // 审核状态隐藏分享按钮
          uni.hideShareMenu();
          this.stopShare = true;
        }
        this.details = data;
      }
      try {
        if (data.contentType === 4) {
          // 获取答案详情页推荐回答ID
          const paramsData = { id: this.qId, answerId: this.id };
          const { data } = await getAnswerIdForDetailRecommend(paramsData);
          this.recommendContentId = data && data.answerId;
          this.recommendType = data && data.type;
        } else {
          // 获取内容详情页推荐内容ID
          const { data } = await getContentIdForDetailRecommend(params);
          this.recommendContentId = data && data.contentId;
          this.recommendType = data && data.type;
          this.recTraceId = data && data.recTraceId;
        }
        if (this.recommendContentId) {
          const { data: recommendDetail } = await getDetails({ id: this.recommendContentId });
          this.recommendDetail = recommendDetail;
        }
      } catch (error) {
        console.log('error', error);
      }
      this.loadingFlag = false;
    },
  },
};
