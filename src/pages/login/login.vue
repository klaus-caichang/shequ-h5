<!-- 默认优先手机验证码登录-->
<template>
  <tz-login
    :apiFixParams="apiFixParams"
    :query="query"
    :redirect="query.redirect || redirect"
    @loginSuccess="loginSuccess"
  />
</template>
<script>
import Login from '@tzfe/tz-mobile-ui/packages/login/src/login.vue';
import '@tzfe/tz-mobile-ui/packages/login/style/index';
import { SET_USERINFO, SET_USERID, SET_TOKEN } from '@/store/types';
export default {
  components: {
    TzLogin: Login,
  },
  data() {
    return {
      // 调用api接口时需要传的固定参数
      apiFixParams: {
        env: process.env.VUE_APP_EXEC_ENV, // 环境：test|fat|pre|prod，判断调用哪个环境的接口
        header: {
          productId: 1005, // 产品编码
        },
        query: {
          channel: this.$store.getters.channel,
        },
      },
      redirect: '/', // 登录成功后跳转的页面
      query: {}, // 路由参数
    };
  },
  onLoad(query) {
    this.query = query; // 将路由参数传递也组件
  },
  methods: {
    loginSuccess({ userInfo, token }) {
      // this.$store.commit(SET_USERINFO, userInfo);
      this.$store.commit(SET_USERID, userInfo.uid);
      this.$store.commit(SET_TOKEN, token)
      this.$store.dispatch('getUserInfo');
      console.log('this.$store', this.$store)
    },
  },
};
</script>
