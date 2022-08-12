<template>
  <view class="avatar" :style="{ width: getUpxSize(imgSize), height: getUpxSize(imgSize) }">
    <image
      class="image"
      :src="(info.bbsIcon || defaultImg) | imgCompress(`/resize,h_${imgSize * 3}`)"
      lazy-load
      mode="aspectFill"
      @click="headImgClick"
    />
    <image v-if="showIdentity" class="icon" :class="size" :src="icon || ''" lazy-load></image>
  </view>
</template>
<script>
import { OSSURL } from '@/constants/common';

export default {
  props: {
    // 用户信息
    info: {
      type: Object,
      default: () => ({}),
    },
    // 头像尺寸
    imgSize: {
      type: Number,
      default: 32,
    },
    size: {
      type: String,
      default: 'small',
    },
    // 默认头像
    defaultImg: {
      type: String,
      default: `${OSSURL}challenge/medal-more.png`,
    },
    clickView: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // 内容创作者展示身份标识
    showIdentity() {
      // return this.info.contentIdentity && this.info.contentIdentity.identityId === IDENTITY_TYPE.CONTENT_CREATE;
      return this.info.contentIdentity && this.info.contentIdentity.identityIcon;
    },
    icon() {
      if (
        this.info.creatorIdentityLevelVO &&
        this.info.contentIdentity &&
        this.info.creatorIdentityLevelVO.identityId === this.info.contentIdentity.identityId
      ) {
        return this.info.creatorIdentityLevelVO.icon;
      } else {
        return this.info.contentIdentity && this.info.contentIdentity.identityIcon;
      }
    },
    // 身份标识图标
    iconUrl() {
      const icons = {
        medium: 'identity-icon.png',
        'medium-border': 'identity-c-icon.png', // 挑战中心特殊logo
        small: 'identity-icon-small.png',
        mini: 'identity-icon-small.png',
      };
      return this.$oss(`challenge/${icons[this.size]}`);
    },
  },
  methods: {
    // 动态宽高不会随机型变化
    getUpxSize(val) {
      return `${uni.upx2px(val * 2)}px`;
    },
    headImgClick() {
      if (this.clickView) {
        uni.previewImage({
          current: 0,
          urls: [this.info.bbsIcon || this.defaultImg],
          longPressActions: {
            itemList: ['发送给朋友', '保存图片', '收藏'],
            success(data) {},
            fail(err) {},
          },
        });
      } else this.$emit('on-click');
    },
  },
};
</script>
<style lang="scss" scoped>
$medium: 20px;
$small: 12px;
$mini: 9px;
.avatar {
  position: relative;
  display: block;
  border-radius: 50%;
  .icon {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
  .medium,
  .medium-border {
    width: $medium;
    height: $medium;
  }
  .small {
    width: $small;
    height: $small;
  }
  .mini {
    width: $mini;
    height: $mini;
  }
  .image {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
}
</style>
