<template>
  <view class='audio-box' @click.stop='audioClick'>
    <slot :data='{ duration: voiceLength, isPlaying }'>
      <view class='flex flex-middle'>
        <view class='audio flex flex-middle flex-between' :style='{ width: width }'>
          <view>{{ voiceLength ? `${voiceLength}` : '' }}</view>
          <image
            class='image'
            :src="isPlaying ? $ossmp('create/audio_play_sub.gif') : $ossmp('create/audio_unplay_sub.png')"
          />
        </view>
      </view>
    </slot>
  </view>
</template>

<script>
import { _debounce } from '@tzfe/plugin-common-util';

export default {
  props: {
    // voiceLength,mediaUrl
    audio: {
      type: Object,
      default: () => ({}),
    },
    width: {
      type: String,
      default: '130px',
    },
    noPlay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { isPlaying: false,ctx:null };
  },
  mounted() {
    this.init();
  },
  destroyed(){
    // 组件销毁
    if(this.ctx){
      this.ctx.destroy()
    }
  },
  computed: {
    voiceLength() {
      let voiceLength = (this.audio.voiceLength && Math.ceil(this.audio.voiceLength)) || 0;
      const str = voiceLength
        ? `0${parseInt(voiceLength / 60)}:${voiceLength % 60 > 9 ? voiceLength % 60 : '0' + (voiceLength % 60)}`
        : '';
      return str;
    },
  },
  methods: {
    audioClick: _debounce(async function() {
      if (this.noPlay) {
        this.$bus.$emit('OPEN_DOWNLOAD_POP');
        return
      }
      if (this.isPlaying) {
        // 暂停
        this.ctx.pause();
      } else {
        // 播放
        this.ctx.play();
      }
    }, 200),
    init() {
      this.ctx = uni.createInnerAudioContext();
      // 当设备静音时支持播放
      this.ctx.obeyMuteSwitch = false;
      this.ctx.src = this.audio.mediaUrl;
      this.ctx.onPlay(() => {
        this.isPlaying = true;
      });
      this.ctx.onPause(() => {
        this.isPlaying = false;
      });
      this.ctx.onEnded(() => {
        // 自然播放结束
        this.isPlaying = false;
      });
    },
  },
}
</script>

<style lang='scss' scoped>
.audio-box {
  width: fit-content;
}

.audio {
  width: 130px;
  height: 36px;
  opacity: 1;
  background: #fff100;
  border-radius: 15px;
  padding: 0 13px 0 15px;
  font-size: 14px;

  .image {
    width: 22px;
    height: 22px;
  }
}

.icon {
  &__del {
    width: 14px;
    height: 15px;
    margin-left: 7px;

    .images {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
