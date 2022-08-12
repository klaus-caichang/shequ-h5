import {
  SET_ENV_READY,
  SET_CHANNEL,
  SET_SYSINFO,
} from '../types';

export default {
  state: {
    envReady: false, // 环境是否准备OK
    channel: window.sessionStorage.getItem('CHANNEL') || 0,
    sysInfo: {}, // getSystemInfoSync API获取到的手机信息
    safeAreaBottom: 0, // 底部安全域高度
  },
  mutations: {
    [SET_SYSINFO](state, sysInfo) {
      state.sysInfo = sysInfo;
      if (sysInfo.platform && sysInfo.platform.toLowerCase() === 'ios') {
        state.safeAreaBottom = (sysInfo.safeAreaInsets.bottom / 1.5).toFixed(0);
      }
    },
    [SET_ENV_READY](state, isReady) {
      // 只能从false变成true，也就是只能从未准备=》已准备
      if (isReady) state.envReady = isReady;
    },
    [SET_CHANNEL](state, channel) {
      const id = +channel || 0;
      state.channel = id;
      window.sessionStorage.setItem(CHANNEL_KEY, id);
    },
  },
  actions: {}
};

