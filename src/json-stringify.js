////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import typeInfo from '@qubit-ltd/typeinfo';
import jsonBeautify from 'json-beautify';
import decycle from './decycle';

/**
 * Replacer for JSON serialization of Set, Map, BigInt objects.
 *
 * @param {String} key
 *     The current primary key.
 * @param {any} value
 *     current value.
 * @return {any}
 *     The value to be replaced.
 * @author Haixing Hu
 * @private
 */
function replacer(key, value) {
  const info = typeInfo(value);
  switch (info.type) {
    case 'null':
    case 'undefined':
    case 'string':
    case 'boolean':
    case 'number':
      return value;
    case 'bigint':
      return `${String(value)}n`;
    case 'object':
      switch (info.subtype) {
        case 'Map':
        case 'Set':
          return [...value];
        default:
          return value;
      }
    default:
      return String(value);
  }
}

/**
 * Serialize a value to a JSON string.
 *
 * This function functions similarly to `JSON.stringify()`, but supports some
 * built-in objects above ES6 and can format the printed JSON serialization
 * result string according to the arguments.
 *
 * @param {any} value
 *     The value.
 * @param {boolean} beautify
 *     Optional, indicating whether to beautify the output JSON string. The
 *     default value is `false`.
 * @return {String}
 *     The JSON string of the serialization of the specified value, which will
 *     be formatted if the `beautify` argument is `true`.
 * @author Haixing Hu
 */
function jsonStringify(value, beautify = false) {
  if (value === undefined) {
    return 'undefined';
  } else if (value === null) {
    return 'null';
  }
  value = decycle(value);  // Convert objects that may have circular references
  if (beautify) {
    return jsonBeautify(value, replacer, 2, 80);
  } else {
    return JSON.stringify(value, replacer);
  }
}

export default jsonStringify;
