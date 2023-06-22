/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2020
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/
import qs from 'qs';
import getSearch from './get-search';
import getHash from './get-hash';

/**
 * 在当前地址的query string中添加一个参数，注意添加的参数会被URL编码。
 *
 * 因为Vue.js的地址都是hash形式做路由，因此基本的 window.location.search 不能获得
 * query string。 例如 http://dev.example.com/test/#/finish?params=xxx
 *
 * @param {Object}
 *     待添加的参数对象，其每个属性名称和属性值都会被作为key-value添加到当前地址
 *     的query string。
 * @param {String|URL} url
 *     字符串或URL对象，可选参数。表示待解析的URL地址。若无此参数则使用
 *     window.location.href。
 * @returns {String}
 *     添加了指定参数的新的链接地址，并且被正确正则化。
 * @author 谷贤旺
 */
function addSearchParams(params, url) {
  if (url === undefined) {
    url = window.location;
  } else if (!(url instanceof URL)) {
    url = new URL(url);
  }
  const base = url.origin + url.pathname;
  let hash = getHash(url);
  if (hash == null) {
    hash = '';
  } else {
    hash = `#${hash}`;
  }
  const kv = qs.stringify(params);
  let search = getSearch(url);
  if (search !== null && search.length > 0) {
    search = `${search}&${kv}`;
  } else {
    search = kv;
  }
  return `${base}?${search}${hash}`;
}

export default addSearchParams;
