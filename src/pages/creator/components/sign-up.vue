<template>
  <view class="sign">
    <view class="img-wrapper"> <image :src="$oss('creator/sign.png')" class="sign-img"/></view>
    <view
      class="form"
      :class="{ short: isAndroid && shortForm }"
      :style="{ height: isAndroid && shortForm ? `${formH}px` : 'auto' }"
      @touchmove.native="touchmove"
    >
      <view class="title">昵称</view>
      <input
        type="text"
        class="input"
        v-model="form.nick"
        :class="{ active: nickError }"
        placeholder="请输入昵称"
        :disabled="true"
        :adjust-position="!isAndroid"
        @focus="focus('nick')"
        @blur="blur('nick')"
        @confirm="confirm"
      />
      <view class="title">职业</view>
      <view class="input select" @click="professionClick" :class="{ active: occupationIdError }">{{
        profession.occupationName
      }}</view>
      <view class="title">兴趣</view>
      <input
        type="text"
        class="input"
        v-model.trim="form.interest"
        :class="{ active: interestError }"
        :disabled="disabled"
        placeholder="请输入兴趣"
        :maxlength="20"
        :adjust-position="!isAndroid"
        @focus="focus('interest')"
        @blur="blur('interest')"
      />
      <view class="title">联系方式</view>
      <input
        type="text"
        class="input"
        v-model.trim="form.mobile"
        :class="{ active: mobileError }"
        :disabled="disabled"
        :maxlength="16"
        :adjust-position="!isAndroid"
        placeholder="请输入联系方式"
        @focus="focus('mobile')"
        @blur="blur('mobile')"
      />
    </view>
  </view>
</template>
<script>
import { REG_PHONE } from '@/utils/regex';
import { _throttle } from '@/utils';
export default {
  props: {
    profession: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      nickError: false,
      interestError: false,
      mobileError: false,
      occupationIdError: false,
      shortForm: false,
      tipMap: {
        nick: '请输入昵称',
        interest: '请输入兴趣',
        mobile: '请输入联系方式',
        occupationId: '请选择职业',
      },
      originHeight: 0,
      isAndroid: false,
      formH: 0,
    };
  },
  watch: {
    'profession.occupationId'(val) {
      Object.assign(this.form, { occupationId: val });
      if (val) this.occupationIdError = false;
    },
  },
  mounted() {
    // ios键盘收起时，输入框会自动失焦，触发blur事件
    const ua = navigator.userAgent.toLocaleLowerCase();
    this.isAndroid = /android/.test(ua);
    if (this.isAndroid) {
      this.originHeight = document.documentElement.clientHeight || document.body.clientHeight;
      window.addEventListener('resize', this.resizeHandler);
    }
  },
  beforeDestroy() {
    if (this.isAndroid) {
      window.removeEventListener('resize', this.resizeHandler);
    }
  },
  onPageScroll(data) {},
  methods: {
    resizeHandler: _throttle(
      function() {
        const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
        // console.log(resizeHeight);
        if (!this.formH) {
          // console.log(this.originHeight, resizeHeight);
          this.formH = this.originHeight - resizeHeight - 80;
        }
        // 键盘收起后逻辑
        if (resizeHeight >= this.originHeight) {
          this.shortForm = false;
          this.$emit('androidInputBlur');
          this.$parent.$parent.$parent.$el.scrollTop = 0;
        } else {
          this.shortForm = true;
          this.$emit('androidInputFocus');
        }
      },
      50,
      { trailing: true }
    ),
    touchmove(e) {
      if (this.isAndroid) e.cancelBubble = this.shortForm; // 阻止事件冒泡
    },
    focus(key) {
      // if (this.isAndroid) {
      //   this.shortForm = true;
      //   this.$emit('androidInputFocus');
      // }
      //
    },
    blur(key) {
      if (this.form[key]) this[`${key}Error`] = false;

      if (this.isAndroid) {
        //   this.shortForm = false;
        //   this.$emit('androidInputBlur');
      }
    },
    confirm() {
      console.log(3333);
    },
    professionClick() {
      if (!this.disabled) this.$emit('popOpen');
    },
    validate() {
      const keys = ['nick', 'occupationId', 'interest', 'mobile'];
      const len = keys.length;
      let valid = true;
      for (let i = 0; i < len; i++) {
        const key = keys[i];
        if (!this.form[key]) {
          this[`${key}Error`] = true;
          this.$toast(this.tipMap[key]);
          valid = false;
          break;
        } else {
          this[`${key}Error`] = false;
        }
      }
      const { mobile } = this.form;
      if (!REG_PHONE.test(mobile)) {
        this.mobileError = true;
        this.$toast('请输入正确的手机号码');
        valid = false;
      }
      return valid;
    },
  },
};
</script>
<style lang="scss" scoped>
.sign {
  width: 345px;
  background: white;
  //   padding-left: 34px;
  padding-bottom: 37px;
  border-radius: 10px;
  > .img-wrapper {
    width: 100%;
    text-align: center;
    > .sign-img {
      width: 227px;
      height: 116px;
    }
  }
  .form {
    padding: 0 34px;
    &.short {
      // height: 210px;
      overflow: scroll;
    }
    .title {
      font-size: 14px;
      color: #47433a;
      padding-left: 10px;
      margin-bottom: 10px;
    }
    .input {
      height: 40px;
      line-height: 40px;
      background: #f8f8f8;
      padding-left: 15px;
      border-radius: 20px;
      font-size: 14px;
      color: #161413;
      border: 1px solid #f8f8f8;
      margin-bottom: 14px;
      &.active {
        border: 1px solid #f25959;
      }
    }
    .select {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        right: 15px;
        top: 17px;
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-top: 7px solid rgba(0, 0, 0, 1);
      }
    }
    ::v-deep .input-placeholder {
      font-size: 14px;
      color: #8e8c86;
    }
  }
}
</style>
