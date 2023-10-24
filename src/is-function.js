////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * 判定指定的变量是否是一个函数。
 *
 * @param {any} obj
 *     待判定的变量。
 * @return
 *     若该变量是一个函数，则返回{@code true}；否则返回{@code false}。
 * @author 胡海星
 * @see  https://github.com/jashkenas/underscore/blob/master/modules/isFunction.js
 */
function isFunction(fun) {
  const getType = {};
  return fun && getType.toString.call(fun) === '[object Function]';
}

// Optimize `isFunction` if appropriate. Work around some `typeof` bugs in old
// v8, IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
// if ((typeof /./ !== 'function')
//     && typeof Int8Array !== 'object'
//     && (!Vue || Vue.prototype.$isServer || typeof document.childNodes !== 'function')) {
//   isFunction = function(obj) {
//     return (typeof obj === 'function') || false;
//   };
// }

export default isFunction;
