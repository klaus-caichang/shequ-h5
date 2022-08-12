<template>
  <view class="imgs-wrapper" :class="{ single: data.length === 1, multi: data.length > 1 }">
    <image
      v-for="(item, index) in filterData"
      :key="index"
      class="img"
      :src="item.mediaUrl | imgCompress(`/resize,h_${item.height * 2},w_${item.width * 2},m_mfit`, true)"
      mode="aspectFill"
      :lazy-load="true"
      :style="{ width: item.width + 'px', height: item.height + 'px' }"
      @click.stop="imgPreview(index)"
    />
  </view>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    // 页面宽度留白的宽度
    margin: {
      type: Number,
      default: 64,
    },
    // 图片质量压缩。列表默认40，详情80
    quality: {
      type: Number,
      default: 40,
    },
  },
  data() {
    return {
      sysInfo:uni.getSystemInfoSync()
    };
  },
  computed: {
    filterData() {
      /** w:314  l:10  y:314
       * 当X<1/3时，图片尺寸（Y/3）* Y，图片信息显示不完整；
        当1/3<=X<=1时，图片尺寸为（YX） Y,图片信息显示完整；
        当1<=X<=3时，图片尺寸为Y *（Y/X），图片显示完整；
        当3<X时，图片尺寸为W*[(W-2L)/3],图片显示不完整；*
       */
      const len = this.data.length;
      let arr = [];
      const screenW = this.sysInfo.screenWidth;
      const IMG_L = 10; // 间距
      const wh = {};
      if (len === 1) {
        const calc = data => {
          let IMG_W = screenW - this.margin; // 最大宽度
          let IMG_Y = IMG_W; // 最大高度
          const { mediaHigh, mediaWide } = data;
          if (mediaHigh && mediaWide) {
            const x = (mediaWide / mediaHigh).toFixed(1);
            if (x < 0.33) {
              Object.assign(wh, { width: IMG_W / 3, height: IMG_Y });
            } else if (x >= 0.33 && x < 1) {
              Object.assign(wh, { width: IMG_Y * x, height: IMG_Y });
            } else {
              // 宽度为最大宽度，按比例缩小20%
              const scale = 0.2;
              IMG_W = IMG_W - screenW * scale;
              IMG_Y = IMG_W;
              if (x >= 1 && x <= 3) {
                Object.assign(wh, { width: IMG_Y, height: IMG_Y / x });
              } else if (x > 3) {
                Object.assign(wh, { width: IMG_W, height: (IMG_W - 2 * IMG_L) / 3 });
              }
            }
          } else {
            const IMG_S = ((IMG_W - 2 * IMG_L) / 3).toFixed(0);
            Object.assign(wh, { width: IMG_S, height: IMG_S });
          }
          Object.assign(wh, { IMG_W });
          return wh;
        };
        arr = this.data.map(item => {
          let { width, height } = calc(item);
          return {
            ...item,
            ...wh,
            width: Number(width).toFixed(0),
            height: Number(height).toFixed(0),
          };
        });
      } else {
        // [(W-2L)/3][(W-2L)/3]
        const IMG_W = screenW - this.margin;
        const IMG_S = ((IMG_W - 2 * IMG_L) / 3).toFixed(0);
        arr = this.data.map(item => {
          return {
            ...item,
            width: IMG_S,
            height: IMG_S,
          };
        });
      }
      return arr;
    },
  },
  methods: {
    async imgPreview(index) {
      const urls = this.data.map(({ mediaUrl }) => mediaUrl);
      uni.previewImage({
        current: index,
        urls,
        longPressActions: {
          itemList: ['发送给朋友', '保存图片', '收藏'],
          success: function(data) {},
          fail: function(err) {},
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
$img-gap: 10px;
.imgs-wrapper {
  display: grid;
  > .img {
    border-radius: 5px;
  }
  &.multi {
    grid-row-gap: 10.5px;
    grid-column-gap: $img-gap;
    grid-template-columns: repeat(3, 1fr);
  }
  image {
    background: #f5f5f5;
  }
}
</style>
