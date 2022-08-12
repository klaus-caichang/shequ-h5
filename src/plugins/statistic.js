import store from '@/store';
import { version } from '../../package.json';
import statistic, { report } from '@tzfe/uni-statistic';
import { dataReceive } from '@/api/common'; // 埋点上报
import { getUniqueId } from '@/utils/index';
// uni-statistic 使用文档：http://git.tanzk.cn/frontend/common-plugins/uni-statistic/blob/master/README.md

// 设置device_id, 因为获取不到设备id, 只能自己生成, 存到locaStorage中。
let device_id = uni.getStorageSync('DEVICE_ID');
if (!device_id) {
  device_id = getUniqueId();
  uni.setStorageSync('DEVICE_ID', device_id);
}

export default {
  install(Vue) {
    Vue.use(statistic, {
      terminal: 5,
      url: dataReceive,
      version,
      platform: 'h5',
      productId: 1005,
      terminalType: 5,
    });
    // 安装插件
    Vue.prototype.$statistic = async function(params) {
      const { event_id: id, event_name: name } = params;
      report(
        Object.assign(params, {
          device_id,
          token: store.getters.token || '',
          userId: store.getters.userId || '',
          channel: store.getters.channel,
        })
      );
    };
  },
};
