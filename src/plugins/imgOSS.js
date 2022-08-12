const OSSURL = 'https://frontend-static-cdn.shiguangkey.com/tz-community-h5/images/';
const OSSURLMP = 'https://frontend-static-cdn.shiguangkey.com/tz-community-mp/images/';
const OSSURLPC = 'https://tzedu-hd02-frontend-oss-bucket01.oss-cn-shanghai.aliyuncs.com/tz-community-pc/images/'
export default {
  install(Vue) {
    Vue.prototype.$oss = url => {
      return OSSURL + url;
    };
    Vue.prototype.$ossmp = url => {
      return OSSURLMP + url;
    };
    Vue.prototype.$osspc = url => {
      return OSSURLPC + url;
    };
  },
};
