<template>
  <!-- 商品详情-未兑换 -->
  <view class="goods-detail">
    <view class="detai-image">
      <image class="image" :src="detail.img" mode="aspectFill"></image>
    </view>
    <view class="detail-box">
      <view class="header">
        <text class="text-1">{{ detail.goodsName }}</text>
        <text class="text-2">{{ detail.price || 0 }}碎片/个</text>
        <text class="text-3">近30天已兑换{{ detail.exchangedNumDay30 || 0 }}件</text>
      </view>
      <view class="line line-half"></view>
      <!-- 使用说明 -->
      <view class="content">
        <image class="image" mode="widthFix" :src="detail.remark"></image>
      </view>
    </view>
    <!-- 底部按钮 -->
    <view class="detail-fixed">
      <view class="box flex flex-middle flex-between">
        <view class="desc">
          <view class="num">{{ pieceNum || 0 }}</view>
          <view>我的碎片</view>
        </view>
        <view class="btn" :class="{ disable: !ableExchange }" @click="comfirm">
          <!-- 可兑换 -->
          <template v-if="ableExchange">
            <text class="text"> {{ btnText }}</text
            >（今日可兑换{{ detail.todayExchangedLimit || 0 }}次）
          </template>
          <!-- 不可兑换 -->
          <template v-else>{{ btnText }}</template>
        </view>
      </view>
      <!-- <safe-area></safe-area> -->
    </view>
    <!-- <uni-popup ref="popup" type="center">
      兑换询问弹窗
      <DialogEnquire
        ref="enquire"
        :data="{ ...dialogData, pieceNum }"
        @cancel="onCancel"
      ></DialogEnquire>
    </uni-popup> -->
    <DialogEnquire ref="enquire" @cancel="onCancel"></DialogEnquire>
    <!-- <safe-area></safe-area> -->
  </view>
</template>
<script>
import { getGoodsDetail, getPicesNum } from '@/api/challenge';
import { PIECE_STATUS } from '@/constants/common';
import DialogEnquire from './components/dialog-enquire';
import { mapGetters } from 'vuex';
export default {
  components: { DialogEnquire },
  data() {
    return {
      stopShare: true,
      id: null,
      orderId: null, // 兑换成功后订单id
      detail: {},
      pieceNum: 0,
      PIECE_STATUS,
      dialogData: {
        title: '',
        id: null,
        expendPiece: 0,
      },
    };
  },
  computed: {
    // 是否可兑换商品
    ableExchange() {
      return this.detail.isExchange === PIECE_STATUS.USABLE;
    },
    btnText() {
      const { USABLE, DISABLE, OUT_OF_PIECE, OUT_OF_STOCK } = PIECE_STATUS;
      const obj = {
        [USABLE]: '兑换',
        [DISABLE]: '兑换', // 兑换次数为0
        [OUT_OF_PIECE]: '兑换', // 碎片不够
        [OUT_OF_STOCK]: '库存不足',
      };
      return obj[this.detail.isExchange];
    },
    ...mapGetters(['terminalType']),
  },
  onShow() {
    if (parseInt(this.terminalType, 10) === 2 || parseInt(this.terminalType, 10) === 3) {
      JsCallSystemTitle.postMessage('商品详情');
    }
  },
  onLoad({ id }) {
    this.id = id;
    this.init();
  },
  methods: {
    init_statistic() {
      return {
        event_attr: {
          goods_id: this.id,
        },
      };
    },
    async init() {
      this._getPicesNum();
      this._getGoodsDetail();
    },
    // 商品详情
    async _getGoodsDetail() {
      const { data } = await getGoodsDetail({ goodsId: this.id });
      this.detail = data;
    },
    // 用户碎片数
    async _getPicesNum() {
      const { data } = await getPicesNum();
      this.pieceNum = data;
    },
    // 确认兑换
    comfirm() {
      if (!this.ableExchange) return;
      this.$statistic({
        event_name: '商品兑换按钮点击事件',
        event_id: 'SQX-0021-E0001',
        event_attr: {
          goods_id: this.id,
          terminal_type: this.terminalType,
        },
      });
      this.$refs.enquire.open({
        ...this.detail,
        pieceNum: this.pieceNum,
      });
    },
    // 重置
    async onCancel({ refresh }) {
      this.$refs.enquire.reset();
      // 页面刷新
      if (refresh) this.init();
    },
  },
};
</script>
<style lang="scss" scoped>
$cardHeight: 32px;
.goods-detail {
  color: #161413;
  min-height: 100vh;
  padding-bottom: 60px;
  .detai-image {
    height: 375px;
    .image {
      width: 100%;
      height: 100%;
    }
  }
  .detail-box {
    padding: 15px 20px;
    border-radius: 15px 15px 0px 0px;
    margin-top: -12px;
    position: relative;
    background: #ffffff;
    .header {
      .text-1,
      .text-2,
      .text-3 {
        display: block;
      }
      .text-1 {
        font-size: 17px;
        font-weight: bold;
      }
      .text-2 {
        color: #f25959;
        font-size: 14px;
        margin: 10px 0;
      }
      .text-3 {
        color: #8e8c86;
        font-size: 12px;
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
  .detail-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.1);
    padding: 10px 15px 0 20px;
    .box {
      margin-bottom: 10px;
    }
    .desc {
      color: #47433a;
      font-size: 12px;
      .num {
        color: #f25959;
        font-size: 17px;
      }
    }
    .btn {
      width: 213px;
      height: 40px;
      background: #fff100;
      border-radius: 20px;
      color: #47433a;
      line-height: 40px;
      text-align: center;
      font-size: 12px;
      .text {
        font-size: 17px;
        font-weight: bold;
        color: #161413;
      }
    }
    .disable {
      font-size: 17px;
      background: #d5d5d5;
      color: #ffffff;
    }
  }
}
</style>
