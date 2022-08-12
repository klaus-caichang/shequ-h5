import Vue from 'vue';
import { getUserInfo, bbsUserInfo } from '@/api/common';
import { SET_TOKEN, SET_BROWSER_ENV, SET_ISAPP, SET_USERID, SET_USERINFO, SET_TERMINALTYPE } from '../types';
// 浏览器环境的值
export const WX_ENV = 1; // wx网页
export const APP_ENV_ANDROID = 2; // 安卓
export const APP_ENV_IOS = 3; // ios
export const BROWS_ENV = 4; // PC
export const MOBILE_ENV = 5; // H5
export const BROWS_WEIXIN = 6; // 微信小程序

import { webViewCall } from '@tzfe/plugin-common-util';
import { isWeixin, isMobile } from '@/utils/env';
const routeInfo = () => {
  return {
    routeInfo: {
      method: 'redirectTo',
      url: '/pages/login/index',
    },
  };
};
const AndroidLogin = () => {
  webViewCall({
    ...routeInfo(),
    method: 'JsCallToLogin',
    platform: 2,
  });
};
const IosLogin = () => {
  webViewCall({
    ...routeInfo(),
    className: 'TZLoginTypeController',
    platform: 3,
  });
};

const WeixinLogin = backUrl => {
  /* eslint-disable */
  jWeixin.miniProgram.navigateTo({ url: `/pages/login/index?redirect=${backUrl}` });
};

const BrowserLogin = backUrl => {
  uni.redirectTo({
    url: `/pages/login/login?redirect=${backUrl}&cancel=${backUrl}`,
  });
};

export default {
  state: {
    token: '',
    browserEnv: 0, // 值不确定，在utils/config中配置
    userId: '',
    clickFind: false, // 是否点击发现按钮
    userInfo: {},
    terminalType: null,
  },
  mutations: {
    [SET_TOKEN](state, token) {
      console.log('SET_TOKEN', token);
      state.token = token;
      // uni.setStorageSync('TOKEN', token);
    },
    [SET_BROWSER_ENV](state, number) {
      state.browserEnv = number;
    },
    [SET_ISAPP](state, clickFind) {
      state.clickFind = clickFind;
    },
    [SET_USERID](state, userId) {
      state.userId = userId;
    },
    [SET_USERINFO](state, userInfo) {
      state.userInfo = userInfo;
    },
    [SET_TERMINALTYPE](state, terminalType) {
      state.terminalType = parseInt(terminalType, 10);
    },
  },
  actions: {
    toLogin({ rootState }, backUrl = '') {
      const routes = getCurrentPages(); // 获取当前打开过的页面路由数组
      // const curRoute = routes[routes.length - 1].route;
      // const { query } = routes.options;
      // const url = encodeURIComponent(backUrl || `${curRoute}?${qs.stringify(query)}`); // curRoute + location.search;
      const url = encodeURIComponent(backUrl || routes[routes.length - 1].__page__.fullPath);
      // 每次登录时需要保存什么端登录对应的值
      const browserEnv = rootState.auth.browserEnv; // 判断当前页面处于的环境。
      switch (browserEnv) {
        case 1:
          BrowserLogin(url);
          break; // 微信网页登入
        case 2:
          AndroidLogin();
          break; // 潭州课堂安卓登入
        case 3:
          IosLogin();
          break; // 潭州课堂IOS登入
        case 5:
          BrowserLogin(url);
          break; // h5登入
        case 6:
          WeixinLogin(url);
          // BrowserLogin(url);
          break; // 社区小程序登入
        case 7:
        case 8:
          JsCallLogin.postMessage('');
          break; // 社区app登录
        default:
          BrowserLogin(url); // 网页登入
      }
    },
    setBrowserEnv({ commit }, type) {
      if (type) {
        if (type === 2) {
          // 安卓 2
          commit(SET_BROWSER_ENV, APP_ENV_ANDROID);
        } else if (type === 3) {
          // ios 3
          commit(SET_BROWSER_ENV, APP_ENV_IOS);
        } else if (type === 5) {
          // 微信 5
          commit(SET_BROWSER_ENV, BROWS_WEIXIN);
        } else if (type === 7 || type === 8 || type === 6) {
          // 7: 社区app 安卓; 8: 社区app ios 6: 小程序
          commit(SET_BROWSER_ENV, type);
        }
      } else if (isWeixin) {
        commit(SET_BROWSER_ENV, WX_ENV);
      } else if (isMobile) {
        commit(SET_BROWSER_ENV, MOBILE_ENV);
      } else {
        commit(SET_BROWSER_ENV, BROWS_ENV);
      }
    },
    async getUserInfo({ commit, state }) {
      // udb获取用户信息
      getUserInfo().then(({ data }) => {
        const uid = data && data.userDetail && data.userDetail.uid;
        commit(SET_USERID, uid);
        commit(SET_USERINFO, { ...state.userInfo, ...data.userDetail });
      });
      // 社区用户信息
      bbsUserInfo().then(({ data: { bbsNick, bbsMobile, bbsIcon } }) => {
        commit(SET_USERINFO, { ...state.userInfo, bbsNick, bbsMobile, bbsIcon });
      });
    },
  },
};
