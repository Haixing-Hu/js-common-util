////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import qs from 'qs';
import getSearch from './get-search';
import getHash from './get-hash';

/**
 * 在当前地址的query string中删除一个参数
 *
 * 因为Vue.js的地址都是hash形式做路由，因此基本的 window.location.search 不能获得
 * query string。 例如 http://dev.example.com/test/#/finish?params=xxx
 *
 * @param {String} name
 *     待删除的参数名称
 * @param {String|URL} url
 *     字符串或URL对象，可选参数。表示待解析的URL地址。若无此参数则使用
 *     window.location.href。
 * @return {String}
 *     删除了指定参数的新的链接地址，并且被正确正则化。
 * @author 胡海星
 */
function removeSearchParam(name, url) {
  if (url === undefined) {
    url = window.location;
  } else if (!(url instanceof URL)) {
    url = new URL(url);
  }
  const base = url.origin + url.pathname;
  const hash = getHash(url);
  let search = getSearch(url);
  if (search !== null && search.length > 0) {
    const args = qs.parse(search);
    if (args[name] !== undefined) {
      delete args[name];
      search = qs.stringify(args);
    }
  }
  return base
    + (search === null ? '' : `?${search}`)
    + (hash === null ? '' : `#${hash}`);
}

export default removeSearchParam;
