// 圈子相关接口
import request from '@/utils/request';
import { DOMAINS } from '@/utils/config';
const OPEN = `${DOMAINS.OPEN}/api`;

/**
 * 首页-最新列表
 */
export function contentNewList(data) {
  return request.get({
    url: `${OPEN}/content/content/contentNewList`,
    data,
  });
}

/**
 * 首页-圈子精选
 */
export function circleSelect(data) {
  return request.get({
    url: `${OPEN}/content/content/circleSelect`,
    data,
  });
}

/**
 * ‘关注/取消关注’圈子
 */
export function circleFollow(data) {
  return request.put({
    url: `${OPEN}/user/userCircle/followCircle`,
    data,
  });
}

/**
 * 首页-热门圈子列表
 */
export function getHotCircleList(data) {
  return request.get({
    url: `${OPEN}/content/circle/getHotCircleList`,
    data,
  });
}
/**
 * 发现圈子-圈子分类列表 获取分类ID
 */
export function getCircleTypeList() {
  return request.get({
    url: `${OPEN}/content/circle/getCircleTypeList`,
  });
}

/**
 * 发现圈子-根据圈子分类ID查询圈子列表
 */
export function getCircleListByTypeIdine(data) {
  return request.get({
    url: `${OPEN}/content/circle/getCircleListByTypeId`,
    data,
  });
}
/**
 * 选择圈子-我关注的圈子列表
 */
export function mineCircle(data) {
  return request.get({
    url: `${OPEN}/user/userCircle/mineCircle`,
    data
  });
}

/**
 * 圈子详情
 */
export function getCircleDetail(data) {
  return request.get({
    url: `${OPEN}/content/circle/getCircleDetails`,
    data,
  });
}
/**
 * 圈子轮播
 */
export function getCircleSwipers(data) {
  return request.get({
    url: `${OPEN}/message/broadcast/pageListBroads`,
    data,
  });
}
/**
 * 圈子-最新/最热列表
 */
export function getCircleInnerList(data) {
  return request.get({
    url: `${OPEN}/content/content/circleContentList`,
    data,
  });
}

/**
 * 发布-选择圈子-热门圈子列表
 */
export function getCreatCircleHotList() {
  return request.get({
    url: `${OPEN}/content/circle/getHotCircleAllList`,
  });
}
/**
 * 发布-默认前3热门圈子
 */
export function getCircleHotThirdList() {
  return request.get({
    url: `${OPEN}/content/circle/getThreeCircleList`,
  });
}
