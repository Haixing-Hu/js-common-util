////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * 判定某个值是否是undefined或null或空字符串.
 *
 * @param {any} value
 *     待判定的值
 * @return {Boolean}
 *     若待判定的值是undefined或null或空字符串，则返回true；否则返回false.
 * @author 胡海星
 */
function isUndefinedOrNullOrEmptyString(value) {
  return (value === undefined || value === null || value === '');
}

export default isUndefinedOrNullOrEmptyString;
