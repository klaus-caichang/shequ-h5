<template>
  <view class="text-view">
    <mp-html :content="clampContent" @linktap="linktap" :selectable="selectable" :container-style="containerStyle" />
  </view>
</template>

<script>
const TOPIC = 'topic'; // 话题类型
const AT = 'at'; // @用户类型
export default {
  props: {
    // 文本
    dt: {
      type: [String],
      default: '',
    },
    // 话题列表
    talkTitleList: {
      type: Array,
      default() {
        return [];
      },
    },
    // @用户列表
    atUserList: {
      type: Array,
      default: () => [],
    },
    // 埋点数据
    statisticData: {
      type: Object,
      default: () => ({}),
    },
    type: {
      // 帖子类型 circle：圈子 topic：话题
      type: String,
      default: '',
    },
    // 字体颜色
    textColor: {
      type: String,
      default: '#161413',
    },
    // 字体大小, 单位px
    fontSize: {
      type: Number,
      default: 14,
    },
  },
  data() {
    return {
      // 富文本容器样式
      containerStyle: 'display: inline',
      selectable: false,
      htmlContent: '',
    };
  },
  created() {
    const route = getCurrentPages().pop().route;
    // 判断是详情页开启文本复制
    if (route.includes('subpkgDetail/content')) {
      this.selectable = 'force';
    }
  },
  computed: {
    clampContent() {
      return `<div style="display:inline; white-space: pre-wrap;word-break:break-all; color:${this.textColor};font-size:${this.fontSize}px;">${this.htmlContent}</div>`;
    },
  },
  watch: {
    dt: {
      immediate: true,
      handler(val) {
        this.htmlContent = val || '';
      },
    },
    atUserList: {
      immediate: true,
      handler(val) {
        if (val && val.length > 0) {
          // @高亮
          val.forEach(item => {
            if (item.userId !== undefined) this.setContent({ userId: item.userId, type: AT }, `@${item.userName}`);
          });
        }
      },
    },
    talkTitleList: {
      immediate: true,
      handler(val) {
        if (val && val.length > 0) {
          // 话题高亮
          this.talkTitleList.forEach(item => {
            if (item.id !== undefined) this.setContent({ id: item.id, type: TOPIC }, `#${item.name}#`);
          });
        }
      },
    },
  },
  methods: {
    setContent(obj, name) {
      this.htmlContent = this.htmlContent
        .replace(name, `<a href="javascript:void(0)" data=${JSON.stringify(obj)}>${name}</a>`)
        .replace(/\n|\r/g, '<br>');
    },
    jumpPage() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
    linktap(e) {
      this.jumpPage(JSON.parse(e.data));
    },
  },
};
</script>

<style scoped>
.text-view {
  display: inline;
}
</style>
