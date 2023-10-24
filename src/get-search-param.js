////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import getParsedSearch from './get-parsed-search';

/**
 * 获取当前地址的query string
 *
 * 因为Vue.js的地址都是hash形式做路由，因此基本的 window.location.search 不能获得
 * query string。 例如 http://dev.example.com/test/#/finish?params=xxx
 *
 * @param {String} name
 *     参数名称
 * @param {String|URL} url
 *     可选，表示待解析的URL地址。若无此参数则使用 window.location.href。
 * @return {String}
 *     URL地址中的query string所包含的指定名称的参数值。若不存在则返回null.
 * @author 胡海星
 */
function getSearchParam(name, url) {
  const args = getParsedSearch(url);
  if (args !== undefined && args !== null
      && args[name] !== undefined && args[name] !== null) {
    return args[name];
  } else {
    return null;
  }
}

export default getSearchParam;
