////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isSet from './impl/is-set';
import includeKeys from './include-keys';

/**
 * Filter object keys and values into a new object.
 *
 * @param object
 *     the specified object.
 * @param predicate
 *     the specified predicate function or an array of keys or a Set of keys.
 * @return {object}
 *     the new object without the filtered keys and values.
 */
function excludeKeys(object, predicate) {
  if (Array.isArray(predicate)) {
    const set = new Set(predicate);
    return includeKeys(object, (key) => !set.has(key));
  }
  if (isSet(predicate)) {
    return includeKeys(object, (key) => !predicate.has(key));
  }
  return includeKeys(object, (key, value, object) => !predicate(key, value, object));
}

export default excludeKeys;
