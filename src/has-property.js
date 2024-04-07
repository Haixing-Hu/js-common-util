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
 * Tests whether an object has a property at the specified path.
 *
 * @param {object} obj
 *     The object to query.
 * @param {string} path
 *     The path of the property to get. It should be a string of the property
 *     names separated by dots. For example, if the object is
 *     `{a: {b: {c: 1}}}`, then the path `'a.b.c'` has the property value of `1`.
 *     It also supports array index. For example, if the object is
 *     `{a: {b: [1, 2, 3]}}`, then the path `'a.b[1]'` has the property value of `2`.
 *     If the object is `{a: {b: [{c: 1}, {c: 2}]}}`, then the path `'a.b[1].c'`
 *     has the property value of `2`.
 *     If the path is empty, then the object has the property value of itself.
 * @return {boolean}
 *     `true` if the object has a property at the specified path; `false` otherwise.
 * @author Haixing Hu
 */
function hasProperty(obj, path) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  if (typeof path !== 'string') {
    throw new Error('The path must be a string.');
  }
  if (path === '') {
    return true;
  }
  const segments = path.split(/[.[\]]/g);
  let current = obj;
  for (const key of segments) {
    if (current === undefined || current === null) {
      return false;
    }
    const dequotedKey = dequote(key);
    if (dequotedKey.trim() !== '') {
      current = current[dequotedKey];
    }
  }
  return current !== undefined;
}

export default hasProperty;
