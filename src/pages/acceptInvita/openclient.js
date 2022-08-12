// import { getAndroidClient } from './interface';
// import { IS_MOBILE_OR_TABLET } from '@/renderer/constants';
import { isWeixin, isInWXWork } from '@/utils/env';
const defaultConfig = {
  adrScheme: 'getonce://com.tzedu.getonce',
  adrClientId: '16',
  iosScheme: 'getonce://',
  iosAddress: 'https://apps.apple.com/cn/app/get%E4%B8%80%E4%B8%8B-%E5%9C%A8%E7%BA%BF%E5%AD%A6%E4%B9%A0%E4%BA%A4%E6%B5%81%E7%A4%BE%E5%8C%BA/id1580664908',
  timeout: 2500,
};

const downloadApp = url => {
  if (url) window.open(url, '_blank');
};

const openclient = async (IS_iOS, config) => {
  const appConfig = config
    ? {
      ...defaultConfig,
      ...config,
    }
    : defaultConfig;

  let downloadUrl;
  let scheme;
  if (IS_iOS) {
    downloadUrl = appConfig.iosAddress;
    scheme = appConfig.iosScheme;
  } else if (isWeixin || isInWXWork) {
    window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.tzedu.getonce'
  } else {
    // 5 - 手机网页， 4 - PC网页
    // const { version } = await getAndroidClient({
    //   terminalType: IS_MOBILE_OR_TABLET ? 5 : 4,
    //   clientId: appConfig.adrClientId,
    // });
    downloadUrl = `market://details?id=com.tzedu.getonce`;
    scheme = `${appConfig.adrScheme}`;
  }

  if (!scheme || IS_iOS) {
    downloadApp(downloadUrl);
    return;
  }

  const ifr = document.createElement('iframe');

  ifr.src = scheme;
  ifr.style.display = 'none';
  ifr.setAttribute('target', 'self');
  document.body.appendChild(ifr);

  setTimeout(() => {
    document.body.removeChild(ifr);
  });

  const t = setTimeout(() => {
    downloadApp(downloadUrl);
  }, appConfig.timeout);

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      // 成功打开APP
      clearTimeout(t);
    }
  });
};

export default openclient;
