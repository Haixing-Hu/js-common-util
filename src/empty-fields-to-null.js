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
      // Process each element recursively
      return obj.map((e) => emptyFieldsToNull(e));
    case 'Map':
      // Process each element recursively
      return new Map(Array.from(obj, ([k, v]) => [k, emptyFieldsToNull(v)]));
    case 'Set':
      // Process each element recursively
      return new Set(Array.from(obj, (v) => emptyFieldsToNull(v)));
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
