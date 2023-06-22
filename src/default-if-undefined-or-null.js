/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2020
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * 如果第一个参数是 undefined 或 null，则返回默认值，否则返回该参数的值。
 *
 * @param {any} value
 *    待判定的值
 * @param {any} defaultValue
 *    默认值
 * @return
 *    若 value 是 undefined 或 null，则返回 defaultValue；否则返回 value.
 * @author 胡海星
 */
function defaultIfUndefinedOrNull(value, defaultValue) {
  return ((value === undefined || value === null) ? defaultValue : value);
}

export default defaultIfUndefinedOrNull;
