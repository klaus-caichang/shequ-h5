<template>
  <view class="text-view-rich">
    <MpHtml :content="content" @linktap="linktap" :container-style="containerStyle" />
  </view>
</template>

<script>
import MpHtml from '@/components/mp-html/index.vue'
import { LINK_TYPE, CREATE_TYPE } from '@/constants/common';
export default {
  props: {
    // 文本
    content: {
      type: [String],
      default: '',
    },
  },
  components: { MpHtml },
  data() {
    return {
      // 富文本容器样式
      containerStyle: 'display: inline',
    };
  },
  methods: {
    linktap(e) {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    },
  },
};
</script>

<style scoped>
.text-view-rich {
  display: inline;
  word-break: break-all;
}
</style>
