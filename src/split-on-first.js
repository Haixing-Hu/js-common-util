////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { isString } from '@qubit-ltd/type-detect';

/**
 * Splits a string into two parts at the first occurrence of the specified separator.
 *
 * @param {string} str
 *     the string to be split.
 * @param {string} separator
 *     the separator string.
 * @return {[string]}
 *     the array containing the two parts of the string.
 * @author Haixing Hu
 * @see <a href="https://github.com/sindresorhus/split-on-first">Split on First</a>
 */
function splitOnFirst(str, separator) {
  if (!isString(str) || !isString(separator)) {
    throw new TypeError('Expected the arguments to be of type `string`');
  }
  if (str === '' || separator === '') {
    return [];
  }
  const index = str.indexOf(separator);
  if (index === -1) {
    return [];
  }
  return [
    str.slice(0, index),
    str.slice(index + separator.length),
  ];
}

export default splitOnFirst;
