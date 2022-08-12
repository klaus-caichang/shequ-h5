<template>
  <view
    class="ranking-item"
    :class="{
      'first-bg': ranking === 1,
      'second-bg': ranking === 2,
      'third-bg': ranking === 3,
    }"
  >
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
        <view class="praise">
          <image class="img" src="@/static/praise.png" mode="" />
          <view class="num">{{ info.praiseCount }}</view>
        </view>
      </view>
    </view>
    <view class="right">
      <view
        class="ranking-num"
        :class="{
          'first-num': ranking === 1,
          'second-num': ranking === 2,
          'third-num': ranking === 3,
        }"
        :style="{ color: ranking > 3 ? '#161413' : '#FFFFFF' }"
      >
        {{ info.number }}
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
    ranking: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.ranking-item {
  display: flex;
  height: 75px;
  margin-bottom: 15px;
  font-size: 12px;
  color: #47433a;
  background: #ffffff;
  border-radius: 10px;
  .left {
    flex: 1;
    padding: 10px 15px;
    .txt {
      font-size: 18px;
      width: 192px;
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
      // justify-content: space-between;
      align-items: center;
      font-size: 16px;
      .user-info {
        display: flex;
        align-items: center;
        width: 60%;
        .img {
          width: 25px;
          height: 25px;
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
      .praise {
        display: flex;
        align-items: center;
        .img {
          width: 18px;
          height: 16px;
          margin-right: 4px;
        }
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 65px;
    .ranking-num {
      font-size: 18px;
      font-weight: bold;
      width: 35px;
      line-height: 35px;
      text-align: center;
      background: #ffe7ac;
      border-radius: 50%;
    }
    .first-num {
      background: linear-gradient(324deg, #ffc879 0%, #ff7238 99%);
    }
    .second-num {
      background: linear-gradient(324deg, #ffcb80 0%, #feb769 99%);
    }
    .third-num {
      background: linear-gradient(324deg, #b3764e 0%, #e7bc9d 99%);
    }
  }
}
.first-bg {
  background: linear-gradient(276deg, #ffe8b2 0%, #febc6b 89%);
}
.second-bg {
  background: linear-gradient(113deg, #ffe4bb 12%, #fdf4ea 97%);
}
.third-bg {
  background: linear-gradient(112deg, #ffd9be 12%, #fff0e6 92%);
}
</style>
