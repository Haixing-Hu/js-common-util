////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { isSet } from '@qubit-ltd/type-detect';

/**
 * Filter object keys and values into a new object.
 *
 * @param object
 *    the specified object.
 * @param predicate
 *    the specified predicate function or an array of keys or a Set of keys.
 * @return {object}
 *    the new object with the filtered keys and values.
 */
function includeKeys(object, predicate) {
  const result = {};
  if (Array.isArray(predicate) || isSet(predicate)) {
    for (const key of predicate) {
      const descriptor = Object.getOwnPropertyDescriptor(object, key);
      if (!descriptor?.enumerable) {
        continue;
      }
      Object.defineProperty(result, key, descriptor);
    }
  } else {
    // `Reflect.ownKeys()` is required to retrieve symbol properties
    for (const key of Reflect.ownKeys(object)) {
      const descriptor = Object.getOwnPropertyDescriptor(object, key);
      if (!descriptor?.enumerable) {
        continue;
      }
      const value = object[key];
      if (predicate(key, value, object)) {
        Object.defineProperty(result, key, descriptor);
      }
    }
  }
  return result;
}

export default includeKeys;
