<template>
  <view
    class="video-playing"
    :class="ratio >= 1 ? 'video__landscape' : 'video__portrait'"
    @click.stop.prevent
    :style="{ width: width, height: height }"
  >
    <!-- 视频封面 -->
    <view class="video-poster" v-if="showBtn">
      <image
        mode="aspectFill"
        lazy-load
        class="image"
        :style="{ borderRadius: size === 'mini' ? '5px' : '10px' }"
        :src="video.cover"
      ></image>
      <view
        class="icon__center flex flex-center flex-middle"
        :class="size === 'mini' && 'icon__center__mini'"
        @click.stop="showVideo()"
      >
        <image v-if="size === 'normal'" class="play-image" :src="$ossmp('create/video_play.png')"></image>
        <image v-else class="mini-play-image" :src="$ossmp('create/video_play.png')"></image>
      </view>
      <view class="video-hazy" :class="size === 'mini' && 'no-hazy'"></view>
    </view>
    <video
      v-else
      class="video_html"
      :src="video.mediaUrl"
      controls
      autoplay
      show-play-btn
      :direction="ratio >= 1 ? 90 : 0"
      :poster="video.cover"
      play-btn-position="center"
      :enable-play-gesture="true"
      :vslide-gesture-in-fullscreen="false"
      :show-center-play-btn="false"
      @fullscreenchange="fullscreenchange"
      @error="messageError"
    ></video>
  </view>
</template>
<script>
export default {
  name: 'VideoPlaying',
  props: {
    // mediaUrl,mediaWide,mediaHigh
    video: {
      type: Object,
      default: () => ({}),
    },
    size: {
      type: String,
      default: 'normal',
    },
    fullScreen: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
    // 当前视频所在内容id
    contentId: {
      type: Number,
      default: null,
    },
    noPlay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showBtn: true, // 点击播放按钮后加载视频资源
    };
  },
  computed: {
    // 宽高比例
    // >=1 横屏(默认横屏)
    // <1 竖屏
    ratio() {
      console.log( this.video.mediaWide / this.video.mediaHigh || 1,12121);
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
    showVideo() {
      if (this.noPlay) {
        this.$bus.$emit('OPEN_DOWNLOAD_POP');
        return
      }
      this.showBtn = false;
    },
    messageError() {
      this.$toast('视频加载异常，请双击重试');
    },
    fullscreenchange({ detail: { fullScreen } }) {
      if (!fullScreen) {
        if (this.size === 'mini') this.showBtn = true;
      }
    },
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
    width: 316px;
    height: 178px;
  }
  &__portrait {
    width: 144px;
    height: 218px;
  }
}
</style>
