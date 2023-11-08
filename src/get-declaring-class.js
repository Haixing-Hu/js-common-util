////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Gets the declaring class of the specified property from the ancestor tree of
 * the specified class.
 *
 * All classes in the ancestor tree of the specified class must have a default
 * constructor.
 *
 * If the specified property is declared in multiple places in the ancestor tree
 * of the specified class, this function returns the earliest declaring class.
 *
 * @param {function} Class
 *     The constructor of the specified class.
 * @param {string} property
 *     The name of the specified property.
 * @return {function}
 *     The earliest declaring class of the specified property in the ancestor
 *     tree of the specified class; or `null` if there is no such declaring
 *     class.
 * @deprecated This function **CANNOT** correctly handle the class fields, and
 * we haven't found a correct way to implement it. Do **NOT** use it.
 */
function getDeclaringClass(Class, property) {
  if (typeof Class !== 'function') {
    throw new TypeError('The parameter "Class" must be the constructor of a class.');
  }
  if (typeof property !== 'string') {
    throw new TypeError('The parameter "property" must be a string.');
  }
  let Current = Class;
  let Last = null;
  while (Current !== Function.prototype) {
    // Tests whether property is defined in the prototype of Current
    if (Object.hasOwn(Current.prototype, property)) {
      return Current;
    }
    // Tests whether property is defined in the instance of Current
    const instance = new Current();
    if (!(property in instance)) {
      return Last;
    }
    Last = Current;
    // Go backward in the ancestor tree
    Current = Object.getPrototypeOf(Current);
  }
  if (Object.hasOwn(Last.prototype, property)) {
    return Last;
  } else if (Object.hasOwn(Object.prototype, property)) {
    // deal with the special cases that the property is declared in Object
    return Object;
  } else {
    return Last;
  }
}

export default getDeclaringClass;
