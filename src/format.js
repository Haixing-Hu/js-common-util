////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import toString from './to-string';

/**
 * 格式化字符串，字符串模板中可以用形如'{0}', '{1}', ... 的占位符。
 *
 * @param {String} str
 *     待格式化的字符串模板。
 * @param {Array} args
 *     用于格式化的参数数组。
 * @return {String}
 *     格式化结果字符串。
 * @author 胡海星
 */
function format(str, args) {
  if (args) {
    for (let i = 0; i < args.length; ++i) {
      const regexp = new RegExp(`\\{${i}\\}`, 'gm');
      const value = toString(args[i]);
      str = str.replace(regexp, value);
    }
  }
  return str;
}

export default format;
