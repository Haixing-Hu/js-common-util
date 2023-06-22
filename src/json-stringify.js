/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2020
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/
import kindOf from 'kind-of';
import jsonBeautify from 'json-beautify';
import decycle from './decycle';

/**
 * 用于JSON序列化 Set, Map, BigInt 对象的 replacer.
 *
 * @param {String} key
 *     当前的主键。
 * @param {any} value
 *     当前的值。
 * @return {any}
 *     被替换的值。
 * @author 胡海星
 * @private
 */
const replacer = (key, value) => {
  const type = kindOf(value);
  switch (type) {
    case 'bigint':
      return String(value);
    case 'map':
    case 'set':
      return [...value];
    default:
      return value;
  }
};

/**
 * 将JSON对象序列化为字符串。
 *
 * 此函数功能类似{@code JSON.stringify()}，但支持一些ES6以上的内置对象，并可以根据
 * 参数将打印出来的JSON序列化结果字符串格式化。
 *
 * @param {*} value
 *     JSON对象，或内建值。
 * @param {Boolean} beautify
 *     可选，表示是否美化输出的JSON字符串。默认值为{@code false}。
 * @return {String}
 *     将该对象序列化为字符串的结果，并将结果字符串格式化。
 * @author 胡海星
 */
function jsonStringify(value, beautify = false) {
  if (value === undefined) {
    return 'undefined';
  } else if (value === null) {
    return 'null';
  }
  value = decycle(value); // 对可能带有循环引用的对象进行转换
  if (beautify) {
    return jsonBeautify(value, replacer, 2, 80);
  } else {
    return JSON.stringify(value, replacer);
  }
}

export default jsonStringify;
