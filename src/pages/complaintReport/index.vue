<template>
  <view class="complaint-report">
    <view class="type">
      <view
        :class="{ 'type-item': true, active: type[2] }"
        v-for="type in typeList"
        :key="type[0]"
        @click="select(type[0])"
      >
        {{ type[1] }}</view
      >
    </view>
    <view class="reason">
      <view class="reason-input"
        ><textarea placeholder="请简单描述举报内容，我们将严格审查处理" v-model="reason" :maxlength="300"></textarea
      ></view>
      <view class="count">{{ Math.min(reason.length) }}/300</view>
    </view>
    <view class="bottom">
      <view class="submit-btn submited-btn" v-if="isSubmited">已提交，审核中</view>
      <view class="submit-btn" @click="submitComplaint" v-else>提交</view>
    </view>
  </view>
</template>

<script>
import {
  getContentComplaintType,
  getUserComplaintType,
  addContentComplaint,
  addUserComplaint,
} from '@/api/complaint.js';
export default {
  data() {
    return {
      typeList: [],
      // 提交投诉相关数据
      contentId: null,
      userId: null,
      reason: '',
      type: null,
      isContent: false,
      isSubmited: false,
    };
  },
  // onLoad(option) {
  //   // id(contentId/userId)+type(0/1,0对应举报内容，1对应举报用户)
  //   if (option.type === 1) {
  //     this.getUserComplaintType();
  //     this.userId = option.id;
  //   } else if (option.type === 0) {
  //     this.isContent = true;
  //     this.getContentComplaintType();
  //     this.contentId = option.id;
  //   }
  // },
  methods: {
    async getContentComplaintType() {
      const { data } = await getContentComplaintType();
      this.typeList = Object.entries(data);
    },
    async getUserComplaintType() {
      const { data } = await getUserComplaintType();
      this.typeList = Object.entries(data);
    },
    async submitComplaint() {
      // 要做一个判断看type是什么
      if (this.type === null) {
        this.$toast('请选择举报原因');
        return;
      } else if (!this.reason.trim()) {
        this.$toast('请填写举报描述');
        return;
      }
      try {
        if (this.isContent) {
          await addContentComplaint({
            reason: this.reason,
            type: this.type,
            contentId: this.contentId,
          });
        } else {
          await addUserComplaint({
            reason: this.reason,
            type: this.type,
            userId: this.userId,
          });
        }
        this.$toast('举报成功');
        this.isSubmited = true;
        // finish_widget.postMessage('');
      } catch (err) {
        this.$toast(typeof err === 'object' ? err.message : '操作失败');
      }
      // 提交成功之后要有什么操作吗
    },
    select(typeId) {
      const newList = this.typeList.map(type => {
        if (parseInt(type[0], 10) === parseInt(typeId, 10)) {
          type[2] = true;
        } else {
          type[2] = false;
        }
        return type;
      });
      this.typeList = [...newList];
      this.type = typeId;
    },
  },
  created() {
    // 这里通过判断app跳转传过来的参数来获取举报类型列表
    // this.typeList = Object.entries({ 0: '欺骗', 1: '吸毒', 2: '赌博', 3: '广告' });
    // this.getComplaintType();
    console.log(this.$route);
    const type = parseInt(this.$route.query.type, 10);
    const id = parseInt(this.$route.query.id, 10);
    if (type === 1) {
      this.getUserComplaintType();
      this.userId = id;
    } else if (type === 0) {
      this.isContent = true;
      this.getContentComplaintType();
      this.contentId = id;
    }
  },
};
</script>

<style lang="scss" scoped>
.complaint-report {
  height: 100vh;
  background-color: #f8f8f8;
}
.type {
  width: 100%;
  padding: 5px 7px 15px 15px;
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
}
.type-item {
  width: 80px;
  height: 30px;
  background-color: #f5f5f5;
  border-radius: 15px;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  margin-top: 10px;
  margin-right: 8px;
}
.active {
  background-color: #fff100 !important;
}
.reason {
  font-size: 14px;
  background-color: #fff;
  border-top: 1px solid #f1f1ed;
  border-bottom: 1px solid #f1f1ed;
  padding-bottom: 16px;
  .reason-input {
    padding: 15px;
    uni-textarea {
      font-size: 14px;
      width: 100%;
    }
  }
  .count {
    text-align: right;
    color: #bcb9af;
    padding-right: 10px;
  }
}
.bottom {
  // position: fixed;
  // width: 100%;
  // left: 0;
  // bottom: 0;
  width: 100%;
  height: 49px;
  // background-color: #fff;
  .submit-btn {
    background-color: #fff100;
    height: 32px;
    margin: 9px 15px;
    border-radius: 16px;
    text-align: center;
    line-height: 32px;
    font-size: 14px;
  }
  .submited-btn {
    background-color: #9195a3;
  }
}
</style>
