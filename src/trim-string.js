/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import isString from './is-string';

/**
 * 删除指定的字符串前后空格。
 *
 * @param {String} str
 *     待转换的字符串，可以是undefined或null，或非字符串对象。
 * @return {String}
 *     对于undefined或null，或非字符串对象，返回一个空字符串；对于其他字
 *     符串，将其头尾空格去除后返回。
 * @author 胡海星
 */
function trimString(str) {
  if (!isString(str)) {
    return '';
  } else {
    return str.trim();
  }
}

export default trimString;
