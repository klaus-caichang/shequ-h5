# 音频播放组件

> 该组件为音频播放组件,播放样式可以通过默认插槽自定义
> 播放状态和时长可以通过作用域插槽访问

### 使用示例

```js
<template>
  <view>
    <SoundPlaying :audio.sync="{mediaUrl, voiceLength}">
      <template v-slot="{data}">
        <view>播放时长：{{data.duration}}</view>
        <view>播放状态：{{data.isPlaying}}</view>
      </template>
    </SoundPlaying>
  </view>
</template>
<script>
import SoundPlaying from '@/components/SoundPlaying/SoundPlaying';
export default {
  components: { SoundPlaying }
};
</script>
```
