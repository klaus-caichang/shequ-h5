<template>
  <view :id="attrs.id" :class="'_' + name + ' ' + attrs.class" :style="attrs.style">
    <block v-for="(n, key) in childs" :key="key">
      <!-- 显示图片 -->
      <view v-if="n.name == 'img'" class="_node-img">
        <image
          :id="n.attrs.id"
          lazy-load
          :class="'_img ' + n.attrs.class"
          :style="{ height: getImgHeight(key) }"
          :src="imgCompress(n.attrs.src)"
        />
      </view>
      <!-- 文本 -->
      <block style="display:inline" v-else-if="n.text" :user-select="n.us" decode>{{ n.text }}</block>
      <text v-else-if="n.name == 'br'">\n</text>
      <!-- 链接 -->
      <view
        v-else-if="n.name == 'a'"
        :id="n.attrs.id"
        :class="(n.attrs.href ? '_a ' : '') + n.attrs.class"
        hover-class="_hover"
        :style="'display:inline;' + n.attrs.style"
        @tap.stop="linkTap"
      >
        <view class="flex flex-middle" style="display: inline">
          <!-- 1：@用户 2：@内容 3：话题 -->
          <image
            v-if="Number(n.attrs['data-type']) === 2"
            class="_a-link-content-img"
            :src="$ossmp('common/link-content-icon.png')"
          />
          <NodeItem :childs="n.children" :name="n.name" :attrs="{ style: 'display: inline' }" />
        </view>
      </view>
      <!-- 视频 -->
      <template v-else-if="n.name == 'video'">
        <view class="_node-video">
          <MediaVideo
            :video="{ mediaUrl: n.src[0], mediaWide: n.attrs['data-width'], mediaHigh: n.attrs['data-height'] }"
          />
        </view>
      </template>
      <!-- 音频 -->
      <template v-else-if="n.name == 'audio'">
        <view class="_node_audio">
          <MediaAudio :audio="{ mediaUrl: n.src[0], voiceLength: n.attrs['data-duration'] }" />
        </view>
      </template>
      <!-- blockquote -->
      <template v-else-if="n.name === 'blockquote'">
        <view class="_blockquote flex">
          <image class="_img-blockquote" :src="$ossmp('common/richtext-block.png')" />
          <view class="flex-1">
            <NodeItem :name="n.name" :attrs="n.attrs" :childs="n.children" />
          </view>
        </view>
      </template>
      <!-- 富文本 -->
      <rich-text v-else-if="use(n)" :id="n.attrs.id" :nodes="[n]" />
      <template v-else>
        <NodeItem :name="n.name" :attrs="n.attrs" :childs="n.children" />
      </template>
    </block>
  </view>
</template>
<script>
import { imgCompress } from '@/utils';
import MediaVideo from './media-video.vue';
import MediaAudio from './media-audio.vue';
export default {
  name: 'NodeItem',
  components: {
    MediaVideo,
    MediaAudio,
  },
  props: {
    name: String,
    childs: {
      type: Array,
      default: () => [],
    },
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return { imgCompress };
  },
  mounted() {
    for (this.root = this.$parent; this.root.$options.name != 'mp-html'; this.root = this.root.$parent);
  },
  methods: {
    // 计算图片高度
    getImgHeight(index) {
      // 30为图片左右padding距离
      const screenWidth = 375 - 30;
      const width = this.childs[index].attrs['data-width'];
      const height = this.childs[index].attrs['data-height'];
      return `${(height * screenWidth) / width}px`;
    },
    /**
     * @description 是否使用 rich-text 显示剩余内容
     */
    use: function(item) {
      // 行内标签列表
      const inlineTags = {
        abbr: true,
        b: true,
        big: true,
        code: true,
        del: true,
        em: true,
        i: true,
        ins: true,
        label: true,
        q: true,
        small: true,
        span: true,
        strong: true,
        sub: true,
        sup: true,
      };
      if (item.c) return false;
      // 微信和 QQ 的 rich-text inline 布局无效
      return !inlineTags[item.name] && (item.attrs.style || '').indexOf('display:inline') == -1;
    },
  },
};
</script>
<style>
/* a 标签默认效果 */
._a {
  padding: 1.5px 0 1.5px 0;
  color: #4e87c6;
  word-break: break-all;
}
._a-link-content-img {
  width: 11px;
  height: 12px;
  vertical-align: middle;
}

/* a 标签点击态效果 */
._hover {
  text-decoration: underline;
  opacity: 0.7;
}

/* 图片默认效果 */
._img {
  border-radius: 10px;
  width: 100%;
  -webkit-touch-callout: none;
}
._blockquote {
  font-size: 12px;
  color: #8e8c86;
}
._img-blockquote {
  width: 7px;
  height: 8px;
  margin: 2px 2px 0 0;
}

/* 内部样式 */

._b,
._strong {
  font-weight: bold;
}

._code {
  font-family: monospace;
}

._del {
  text-decoration: line-through;
}

._em,
._i {
  font-style: italic;
}

._h1 {
  font-size: 2em;
}

._h2 {
  font-size: 1.5em;
}

._h3 {
  font-size: 1.17em;
}

._h5 {
  font-size: 0.83em;
}

._h6 {
  font-size: 0.67em;
}

._h1,
._h2,
._h3,
._h4,
._h5,
._h6 {
  display: block;
  font-weight: bold;
}

._image {
  height: 1px;
}

._ins {
  text-decoration: underline;
}

._li {
  display: list-item;
}

._ol {
  list-style-type: decimal;
}

._ol,
._ul {
  display: block;
  padding-left: 40px;
  margin: 1em 0;
}

._q::before {
  content: '"';
}

._q::after {
  content: '"';
}

._sub {
  font-size: smaller;
  vertical-align: sub;
}

._sup {
  font-size: smaller;
  vertical-align: super;
}

._thead,
._tbody,
._tfoot {
  display: table-row-group;
}

._tr {
  display: table-row;
}

._td,
._th {
  display: table-cell;
  vertical-align: middle;
}

._th {
  font-weight: bold;
  text-align: center;
}

._ul {
  list-style-type: disc;
}

._ul ._ul {
  margin: 0;
  list-style-type: circle;
}

._ul ._ul ._ul {
  list-style-type: square;
}

._abbr,
._b,
._code,
._del,
._em,
._i,
._ins,
._label,
._q,
._span,
._strong,
._sub,
._sup {
  display: inline;
}
._node-img,
._node-video,
._node_audio {
  margin: 6px 0;
}
</style>
