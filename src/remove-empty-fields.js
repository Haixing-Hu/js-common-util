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
 * Create a new object based on an object, but remove all its attribute values
 * that are empty strings or `null`.
 *
 * @param {any} obj
 *    The object or value to be converted.
 * @return {any}
 *    - If `obj` is `undefined`, returns `undefined`;
 *    - If `obj` is `null`, returns `undefined`;
 *    - If `obj` is a string, returns `undefined` if it is an empty string, and
 *      returns `obj` for other strings;
 *    - If `obj` is a `number`, `boolean`, `bigint`, `symbol` or `function`,
 *      returns `obj`;
 *    - If `obj` is a `Array`, `Set`, `WeakSet`, `Map`, or `WeakMap`, a shallow
 *      copy of `obj` is returned;
 *    - Otherwise, returns a copy of `obj`, but change all its attribute values
 *      that are empty strings to `undefined`.
 * @author Haixing Hu
 */
function removeEmptyFields(obj) {
  const info = typeInfo(obj);
  switch (info.type) {
    case 'undefined':       // fall down
    case 'null':
      return undefined;
    case 'string':
      return (obj === '' ? undefined : obj);    // recursion end point
    case 'boolean':         // fall down
    case 'number':          // fall down
    case 'bigint':          // fall down
    case 'symbol':          // fall down
    case 'function':
      return obj;
    case 'object':          // fall down
    default:
      break;
  }
  switch (info.subtype) {
    case 'Array':
      // Process each element recursively
      return obj.map((v) => removeEmptyFields(v)).filter((v) => v !== undefined);
    case 'Map':
    case 'WeakMap': {
      const result = new Map();
      for (const key of obj.keys()) {
        const value = obj.get(key);
        const newValue = removeEmptyFields(value);      // Process each element recursively
        if (newValue !== undefined) {
          result.set(key, newValue);
        }
      }
      return result;
    }
    case 'Set':
    case 'WeakSet': {
      const result = new Set();
      for (const value of obj.values()) {
        const newValue = removeEmptyFields(value);      // Process each element recursively
        if (newValue !== undefined) {
          result.add(newValue);
        }
      }
      return result;
    }
    case 'Object':
    default:
      if (info.isBuiltIn) {
        return obj;                                   // recursion end point
      } else {
        // Create objects of the same type. Note that Object.create() cannot be used.
        const result = new obj.constructor();
        Object.keys(obj).forEach((key) => {
          const value = removeEmptyFields(obj[key]);  // Process each attribute recursively
          if (value !== undefined) {
            result[key] = value;
          } else {
            delete result[key];
          }
        });
        return result;
      }
  }
}

export default removeEmptyFields;
