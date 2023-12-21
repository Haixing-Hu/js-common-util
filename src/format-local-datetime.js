////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Format the datetime part of a built-in `Date` object as a string in the local
 * time zone.
 *
 * @param {Date} date
 *     a built-in `Date` object.
 * @returns {string}
 *     the datetime part of the specified date, represented in a string in the
 *     local time zone. The format of the returned string is `YYYY-MM-DD HH:mm:ss`.
 * @author Haixing Hu
 */
function formatLocalDatetime(date) {
  if (!(date instanceof Date)) {
    throw new TypeError('date must be a Date object');
  }
  const y = date.getFullYear();
  const o = date.getMonth() + 1;
  const po = (o < 10 ? '0' : '');
  const d = date.getDate();
  const pd = (d < 10 ? '0' : '');
  const h = date.getHours();
  const ph = (h < 10 ? '0' : '');
  const m = date.getMinutes();
  const pm = (m < 10 ? '0' : '');
  const s = date.getSeconds();
  const ps = (s < 10 ? '0' : '');
  return `${y}-${po}${o}-${pd}${d} ${ph}${h}:${pm}${m}:${ps}${s}`;
}

export default formatLocalDatetime;
