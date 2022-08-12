<template>
  <!-- 商品详情-已兑换 -->
  <view class="goods-detail-order">
    <view class="detai-image">
      <image class="image" :src="detail.img" mode="aspectFill"></image>
    </view>
    <view class="detail-box">
      <view class="header">
        <text class="text-1">{{ detail.goodsName }}</text>
        <!-- 已兑换 -->
        <!-- 卡号密码 -->
        <view class="wrapper">
          <view class="wrapper-box flex">
            <view class="content flex-1"
              >卡号：<text class="text">{{ detail.cardNo }}</text></view
            >
            <text class="copy-btn" @click="copy(detail.cardNo)">复制</text>
          </view>
          <view class="wrapper-box flex">
            <view class="content flex-1"
              >密码：<text class="text">{{ detail.cardCipher }}</text></view
            >
            <text class="copy-btn" @click="copy(detail.cardCipher)">复制</text>
          </view>
        </view>
      </view>
      <view class="line line-half"></view>
      <!-- 使用说明 -->
      <view class="content">
        <image class="image" :src="detail.remark" mode="widthFix"></image>
      </view>
    </view>
  </view>
</template>
<script>
import { getGoodsDetailExchange } from '@/api/challenge';
import uniCopy from '@/plugins/uniCopy.js';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      stopShare: true,
      id: null, // 订单id
      goodsId: null, // 商品id
      detail: {},
    };
  },
  onShow() {
    if (parseInt(this.terminalType, 10) === 2 || parseInt(this.terminalType, 10) === 3) {
      JsCallSystemTitle.postMessage('商品详情');
    }
  },
  onLoad({ id, goodsId }) {
    this.id = id;
    this.goodsId = goodsId;
    // 已兑换详情
    this._getGoodsDetailExchange();
  },
  computed: {
    ...mapGetters(['terminalType']),
  },
  methods: {
    init_statistic() {
      return {
        event_attr: {
          goods_id: this.goodsId,
        },
      };
    },
    // 已兑换-商品详情
    async _getGoodsDetailExchange() {
      const { data } = await getGoodsDetailExchange({ orderId: this.id });
      this.detail = data;
    },
    async copy(val) {
      uniCopy({
        content: val,
        success: res => {
          uni.showToast({
            title: res,
            icon: 'none',
          });
        },
        error: e => {
          uni.showToast({
            title: e,
            icon: 'none',
            duration: 3000,
          });
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
$cardHeight: 32px;
.goods-detail-order {
  color: #161413;
  min-height: 100vh;
  padding-bottom: 40px;
  .detai-image {
    height: 375px;
    .image {
      width: 100%;
      height: 100%;
    }
  }
  .detail-box {
    padding: 15px;
    border-radius: 15px 15px 0px 0px;
    margin-top: -12px;
    position: relative;
    background: #ffffff;
    .header {
      .text-1 {
        display: block;
        font-size: 17px;
        font-weight: bold;
      }
      .wrapper {
        padding: 13px 12px;
        margin-top: 10px;
        height: 106px;
        background: #f8f8f8;
        border-radius: 10px;
        .wrapper-box:last-child {
          margin-bottom: 0;
        }
        .wrapper-box {
          height: $cardHeight;
          background: #ffffff;
          border-radius: 5px;
          margin-bottom: 12px;
          .content {
            font-size: 12px;
            font-weight: bold;
            padding: 0 10px;
            line-height: $cardHeight;
            .text {
              font-weight: 400;
            }
          }
          .copy-btn {
            width: 65px;
            line-height: $cardHeight;
            text-align: center;
            background: #ffdc92;
            font-size: 14px;
            color: #965c12;
            border-radius: 0 5px 5px 0;
          }
        }
      }
    }
    .line {
      margin-top: 15px;
    }
    .content {
      padding-top: 15px;
      .image {
        width: 100%;
      }
    }
  }
}
</style>
