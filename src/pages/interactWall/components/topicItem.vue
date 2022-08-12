<template>
  <view class="item">
    <view class="user-info">
      <view class="avator">
        <image class="img" :src="info.authorIcon" mode="" />
      </view>
      <view class="info">
        <view class="name">{{ info.authorNick }}</view>
        <!-- <view class="time">刚刚</view> -->
      </view>
    </view>
    <view class="topic-box">
      <view class="txt">
        <!-- <span class="topic">＃我想对潭州说</span> -->
        <span>
          {{ info.content }}
        </span>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: ['info'],
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  // width: 100%;
  height: 110px;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 15px;
  .user-info {
    display: flex;
    align-items: center;
    width: 200px;
    background: #fff100;
    padding: 11px 15px;
    .avator {
      width: 76px;
      height: 76px;
      margin-right: 8px;
      .img {
        width: 76px;
        height: 76px;
        border-radius: 50%;
        border: 4px solid #ffffff;
        box-sizing: border-box;
      }
    }
    .info {
      font-size: 18px;
      .name {
        font-weight: bold;
        color: #161413;
        // margin-bottom: 12px;
        width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .time {
        color: #8e8c86;
      }
    }
  }
  .topic-box {
    flex: 1;
    display: flex;
    align-items: center;
    background: #ffffff;
    padding: 10px 22px 10px 15px;
    box-sizing: border-box;
    .txt {
      font-size: 24px;
      color: #47433a;
      line-height: 32px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      .topic {
        color: #161413;
        font-weight: bold;
        margin-right: 5px;
      }
    }
  }
}
</style>
