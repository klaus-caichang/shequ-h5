import request from '@/utils/request';
import { DOMAINS } from '@/utils/config';

const OPEN = `${DOMAINS.OPEN}/api`;
const UDB = `${DOMAINS.UDB}/api`;

const recommend = `${OPEN}/m/recommend/getcourse`;
// 数据埋点
export const dataReceive = `${DOMAINS.DATA}/data-collect/common/receive`;

export function getRecommend(data) {
  return request.get({
    url: recommend,
    data,
  });
}
/**
 * 首页-验证Token是否有效
 */
export function codeTokenValid(data, token) {
  return request.post({
    url: `${UDB}/udb/login/checkToken`,
    data,
    header: {
      token,
    },
  });
}

// 获取当前登录用户的个人信息
const getUserInfoUrl = `${UDB}/udb/user/mine`;
export function getUserInfo() {
  return request.get({
    url: getUserInfoUrl,
    header: { 'Cache-Control': 'no-cache' },
  });
}
// 获取手机短信验证码
export function getSmscode(data) {
  return request.get({
    url: `${UDB}/udb/verifycode/get/smscode`,
    data,
  });
}
// 获取图型验证码
export function getImagecode(data) {
  return request.get({
    url: `${UDB}/udb/verifycode/get/imagecode`,
    data,
  });
}
// 手机号登录
export function phoneLogin(data) {
  return request.post({
    url: `${UDB}/udb/login/phone/login`,
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data,
  });
}

// 针对于老社区的图片视频音频的宽高处理
export const getMediaListPageUrl = `${DOMAINS.IGEEET}/api/content/oldAudit/getMediaListPage`;

export const updateMediaUrl = `${DOMAINS.IGEEET}/api/content/oldAudit/updateMedia`;

export function getMediaListPage(data) {
  return request.get({
    url: getMediaListPageUrl,
    data,
  });
}

export function updateMedia(data) {
  return request.get({
    url: updateMediaUrl,
    data,
  });
}

export function bbsUserInfo() {
  return request.get({
    url: `${OPEN}/user/user/mine`,
    header: { 'Cache-Control': 'no-cache' },
  });
}
