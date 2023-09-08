/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * 把一个字符串解析为浮点数。
 *
 * @param {String|Number} value
 *     待转换的字符串，也可以本身就是一个数字。
 * @return {Number}
 *     如果输入参数本身就是数字，则直接返回该数字；如果输入参数是字符串，则返回
 *     从该字符串解析出的浮点数；如果输入参数是其他类型，则返回NaN。
 * @author 胡海星
 */
function stringToFloat(value) {
  switch (typeof value) {
    case 'number':
      return value;
    case 'string':
      return parseFloat(value);
    default:
      return NaN;
  }
}

export default stringToFloat;
