/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2018
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * 如果参数是空则返回null，否则返回该参数的值。
 *
 * @param {any} value
 *    待判定的值
 * @return
 *    若 value 是undefined, null, 或空字符串，则返回 null；否则返回 value。
 * @author 胡海星
 */
function emptyToNull(value) {
  if (value === undefined
      || value === null
      || value === ''
      || (typeof value === 'string' && value.trim() === '')) {
    return null;
  } else {
    return value;
  }
}

export default emptyToNull;
