/**
 * 定义枚举对象，用来声明枚举类型的值
 * 参考地址：https://www.30secondsofcode.org/articles/s/javascript-enum
 */
export default class Enum {
  constructor(...keys) {
    // 只有一个参数，判断是不是对象
    const [firstArg] = keys;
    const isSingleObject = keys.length === 1 && typeof firstArg === 'object';
    if (isSingleObject) {
      const keys = Object.entries(firstArg);
      keys.forEach(([key, value]) => {
        this[key] = value;
      });
    } else {
      keys.forEach((key, i) => {
        this[key] = i;
      });
    }
    Object.freeze(this);
  }

  *[Symbol.iterator]() {
    for (let key of Object.keys(this)) yield key;
  }
}
