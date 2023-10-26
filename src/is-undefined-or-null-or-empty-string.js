////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Tests whether a value is `undefined`, or `null`, or an empty string.
 *
 * **NOTE**: this function is sometimes useful. Although JavaScript treats
 * `undefined`, `null`, and empty strings as falsy values in boolean expressions,
 * sometimes we need to distinguish them from other falsy values such as `0`,
 * `false`, `NaN`, etc.
 *
 * @param {any} value
 *     The value to be determined.
 * @return {boolean}
 *     If the value to be determined is `undefined`, or `null`, or an empty string,
 *     returns `true`; otherwise, return `false`.
 * @author Haixing Hu
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Falsy
 */
function isUndefinedOrNullOrEmptyString(value) {
  return (value === undefined || value === null || value === '');
}

export default isUndefinedOrNullOrEmptyString;
