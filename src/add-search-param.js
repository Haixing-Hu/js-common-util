/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import getSearch from './get-search';
import getHash from './get-hash';
import encode from './uri-encode';

/**
 * 在当前地址的query string中添加一个参数，注意添加的参数会被URL编码。
 *
 * 因为Vue.js的地址都是hash形式做路由，因此基本的 window.location.search 不能获得
 * query string。 例如 http://dev.example.com/test/#/finish?params=xxx
 *
 * @param {String} name
 *     待添加的参数名称
 * @param {String} value
 *     待添加的参数的参数值
 * @param {String|URL} url
 *     字符串或URL对象，可选参数。表示待解析的URL地址。若无此参数则使用 window.location.href。
 * @return {String}
 *     添加了指定参数的新的链接地址，并且被正确正则化。
 * @author 胡海星
 * @deprecated 请使用更方便的 {@link addSearchParams}。
 */
function addSearchParam(name, value, url) {
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
  name = encode(name);
  value = encode(value);
  const kv = `${name}=${value}`;
  let search = getSearch(url);
  if (search !== null && search.length > 0) {
    search = `${search}&${kv}`;
  } else {
    search = kv;
  }
  return `${base}?${search}${hash}`;
}

export default addSearchParam;
