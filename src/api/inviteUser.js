import request from '@/utils/request';
import { DOMAINS } from '@/utils/config';

const OPEN = `${DOMAINS.OPEN}/api`;

// 根据手机号查询用户信息
export function inviteQueryUserInfo(data) {
  return request.get({
    url: `${OPEN}/operation/invite/queryUserInfo`,
    data,
  });
}
// 新增邀请
export function addInvite(data) {
  return request.post({
    url: `${OPEN}/operation/invite/addInvite`,
    data,
  });
}
export function getAndroidClient(data) {
  return request.post({
    url: `${OPEN}/operation/invite/addInvite`,
    data,
  });
}
