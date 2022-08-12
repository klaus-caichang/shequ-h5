<template>
  <tz-bind-phone
    :bindType="query.bindType"
    :ticket="query.ticket || query.token"
    :redirect="query.redirect"
    @loginSuccess="loginSuccess"
  />
</template>
<script>
import BindPhone from '@tzfe/tz-mobile-ui/packages/bindPhone/src/bindPhone.vue';
import '@tzfe/tz-mobile-ui/packages/bindPhone/style/index';
import { SET_USERINFO, SET_USERID } from '@/store/types';
export default {
  components: {
    TzBindPhone: BindPhone,
  },
  data() {
    return {
      query: {}, // 路由参数
    };
  },
  onLoad(query) {
    this.query = query; // 将路由参数传递也组件
  },
  methods: {
    loginSuccess({ userInfo }) {
      this.$store.commit(SET_USERINFO, userInfo);
      this.$store.commit(SET_USERID, userInfo.uid);
    },
  },
};
</script>
