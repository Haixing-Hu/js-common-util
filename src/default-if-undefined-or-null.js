////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * If the first parameter is `undefined` or `null`, the default value is returned,
 * otherwise the value of the parameter is returned.
 *
 * @param {any} value
 *    The value to be determined.
 * @param {any} defaultValue
 *    The default value.
 * @return
 *    If value is `undefined` or `null`, returns `defaultValue`; otherwise returns
 *    `value`.
 * @author Haixing Hu
 * @deprecated Use the nullish coalescing operator (??) instead.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
 */
function defaultIfUndefinedOrNull(value, defaultValue) {
  return ((value === undefined || value === null) ? defaultValue : value);
}

export default defaultIfUndefinedOrNull;
