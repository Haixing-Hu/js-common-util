/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * 四舍五入时最大允许保留的小数位数。
 *
 * @private
 */
const MAX_ALOWED_DIGITS = 20;

/**
 * 将一个浮点数四舍五入到小数点后面指定的位数。
 *
 * @param {Number} number
 *     待处理的浮点数。
 * @param {Number} digits
 *     小数点后数字的个数；介于0到20（包括）之间，实现环境可能支持更大范围。如果
 *     忽略该参数，则默认为0。
 * @return {Number}
 *     将输入参数四舍五入到小数点后指定位数的结果。如果number是NaN，则返回NaN；
 *     如果number是+/-Infinity，则返回number。
 * @author 胡海星
 */
function round(number, digits = 0) {
  if (typeof number !== 'number'
    || typeof digits !== 'number'
    || Number.isNaN(number)) {
    return NaN;
  }
  if (!Number.isFinite(number)) {
    return number;
  }
  if (!Number.isInteger(digits)) {
    throw new Error('The digits must be integer.');
  }
  if (digits < 0 || digits > MAX_ALOWED_DIGITS) {
    throw new Error(`The digits must between [0, ${MAX_ALOWED_DIGITS}]`);
  }
  const multiplier = 10 ** digits;
  return Math.round(number * multiplier) / multiplier;
}

export default round;
