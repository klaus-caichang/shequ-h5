<template>
  <tz-reset-password :phone="query.phone" :code="query.code" />
</template>
<script>
import ResetPassword from '@tzfe/tz-mobile-ui/packages/resetPassword/src/resetPassword.vue';
import '@tzfe/tz-mobile-ui/packages/resetPassword/style/index';
export default {
  components: {
    TzResetPassword: ResetPassword,
  },
  data() {
    return {
      query: {}, // 路由参数
    };
  },
  onLoad(query) {
    this.query = query; // 将路由参数传递也组件
  },
};
</script>
