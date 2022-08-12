import { mapGetters } from 'vuex'
// 该混入提供给非问题详情页
import { postComment, postReply, postCommentDel, getCommentList } from '@/api/detail';
import { CONTENT_MEDIA } from '@/constants/common';
import mixinCommon from './common';
const BTNSTYPE = {
  comment: ['img', 'audio', 'face', 'keyboard', 'at'],
  reply: ['face', 'keyboard', 'at'],
};
export default {
  mixins: [mixinCommon],
  data() {
    return {
      showBtn: true, // true：展示底部评论按钮/false：展示input输入组件
      isReply: false, // true：回复/false：评论
      isSeeMore: false, // 查看更多
      isClickSeeMore: false, // 是否点击查看更多
      replyData: {}, // 回复参数
      // 评论列表相关
      cList: [],
      createContentBtnsType: BTNSTYPE.comment,
      pageSize: 5,
    };
  },
  computed: {
    ...mapGetters(['isWeixin'])
  },
  created() {
    this.upCallback();
  },
  methods: {
    // 监听创建内容弹窗的状态
    createContentPopupChange({ show }) {
      if (!show) this.showBtn = true;
    },
    /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
    async upCallback(page = { num: 1, size: 5 }) {
      const pages = {
        pageIndex: page.num,
        pageSize: this.pageSize,
      };
      try {
        const { data } = await getCommentList({ contentId: this.id, ...pages });
        this.getComments(data, page);
      } catch (e) {
        this.mescroll && this.mescroll.endErr();
      }
    },
    // 获取评论列表
    getComments(data, page) {
      // 默认加载5条，点击加载更多获取10条每页
      if (data.pageSize === 5 && data.totalItem > 5) {
        this.isSeeMore = true;
      } else {
        this.isSeeMore = false;
      }
      let curPageLen = data.list.length;
      let totalPage = data.totalPage;
      if (page.num == 1) this.cList = [];
      let { list } = data;
      if (list.length > 3) list = list.splice(0, 3);
      this.cList = this.cList.concat(list);
      this.mescroll && this.mescroll.endByPage(curPageLen, totalPage);
    },
    seeMore() {
      // 点击查看更多
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
    // 点击评论
    onComment() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
    // 回复弹窗
    onReplyShow(index) {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
    // 点击回复
    onReply() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
    // 删除评论
    onDel() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
    // 评论/回复发送
    async onSbumit() {
    },
  },
};
