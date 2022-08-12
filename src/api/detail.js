// 详情页相关接口
import request from '@/utils/request';
import { DOMAINS } from '@/utils/config';
const OPEN = `${DOMAINS.OPEN}/api`;

/**
 * 回答点赞
 */
export function answerThumbs(data) {
  return request.post({
    url: `${OPEN}/content/content/praiseAnswer`,
    data,
    header: { 'content-type': 'application/x-www-form-urlencoded' },
  });
}

/**
 * 内容点赞
 */
export function contentThumbs(data) {
  return request.post({
    url: `${OPEN}/content/content/praiseContent`,
    data,
    header: { 'content-type': 'application/x-www-form-urlencoded' },
  });
}
/**
 * 评论点赞
 */
export function commentThumbs(data) {
  return request.post({
    url: `${OPEN}/content/comment/praise`,
    data,
    header: { 'content-type': 'application/x-www-form-urlencoded' },
  });
}

/**
 * 获取帖子/动态/问答详情
 */
export function getDetails(data) {
  return request.get({
    url: `${OPEN}/content/content/contentDetails`,
    data,
  });
}

/**
 * 问答详情-答案列表
 */
export function getAnserList(data) {
  return request.get({
    url: `${OPEN}/content/content/answerList`,
    data,
  });
}

/**
 * 评论列表
 */
export function getCommentList(data) {
  return request.get({
    url: `${OPEN}/content/comment/list`,
    data,
  });
}

/**
 * 发布评论
 */
export function postComment(data) {
  return request.post({
    url: `${OPEN}/content/comment/insert`,
    data,
  });
}

/**
 * 关注
 * userId followStatus
 */
export function postFollow(data) {
  return request.put({
    url: `${OPEN}/user/user/follow?userId=${data.userId}&followStatus=${data.followStatus}`,
    data,
  });
}

/**
 * 发布回复
 */
export function postReply(data) {
  return request.post({
    url: `${OPEN}/content/reply/insert`,
    data,
  });
}

/**
 * 删除评论
 */
export function postCommentDel(data) {
  return request.post({
    url: `${OPEN}/content/comment/delete`,
    data,
  });
}
/**
 * 获取内容详情页推荐内容ID
 */
export function getContentIdForDetailRecommend(data) {
  return request.get({
    url: `${OPEN}/content/content/getContentIdForDetailRecommend`,
    data,
  });
}
/**
 * 获取答案详情页推荐回答ID
 */
export function getAnswerIdForDetailRecommend(data) {
  return request.get({
    url: `${OPEN}/content/content/getAnswerIdForDetailRecommend`,
    data,
  });
}
