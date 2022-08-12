<template>
  <view id="_root" :class="(selectable ? '_select ' : '') + '_root'" :style="containerStyle">
    <template v-if="nodes.length > 0">
      <Node :childs="nodes" />
    </template>
    <slot v-else />
  </view>
</template>

<script>
/**
 * mp-html v2.1.1
 * @description 富文本组件
 * @tutorial https://github.com/jin-yufeng/mp-html
 * @property {String} container-style 容器的样式
 * @property {String} content 用于渲染的 html 字符串
 * @property {Boolean} preview-img 是否允许图片被点击时自动预览
 */
import parser from './parser';
import Node from './components/node';
export default {
  name: 'mp-html',
  components: {
    Node,
  },
  data() {
    return {
      nodes: [],
      imgList: [],
    };
  },
  props: {
    containerStyle: {
      type: String,
      default: '',
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    content: String,
    tagStyle: String,
  },
  watch: {
    content: {
      handler(val) {
        this.setContent(val);
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * @description 设置内容
     * @param {String} content html 内容
     */
    setContent(content) {
      var nodes = new parser(this).parse(content);
      this.$set(this, 'nodes', nodes);
    },
  },
};
</script>

<style>
/* #ifndef APP-PLUS-NVUE */
/* 根节点样式 */
._root {
  padding: 1px 0;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  font-size: 14px;
}

/* 长按复制 */
._select {
  user-select: text;
}
/* #endif */
</style>
