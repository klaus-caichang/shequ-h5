import request from '@/utils/request';
import { DOMAINS } from '@/utils/config';

const OPEN = `${DOMAINS.OPEN}/api`;
// 获取内容投诉类型
export function getContentComplaintType() {
  return request.get({
    url: `${OPEN}/operation/contentComplaint/listContentComplaintType`,
  });
}
// 获取用户投诉类型
export function getUserComplaintType() {
  return request.get({
    url: `${OPEN}/operation/userComplaint/listUserComplaintType`,
  });
}

//投诉内容
export function addContentComplaint(data) {
  return request.post({
    url: `${OPEN}/operation/contentComplaint/add`,
    data,
  });
}

//投诉用户
export function addUserComplaint(data) {
  return request.post({
    url: `${OPEN}/operation/userComplaint/add`,
    data,
  });
}
