<template>
  <view> </view>
</template>
<script>
import { getMediaListPage, updateMedia } from '@/api/common';
export default {
  data() {
    return {
      html: '',
      pageIndex: 1,
      pageSize: 90,
    };
  },
  onLoad() {
    if (this.$route.query.pageIndex) {
      this.pageIndex = Number(this.$route.query.pageIndex);
    }
    if (this.$route.query.pageSize) {
      this.pageSize = this.$route.query.pageSize;
    }
    if (this.$route.query.start) {
      this.getData();
    }
  },
  methods: {
    async getData() {
      const res = await getMediaListPage({
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
      });
      const list = res.data.list;
      for (let index = 0; index < list.length; index++) {
        const item = list[index];
        if (item.mediaType === 2) {
          this.getImgWh(item);
        } else {
          this.getVideoScale(item);
        }
      }
      if (res.data.totalPage > this.pageIndex) {
        this.pageIndex += 1;
        setTimeout(() => {
          this.getData();
        }, 10000);
      }
    },
    async getImgWh(obj) {
      // 图片地址
      var img_url = obj.mediaUrl;
      // 创建对象
      var img = new Image();
      // 改变图片的src
      img.src = img_url;
      document.body.appendChild(img);
      await new Promise(function(resolve, reject) {
        var check = function() {
          // 只要任何一方大于0
          // 表示已经服务器已经返回宽高
          if (img.width > 0 || img.height > 0) {
            updateMedia(
              Object.assign(obj, {
                mediaHigh: img.height,
                mediaWide: img.width,
              })
            );
            resolve();
            clearInterval(set);
          }
        };
        var set = setInterval(check, 40);
      });
    },
    async getVideoScale(obj) {
      const video = document.createElement('video');
      video.src = obj.mediaUrl;
      document.body.appendChild(video);
      await new Promise(function(resolve, reject) {
        video.addEventListener('canplay', function(e) {
          updateMedia(
            Object.assign(obj, {
              voiceLength: video.duration,
              mediaHigh: video.videoHeight,
              mediaWide: video.videoWidth,
            })
          );
          resolve();
        });
      });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped></style>
