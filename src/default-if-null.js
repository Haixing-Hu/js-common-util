////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * 如果第一个参数是 null，则返回默认值，否则返回该参数的值。
 *
 * @param {any} value
 *    待判定的值
 * @param {any} defaultValue
 *    默认值
 * @return
 *    若 value 是 null，则返回 defaultValue；否则返回 value。
 * @author 胡海星
 */
function defaultIfNull(value, defaultValue) {
  return ((value === null) ? defaultValue : value);
}

export default defaultIfNull;
