////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import getAncestorClasses from './get-ancestor-classes';

/**
 * 获取指定字段的在指定类的祖先树上的声明类。
 *
 * 注意：指定类的祖先树上所有类都必须有默认构造器。
 *
 * 注意：若指定的字段在指定类的祖先树上多处都有声明，此函数返回最早的声明类。
 *
 * @param {Function} Class
 *     指定的类。
 * @param {String} field
 *     指定的字段。
 * @param {Function}
 *     指定字段的在指定类的祖先树上的最早的声明类；若没有则返回null。
 */
function getDeclaringClass(Class, field) {
  if (typeof Class !== 'function' || typeof field !== 'string') {
    return null;
  }
  const ancestors = getAncestorClasses(Class);
  let result = null;
  for (const Current of ancestors) {
    const instance = new Current();
    if (!Object.hasOwn(instance, field)) {
      return result;
    }
    result = Current;
  }
  return result;
}

export default getDeclaringClass;
