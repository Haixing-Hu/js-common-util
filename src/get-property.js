////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import dequote from './dequote';

/**
 * Gets the value at the specified path of an object.
 *
 * @param obj
 *     The object to query.
 * @param path
 *     The path of the property to get. It should be a string of the property
 *     names separated by dots. For example, if the object is
 *     `{a: {b: {c: 1}}}`, then the path `'a.b.c'` will return `1`.
 *     It also supports array index. For example, if the object is
 *     `{a: {b: [1, 2, 3]}}`, then the path `'a.b[1]'` will return `2`.
 *     If the object is `{a: {b: [{c: 1}, {c: 2}]}}`, then the path `'a.b[1].c'`
 *     will return `2`.
 *     If the path is empty, then the object itself is returned.
 * @param defaultValue
 *     The default value. If it is not specified, then `undefined` is used as
 *     the default value.
 * @return {any}
 *     The value at the specified path of the object, or the default value if
 *     the path does not exist in the object.
 * @author Haixing Hu
 */
function getProperty(obj, path, defaultValue = undefined) {
  if (typeof obj !== 'object' || obj === null) {
    return defaultValue;
  }
  if (typeof path !== 'string') {
    throw new Error('The path must be a string.');
  }
  if (path === '') {
    return obj;
  }
  const segments = path.split(/[.[\]]/g);
  let current = obj;
  for (const key of segments) {
    if (current === undefined || current === null) {
      return defaultValue;
    }
    const dequotedKey = dequote(key);
    if (dequotedKey.trim() !== '') {
      current = current[dequotedKey];
    }
  }
  if (current === undefined) {
    return defaultValue;
  }
  return current;
}

export default getProperty;
