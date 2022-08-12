<template>
  <view class="content">
    <view class="content-box">
      <view class="title" v-if="showTitle">{{ data.title }}</view>
      <text-view :dt="data.content" :talkTitleList="data.talkTitleList" :at-user-list="data.atUserList" />
      <view v-if="data.medias && data.medias.length" :style="{ 'margin-top': (data.title || data.content) && '15px' }">
        <!-- 2-图片，3-视频，4-音频 -->
        <image-view
          v-if="data.contentMedia === 2"
          :data="data.medias"
          :statistic-data="data"
          :margin="30"
          :quality="80"
        ></image-view>
        <video-playing
          v-else-if="data.contentMedia === 3"
          :video="data.medias[0]"
          :statistic-data="data"
          noPlay
        ></video-playing>
        <sound-playing
          v-else-if="data.contentMedia === 4"
          :audio="data.medias[0]"
          :statistic-data="data"
          noPlay
        ></sound-playing>
      </view>
      <view class="menu" v-if="showCircle && data.circleId" @click.stop="closeTip()">
        <to-circle :circle-obj="data"></to-circle>
      </view>
    </view>
  </view>
</template>
<script>
import TextView from './text-view/text-view.vue'
export default {
  name: 'Content',
  components: { TextView },
  props: {
    // 回答/动态无标题
    showTitle: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    //  圈子按钮
    showCircle: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    closeTip() {
      if (this.$refs.cirTip) {
        this.$refs.cirTip.close();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.content-box {
  color: #161413;
  .title {
    font-size: 17px;
    margin-bottom: 15px;
  }

  .menu {
    margin-top: 15px;
  }
}
</style>
