<template>
  <view v-if="data.medias && data.medias.length" :style="{ 'margin-top': (data.title || data.content) && '15px' }">
    <!-- 2-图片，3-视频，4-音频 -->
    <image-view
      v-if="data.contentMedia === 2"
      :data="data.medias"
      :margin="30"
      :quality="80"
    ></image-view>
    <video-playing
      v-else-if="data.contentMedia === 3"
      :video="data.medias[0]"
    ></video-playing>
    <sound-playing
      v-else-if="data.contentMedia === 4"
      :audio="data.medias[0]"
    ></sound-playing>
  </view>

</template>

<script>

export default {
  name: 'medias',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return{

    }
  }
};
</script>

<style scoped>

</style>
