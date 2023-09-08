/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * 对字符串进行URL编码，遵循 RFC 3986 的严格标准。
 *
 * @param {String} str
 *   待编码的字符串。
 * @return {String}
 *   该字符串的URL编码结果，
 * @author 胡海星
 * @see https://github.com/kevva/strict-uri-encode
 */
function uriEncode(str) {
  if (str === undefined || str === null || str === '') {
    return str;
  }
  return encodeURIComponent(str)
    .replace(/[!'()*]/g, (x) => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);
}

export default uriEncode;
