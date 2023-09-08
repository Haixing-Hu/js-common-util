/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * 获取指定类的祖先树上所有的类。
 *
 * @param {Function} Class
 *     指定的类。
 * @param {Array}
 *     指定的类祖先树上所有的类，按照从当前类向父类方向排序，当前指定的类是返回数组的第一个元素。
 *     若参数不是函数对象，则返回空数组。
 */
function getAncestorClasses(Class) {
  if (typeof Class !== 'function') {
    return [];
  }
  const PrototypeOfObject = Object.getPrototypeOf(Object);
  const result = [];
  let Current = Class;
  while (Current !== PrototypeOfObject) {
    result.push(Current);
    Current = Object.getPrototypeOf(Current);
  }
  return result;
}

export default getAncestorClasses;
