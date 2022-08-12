## view 图片展示组件 作者冬然

> 该组件是信息流图片九宫格展示组件。点击图片支持预览和左右滑动切换图片。预览模式下，长安图片支持'发送给朋友', '保存图片', '收藏'的功能

### 使用示例

```js
<template>
  <view>
    <images :data="imgs" />
  </view>
</template>
<script>
import Images from '@/components/images/view';
export default {
  components: { Images },
  data() {
    return {
      imgs: [
        { url: 'https://frontend-static-cdn.shiguangkey.com/tz-doc/home/nuxt-ecosystem-axios.png' },
        { url: 'https://frontend-static-cdn.shiguangkey.com/tz-doc/home/nuxt-ecosystem-auth.png' },
      ],
    };
  },
};
</script>
```
