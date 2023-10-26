////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * If the first parameter is `undefined`, the default value is returned,
 * otherwise the value of the parameter is returned.
 *
 * @param {any} value
 *    The value to be determined.
 * @param {any} defaultValue
 *    The default value.
 * @return
 *    If value is `undefined`, `defaultValue` is returned; otherwise `value` is
 *    returned.
 * @author Haixing Hu
 * @deprecated Use the nullish coalescing operator (??) instead.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
 */
function defaultIfUndefined(value, defaultValue) {
  return (value === undefined ? defaultValue : value);
}

export default defaultIfUndefined;
