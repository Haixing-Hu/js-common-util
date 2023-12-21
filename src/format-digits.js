////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Format a digits string.
 *
 * @param {number} value
 *     The value to be formatted, which must be a positive or negative integer
 *     or zero.
 * @param {number} digits
 *     The digits of the formatted string, which must be an non-negative integer.
 * @returns {string}
 *     The formatted string. If the value is undefined or null, return an empty
 *     string. If the digits is undefined or null, return the string
 *     representation of the value directly. Otherwise, return the string
 *     representation of the value with leading zeros to make the length of the
 *     string equals to the specified digits.
 * @author Haixing Hu
 */
function formatDigits(value, digits) {
  if (!Number.isInteger(value)) {
    throw new TypeError('The value must be an integer.');
  }
  if (!Number.isInteger(digits)) {
    throw new TypeError('The digits must be an integer.');
  }
  if (digits < 0) {
    throw new RangeError('The digits must be a non-negative integer.');
  }
  const symbol = (value < 0) ? '-' : '';
  value = Math.abs(value);
  const str = value.toString();
  const len = str.length;
  if (len >= digits) {
    return symbol + str;
  }
  const zeros = digits - len;
  const prefix = '0'.repeat(zeros);
  return symbol + prefix + str;
}

export default formatDigits;
