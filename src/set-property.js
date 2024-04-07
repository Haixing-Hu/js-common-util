////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
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
 * Sets the value at the specified path of an object.
 *
 * @param {object} obj
 *     The object to query.
 * @param {string} path
 *     The path of the property to get. It should be a string of the property
 *     names separated by dots. For example, if the object is
 *     `{a: {b: {c: 1}}}`, then set the property `'a.b.c'` to 2 will change
 *     the object to `{a: {b: {c: 2}}}`.
 *     It also supports array index. For example, if the object is
 *     `{a: {b: [1, 2, 3]}}`, then set the property `'a.b[1]'` to 4 will
 *     change the object to `{a: {b: [1, 4, 3]}}`
 *     If the object is `{a: {b: [{c: 1}, {c: 2}]}}`, then the set the property
 *     `'a.b[1].c'` to 3 will change the object to `{a: {b: [{c: 1}, {c: 3}]}}`.
 *     If the path is empty, then the function does nothing and returns `false`.
 * @param value
 *     The value to be set, which may be `null`. If it is `undefined`, the
 *     function will do nothing and return `false`.
 * @return {boolean}
 *     `true` if the value is set successfully, `false` otherwise.
 * @author Haixing Hu
 */
function setProperty(obj, path, value) {
  if (typeof obj !== 'object'
      || obj === null
      || path === ''
      || value === undefined) {
    return false;
  }
  if (typeof path !== 'string') {
    throw new Error('The path must be a string.');
  }
  // split the path into segments
  // filter(Boolean) will remove all empty segments
  const segments = path.split(/[.[\]]/g).filter(Boolean);
  let current = obj;
  const lastIndex = segments.length - 1;
  for (let i = 0; i < lastIndex; ++i) {
    const key = dequote(segments[i]);
    // if the current key is not in the object, or the value is not an object,
    // create a new object or array for the key
    if (!(key in current)
        || (typeof current[key] !== 'object')
        || (current[key] === null)) {
      // check if the next key represents an array index to decide creating an
      // array or an object
      const nextKey = segments[i + 1];
      current[key] = /^\d+$/.test(nextKey) ? [] : {};
    }
    current = current[key];
  }
  // set the final key to the value
  const finalKey = dequote(segments[lastIndex]);
  current[finalKey] = value;
  return true;
}

export default setProperty;
