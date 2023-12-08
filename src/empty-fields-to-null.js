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
 * Create a new object based on an existing object, but modify all its attribute
 * values that are empty strings to `null`.
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
 */
function emptyFieldsToNull(obj) {
  const info = typeInfo(obj);
  switch (info.type) {
    case 'string':
      return (obj === '' ? null : obj);               // recursion end point
    case 'undefined':   // fall down
    case 'null':        // fall down
    case 'boolean':     // fall down
    case 'number':      // fall down
    case 'bigint':      // fall down
    case 'symbol':      // fall down
    case 'function':
      return obj;
    case 'object':      // fall down
    default:
      break;            // fall down
  }
  switch (info.subtype) {
    case 'Array':
      return obj.map((e) => emptyFieldsToNull(e));  // Process each element recursively
    case 'Map':
    case 'WeakMap': {
      const result = new Map();
      for (const key of obj.keys()) {
        const value = obj.get(key);
        const newValue = emptyFieldsToNull(value);  // Process each element recursively
        result.set(key, newValue);
      }
      return result;
    }
    case 'Set':
    case 'WeakSet': {
      const result = new Set();
      for (const value of obj.values()) {
        const newValue = emptyFieldsToNull(value);  // Process each element recursively
        result.add(newValue);
      }
      return result;
    }
    case 'Object':
    default: {
      if (info.isBuiltIn) {
        return obj;                                 // recursion end point
      }
      // Create objects of the same type. Note that Object.create() cannot be used.
      const result = new obj.constructor();
      Object.keys(obj).forEach((key) => {
        result[key] = emptyFieldsToNull(obj[key]);  // Process each attribute recursively
      });
      return result;
    }
  }
}

export default emptyFieldsToNull;
