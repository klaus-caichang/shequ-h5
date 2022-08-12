<!-- tab组件: <me-tabs v-model="tabIndex" :tabs="tabs" @change="tabChange"></me-tabs> -->
<template>
  <view class="me-tabs" :class="{ 'tabs-fixed': fixed }">
    <scroll-view
      v-if="tabs.length"
      :id="viewId"
      :scroll-left="scrollLeft"
      scroll-x
      scroll-with-animation
      :scroll-animation-duration="300"
    >
      <view class="tabs-item" :class="{ 'tabs-flex': !isScroll, 'tabs-scroll': isScroll }">
        <!-- tab -->
        <view
          class="tab-item"
          :style="{
            width: tabWidthVal,
            height: tabHeightVal,
            'line-height': tabHeightVal,
            'font-size': value === i ? activeSize : inactiveSize,
            color: value === i ? activeColor : inactiveColor,
          }"
          v-for="(tab, i) in tabs"
          :class="{ active: value === i, border: i === 1 && !tabsLine }"
          :key="i"
          @click.stop="tabClick(i)"
        >
          {{ getTabName(tab) }}
        </view>
        <!-- 下划线 -->
        <view class="tabs-line" v-if="tabsLine" :style="{ left: lineLeft }"></view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  props: {
    tabs: {
      // 支持格式: ['全部', '待付款'] 或 [{name:'全部'}, {name:'待付款'}]
      type: Array,
      default() {
        return [];
      },
    },
    nameKey: {
      // 取name的字段
      type: String,
      default: 'name',
    },
    value: {
      // 当前显示的下标 (使用v-model语法糖: 1.props需为value; 2.需回调input事件)
      type: [String, Number],
      default: 0,
    },
    fixed: Boolean, // 是否悬浮,默认false
    tabWidth: Number, // 每个tab的宽度,默认不设置值,为flex平均分配; 如果指定宽度,则不使用flex,每个tab居左,超过则水平滑动(单位默认rpx)
    height: {
      // 高度,单位rpx
      type: Number,
      default: 66,
    },
    activeSize: {
      //选中字体大小
      type: [String, Number],
      default: '14px',
    },
    inactiveSize: {
      //未选中字体大小
      type: [String, Number],
      default: '14px',
    },
    activeColor: {
      //选中字体颜色
      type: String,
      default: '#161413',
    },
    inactiveColor: {
      // 未选中字体颜色
      type: String,
      default: '#161413',
    },
    tabsLine: {
      // 是否显示下划线
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      viewId:
        'id_' +
        Math.random()
          .toString(36)
          .substr(2, 16),
      scrollLeft: 0,
    };
  },
  computed: {
    isScroll() {
      return this.tabWidth && this.tabs.length; // 指定了tabWidth的宽度,则支持水平滑动
    },
    tabHeightPx() {
      return uni.upx2px(this.height);
    },
    tabHeightVal() {
      return this.tabHeightPx + 'px';
    },
    tabWidthPx() {
      return uni.upx2px(this.tabWidth);
    },
    tabWidthVal() {
      return this.isScroll ? this.tabWidthPx + 'px' : '';
    },
    lineLeft() {
      if (this.isScroll) {
        return this.tabWidthPx * this.value + this.tabWidthPx / 2 + 'px'; // 需转为px (用rpx的话iOS真机显示有误差)
      } else {
        return (100 / this.tabs.length) * (this.value + 1) - 100 / (this.tabs.length * 2) + '%';
      }
    },
  },
  watch: {
    tabs() {
      this.warpWidth = null; // 重新计算容器宽度
      this.scrollCenter(); // 水平滚动到中间
    },
    value() {
      this.scrollCenter(); // 水平滚动到中间
    },
  },
  methods: {
    getTabName(tab) {
      return typeof tab === 'object' ? tab[this.nameKey] : tab;
    },
    tabClick(i) {
      if (this.value != i) {
        this.$emit('input', i);
        this.$emit('change', i);
      }
    },
    async scrollCenter() {
      if (!this.isScroll) return;
      if (!this.warpWidth) {
        // tabs容器的宽度
        let rect = await this.initWarpRect();
        this.warpWidth = rect ? rect.width : uni.getSystemInfoSync().windowWidth; // 某些情况下取不到宽度,暂时取屏幕宽度
      }
      let tabLeft = this.tabWidthPx * this.value + this.tabWidthPx / 2; // 当前tab中心点到左边的距离
      let diff = tabLeft - this.warpWidth / 2; // 如果超过tabs容器的一半,则滚动差值
      this.scrollLeft = diff;
      // #ifdef MP-TOUTIAO
      this.scrollTimer && clearTimeout(this.scrollTimer);
      this.scrollTimer = setTimeout(() => {
        // 字节跳动小程序,需延时再次设置scrollLeft,否则tab切换跨度较大时不生效
        this.scrollLeft = Math.ceil(diff);
      }, 400);
      // #endif
    },
    initWarpRect() {
      return new Promise(resolve => {
        setTimeout(() => {
          // 延时确保dom已渲染, 不使用$nextclick
          let query = uni.createSelectorQuery();
          // #ifndef MP-ALIPAY
          query = query.in(this); // 支付宝小程序不支持in(this),而字节跳动小程序必须写in(this), 否则都取不到值
          // #endif
          query
            .select('#' + this.viewId)
            .boundingClientRect(data => {
              resolve(data);
            })
            .exec();
        }, 20);
      });
    },
  },
  mounted() {
    this.scrollCenter(); // 滚动到当前下标
  },
};
</script>

<style lang="scss" scoped>
.me-tabs {
  position: relative;
  font-size: 17px;
  box-sizing: border-box;
  overflow-y: hidden;
  &.tabs-fixed {
    z-index: 1;
    position: fixed;
    top: var(--window-top);
    left: 0;
    width: 100%;
  }

  .tabs-item {
    position: relative;
    white-space: nowrap;
    //padding-bottom: 30rpx; // 撑开高度,再配合me-tabs的overflow-y: hidden,以达到隐藏滚动条的目的
    box-sizing: border-box;
    .tab-item {
      position: relative;
      text-align: center;
      box-sizing: border-box;
      &.active {
        font-weight: bold;
        color: #161413;
        font-size: 20px;
      }
      &.border:after {
        position: absolute;
        content: '';
        background-color: #e5e4e4;
        display: block;
        height: 100%;
        width: 1px; /*no*/
        transform: scale(1, 0.5);
        top: 0;
        left: 0;
      }
    }
  }

  // 平分的方式显示item
  .tabs-flex {
    display: flex;
    .tab-item {
      flex: 1;
    }
  }
  // 居左显示item,支持水平滑动
  .tabs-scroll {
    .tab-item {
      display: inline-block;
    }
  }

  // 选中tab的线
  .tabs-line {
    z-index: 1;
    position: absolute;
    bottom: 0rpx; // 至少与.tabs-item的padding-bottom一致,才能保证在底部边缘
    width: 40rpx;
    height: 8rpx;
    transform: translateX(-50%);
    border-radius: 4rpx;
    transition: left 0.3s;
    background: #ff8f00;
  }
}
</style>
