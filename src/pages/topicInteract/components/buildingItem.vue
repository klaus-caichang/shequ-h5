<template>
  <view class="ranking-item">
    <view class="left">
      <view class="txt">
        <!-- <span class="topic">＃我想对潭州说</span> -->
        <span>
          {{ info.content }}
        </span>
      </view>
      <view class="info">
        <view class="user-info">
          <image class="img" :src="info.authorIcon" mode="" />
          <view class="name">{{ info.authorNick }}</view>
        </view>
      </view>
    </view>
    <view class="right">
      <view class="mine-ranking">
        <view class="ranking">{{ info.number }}</view>
        <view class="txt">发布排序</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {
        return {};
      },
    },
    state: Number,
  },
};
</script>

<style lang="scss" scoped>
.ranking-item {
  display: flex;
  height: 60px;
  margin-bottom: 15px;
  font-size: 12px;
  color: #47433a;
  background: #ffffff;
  border-radius: 10px;
  .left {
    flex: 1;
    padding: 10px 5px 10px 15px;
    .txt {
      width: 247px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 5px;
      .topic {
        color: #161413;
        font-weight: bold;
        margin-right: 8px;
      }
    }
    .info {
      display: flex;
      align-items: center;
      .user-info {
        display: flex;
        align-items: center;
        width: 155px;
        .img {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          margin-right: 6px;
        }
        .name {
          width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    .mine-ranking {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .ranking {
        color: #161413;
        font-size: 17px;
        font-weight: bold;
        margin-bottom: 4px;
      }
      .txt {
        font-size: 12px;
        color: #8e8c86;
      }
    }
  }
}
</style>
