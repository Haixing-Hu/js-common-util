/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2020
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/
const DEFAULT_EPSILON = 1e-8;

/**
 * 测试两个浮点数是否相等。
 *
 * @param {Number} x
 *     待测试的第一个浮点数。
 * @param {Number} y
 *     待测试的第二个浮点数。
 * @param {Number} epsilon
 *     用于比较两个浮点数之差绝对值的epsilon，默认值为1e-8。
 * @return {Boolean}
 *     两个浮点数是否相等。
 * @author 胡海星
 */
function floatEqual(x, y, epsilon = DEFAULT_EPSILON) {
  return Math.abs(x - y) <= epsilon;
}

export default floatEqual;
