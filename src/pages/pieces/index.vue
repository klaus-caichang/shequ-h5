<template>
  <ZPazing ref="paging" v-model="goodsList" @query="queryList">
    <view class="pieces" ref="mecroll">
      <view class="pieces-header">
        <view class="wrap-bar flex felx-middle flex-between">
          <view class="wrap-left flex flex-column">
            <view class="num flex flex-middle">
              <image class="image" :src="$ossmp('challenge/piece-large-icon-sub.png')"></image>
              <text>{{ pieceNum }}</text>
            </view>
            <text class="desc">可用碎片</text>
          </view>
          <view class="wrap-right flex flex-middle">
            <view class="desc" @click="goPiecesRule">
              <text>碎片规则</text>
              <image class="image" :src="$ossmp('challenge/piece-arrow.png')"></image>
            </view>
          </view>
        </view>
        <!-- 我的兑换/碎片明细 -->
        <view class="wrap-icon flex flex-column flex-bottom">
          <view
            class="detail flex flex-column flex-middle"
            v-for="(item, index) in options"
            :key="index"
            @click="goDetail(item)"
          >
            <view class="box">
              <image :class="{ image: item.isTop, 'image-bottom': !item.isTop }" :src="item.img"></image>
            </view>
            <view class="desc">{{ item.label }}</view>
          </view>
        </view>
      </view>
      <view class="pieces-goods">
        <view class="label">碎片兑换</view>
        <view class="site-gradient"></view>
        <view class="goods-list">
          <GoodsList :list="goodsList" @on-handle="handleExchangeClick"></GoodsList>
        </view>
      </view>
      <!-- <uni-popup ref="popup" type="center">
        兑换询问弹窗
        <DialogEnquire ref="enquire" :data="{ ...dialogData, pieceNum }" @cancel="onCancel"></DialogEnquire>
      </uni-popup> -->
      <DialogEnquire ref="enquire" @cancel="onCancel"></DialogEnquire>
    </view>
  </ZPazing>
