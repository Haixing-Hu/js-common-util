////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import queryString from './query-string';
import getSearch from './get-search';
import getHash from './get-hash';

/**
 * Add a parameter to the query string of the current address. Note that the
 * added parameter will be URL encoded.
 *
 * Because the addresses of Vue.js are all in hash form for routing, the basic
 * `window.location.search` cannot be used to obtain the ocrrect query string.
 * For example: `http://dev.example.com/test/#/finish?params=xxx`.
 *
 * @param {Object} params
 *     Each attribute name and attribute value of this argument will be added
 *     to the query string of the current address as a key-value pair.
 * @param {String|URL} url
 *     An optional argument, indicating the URL address to be parsed, as a
 *     `String` or `URL` object. If this argument is missing, `window.location`
 *     is used.
 * @returns {String}
 *     A new link address with the specified parameters added and properly
 *     regularized.
 * @author Haixing Hu
 */
function addSearchParams(params, url = window.location) {
  if (url === undefined) {
    url = window.location;
  } else if (!(url instanceof URL)) {
    try {
      url = new URL(url);
    } catch (e) {
      // 如果URL无效，回退到window.location
      url = window.location;
    }
  }
  const base = url.origin + url.pathname;
  let hash = getHash(url);
  if (hash == null) {
    hash = '';
  } else {
    hash = `#${hash}`;
  }
  const kv = queryString.stringify(params);
  let search = getSearch(url);
  if (search !== null && search.length > 0) {
    search = `${search}&${kv}`;
  } else {
    search = kv;
  }
  return `${base}?${search}${hash}`;
}

export default addSearchParams;
