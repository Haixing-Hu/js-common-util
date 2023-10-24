////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import getSearch from './get-search';
import getHash from './get-hash';

/**
 * 重构指定的URL为标准形式。
 *
 * 因为Vue.js的地址都是hash形式做路由，因此基本的 window.location.search 不能获得
 * query string。 例如 http://dev.example.com/test/#/finish?params=xxx
 *
 * @param {String|URL} url
 *     字符串或URL对象，可选参数。表示待解析的URL地址。若无此参数则使用
 *     window.location.href。
 * @return {String}
 *     加上了参数的新的链接地址。
 * @author 胡海星
 */
function normalizeUrl(url) {
  if (url === undefined) {
    url = window.location;
  } else if (!(url instanceof URL)) {
    url = new URL(url);
  }
  const base = url.origin + url.pathname;
  const search = getSearch(url);
  const hash = getHash(url);
  return base + (search === null ? '' : `?${search}`) + (hash === null ? '' : `#${hash}`);
}

export default normalizeUrl;
