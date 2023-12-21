////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////


/**
 * Gets the time part of a built-in `Date` object as a string in the local time
 * zone.
 *
 * @param {Date} date
 *     a built-in `Date` object.
 * @returns {string}
 *     the time part of the specified date, represented in a string in the local
 *     time zone. The format of the returned string is `HH:mm:ss`.
 * @author Haixing Hu
 */
function formatLocalTime(date) {
  if (!(date instanceof Date)) {
    throw new TypeError('date must be a Date object');
  }
  const h = date.getHours();
  const ph = (h < 10 ? '0' : '');
  const m = date.getMinutes();
  const pm = (m < 10 ? '0' : '');
  const s = date.getSeconds();
  const ps = (s < 10 ? '0' : '');
  return `${ph}${h}:${pm}${m}:${ps}${s}`;
}

export default formatLocalTime;
