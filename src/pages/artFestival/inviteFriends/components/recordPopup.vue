<template>
  <view class="record-popup flex flex-column">
    <view class="title">
      邀请记录
      <view class="icon-close flex flex-center flex-middle" @click="close">
        <image class="img" src="@/static/artFestival/close.png" />
      </view>
    </view>
    <view class="list flex-1">
      <MescrollBody
        ref="mescrollRef"
        :up="upOption"
        :down="downProp"
        @down="downCallback"
        @up="upCallback"
        @init="mescrollInit"
      >
        <view class="list-item flex flex-middle" :class="index === recordList.length - 1 && 'no-bor'" v-for="(item, index) in recordList" :key="item.id">
          <view class="avator">
            <Avator :imgUrl="item.beInviterIcon" />
          </view>
          <view class="info">
            <view class="name">{{ item.beInviterNick }}</view>
            <view class="time">{{ item.gmtCreate | formatDate }}</view>
          </view>
        </view>
      </MescrollBody>
    </view>
  </view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue';
import Avator from '@/components/avator/avator.vue'
import { pagelistUserInviteRecords } from '@/api/artFestival.js';
export default {
  name: 'RecordPopup',
  mixins: [ MescrollMixin ],
  components: { Avator, MescrollBody },
  props: {
    userType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      recordList: [],
      upOption: {
        auto: true,
        noMoreSize: 5,
        textColor: '#FFFFFF',
        empty: {
          use : true ,
          icon : '',
          tip : "暂无相关数据",
          btnText : "",
          fixed: false,
          top: "100rpx",
          zIndex: 99
        }
      },
      downProp: {
        native: true, // 禁用下拉
      },
    }
  },
  methods: {
    // 上拉加载 默认一页10行
    async upCallback(page = { num: 1, size: 10 }) {
      const pages = {
        pageIndex: page.num,
        pageSize: page.size,
      };
      try {
        const { data } = await pagelistUserInviteRecords({ ...pages, id: this.userType });
        this.init(data, page);
      } catch (e) {
        this.mescroll.endErr();
      }
    },
    init({ list, totalPage }, page) {
      const len = list.length;
      const total = totalPage;
      if (page.num == 1) this.recordList = [];
      this.recordList = this.recordList.concat(list);
      this.mescroll.endByPage(len, total);
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="less" scoped>
.record-popup {
  width: 262px;
  height: 341px;
  background: #36269E;
  border: 2px solid #000000;
  border-radius: 15px;
  color: #FFFFFF;
  overflow: hidden;
  .icon-close {
    position: absolute;
    right: 8px;
    top: 8px;
    width: 30px;
    height: 30px;
    .img {
      width: 16px;
      height: 16px;
    }
  }
  .title {
    position: relative;
    line-height: 47px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
  }
  .list {
    padding: 0 8px;
    background: #1551E0;
    font-size: 12px;
    &-item {
      padding: 0 8px;
      height: 48px;
      border-bottom: 1px solid #000000;
      .avator {
        margin-right: 7px;
        width: 32px;
        height: 32px;
      }
      .name {
        margin-bottom: 2px;
      }
      .time {
        color: #9EB8F4;
      }
    }
    .no-bor {
      border: 0;
    }
  }
}
</style>
