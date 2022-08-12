<template>
  <view class="text-view">
    <MpHtml :content="clampContent" :container-style="containerStyle" />
  </view>
</template>

<script>
import MpHtml from '../mp-html';
export default {
  components: { MpHtml },
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
  },
  data() {
    return {
      // 富文本容器样式
      containerStyle: 'display: inline',
      selectable: false,
      htmlContent: '',
    };
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
            if (item.userId !== undefined) this.setContent({ userId: item.userId }, `@${item.userName}`);
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
            if (item.talkTitleId !== undefined) this.setContent({ id: item.talkTitleId }, `#${item.talkTitleName}#`);
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
  },
};
</script>

<style scoped>
.text-view {
  display: inline;
}
</style>
