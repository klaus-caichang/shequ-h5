<template>
  <tz-forget-password />
</template>
<script>
import ForgetPassword from '@tzfe/tz-mobile-ui/packages/forgetPassword/src/forgetPassword.vue';
import '@tzfe/tz-mobile-ui/packages/forgetPassword/style/index';
export default {
  components: {
    TzForgetPassword: ForgetPassword,
  },
};
</script>
