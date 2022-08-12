<template>
  <view class="invitation-btn-wrapper" @click="copyAction">
    <view class="invitation-btn flex flex-center flex-middle">
      <image class="img" :src="changeUrl" mode="widthFix" />
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import { inviteFriendsLink } from '@/utils/config';
import uniCopy from '@/utils/uni-copy.js';
import { getShortUrl } from '@/api/artFestival.js';
export default {
  props: {
    type: {
      type: Number,
      default: 1
    },
    flag: {
      type: String,
      default: 'invite'
    },
    userId: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    },
    url:{
      type: String,
      default: ''
    }
  },
  data() {
    return {
      copyUrl: '',
      errorMsg: '',
    }
  },
  created() {
    this.getUrl();
  },
  computed: {
    ...mapGetters(['userInfo']),
    changeUrl() {
      switch (this.flag) {
        case 'invite':
          return require('@/static/artFestival/copy-btn2.png');
        case 'detail':
          return require('@/static/artFestival/copy-btn.png');
        default:
          break;
      }
    }
  },
  methods: {
    copyAction() {
      if (this.copyUrl) {
        uniCopy({
          content: this.copyUrl,
          success:(res)=>{
            this.$toast('链接已复制到剪切板，快去分享吧');
          },
          error:(e)=>{
            console.log('e', e);
            this.$toast('复制失败');
          }
        });
      } else {
        this.$toast(this.errorMsg);
      }
      // const result = h5Copy(this.copyUrl);
      // if (result === false) {
      //   this.$toast('复制失败');
      // } else {
      //   this.$toast('链接已复制到剪切板，快去分享吧');
      // }
    },
    getUrl() {
      let info = `${inviteFriendsLink}?id=${this.userId}&type=${this.type}`;
      const params = {
        url: info,
        name: this.name,
        type: this.flag === 'invite' ? 1 : 2
      }
      if(this.url){
        params.url = this.url;
        params.name = null;
      }
      getShortUrl(params).then(({ data }) => {
        this.copyUrl = data;
      }).catch(({ message }) => {
        this.errorMsg = message;
      });
    }
  }
}
</script>

<style lang="less" scoped>
.invitation-btn-wrapper {
  .invitation-btn {
    .img {
      width: 183px;
    }
  }
}
</style>
