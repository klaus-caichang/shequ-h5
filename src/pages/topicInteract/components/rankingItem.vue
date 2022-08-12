<template>
  <view
    class="ranking-item"
    :class="{
      'mine-bg': ranking === -1,
      'first-bg': info.number === 1,
      'second-bg': info.number === 2,
      'third-bg': info.number === 3,
    }"
  >
    <view class="left">
      <view class="txt" :style="{ width: ranking !== -1 ? '266px' : '247px' }">
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
    <view class="right" :style="{ width: ranking !== -1 ? '50px' : '100px' }">
      <view
        v-if="ranking !== -1"
        class="ranking-num"
        :class="{
          'first-num': info.number === 1,
          'second-num': info.number === 2,
          'third-num': info.number === 3,
        }"
        :style="{ color: info.number > 3 ? '#161413' : '#FFFFFF' }"
      >
        {{ info.number }}
      </view>
      <view class="mine-ranking" v-else>
        <view class="ranking" style="font-size: 14px" v-if="info.praiseCount === 0">未上榜</view>
        <view class="ranking" v-else-if="info.number > 100">100+</view>
        <view class="ranking" v-else>{{ info.number }}</view>
        <view class="txt">我的排名</view>
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
  height: 60px;
  margin-bottom: 15px;
  font-size: 12px;
  color: #47433a;
  background: #ffffff;
  border-radius: 10px;
  .left {
    flex: 1;
    padding: 10px 15px;
    .txt {
      width: 266px;
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
      .praise {
        display: flex;
        align-items: center;
        width: 40%;
        .img {
          width: 14px;
          height: 12px;
          margin-right: 4px;
        }
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    // width: 50px;
    .ranking-num {
      font-size: 14px;
      font-weight: bold;
      width: 26px;
      line-height: 26px;
      text-align: center;
      background: #ffe7ac;
      border-radius: 50%;
      color: #161413;
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
    .mine-ranking {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .ranking {
        color: #161413;
        font-size: 17px;
        font-weight: bold;
        margin-bottom: 6px;
      }
      .txt {
        font-size: 12px;
        color: #8e8c86;
      }
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
.mine-bg {
  background: #fff100;
}
</style>
