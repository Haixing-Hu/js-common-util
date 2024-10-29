////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Creates a JavaScript built-in `Date` object.
 *
 * This function is similar to the `Date` constructor, but it has the following
 * differences:
 * - The year argument of this function must be specified in the full 4-digit
 *   form. For example, 1995. While the year argument of the `Date` constructor
 *   must be specified in 2-digit form, which has the y2k problem.
 * - The month argument of this function is an integer between 1 and 12. While
 *   the month argument of the `Date` constructor is an integer between 0 and 11.
 *
 * @param {number} year
 *     The year of the date. The year must be specified in the full 4-digit
 *     form. For example, 1995.
 * @param {number} month
 *     The month of the date. The month is an integer between 1 and 12. The
 *     default value of this argument is 1.
 * @param {number} day
 *     The day of the month. The day is an integer between 1 and 31. The default
 *     value of this argument is 1.
 * @param {number} hour
 *     The hour of the date. The hour is an integer between 0 and 23. The
 *     default value of this argument is 0.
 * @param {number} minute
 *     The minute of the date. The minute is an integer between 0 and 59. The
 *     default value of this argument is 0.
 * @param {number} second
 *     The second of the date. The second is an integer between 0 and 59. The
 *     default value of this argument is 0.
 * @param {number} millisecond
 *     The millisecond of the date. The millisecond is an integer between 0 and
 *     999. The default value of this argument is 0.
 * @returns {Date}
 *     a JavaScript built-in `Date` object, whose value is specified by the
 *     arguments.
 * @throws {TypeError}
 *     if ary argument is not an integer number.
 * @throws {RangeError}
 *     if any argument is out of range.
 * @author Haixing Hu
 * @see [Date constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date)
 */
function createDate(year,
    month = 1,
    day = 1,
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0) {
  if (!Number.isInteger(year)
    || !Number.isInteger(month)
    || !Number.isInteger(day)
    || !Number.isInteger(hour)
    || !Number.isInteger(minute)
    || !Number.isInteger(second)
    || !Number.isInteger(millisecond)) {
    throw new TypeError('All arguments must be integer numbers');
  }
  if (year < 0 || year > 9999) {
    throw new RangeError('The year must be between 1 and 9999');
  }
  if (month < 1 || month > 12) {
    throw new RangeError('The month must be between 1 and 12');
  }
  if (day < 1 || day > 31) {
    throw new RangeError('The day must be between 1 and 31');
  }
  if (hour < 0 || hour > 23) {
    throw new RangeError('The hour must be between 0 and 23');
  }
  if (minute < 0 || minute > 59) {
    throw new RangeError('The minute must be between 0 and 59');
  }
  if (second < 0 || second > 59) {
    throw new RangeError('The second must be between 0 and 59');
  }
  if (millisecond < 0 || millisecond > 999) {
    throw new RangeError('The millisecond must be between 0 and 999');
  }
  return new Date(year, month - 1, day, hour, minute, second, millisecond);
}

export default createDate;
