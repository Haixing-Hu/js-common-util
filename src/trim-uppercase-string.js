////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { isString } from '@qubit-ltd/type-detect';

/**
 * 将指定的字符串转化为标准形式。
 *
 * @param {String} str
 *     待转换的字符串，可以是undefined或null，或非字符串对象。
 * @return {String}
 *     对于undefined或null，或非字符串对象，返回一个空字符串；对于其他字
 *     符串，将其头尾空格去除后，转换为大写返回。
 * @author 胡海星
 */
function trimUppercaseString(str) {
  if (!isString(str)) {
    return '';
  } else {
    return str.trim().toUpperCase();
  }
}

export default trimUppercaseString;
