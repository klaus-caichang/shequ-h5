import request from '@/utils/request';
import { DOMAINS } from '@/utils/config';

const OPEN = `${DOMAINS.OPEN}/api`;
const UDB = `${DOMAINS.UDB}/api`;
const NTC = `${DOMAINS.NTC}/api`;

const udbWechatScheme = `${UDB}/udb/wechat/applet/scheme`;
const userFirstVisit = `${OPEN}/user/user/userFirstVisit`;
const contentAndCommtentNum = `${OPEN}/content/content/contentAndCommtentNum`;
const getQuestionnaireUrl = `${OPEN}/operation/activity/hwy/getQuestionnaireUrl`;
const selectCourse = `${OPEN}/operation/activity/hwy/selectCourse`;
const getUserCourse = `${OPEN}/operation/activity/hwy/getUserCourse`;
const courseDetail = `${NTC}/marketing/goods/pc/course/detail`;
export const dataReceive = `${DOMAINS.DATA}/data-collect/common/receive`;

export function getUdbWechatScheme(data) {
  return request.post({
    url: udbWechatScheme,
    data,
    header: {
      'content-type': 'application/json'
    }
  });
}
export function getUserFirstVisit(data) {
  return request.get({
    url: userFirstVisit,
    data
  });
}
export function getContentAndCommtentNum(data) {
  return request.get({
    url: contentAndCommtentNum,
    data
  });
}
export function getQuestionnaireUrlLink(data) {
  return request.get({
    url: getQuestionnaireUrl,
    data
  });
}
export function getUserCourseData(data) {
  return request.get({
    url: getUserCourse,
    data
  });
}
export function getCourseDetail(data) {
  return request.get({
    url: courseDetail,
    data
  });
}
export function getSelectCourse(data) {
  return request.post({
    url: selectCourse,
    data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  });
}
