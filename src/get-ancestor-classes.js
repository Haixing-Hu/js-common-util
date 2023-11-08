////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Get all classes in the ancestor tree of the specified class.
 *
 * @param {function} Class
 *     the constructor of the specified class.
 * @return {array}
 *     The array of the constructors of all classes in ancestor tree of the
 *     specified class, sorted from the current class to the ancestor class.
 *     The specified class is the first element of the returned array. If the
 *     parameter `Class` is not a function, an empty array is returned.
 * @author Haixing Hu
 */
function getAncestorClasses(Class) {
  if (typeof Class !== 'function') {
    return [];
  }
  const result = [];
  let Current = Class;
  while (Current !== Function.prototype) {
    result.push(Current);
    Current = Object.getPrototypeOf(Current);
  }
  return result;
}

export default getAncestorClasses;
