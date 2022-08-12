<template>
  <view class="vote-popup">
    <view class="header flex flex-center flex-middle">
      <image class="img" src="@/static/artFestival/header-vote.png" mode="widthFix" />
    </view>
    <view class="user-info flex flex-center flex-middle">
      <view class="avator">
        <Avator :imgUrl="user.authorHeadIcon" noBor :vUrl="user.userIdentityIcon" />
      </view>
      <view class="info">
        <view class="name">{{ user.authorBbsNick }}</view>
        <view class="des flex">
          <view class="teacher" v-if="user.teacherNick">
            导师：{{ user.teacherNick }}
          </view>
          <view class="votes">票数：<span>{{ user.votesNumber }}</span></view>
        </view>
      </view>
    </view>
    <view class="tip flex flex-center">
      <view class="tip-box"></view>
    </view>
    <view class="input-box flex flex-center">
      <input v-model="voteNum" class="inp" type="number" placeholder="请输入票数" />
      <view class="btn plus flex flex-center flex-middle" @click="plusAction">
        <image class="img" src="@/static/artFestival/plus.png" />
      </view>
      <view class="btn reduce flex flex-center flex-middle" @click="reduceAction">
        <image class="img" src="@/static/artFestival/reduce.png" />
      </view>
    </view>
    <view class="tip-txt">可用投票券<span>{{ surplusVoteTicket }}</span>张</view>
    <view class="btns flex flex-center">
      <image class="vote" src="@/static/artFestival/btn-vote.png" @click="voteAction" />
      <view class="cancel" @click="close">取消</view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import Avator from '@/components/avator/avator.vue'
import { votePush, queryUserSurplusVoteTicket } from '@/api/artFestival.js'
export default {
  components: { Avator },
  props: {
    // 得票用户信息
    user: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // 投票数
      voteNum: null,
      // 当前票数
      currentVotes: 0,
      // 剩余票数
      surplusVoteTicket: 0,
    }
  },
  watch: {
    voteNum(val) {
      if(val) {
        if (/(^[1-9]\d*$)/.test(val)) {
          if (val > 100) {
            this.$nextTick(() => {
              this.voteNum = 100;
            });
            this.$toast('提示：最多投100票');
            return
          }
          if (val > this.surplusVoteTicket) {
            this.$nextTick(() => {
              this.voteNum = this.surplusVoteTicket;
            });
            this.$toast('提示：投票券不够');
          } else {
            if (toString(val).includes('.')) {
              this.$nextTick(() => {
                this.voteNum = this.voteNum.split('.')[0];
              });
            };
          }
        } else {
          this.$nextTick(() => {
            this.voteNum = '';
          });
          this.$toast('提示：请输入正整数');
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.queryUserSurplusVoteTicket();
  },
  methods: {
    // 加票
    plusAction() {
      if (this.voteNum === null) this.voteNum = 0;
      if (this.voteNum < this.surplusVoteTicket) this.voteNum++;
      else this.$toast('提示：票数不够');
    },
    // 获取可用票数
    async queryUserSurplusVoteTicket() {
      const { data } = await queryUserSurplusVoteTicket();
      console.log('票数', data);
      this.surplusVoteTicket = data.surplusVoteTicket;
    },
    // 减票
    reduceAction() {
      if (this.voteNum > 0) this.voteNum--;
      else this.voteNum = 0;
    },
    // 关闭弹窗
    close() {
      this.$emit('close');
    },
    // 投票
    voteAction() {
      if (this.voteNum) {
        const { rankingsId, contentId } = this.user;
        votePush({
          acquireNum: this.voteNum,
          objId: contentId,
          rankingsId: rankingsId,
          voteUserId: this.userInfo.uid
        }).then(({ data }) => {
          if (data) {
            this.$emit('sucAction', this.voteNum);
          }
        }).catch(({ message }) => {
          this.$toast(message);
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.vote-popup {
  width: 297px;
  height: 315px;
  background: #ffffff;
  border-radius: 15px;
  color: #47433A;
  font-size: 12px;
  .header {
    height: 62px;
    .img {
      width: 184px;
    }
  }
  .user-info {
    width: 100%;
    height: 50px;
    .avator {
      margin-right: 13px;
      width: 50px;
      height: 50px;
    }
    .info {
      font-size: 12px;
      .name {
        margin-bottom: 5px;
        font-size: 14px;
        font-weight: bold;
        color: #161413;
      }
      .des {
        .teacher {
          margin-right: 15px;
        }
        .votes {
          span {
            color: #F25959;
          }
        }
      }
    }
  }
  .tip {
    margin: 15px 0 8px;
    &-box {
      width: 231px;
      height: 30px;
      background: url('@/static/artFestival/tip1.png') no-repeat;
      background-size: cover;
    }
  }
  .input-box {
    position: relative;
    margin: 0 auto;
    width: 242px;
    .inp {
      width: 242px;
      height: 42px;
      background: #f8f8f8;
      border: 1px solid #bcb9af;
      border-radius: 10px;
      text-align: center;
      font-size: 14px;
    }
    .btn {
      position: absolute;
      top: 0;
      width: 42px;
      height: 42px;
      background: #f8f8f8;
      border: 1px solid #bcb9af;
      .img {
        width: 24px;
        height: 24px;
      }
    }
    .plus {
      right: 0;
      border-radius: 0 10px 10px 0;
    }
    .reduce {
      left: 0;
      border-radius: 10px 0 0 10px;
    }
  }
  .tip-txt {
    margin-top: 10px;
    text-align: center;
    span {
      color: #F25959;
    }
  }
  .btns {
    margin-top: 21px;
    .vote {
      margin-right: 38px;
      width: 105px;
      height: 40px;
    }
    .cancel {
      width: 91px;
      line-height: 36px;
      background: #f1f1ed;
      border: 2px solid #000000;
      border-radius: 10px;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
    }
  }
}
</style>
