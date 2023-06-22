/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2022
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * 判定指定的变量是否是一个对象。
 *
 * @param {any} obj
 *     待判定的变量。
 * @return
 *     若该变量是JavaScript的{@code Object}，则返回{@code true}；否则返回{@code false}。
 * @author 胡海星
 */
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export default isObject;
