export default {
  token: state => state.auth.token,
  browserEnv: state => state.auth.browserEnv,
  isWeixin: state => state.auth.browserEnv === 1,
  isAndroid: state => state.auth.browserEnv === 2,
  isIos: state => state.auth.browserEnv === 3,
  isApp: state => state.auth.browserEnv === 2 || state.auth.browserEnv === 3,
  isPc: state => state.auth.browserEnv === 4,
  isMp: state => state.auth.browserEnv === 6,
  isMobile: state => state.auth.browserEnv === 5,
  userId: state => state.auth.userId,
  userInfo: state => state.auth.userInfo,
  envReady: state => state.common.envReady,
  terminalType: state => state.auth.terminalType,
  channel: state => state.common.channel,
  safeAreaBottom: state => state.common.safeAreaBottom, // 底部安全域高度
  sysInfo: state => state.common.sysInfo, // getSystemInfoSync API获取到的手机信息
};
