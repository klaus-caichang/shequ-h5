import request from '@/utils/request';
import { DOMAINS } from '@/utils/config';

const OPEN = `${DOMAINS.OPEN}/api`;

// 查询活动状态
export function getActivityState(data) {
  return request.get({
    url: `${OPEN}/operation/activity/getActivityState`,
    data
  });
}

// 查询互动话题内容
export function getTalkTitleContent(data) {
  return request.get({
    url: `${OPEN}/operation/activity/getTalkTitleContent`,
    data
  });
}

// 查询话题排名列表
export function getTalkTitleRankings(data) {
  return request.get({
    url: `${OPEN}/operation/activity/getTalkTitleRankings`,
    data
  });
}

// 查询话题排序列表
export function getTalkTitleSorts(data) {
  return request.get({
    url: `${OPEN}/operation/activity/getTalkTitleSorts`,
    data
  });
}

/**
 * 话题详情
 */
export function getTopicDetail(data) {
  return request.get({
    url: `${OPEN}/content/talkTitle/queryTalkTitleInfo`,
    data,
  });
}

/**
 获取帖子/动态/问答详情
 */
export function getDetails(data) {
  return request.get({
    url: `${OPEN}/content/content/contentDetails`,
    data,
  });
}

/**
 文化艺术节-导师点评
 */
export function artTeacherComment(data) {
  return request.get({
    url: `${OPEN}/content/comment/artTeacherComment`,
    data,
  });
}


/**
 文化艺术节-当前用户排名
 */
export function rankingsCurrUser(data) {
  return request.get({
    url: `${OPEN}/operation/activity/artVoteTicket/rankingsCurrUser`,
    data,
  });
}


/**
 查榜单状态
 */
export function queryArtActivityStatus(data) {
  return request.get({
    url: `${OPEN}/operation/activity/artVoteTicket/queryArtActivityStatus`,
    data,
  });
}

/**
 * 华为云问卷调查url获取
 */
export function getHWYUrl() {
  return request.get({
    url: `${OPEN}/operation/activity/hwy/getQuestionnaireUrl`,
  });
}
