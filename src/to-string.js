////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import typeInfo from '@haixing_hu/typeinfo';
import jsonStringify from './json-stringify';

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
  switch (info.type) {
    case 'undefined':       // fall down
    case 'null':
      return info.type;
    case 'string':
      return value;
    case 'boolean':
    case 'number':
    case 'bigint':
    case 'symbol':
    case 'function':
      return String(value);
    case 'object':          //  fall down
    default:
      break;                //  fall down
  }
  switch (info.subtype) {
    case 'Date':
      return value.toISOString();
    case 'Int8Array':                 // fall down
    case 'Uint8Array':                // fall down
    case 'Uint8ClampedArray':         // fall down
    case 'Int16Array':                // fall down
    case 'Uint16Array':               // fall down
    case 'Int32Array':                // fall down
    case 'Uint32Array':               // fall down
    case 'BigInt64Array':             // fall down
    case 'BigUint64Array':            // fall down
    case 'Float32Array':              // fall down
    case 'Float64Array':
      return `[${String(value)}]`;
    case 'Array':                     // fall down
    case 'Map':                       // fall down
    case 'Set':                       // fall down
    case 'WeakMap':                   // fall down
    case 'WeakSet':                   // fall down
    case 'MapIterator':               // fall down
    case 'SetIterator':               // fall down
    case 'ArrayIterator':             // fall down
    case 'StringIterator':            // fall down
    case 'RegExpStringIterator':      // fall down
    case 'SegmenterStringIterator':   // fall down
    case 'Object':
      return jsonStringify(value, beautify);
    default:
      return info.isBuiltIn ? String(value) : jsonStringify(value, beautify);
  }
}

export default toString;
