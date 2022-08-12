<template>
  <view class="wrapper">
    <view class="fixed">
      <tab-btns :current="current" @changeTab="current = $event" />
      <view class="rule">
        <!-- <rule-btn @showRule="popOpen('rule')" /> -->
      </view>
    </view>
    <swiper class="swiper" :vertical="true" :current="current" @change="change">
      <swiper-item>
        <view
          class="swiper-item one"
          :style="{ background: `url(${$oss('creator/bg.png')}) no-repeat`, 'background-size': '100% auto' }"
        >
          <image :src="$oss('creator/what.png')" class="img" />
        </view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item two">
          <image :src="$oss('creator/need.png')" class="img-need" />
          <image :src="$oss('creator/good.png')" class="img-good" />
        </view>
      </swiper-item>
      <swiper-item>
        <view class="swiper-item three"> <image :src="$oss('creator/rule.png')" class="img-sign"/></view>
      </swiper-item>
      <!-- <swiper-item>
        <view class="swiper-item four">
          <view class="sing-up">
            <sign-up
              ref="signUp"
              :form="form"
              :profession="profession"
              :disabled="[statusPending, statusPass].includes(form.status)"
              @popOpen="popOpen('profession')"
              @androidInputFocus="blur = false"
              @androidInputBlur="blur = true"
          /></view>
          <tip />
        </view>
      </swiper-item> -->
    </swiper>
    <!--uni-popup 放在swiper里面，层级展示有问题-->
    <uni-popup :type="dialogConfig[dialog]" ref="pop">
      <profession
        v-if="dialog === 'profession'"
        :data="professions"
        @popClose="popClose"
        @chooseed="chooseProfession"
      />
      <success @popClose="popClose" v-if="dialog === 'success'" />
      <review v-if="dialog === 'review'" :data="form" @popClose="popClose" @updatePop="submitSuccess" />
      <rule-detail v-if="dialog === 'rule'" @popClose="popClose" />
    </uni-popup>
    <view class="fixed_bottom">
      <template v-if="current < 2">
        <view class="more">向上滑展示更多</view>
        <view><image :src="$oss('creator/arrow.png')" class="arrow"/></view>
      </template>
      <!-- <view class="block" v-if="form.nick && blur">
        <view class="btn exam" @click="toSignUp" v-if="form.status === statusPending">审核中</view>
        <view class="btn success" v-else-if="form.status === statusPass">审核已通过</view>
        <view class="btn" @click="toSignUp" v-else>我要报名</view>
      </view> -->
    </view>
  </view>
</template>
<script>
/**
 * background: [background-color] | [background-image] | [background-position]/[background-size] | [background-repeat] |
 *             [background-attachment] | [background-clip] | [background-origin]
 */
import { mapGetters } from 'vuex';
import { getRecord, getOccupation } from '@/api/creator';
// import RuleBtn from './components/rule-btn';
import TabBtns from './components/tab-btns';
import SignUp from './components/sign-up';
import Profession from './components/profession';
import Success from './components/success';
import Tip from './components/tip';
import Review from './components/review';
import RuleDetail from './components/rule-detail';
export default {
  components: { TabBtns, SignUp, Profession, Success, Tip, Review, RuleDetail },
  data() {
    return {
      current: 0,
      dialogConfig: {
        profession: 'bottom',
        seccess: 'center',
        review: 'center',
        rule: 'center',
      },
      dialog: '',
      form: {
        nick: '',
        interest: '',
        mobile: '',
        status: null,
      },
      profession: {},
      professions: [], // 职业列表
      statusPending: 0,
      statusPass: 1,
      statusFail: 2, // 0: '待审核', 1: '审核通过'  2: '审核失败',
      blur: true,
    };
  },
  computed: {
    ...mapGetters(['token', 'userInfo']),
  },
  async created() {
    await this.getProfessionList();
    if (this.token) this.getCreatorRecoed();
  },
  mounted() {
    // this.$refs.pop.open();
  },
  methods: {
    // 职业列表
    async getProfessionList() {
      const { data } = await getOccupation();
      this.professions = data;
    },
    // 提交记录
    async getCreatorRecoed() {
      const { bbsNick, bbsMobile } = this.userInfo;
      const { data } = await getRecord();
      if (data && [this.statusPending, this.statusPass].includes(data.status)) {
        this.profession = this.professions.find(({ occupationId }) => data.occupationId === occupationId);
        Object.assign(this.form, data, { nick: bbsNick });
        this.formStatus = data.status;
      } else {
        // 自动展示昵称和电话
        Object.assign(this.form, {
          nick: bbsNick,
          mobile: bbsMobile,
        });
      }
    },
    // tab切换
    change({ detail: { current } }) {
      this.current = current;
    },
    // 选择职业
    chooseProfession(val) {
      this.profession = val;
      this.popClose();
    },
    popOpen(name) {
      this.dialog = name;
      this.$refs.pop.open();
    },
    popClose() {
      this.dialog = '';
      this.$refs.pop.close();
    },
    // 报名
    toSignUp() {
      const last = 3;
      if (this.current !== last) {
        this.current = last;
        return;
      }
      if ([this.statusPending, this.statusFail].includes(this.form.status)) return;
      if (this.$refs.signUp.validate()) {
        Object.assign(this.form, this.profession);
        this.popOpen('review');
      }
    },
    submitSuccess() {
      this.dialog = 'success';
      this.form.status = this.statusPending;
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100%;
  position: relative;
  background: #f8f8f8;
  .fixed {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    z-index: 1;
  }
  .rule {
    text-align: right;
  }
}
.swiper {
  height: 100%;
  .swiper-item {
    height: 100%;
  }
}
.one {
  padding-top: 283px;
  text-align: center;
  .img {
    width: 345px;
    height: 291px;
  }
}
.two {
  padding-top: 60px;
  text-align: center;
  .img-need {
    width: 345px;
    height: 165px;
    margin-bottom: 15px;
  }
  .img-good {
    width: 345px;
    height: 335px;
  }
}
.three {
  padding-top: 60px;
  margin-left: 15px;
  .img-sign {
    width: 345px;
    height: 500px;
  }
}
.four {
  padding-top: 60px;
  margin-left: 15px;
  .sing-up {
    margin-bottom: 24px;
  }
}
.fixed_bottom {
  width: 100%;
  // background: #fdfdfd;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  > .more {
    font-size: 12px;
    color: #ffb700;
  }
  .arrow {
    width: 14px;
    height: 12px;
  }
  > .block {
    background: white;
    padding: 10px 0;
    > .btn {
      display: inline-block;
      background: #fff100;
      border-radius: 25px;
      font-size: 17px;
      font-weight: bold;
      color: #161413;
      letter-spacing: 0.85px;
      padding: 10px 100px;
      &.exam {
        background: #d5d5d5;
        color: white;
      }
      &.success {
        background: #38d7ad;
      }
    }
  }
}
</style>
