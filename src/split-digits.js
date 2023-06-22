/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2020
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * 把一个非负整数按10进制拆分为数字数组。
 *
 * @param {Number} value
 *     待转换的数字，必须是一个非负整数。
 * @param {Number} digitCount
 *     返回的数组的最少位数，如果为0则不作限制。
 * @return {Array}
 *     该非负整数按10进制拆分为的数字数组，其长度如果不足digitCount，前面将补0。
 * @throws Error
 *     如果输入不是一个合法的非负整数，则抛出异常。
 * @author 胡海星
 */
function splitDigits(value, digitCount = 0) {
  if (!Number.isInteger(value) || (value < 0)) {
    throw new Error('value must be a non-negative integer.');
  }
  const result = [];
  if (value === 0) {
    result.push(0);
  } else {
    while (value > 0) {
      const d = Math.floor(value % 10);
      result.unshift(d);
      value = Math.floor(value / 10);
    }
  }
  if (digitCount > result.length) {
    let n = digitCount - result.length;
    while (n > 0) {
      result.unshift(0);
      --n;
    }
  }
  return result;
}

export default splitDigits;
