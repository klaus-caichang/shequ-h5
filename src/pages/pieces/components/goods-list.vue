<template>
  <view class="goods-list flex flex-wrap flex-between">
    <view class="goods" v-for="item in list" :key="item.id" @click="onCheck(item)">
      <view class="goods-header">
        <image class="image" :src="item.img" mode="aspectFill"></image>
        <!-- 库存不足 -->
        <view class="image-footer unstock" v-if="item.isExchange === PIECE_STATUS.OUT_OF_STOCK">库存不足</view>
        <view class="image-footer num" v-else-if="item.surplusNum < 10">剩余{{ item.surplusNum }}件</view>
      </view>
      <view class="goods-box">
        <view class="title">{{ item.goodsName }}</view>
        <view class="flex flex-middle flex-between">
          <view>
            <!-- <view class="desc">{{ item.price | parseNum }}碎片/个</view> -->
            <view class="desc">{{ item.price }}碎片/个</view>
            <view class="desc-text">今日可兑换{{ item.todayExchangedLimit }}次</view>
          </view>
          <view class="btn" :class="{ disable: item.isExchange !== PIECE_STATUS.USABLE }" @click.stop="goExchange(item)"
            >兑换</view
          >
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { PIECE_STATUS } from '@/constants/common';
import { mapGetters } from 'vuex';
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      PIECE_STATUS,
    };
  },
  computed: {
    ...mapGetters(['terminalType']),
  },
  methods: {
    // 点击兑换
    goExchange({ isExchange, id, goodsName, price }) {
      if (isExchange !== PIECE_STATUS.USABLE) return;
      this.$statistic({
        event_name: '点击兑换按钮',
        event_id: 'SQH-0001-E0001',
        event_attr: {
          goods_id: id,
          terminal_type: this.terminalType,
        },
      });
      this.$emit('on-handle', {
        id,
        goodsName,
        price,
      });
    },
    // 查看商品详情
    onCheck({ id }) {
      uni.navigateTo({ url: `/pages/pieces/goods-detail?id=${id}` });
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
    .image-footer {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 165px;
      height: 22px;
      line-height: 22px;
      color: #ffffff;
      font-size: 12px;
      font-weight: 400;
      padding: 0 10px;
    }
    .num {
      background: rgba(0, 0, 0, 0.3);
    }
    .unstock {
      background: #c6c6c6;
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
      background: #f25959;
      border-radius: 15px;
      color: #fffefe;
      font-size: 14px;
    }
    .disable {
      background: #d5d5d5;
    }
  }
}
</style>
