// 勋章相关接口
import request from '@/utils/request';
import { DOMAINS } from '@/utils/config';
const OPEN = `${DOMAINS.OPEN}/api/operation`;
// const OPEN = 'http://post.tanzk.com/OPEN/595';

/**
 * 用户等级
 * @param {*} data
 * @returns
 * http://post.tanzk.com/project/595/interface/api/78524
 */
export function userLevel(data) {
  return request.put({
    url: `${OPEN}/user/level`,
    data,
  });
}

/**
 * 我的勋章-我的勋章展示位接口
 * @param {*} data
 * @returns
 * http://post.tanzk.com/project/595/interface/api/78314
 */
export function sign(data) {
  return request.put({
    url: `${OPEN}/sign/sign`,
    data,
  });
}

/**
 * 我的勋章-设置勋章展示
 * @param {*} data
 * @returns
 * http://post.tanzk.com/project/595/interface/api/78099
 */
export function setShowMedal(data) {
  return request.put({
    url: `${OPEN}/medal/setShowMedal`,
    data,
  });
}

/**
 * 签到
 * @param {*} data
 * @returns
 * http://post.tanzk.com/project/595/interface/api/78314
 */
export function medalShow(data) {
  return request.get({
    url: `${OPEN}/medal/showPosition`,
    data,
  });
}

/**
 * 用户签到状态查询
 * @param {*} data
 * @returns
 * http://post.tanzk.com/project/595/interface/api/78319
 */
export function querySignStatus(data) {
  return request.get({
    url: `${OPEN}/sign/signStatus`,
    data,
  });
}

/**
 * 用户等级
 * @param {*} data
 * @returns
 * http://post.tanzk.com/project/595/interface/api/78524
 */
export function userLevels(data) {
  return request.put({
    url: `${OPEN}/user/level`,
    data,
  });
}

/**
 * 全部勋章-查询用户获得的勋章个数接口
 * @param {*} data
 * @returns
 * http://post.tanzk.com/project/595/interface/api/78124
 */
export function medalNum(data) {
  return request.get({
    url: `${OPEN}/medal/medalNum`,
    data,
  });
}

/**
 * 全部勋章-查询用户社区注册天数接口
 * @param {*} data
 * @returns
 * http://post.tanzk.com/project/595/interface/api/78129
 */
export function registerDay(data) {
  return request.get({
    url: `${OPEN}/medal/registerDay`,
    data,
  });
}

/**
 * 全部勋章-普通勋章列表
 * @param {*} data
 * @returns
 * http://post.tanzk.com/project/595/interface/api/78119
 */
export function statusAllMedal(data) {
  return request.get({
    url: `${OPEN}/medal/statusAllMedal`,
    data,
  });
}

/**
 * 全部勋章-特殊勋章列表
 * @param {*} data
 * @returns
 * http://post.tanzk.com/project/595/interface/api/78144
 */
export function specialMedal(data) {
  return request.get({
    url: `${OPEN}/medal/specialMedal`,
    data,
  });
}

/**
 * 挑战-获取任务列表
 * @param {*} data
 * @returns
 * http://post.tanzk.com/project/595/interface/api/80919
 */
export function getTasks(data) {
  return request.get({
    url: `${OPEN}/task/allTask`,
    data,
  });
}
/**
 * 碎片中心-获取用户知识碎片
 * http://post.tanzk.com/project/595/interface/api/84914
 */
export function getPicesNum() {
  return request.get({
    url: `${OPEN}/knowledgePieces/balance`,
  });
}
/**
 * 碎片中心-获取用户累计兑换知识碎片数
 * http://post.tanzk.com/project/595/interface/api/84924
 */
export function getPicesTotalNum() {
  return request.get({
    url: `${OPEN}/knowledgePieces/totalExchange`,
  });
}
/**
 * 碎片中心-商品列表接口
 * http://post.tanzk.com/project/595/interface/api/84904
 */
export function getPicesGoodsList(data) {
  return request.get({
    url: `${OPEN}/goods/list`,
    data,
  });
}
/**
 * 碎片中心-商品兑换
 * http://post.tanzk.com/project/595/interface/api/84894
 */
export function getGoodsExchange(data) {
  return request.get({
    url: `${OPEN}/goods/exchange`,
    data,
  });
}
/**
 * 我的兑换-商品列表
 * http://post.tanzk.com/project/595/interface/api/84894
 */
export function getMyGoodsExchange(data) {
  return request.get({
    url: `${OPEN}/goods/orders`,
    data,
  });
}
/**
 * 商品详情
 * http://post.tanzk.com/project/595/interface/api/84889
 */
export function getGoodsDetail(data) {
  return request.get({
    url: `${OPEN}/goods/detail`,
    data,
  });
}
/**
 * 兑换商品详情
 * http://post.tanzk.com/project/595/interface/api/84889
 */
export function getGoodsDetailExchange(data) {
  return request.get({
    url: `${OPEN}/goods/exchangeDetail`,
    data,
  });
}
/**
 * 获取知识碎片明细
 * http://post.tanzk.com/project/595/interface/api/84919
 */
export function getPiecesList(data) {
  return request.get({
    url: `${OPEN}/knowledgePieces/list`,
    data,
  });
}
