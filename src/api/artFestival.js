import request from '@/utils/request';
import { DOMAINS } from '@/utils/config';

const OPEN = `${DOMAINS.OPEN}/api/operation`;

// 兑换知识碎片
export function exchangeKnowledge(data) {
  return request.post({
    url: `${OPEN}/activity/artInvite/exchangeKnowledge`,
    data
  });
}

// 获取知识碎片兑换详情
export function getUserExchangeKnowledgeDetail(data) {
  return request.get({
    url: `${OPEN}/activity/artInvite/getUserExchangeKnowledgeDetail`,
    data
  });
}

// 查询邀请统计数据详情
export function listArtUserInviteStats(data) {
  return request.post({
    url: `${OPEN}/activity/artInvite/listArtUserInviteStats`,
    data
  });
}

// 分页查看邀请记录
export function pagelistUserInviteRecords(data) {
  return request.get({
    url: `${OPEN}/activity/artInvite/pagelistUserInviteRecords`,
    data
  });
}

// 查用户累计和剩余投票卷
export function queryUserSurplusVoteTicket(data) {
  return request.get({
    url: `${OPEN}/activity/artVoteTicket/queryUserSurplusVoteTicket`,
    data
  });
}

// 当前用户排名
export function rankingsCurrUser(data) {
  return request.get({
    url: `${OPEN}/activity/artVoteTicket/rankingsCurrUser`,
    data
  });
}

// 榜单列表
export function rankingsList(data) {
  return request.get({
    url: `${OPEN}/activity/artVoteTicket/rankingsList`,
    data
  });
}

// 三日最热和最新作品列表
export function rankingsTypeList(data) {
  return request.get({
    url: `${OPEN}/activity/artVoteTicket/rankingsTalkTitleContentList`,
    data
  });
}

// 榜单列表搜索
export function rankingsSearch(data) {
  return request.get({
    url: `${OPEN}/activity/artVoteTicket/rankingsSearch`,
    data
  });
}

// 用户投票
export function votePush(data) {
  return request.post({
    url: `${OPEN}/vote/ticket/vote`,
    data
  });
}

// 查榜单状态
export function queryRankingsStatus(data) {
  return request.get({
    url: `${OPEN}/activity/artVoteTicket/queryArtActivityStatus`,
    data
  });
}

// 生成锻炼
export function getShortUrl(data) {
  return request.post({
    url: `${OPEN}/invite/getShortUrl`,
    data
  });
}

