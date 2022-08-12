<template>
  <view class="audio-box" @click.stop="audioClick">
    <view class="flex flex-middle">
      <view class="audio flex flex-middle flex-between">
        <view>{{ voiceLength ? `${voiceLength}` : '' }}</view>
        <image class="image" :src="icon" />
      </view>
    </view>
  </view>
</template>

<script>
const OSS = 'https://frontend-static-cdn.shiguangkey.com/tz-community-mp/images/';
export default {
  props: {
    // voiceLength,mediaUrl
    audio: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      icon: `${OSS}create/audio_unplay_sub.png`,
    };
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
    audioClick() {
      this.$bus.$emit('OPEN_DOWNLOAD_POP');
    }
  }
};
</script>

<style lang="scss" scoped>
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
.mini-audio {
  width: 36px;
  height: 36px;
  background-color: #fff100;
  border-radius: 5px;
  .image {
    width: 22px;
    height: 20px;
  }
}
</style>
