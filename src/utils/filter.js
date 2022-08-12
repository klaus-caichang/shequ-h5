import Vue from 'vue';
import { getFullImgPath } from './index';

function add0(m) { return m<10?'0'+m:m };

// 将时间戳转为 X年X月X日
const getLocalTime = (timeStamp) => {
  var time = new Date(timeStamp);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  return `${y}年${add0(m)}月${add0(d)}日`;
}

// 将时间戳转为 X月X日
const getMonthTime = (timeStamp) => {
  var time = new Date(timeStamp);
  var m = time.getMonth() + 1;
  var d = time.getDate();
  return `${add0(m)}月${add0(d)}日`;
}

// 将时间戳转为 2021-12-12 12:12
const formatDate = (timeStamp) => {
  var time = new Date(timeStamp);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  return `${y}-${add0(m)}-${add0(d)} ${add0(h)}:${add0(mm)}`;
}

// 内容省略
const getNewName = (name, limit) => {
  limit = limit * 2;
  var len = 0;
  var reallen = 0;
  if (!name) return;
  for (var j = 0; j < name.length; j++) {
    if (name.charCodeAt(j) > 127 || name.charCodeAt(j) == 94) {
      len += 2;
    } else {
      len++;
    }
    if (len <= limit) {
      reallen++;
    }
  }
  if (len > limit) {
    name = name.substr(0, reallen) + '···';
  }
  return name;
};

const addZeroNum = 2; // 补0默认位数
/**
 * 前置补0
 * @param {*} value 要填充的值
 * @param {*} n 保留位数
 */
function addonZero(value, n = addZeroNum) {
  if (`${value}`.length > n) return value;
  const prefix = Array(n + 1).join(0);
  return (prefix + value).slice(-n);
}

const WEEK = ['日', '一', '二', '三', '四', '五', '六'];
/**
 * 转化时间格式
 * @param {string|number} time 时间戳
 * @param {string} format 时间格式
 */
const parseTime = (time, format = '{y}-{m}-{d} {h}:{i}:{s}') => {
  if (!time) return;
  const t = new Date(+time);
  const obj = {
    y: t.getFullYear(),
    m: addonZero(t.getMonth() + 1),
    d: addonZero(t.getDate()),
    h: addonZero(t.getHours()),
    i: addonZero(t.getMinutes()),
    s: addonZero(t.getSeconds()),
    a: WEEK[t.getDay()],
  };
  return format.replace(/\{([^}])\}/g, (_, key) => obj[key]);
};
// 判断是否是今天前
function isYesterdayFun(time) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const today = `${year}/${month}/${day}`;
  const todayTime = new Date(today).getTime(); // 当天凌晨的时间
  return time < todayTime;
}
const parseHoursTime = time => {
  if (!time) return;
  const t = new Date(+time);
  // 判断是否是一天前,是前一天加上月日，今日显示时分
  const isYesterday = isYesterdayFun(+time);
  if (isYesterday) {
    const format = '{m}-{d} {h}:{i}';
    const obj = {
      m: addonZero(t.getMonth() + 1),
      d: addonZero(t.getDate()),
      h: addonZero(t.getHours()),
      i: addonZero(t.getMinutes()),
    };
    return format.replace(/\{([^}])\}/g, (_, key) => obj[key]);
  } else {
    const format = '{h}:{i}';
    const t1 = new Date();
    const obj = {
      h: addonZero(t.getHours()),
      i: addonZero(t.getMinutes()),
    };
    return format.replace(/\{([^}])\}/g, (_, key) => obj[key]);
  }
};

// 大于1W显示1W 千位四舍五入
const parseNum = n => {
  if (n == -1) return 0;
  if (!n) return 0;
  n = `${n}`;
  const value = 10e3;
  if (n < value) return n;
  const [w, ret] = [n.slice(0, -4), n.slice(-4)];
  return `${w}.${Math.round(Number(ret) / 1000)}w`;
};
const parseCreate = time => {
  const now = Date.now();
  const ret = now - time;
  const d = ret / (24 * 60 * 60 * 1e3);
  const h = ret / (60 * 60 * 1e3);
  const i = ret / (60 * 1e3);
  if (d > 2) return parseTime(time, '{m}-{d} {h}:{i}');
  else if (d >= 1 && d < 2) return '1天前';
  else if (h > 1 && h < 24) return `${Math.floor(h)}小时前`;
  else if (i > 1) return `${Math.floor(i)}分钟前`;
  else return '刚刚';
};

/**
 * 文件服务增加图片地址前后缀
 * @param {String} url  图片地址
 * @param {String} parame 自定义处理参数，用于定义图片处理的方式。多个操作以正斜线（/）隔开。
 * 图片处理支持的参数，请参见  https://help.aliyun.com/document_detail/183902.htm?spm=a2c4g.11186623.2.8.46f84981k0fTEJ#section-tx1-qtj-ar8
 * @param {String} intrudeFlag  如果地址带了oss，但是又要强行把入参加入，那么要做一次处理。
 * @returns {String} oss处理后的图片地址
 */
const imgCompress = (url, parame, intrudeFlag) => {
  if (!url) return '';
  if (!url.includes('.shiguangkey')) return url;
  const path = getFullImgPath(url);
  const pattern = /https?:\/\/(((www-cdn-)*res[^.]*)|(frontend-static-cdn)|(res-static))\.shiguangkey\.com/; // new RegExp(`^ ${ OSS } `);
  if (!pattern.test(path) || /\.gif$/i.test(path)) return path;
  const ossFixed = '?x-oss-process=image'; // 阿里云图片处理固定的格式，如果使用了肯定会有这个。
  let suffix = '';
  // 默认自适应旋转，
  const orient = '/auto-orient,1';
  //	如果已经包含了图片处理参数，或者是gif图片，就直接返回。
  if (/\.gif$/i.test(path)) return path;
  // 如果已经包含了，并且不想强行加入自定义处理餐宿
  if (path.includes(ossFixed) && !intrudeFlag) {
    return path;
  }
  // 如果没有固定的处理参数那么给他加一个。
  if (!path.includes(ossFixed)) suffix += ossFixed;
  if (!path.includes(orient)) suffix += orient;
  if (parame) suffix += parame;
  return path + suffix;
};

Vue.filter('parseTime', parseTime);
Vue.filter('parseHoursTime', parseHoursTime);
Vue.filter('parseNum', parseNum);
Vue.filter('parseCreate', parseCreate);
Vue.filter('imgCompress', imgCompress);
Vue.filter('getNewName', getNewName);
Vue.filter('getLocalTime', getLocalTime);
Vue.filter('getMonthTime', getMonthTime);
Vue.filter('formatDate', formatDate);
