<template>
  <view class="ins">
    <scroll-view :scroll-y="true">
      <view class="item-wrapper">
        <view v-for="(item, index) in data" :key="index" class="in" @click="$emit('chooseed', item)">
          <view class="text line-half ellipsis">{{ item.occupationName }}</view>
        </view>
      </view>
    </scroll-view>
    <view class="in">
      <view class="text close" @click="$emit('popClose')">取消</view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      //'公务员', '公司职员', '自由工作者', '在校学生'
      // items: [
      //   { occupationId: 1, occupationName: '公务员' },
      //   { occupationId: 2, occupationName: '公司职员' },
      // ],
    };
  },
};
</script>
<style lang="scss" scoped>
.ins {
  background-color: white;
  border-radius: 15px 15px 0px 0px;
  text-align: center;
  .in {
    font-size: 14px;
    color: #161413;
  }
  .text {
    padding: 19px 0;
    display: inline-block;
    width: 200px;
    &.close {
      color: #8e8c86;
    }
  }
  .item-wrapper {
    max-height: 210px;
    // overflow: scroll;
  }
}
</style>
