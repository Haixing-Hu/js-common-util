////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import typeInfo from '@haixing_hu/typeinfo';

/**
 * Creates a new object based on an existing object, but sets all its empty
 * properties values to `null`.
 *
 * @param {any} obj
 *    The object or value to be converted.
 * @return
 *    - If `obj` is `undefined`, returns `undefined`;
 *    - If `obj` is `null`, returns `null`;
 *    - If `obj` is a string, `null` is returned for an empty string, and `obj` is
 *      returned for other strings;
 *    - If `obj` is a `boolean`, `number`, `bigint` `symbol` or `function` value,
 *      returns `obj`;
 *    - If `obj` is an `Array`, `Set`, or `Map`, a shallow copy of `obj` is returned.
 *      Otherwise, return a copy of `obj`, but modify all its attribute values
 *      that are empty strings to `null`.
 * @author Haixing Hu
 * @deprecated
 */
function emptyFieldsToNull(obj) {
  const info = typeInfo(obj);
  switch (info.category) {
    case 'string':
    case 'typed-array':
      return (obj.length === 0 ? null : obj);         // recursion end point
    case 'array':
      if (obj.length === 0) {
        return null;                                  // recursion end point
      } else {
        return obj.map((e) => emptyFieldsToNull(e));  // recursion
      }
    case 'map':
      if (obj.size === 0) {
        return null;
      } else {
        return new Map(Array.from(obj, ([k, v]) => [k, emptyFieldsToNull(v)])); // recursion
      }
    case 'set':
      if (obj.size === 0) {
        return null;
      } else {
        return new Set(Array.from(obj, (v) => emptyFieldsToNull(v))); // recursion
      }
    case 'object':
    case 'class': {
      let empty = false;
      if (typeof obj.isEmpty === 'function') {
        empty = obj.isEmpty();
      } else if (typeof obj.length === 'number') {
        empty = (obj.length === 0);
      } else if (typeof obj.size === 'number') {
        empty = (obj.size === 0);
      }
      if (empty) {
        return null;
      }
      // Create objects of the same type.
      // Note that Object.create() cannot be used.
      const result = new obj.constructor();
      Object.keys(obj).forEach((key) => {
        result[key] = emptyFieldsToNull(obj[key]);  // recursion
      });
      return result;
    }
    default:
      return obj;
  }
}

export default emptyFieldsToNull;
