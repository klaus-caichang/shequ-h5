<template>
  <div class="rich-view">
    <!-- 信息流预览 -->
    <view class="preview-flow" v-if="showFlow">
      <view class="header flex flex-between">
        <view class="header-left flex flex-middle">
          <view class="avatar">
            <image class="image" :src="userInfo.headImg || defaultImg" />
            <image class="image-icon" :src="$ossmp('challenge/identity-icon.png')" />
          </view>
          <view>
            <p>{{ userInfo.bbsNick }}</p>
            <p class="time">刚刚</p>
          </view>
        </view>
        <view class="header-right flex flex-center flex-middle">关注</view>
      </view>
      <view class="content flex items-center">
        <img v-if="content.coverImage" class="content-cover" :src="imgCompress(content.coverImage)" />
        <view class="content-box">
          <view class="title ellipsis__line-1">{{ content.title }}</view>
          <view class="desc">
            <MpHtml class="ellipsis__line-3" :content="content.summary" />
          </view>
        </view>
      </view>
      <img class="footer" :src="$osspc('pre-flow-footer.png')" />
      <view class="line-half"></view>
    </view>
    <!-- 详情预览 -->
    <view class="preview-detail">
      <view class="title">{{ content.title }}</view>
      <view v-if="content.subtitle" class="subtitle">{{ content.subtitle }}</view>
      <MpHtml :content="content.richtext" />
    </view>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import MpHtml from '@/components/mp-html';
import TextView from '@/components/text-view';
import { getArticalDraft, getArtical } from '@/api/artical';
import { imgCompress } from '@/utils';
export default {
  name: 'RichView',
  components: { MpHtml, TextView },
  data() {
    return {
      imgCompress,
      content: '',
      showFlow: false,
      defaultImg: 'https://frontend-static-cdn.shiguangkey.com/tz-community-mp/images/icon/default.png',
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  async onLoad({ id, isDraft, showFlow }) {
    let detail = {};
    if (isDraft !== undefined) {
      const { data } = await getArticalDraft({ draftId: id });
      detail = data;
    } else {
      const { data } = await getArtical({ id });
      detail = data;
    }
    this.showFlow = showFlow;
    this.content = detail;
  },
};
</script>
<style lang="scss" scoped>
.rich-view {
  padding: 10px;
  .preview-flow {
    .header {
      width: 100%;
      color: #161413;
      .header-left {
        font-size: 14px;
        .time {
          color: #8e8c86;
          font-size: 12px;
        }
        .avatar {
          width: 32px;
          height: 32px;
          position: relative;
          margin-right: 7px;
          .image {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
          .image-icon {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 12px;
            height: 12px;
          }
        }
      }
      .header-right {
        font-size: 12px;
        width: 48px;
        height: 24px;
        background: #fff100;
        border-radius: 12px;
      }
    }
    .content {
      margin: 10px 0;
      .content-cover {
        width: 88px;
        height: 66px;
        margin-right: 10px;
        border-radius: 5px;
        object-fit: cover;
      }
      .content-box {
        color: #161413;
        width: calc(100% - 100px);
        .title {
          font-weight: bold;
        }
        .desc {
          font-size: 12px;
          font-weight: 400;
        }
      }
    }
    .footer {
      width: 100%;
    }
  }
  .preview-detail {
    padding-top: 10px;
    .title {
      font-size: 17px;
      color: #161413;
      margin-bottom: 6px;
    }
    .subtitle {
      background: #f8f8f8;
      border-radius: 6px;
      color: #8e8c86;
      font-size: 12px;
      padding: 4px;
      margin-bottom: 10px;
    }
  }
}
</style>
