import PAGE_NAME from '@/enums/pageName.js';

export const pageConfig = Object.freeze({
  'pages/pieces/index': {
    event_id: 'SQH_0001_V0005',
    event_name: '知识碎片中心曝光',
    event_attr: {
      page_name: PAGE_NAME.PIECES,
    },
  },
  'pages/pieces/exchange-my': {
    event_id: 'SQH_0001_V0002',
    event_name: '我的兑换页曝光',
    event_attr: {
      page_name: PAGE_NAME.PIECES_EXCHANGE,
    },
  },
  'pages/pieces/exchange-my': {
    event_id: 'SQH_0001_V0003',
    event_name: '已兑换详情页曝光',
    event_attr: {
      page_name: PAGE_NAME.PIECES_EXCHANGE_DETAIL,
    },
  },
  'pages/pieces/detail-my': {
    event_id: 'SQH_0001_V0004',
    event_name: '碎片明细页曝光',
    event_attr: {
      page_name: PAGE_NAME.PIECES_DETAIL,
    },
  },
  'pages/pieces/detail-my': {
    event_id: 'SQH_0001_V0006',
    event_name: '碎片规则页面曝光',
    event_attr: {
      page_name: PAGE_NAME.PIECES_RULE,
    },
  },
});
