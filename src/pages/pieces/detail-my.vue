<template>
  <view class="detail">
    <ZPazing ref="paging" v-model="list" @query="queryList">
      <view class="detail-scroll">
        <view class="detail-box">
          <view v-for="item in list" :key="item.id">
            <view class="wrapper flex flex-between flex-middle">
              <view class="wrapper-left">
                <view>{{ item.businessDescription }}</view>
                <text class="text">{{ parseTime(item.gmtCreate) }}</text>
              </view>
              <view class="wrapper-right" :class="{ decrease: item.increaseValue < 0 }">
                {{ item.increaseValue > 0 ? `+${item.increaseValue}` : item.increaseValue }}
              </view>
            </view>
            <view class="line-half"></view>
          </view>
        </view>
      </view>
    </ZPazing>
  </view>
</template>
<script>
import { getPiecesList } from '@/api/challenge';
import { parseTime } from '@/utils';
// import MescrollVue from 'mescroll.js/mescroll.vue';
// import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import ZPazing from '@/uni_modules/z-paging/components/z-paging/z-paging.vue';
import ZPagingMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin';
import { mapGetters } from 'vuex';
export default {
  components: { ZPazing },
  mixins: [ZPagingMixin],
  data() {
    return {
      stopShare: true,
      parseTime,
      list: [],
      mescroll: null,
    };
  },
  onShow() {
    if (parseInt(this.terminalType, 10) === 2 || parseInt(this.terminalType, 10) === 3) {
      JsCallSystemTitle.postMessage('碎片明细');
    }
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
        const { data } = await getPiecesList(pages);
        this.$refs.paging.complete(data.list);
      } catch (e) {
        this.$refs.paging.complete(false);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.detail {
  background: #f8f8f8;
  color: #47433a;
  min-height: 100vh;
  .detail-scroll {
    padding: 16px 15px;
  }
  .detail-box {
    background: #ffffff;
    border-radius: 15px;
    padding: 0 15px;
  }
  .wrapper {
    padding: 10px 0;
    .wrapper-left {
      font-weight: bold;
      font-size: 14px;
      .text {
        font-size: 12px;
        font-weight: 400;
        color: #bcb9af;
      }
    }
    .wrapper-right {
      font-weight: bold;
      color: #f25959;
    }
    .decrease {
      color: #48e6a0;
    }
  }
}
</style>
