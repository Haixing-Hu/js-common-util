////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * 将指定的字符串转化为大写。
 *
 * @param {String} str
 *     待转换的字符串，可以是undefined或null，或非字符串对象。
 * @return {String}
 *     对于undefined或null，或非字符串对象，返回一个空字符串；对
 *     于其他字符串，将其转换为大写返回。
 * @author 胡海星
 */
function uppercaseString(str) {
  if ((str === undefined) || (str === null) || (typeof str !== 'string')) {
    return '';
  } else {
    return str.toUpperCase();
  }
}

export default uppercaseString;
