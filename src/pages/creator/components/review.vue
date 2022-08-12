<template>
  <view class="review">
    <view class="title">确认填写无误，资料提交后不可修改</view>
    <view class="input">{{ data.nick }}</view>
    <view class="input">{{ data.occupationName }}</view>
    <view class="input">{{ data.interest }}</view>
    <view class="input last">{{ data.mobile }}</view>
    <view class="btn-wrapper">
      <view class="btn cancel" @click="$emit('popClose')">取消</view>
      <view class="btn conform" @click="confirm">确认提交</view>
    </view>
  </view>
</template>
<script>
import { addUsrCreatorApply } from '@/api/creator';

export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  methods: {
    async confirm() {
      try {
        this.$statistic({
          event_id: 'SQX-0026-E0001',
          event_name: '内容创作者申请按钮点击事件',
        });
        await addUsrCreatorApply(this.data);
        this.$emit('updatePop');
      } catch (e) {
        this.$toast('提交失败，请稍后再试');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.review {
  padding: 22px 22px 40px 22px;
  background-color: white;
  border-radius: 8px;
  .title {
    font-size: 17px;
    color: #47433a;
    text-align: center;
    font-weight: bolder;
    margin-bottom: 22px;
  }
  .input {
    width: 277px;
    height: 40px;
    line-height: 40px;
    background: #f8f8f8;
    padding-left: 15px;
    border-radius: 20px;
    font-size: 14px;
    color: #161413;
    border: 1px solid #f8f8f8;
    margin-bottom: 14px;
    &.last {
      margin-bottom: 20px;
    }
  }
  .btn-wrapper {
    text-align: center;
    > .btn {
      font-size: 14px;
      text-align: center;
      color: #161413;
      border-radius: 21px;
      display: inline-block;
      &.cancel {
        padding: 8px 32px;
        border: 1px solid #f5f5f5;
        margin-right: 20px;
      }
      &.conform {
        padding: 8px 35px;
        background: #fff100;
      }
    }
  }
}
</style>
