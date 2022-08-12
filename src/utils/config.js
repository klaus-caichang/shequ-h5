const EXEC_ENV = process.env.VUE_APP_EXEC_ENV || 'test';
const ENV = EXEC_ENV === 'prod' ? '' : `-${EXEC_ENV}`;

const getDomain = name => `https://${name}${ENV}.shiguangkey.com`;
const getIgeeet = name => `https://${name}${ENV}.igeeet.com`;
export const BBS = `https://bbs${ENV}.shiguangkey.com`;

// 社区小程序的appid
export const mpAppId = 'wx970941dd2326605d';

// 社区公众号appid
export const publicAppId = 'wxd462b40ddc117184';

// 社区小程序原始id
export const mpAppIdOrigin = 'gh_1761d949c9ce';

export const DOMAINS = {
  STUDY: getDomain('www'),
  OPEN: getIgeeet('api'),
  UDB: getDomain('open'),
  CRM: getDomain('crm'),
  ATTEND: getDomain('attend'),
  DATA: getDomain('data-collect'),
  OCEAN: getDomain('ocean'),
  STATIC: getDomain('res-static'),
  LUBAN: getDomain('luban-api'),
  IGEEET: getDomain('igeeet'),
  NTC: getDomain('ntcapi'),
  OSS: 'https://res.shiguangkey.com',
};

// 小程序里面的欢迎页地址
export const mpWelcomeLink = `${BBS}/pages/wxGuide/index`;
// 邀请好友地址
export const inviteFriendsLink = `${BBS}/pages/acceptInvita/index`;

// 浏览器环境的值
export const WX_ENV = 1;
export const APP_ENV_ANDROID = 2;
export const APP_ENV_IOS = 3;
export const BROWS_ENV = 4;
