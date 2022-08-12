# 视频播放组件

```js
<template>
  <view>
    <video-playing :video="videoData"></video-playing>
  </view>
</template>
<script>
import videoPlaying from '@/components/video-playing/video-playing';
export default {
  components: { videoPlaying },
  data() {
    videoData: {
      mediaUrl: '',
      mediaWide: 0,
      mediaHigh: 0,
    }
  }
};
</script>
```
