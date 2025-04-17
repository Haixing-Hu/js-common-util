////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import typeInfo from '@qubit-ltd/typeinfo';
import Json from '@qubit-ltd/json';
import decycle from './decycle';

/**
 * Convert a value or object to a string representation.
 *
 * For string, number, and Boolean types, the string form of the value is
 * directly given; for other objects, its JSON encoding is given.
 *
 * @param {any} value
 *     The value or object to be converted.
 * @param {boolean} beautify
 *     Optional, indicating whether to beautify the output JSON string. The
 *     default value is `false`.
 * @return {string}
 *     The string representation of this value or object.
 * @author Haixing Hu
 */
function toString(value, beautify = false) {
  const info = typeInfo(value);
  switch (info.category) {
    case 'undefined':                 // fall down
    case 'null':
      return info.category;
    case 'date':
      return value.toISOString();
    case 'typed-array':
      return `[${String(value)}]`;
    case 'array':                     // fall down
    case 'map':                       // fall down
    case 'set':                       // fall down
    case 'iterator':                  // fall down
    case 'object':                    // fall down
    case 'class':
      if (beautify) {
        return Json.stringify(decycle(value), null, 2);
      } else {
        return Json.stringify(decycle(value));
      }
    default:
      if (info.isBuiltIn) {
        return String(value);
      } else if (beautify) {
        return Json.stringify(decycle(value), null, 2);
      } else {
        return Json.stringify(decycle(value));
      }
  }
}

export default toString;
