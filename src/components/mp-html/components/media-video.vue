<template>
  <view class="video-playing" :class="ratio >= 1 ? 'video__landscape' : 'video__portrait'" @click.stop.prevent>
    <!-- 视频封面 -->
    <view class="video-poster" @click="videoPlay">
      <image
        mode="aspectFill"
        lazy-load
        class="image"
        :style="{ borderRadius: '10px' }"
        :src="video.mediaUrl + ossUrl"
      ></image>
      <view class="icon__center flex flex-center flex-middle">
        <image class="play-image" :src="icon"></image>
      </view>
    </view>
  </view>
</template>
<script>
const OSS = 'https://frontend-static-cdn.shiguangkey.com/tz-community-mp/images/';
export default {
  name: 'VideoPlaying',
  props: {
    // mediaUrl,mediaWide,mediaHigh
    video: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      icon: `${OSS}create/video_play.png`,
    };
  },
  computed: {
    // 宽高比例
    // >=1 横屏(默认横屏)
    // <1 竖屏
    ratio() {
      return this.video.mediaWide / this.video.mediaHigh || 1;
    },
    ossUrl() {
      if (this.ratio >= 1) {
        return '?x-oss-process=video/snapshot,t_1000,f_jpg,w_316,h_0,ar_auto';
      } else {
        return '?x-oss-process=video/snapshot,t_1000,f_jpg,w_144,h_0,ar_auto';
      }
    },
  },
  methods: {
    messageError() {
      this.$toast('视频加载异常，请双击重试');
    },
    videoPlay() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    }
  },
};
</script>
<style lang="scss">
.video-playing {
  overflow: hidden;
  position: relative;
  .video-poster {
    width: 100%;
    height: 100%;
    .image {
      width: inherit;
      height: inherit;
      border-radius: 10px;
    }
  }
  .icon {
    &__center {
      width: 50px;
      height: 50px;
      background: rgba(0, 0, 0, 0.5);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #ffffff;
      z-index: 1;
      text-align: center;
      line-height: 50px;
      &__mini {
        border: 0;
        background: transparent;
      }
    }
  }
  .play-image {
    width: 14px;
    height: 24px;
    margin-left: 3px;
  }
  .mini-play-image {
    width: 8px;
    height: 14px;
  }
  .video_html {
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 10px;
    width: 100%;
    height: 100%;
  }
  .video-hazy {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    background: #000000;
    border-radius: 10px;
    z-index: 0;
  }
  .no-hazy {
    opacity: 0;
  }
}
.video {
  &__landscape {
    // width: 316px;
    height: 178px;
  }
  &__portrait {
    width: 144px;
    height: 218px;
  }
}
</style>
