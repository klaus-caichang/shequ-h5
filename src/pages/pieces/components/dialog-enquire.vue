<template>
  <Popup ref="dialog">
    <!-- 兑换询问弹窗 -->
    <DailogPopup v-show="!success" :title="data.title" before-close @confirm="onExchange" @close="cancel(false)">
      <template v-slot:content>
        <view class="dialog-content">
          将消耗
          <text class="text">{{ data.expendPiece }}碎片</text>
          （当前可用碎片{{ data.pieceNum }}）
        </view>
      </template>
    </DailogPopup>
    <!-- 兑换成功弹窗 -->
    <DailogPopup
      v-show="success"
      cancelText="以后再看"
      comfirmText="立即查看"
      before-close
      @confirm="onJump"
      @close="cancel(true)"
    >
      <template v-slot:title>
        <view class="dialog-title flex flex-middle">
          <image class="image" :src="$ossmp('challenge/exchange-success.png')"></image>
          <text>兑换成功</text>
        </view>
      </template>
      <template v-slot:content>
        <view class="dialog-content">
          兑换商品已放入
          <text class="text">“我的兑换”</text>
        </view>
      </template>
    </DailogPopup>
  </Popup>
</template>
<script>
import Popup from '@/components/uni-popup/uni-popup';
import DailogPopup from '@/components/uni-popup/uni-popup-dialog';
import { getGoodsExchange } from '@/api/challenge';
export default {
  components: { DailogPopup, Popup },
  data() {
    return {
      success: false, // 是否兑换成功
      orderId: null, // 订单id
      data: {},
    };
  },
  methods: {
    // 确认兑换
    async onExchange() {
      try {
        const { data } = await getGoodsExchange({ goodsId: this.data.id });
        this.orderId = data;
        this.success = true;
      } catch (err) {
        if (err && err.message) this.$toast(err.message);
        this.cancel(true);
      }
    },
    // 兑换成功后查看
    onJump() {
      this.cancel(true);
      uni.navigateTo({ url: `/pages/pieces/goods-detail-order?id=${this.orderId}` });
    },
    // 点击取消
    // refresh 是否刷新页面
    cancel(refresh) {
      this.$emit('cancel', { refresh });
      this.reset();
    },

    open({ id, goodsName, price, pieceNum }) {
      this.data = {
        title: `确定要兑换${goodsName}吗？`,
        expendPiece: price,
        pieceNum,
        id,
      };
      this.$refs.dialog.open();
    },
    // 弹窗状态重置
    reset() {
      this.success = false;
      this.$refs.dialog.close();
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-title {
  color: #353535;
  font-size: 17px;
  .image {
    width: 30px;
    height: 30px;
    margin-right: 15px;
    vertical-align: middle;
  }
}
.dialog-content {
  font-size: 14px;
  color: #47433a;
  .text {
    color: #f25959;
  }
}
</style>
