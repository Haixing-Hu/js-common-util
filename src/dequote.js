////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Dequotes the given string.
 *
 * If the given string is quoted by single quotes (`'`) or double quotes (`"`),
 * then this function will remove the quotes and return the inner string.
 *
 * Note that if the given string does not start and end with the same quote,
 * this function does nothing and returns the original string.
 *
 * @param {string} str
 *     The string to be dequoted.
 * @return {string}
 *     The dequoted string.
 */
function dequote(str) {
  if (str === undefined || str === null) {
    return str;
  }
  if (typeof str !== 'string') {
    throw new TypeError('The str must be a string.');
  }
  if (str.length < 2) {
    return str;
  }
  if ((str.startsWith('"') && str.endsWith('"'))
      || (str.startsWith('\'') && str.endsWith('\''))) {
    return str.substring(1, str.length - 1);
  }
  return str;
}

export default dequote;
