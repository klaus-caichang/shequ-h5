export const OSSURL = 'https://frontend-static-cdn.shiguangkey.com/tz-community-mp/images/';

// 碎片兑换状态
export const PIECE_STATUS = {
  USABLE: 1, // 可兑换
  DISABLE: 2, // 兑换次数为0
  OUT_OF_STOCK: 3, // 库存不足
  OUT_OF_PIECE: 4, // 碎片不够
};

// 内容媒体类型
export const CONTENT_MEDIA = {
  TEXT: 1, // 文本
  IMG: 2, // 图片
  VIDEO: 3, // 视频
  AUDIO: 4, // 音频
};

// 全局事件bus名称
export const EVENTBUS = {
  LOGINED: 'LOGINED', // 登录成功
  CREATE_SELECT: 'CREATE_SELECT', // 创建内容选中-type（topic：话题，at：@）
  CHAllENGE_MEDAL: 'CHAllENGE_MEDAL', // 挑战页勋章展示
  ALL_MEDAL: 'ALL_MEDAL', // 全部勋章展示
  THUMBS_TIP: 'THUMBS_TIP', // 点赞
  FOLLOW_CIRCLE: 'FOLLOW_CIRCLE', // 关注圈子
  SPECIAL_SELECT: 'SPECIAL_SELECT', // 专题添加内容
  SHOW_LOADING: 'SHOW_LOADING', // 首页图标刷新loading
  UPDATA_CIRCLE_LIST: 'UPDATA_CIRCLE_LIST', // 登录后刷新推荐圈子
  DRAFT_SELECT: 'DRAFT_SELECT', // 编辑内容选择草稿
  CHECK_HOME_TAB: 'CHECK_TAB', // 首页关注页-tab切换
};

// 内容审核状态
export const EXAMINE_STATUS = {
  PASSED: 0, // 审核通过
};
