<template>
  <view class="goods-list flex flex-wrap flex-between">
    <view class="goods" v-for="item in list" :key="item.id">
      <view class="goods-header">
        <image class="image" :src="item.img" mode="aspectFill"></image>
      </view>
      <view class="goods-box">
        <view class="title">{{ item.goodsName }}</view>
        <view class="flex flex-middle flex-between">
          <view>
            <view class="desc">{{ item.price }}碎片/个</view>
            <view class="desc-text">{{ parseTime(item.gmtCreate, 'YYYY-MM-DD') }}</view>
          </view>
          <view class="btn" @click="onCheck(item)">查看</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { parseTime } from '@/utils';
export default {
  data() {
    return {
      parseTime,
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    // 查看商品详情
    onCheck({ id, goodsId }) {
      console.log(1234);
      uni.navigateTo({ url: `/pages/pieces/goods-detail-order?id=${id}&goodsId=${goodsId}` });
    },
  },
};
</script>
<style lang="scss" scoped>
.goods {
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  padding-bottom: 16px;
  width: 165px;
  color: #161413;
  margin-bottom: 15px;
  .goods-header {
    height: 165px;
    position: relative;
    .image {
      width: 100%;
      height: 100%;
    }
  }
  .goods-box {
    padding: 8px 10px 0;
    font-weight: 400;
    .title {
      font-size: 14px;
      margin-bottom: 5px;
    }
    .desc {
      font-size: 12px;
      color: #ff8f00;
    }
    .desc-text {
      font-size: 10px;
      color: #8e8c86;
    }
    .btn {
      height: 28px;
      width: 52px;
      line-height: 28px;
      text-align: center;
      background: #fff100;
      border-radius: 15px;
      font-size: 14px;
    }
  }
}
</style>
