////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Format the date part of a built-in `Date` object as a string in the local
 * time zone.
 *
 * @param {Date} date
 *     a built-in `Date` object.
 * @returns {string}
 *     the date part of the specified date, represented in a string in the local
 *     time zone. The format of the returned string is `YYYY-MM-DD`.
 * @author Haixing Hu
 */
function formatLocalDate(date) {
  if (!(date instanceof Date)) {
    throw new TypeError('date must be a Date object');
  }
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const pm = (m < 10 ? '0' : '');
  const d = date.getDate();
  const pd = (d < 10 ? '0' : '');
  return `${y}-${pm}${m}-${pd}${d}`;
}

export default formatLocalDate;
