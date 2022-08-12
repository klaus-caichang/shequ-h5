<template>
  <view class="exchange-my">
    <ZPazing ref="paging" v-model="list" @query="queryList">
      <view class="header-box">
        <view class="num">
          <text class="text">{{ pieceNumTotal || 0 }}</text
          >碎片
        </view>
        <text>累计兑换</text>
      </view>
      <view class="goods-box">
        <view class="site-gradient"></view>
        <view class="goods-list">
          <GoodsListMy :list="list"></GoodsListMy>
        </view>
      </view>
    </ZPazing>
  </view>
</template>
<script>
import { getMyGoodsExchange, getPicesTotalNum } from '@/api/challenge';
// import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import GoodsListMy from './components/goods-list-my';
import ZPazing from '@/uni_modules/z-paging/components/z-paging/z-paging.vue';
import ZPagingMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin';
import { mapGetters } from 'vuex';
export default {
  components: { GoodsListMy, ZPazing },
  mixins: [ZPagingMixin],
  data() {
    return {
      stopShare: true,
      list: [],
      pieceNumTotal: 0, // 累计兑换碎片
      mescroll: null,
      downProp: {
        // native: true, // 禁用下拉
        use: false,
      },
      upProp: {
        page: {
          size: 20,
        },
        callback: this.upCallback,
      },
    };
  },
  onShow() {
    if (parseInt(this.terminalType, 10) === 2 || parseInt(this.terminalType, 10) === 3) {
      JsCallSystemTitle.postMessage('我的兑换');
    }
  },
  mounted() {
    this._getPicesTotalNum();
  },
  computed: {
    ...mapGetters(['terminalType']),
  },
  methods: {
    async queryList(num, size) {
      const pages = {
        pageIndex: num,
        pageSize: size,
      };
      try {
        const { data } = await getMyGoodsExchange(pages);
        this.$refs.paging.complete(data.list);
      } catch (e) {
        this.$refs.paging.complete(false);
      }
    },
    // 累计兑换碎片
    async _getPicesTotalNum() {
      const { data } = await getPicesTotalNum();
      this.pieceNumTotal = data;
    },
  },
};
</script>
<style lang="scss" scoped>
$ossmp: 'https://frontend-static-cdn.shiguangkey.com/tz-community-mp/images/';
.exchange-my {
  color: #161413;
  min-height: 100vh;
  background: #f8f8f8;
  .header-box {
    height: 115px;
    padding: 15px;
    font-size: 14px;
    background-size: 100% 100%;
    background-image: url($ossmp+'challenge/exchange-my-bkg.png');
    .num {
      .text {
        font-size: 30px;
        font-weight: bold;
        margin-right: 8px;
      }
    }
  }
  .goods-box {
    border-radius: 15px 15px 0px 0px;
    margin-top: -30px;
    padding: 15px;
    position: relative;
    .site-gradient {
      border-radius: inherit;
      width: 100%;
      height: 120px;
      position: absolute;
      left: 0;
      top: 0;
      background: linear-gradient(180deg, #ffffff, #f8f8f8);
    }
    .goods-list {
      position: inherit;
    }
  }
}
</style>
