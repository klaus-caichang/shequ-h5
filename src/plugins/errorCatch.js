export default {
  install(Vue) {
    Vue.config.errorHandler = function(err) {
      console.log('err', err);
      const msg = err && err.msg;
      if (msg) {
        // Vue.prototype.$toast(msg);
        console.log(msg)
      }
    };
  },
};
