// 更多工具类函数，请看使用文档：http://git.tanzk.cn/frontend/common-plugins/plugin-util/blob/master/README.md
import { DOMAINS } from '@/utils/config';

export {
  parseTime, // 时间格式转换
  transformTime, // 时间转换，'刚刚'，t 分钟前，时：分：秒，昨天 时：分：秒，
  _debounce, // 创建一个防抖动函数
  _throttle, // 创建一个节流函数
  _compact, // 创建一个新数组，包含原数组中所有的非假值元素。
  _concat, // 创建一个新数组，将 array 与任何数组 或 值连接在一起。
  _uniq, // 创建一个去重后的 array 数组副本
  _random, // 产生一个包括 lower 与 upper 之间的数。
  _find, // 遍历集合（Array|Object）元素，返回第一个返回真值的第一个元素
  _cloneDeep, // 深拷贝
  isEmpty, // 检查值是否为空
  transAsyncToPro, // 将异步 api 转成 promise 调用
  imgCompress, // 使用阿里云 oss 技术压缩图片，
  transformBigNumber, // 在数字超过某一临界值时，转换单位
  countDwonByDay, // 倒计时，XX 天 XX 时 XX 分 XX 秒
  countDwonByHour, // 倒计时，XX 时 XX 分 XX 秒
  addZeroPrefix, // 前置补 0, 9 => 09,
  webViewCall, // 和app交互
} from '@tzfe/plugin-common-util';

// 项目中其他工具类
export function addOne() {}

// 图片片的全地址(vant图片上传无法使用filter, 故同时export);
export const getFullImgPath = (path = '') => {
  const prefix = path.includes('/udb/user/') ? DOMAINS.STATIC : DOMAINS.OSS;
  if (/^https?:\/\//.test(path)) return path;
  return prefix + path;
};

/**
 * 生成唯一的 ID (重复率趋近于 0)
 *
 * @return {string} unique ID
 */
export const getUniqueId = () => {
  return 'xxxxxxxxxxxxxxxxyxxxyxxxxxxxxyxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export const getUuid = () => {
  var s = [];
  var hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';
  let uuid = s.join('');
  return uuid;
};
