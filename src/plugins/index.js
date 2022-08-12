import interact from './interact';
import errorCatch from './errorCatch';
import OSS from './imgOSS';
// import statistic, { report } from '@tzfe/uni-statistic';
// import { dataReceive } from '@/api/common';
import statistic from './statistic';
// import { version } from '../../package.json';
// import store from '@/store';
export default {
  install(Vue) {
    Vue.use(interact);
    Vue.use(errorCatch);
    Vue.use(OSS);
    Vue.use(statistic);
    // uni-statistic 使用文档：http://git.tanzk.cn/frontend/common-plugins/uni-statistic/blob/master/README.md
    // Vue.use(statistic, { terminal: 5, url: dataReceive, version });
    // Vue.prototype.$statistic = function(params) {
    //   report(
    //     Object.assign(params, {
    //       // 公共上传字段
    //       token: store.getters.token,
    //       deviceId: '', // string类型，设备id，非必传。 h5项目不传，小程序项目必传，可使用用户的openId作为设备id传入
    //       channel: 10000, // number类型，渠道id，非必传
    //     })
    //   );
    // };
  },
};