</template>
<script>
import { getPicesGoodsList, getPicesNum } from '@/api/challenge';
import { _throttle } from '@/utils';
import DailogPopup from '@/components/uni-popup/uni-popup-dialog';
import GoodsList from './components/goods-list';
import DialogEnquire from './components/dialog-enquire';
import ZPazing from '@/uni_modules/z-paging/components/z-paging/z-paging.vue';
import ZPagingMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin';
import { SET_TERMINALTYPE } from '@/store/types.js';
import { mapGetters } from 'vuex';
export default {
  components: { GoodsList, DailogPopup, DialogEnquire, ZPazing },
  mixins: [ZPagingMixin],
  data() {
    return {
      stopShare: true,
      goodsList: [],
      pieceNum: 0,
      downOption: {
        bgColor: '#ffe8b2;',
        textColor: 'gray',
        auto: false,
      },
      options: [
        {
          label: '碎片明细',
          img: this.$ossmp('challenge/piece-detail-icon.png'),
          url: '/pages/pieces/detail-my',
          isTop: true,
        },
        {
          label: '我的兑换',
          img: this.$ossmp('challenge/piece-my-icon.png'),
          url: '/pages/pieces/exchange-my',
          isTop: false,
        },
      ],
      showTop: false,
      dialogData: {
        id: null,
        title: '',
        expendPiece: 0,
      },
    };
  },
  computed: {
    ...mapGetters(['terminalType']),
  },
  onPageScroll({ scrollTop }) {
    this.showTop = scrollTop >= 342;
  },
  // 刷新页面
  onShow() {
    if (parseInt(this.terminalType, 10) === 2 || parseInt(this.terminalType, 10) === 3) {
      JsCallSystemTitle.postMessage('知识碎片中心');
    }
  },
  onLoad() {
    let { terminalType } = this.$route.query;
    if (typeof terminalType === 'object' && terminalType.length) {
      terminalType = terminalType[terminalType.length - 1];
    }
    this.$store.commit(SET_TERMINALTYPE, terminalType);
    // WebViewJavascriptBridge.callHandler('JsCallSystemTitle', { title: '知识碎片中心' }, function(dataFromOC) {});
  },
  methods: {
    handleExchangeClick({ id, goodsName, price }) {
      this.$refs.enquire.open({
        id,
        goodsName,
        price,
        pieceNum: this.pieceNum,
      });
    },

    // 弹窗数据重置
    async onCancel({ refresh }) {
      if (refresh) this.$refs.paging.reload();
    },
    goPiecesRule() {
      this.$statistic({
        event_name: '点击碎片规则',
        event_id: 'SQH_0001_E0003',
        event_attr: {
          terminal_type: this.terminalType,
        },
      });
      uni.navigateTo({ url: '/pages/staticPage/piece-rule' });
    },
    goDetail(item) {
      uni.navigateTo({ url: item.url });
      if (item.label === '碎片明细') {
        this.$statistic({
          event_name: '点击碎片明细',
          event_id: 'SQH_0001_E0002',
          event_attr: {
            terminal_type: this.terminalType,
          },
        });
      } else {
        this.$statistic({
          event_name: '点击我的兑换',
          event_id: 'SQH_0001_E0004',
          event_attr: {
            terminal_type: this.terminalType,
          },
        });
      }
    },
    async queryList(num, size) {
      const pages = {
        pageIndex: num,
        pageSize: size,
      };
      try {
        const { data: pieceNum } = await getPicesNum();
        this.pieceNum = pieceNum;
        const { data } = await getPicesGoodsList(pages);
        this.$refs.paging.complete(data.list);
      } catch (e) {
        this.$refs.paging.complete(false);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$ossmp: 'https://frontend-static-cdn.shiguangkey.com/tz-community-mp/images/';
.pieces {
  // background: #f8f8f8;
  background: linear-gradient(188deg, #ffffff, #f8f8f8 30%);
  min-height: 100vh;
  padding-bottom: 20px;
  position: relative;
  .nav-text {
    color: #161413;
    font-size: 17px;
    font-weight: bold;
  }
  .pieces-header {
    height: 355px;
    padding: 14px 14px 0 14px;
    margin-bottom: 12px;
    background-size: 100% 100%;
    background-image: url($ossmp+'challenge/piece-bkg-large-sub1.png');
    background-color: #ffffff;
  }
  .pieces-goods {
    padding: 0 15px;
    position: relative;
    .site-gradient {
      width: 100%;
      height: 120px;
      position: absolute;
      left: 0;
      top: -12px;
      background: linear-gradient(180deg, #ffffff, #f8f8f8);
    }
    .label {
      position: inherit;
      z-index: 1;
      font-size: 17px;
      font-weight: bold;
      margin-bottom: 12px;
    }
    .goods-list {
      position: inherit;
    }
  }
  .wrap-bar {
    width: 345px;
    height: 65px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 10px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.9);
    .wrap-left {
      margin-right: 15px;
      .num {
        color: #161413;
        font-size: 24px;
        font-weight: bold;
        .image {
          width: 18px;
          height: 18px;
          margin-right: 4px;
        }
      }
      .desc {
        color: #47433a;
        font-size: 12px;
        font-weight: 400;
      }
    }
    .wrap-right {
      .desc {
        width: 91px;
        height: 30px;
        background: #ff8f00;
        border-radius: 15px;
        color: #ffffff;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        margin-left: -16px;
        .image {
          width: 7px;
          height: 12px;
          margin-left: 7px;
          vertical-align: middle;
        }
      }
    }
  }
  .wrap-icon {
    margin-top: 38px;
    text-align: right;
    .detail {
      width: 48px;
      margin-bottom: 23px;
      position: relative;
    }
    .box {
      width: 38px;
      height: 38px;
      text-align: center;
      border-radius: 50%;
      background: #ffffff;
      .image {
        margin-top: 9px;
        width: 20px;
        height: 19px;
      }
      .image-bottom {
        margin-top: 11px;
        width: 20px;
        height: 16px;
      }
    }
    .desc {
      position: absolute;
      bottom: -10px;
      width: 48px;
      height: 16px;
      line-height: 16px;
      text-align: center;
      left: 0;
      background: #fff6dd;
      border-radius: 8px;
      color: #965c12;
      font-size: 10px;
    }
  }
}
</style>
