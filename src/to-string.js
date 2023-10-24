////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import kindOf from 'kind-of';
import jsonStringify from './json-stringify';

/**
 * 把一个值或对象转化为字符串表现形式。
 *
 * 对于字符串、数字、布尔类型，直接给出该值的字符串形式；对于其他对象，给出其JSON编码。
 *
 * @param {any} value
 *     待转换的值或对象。
 * @param {Boolean} beautify
 *     可选，表示是否美化输出的JSON字符串。默认值为false。
 * @return {String}
 *     该值或对象的字符串表现形式。
 * @author 胡海星
 */
function toString(value, beautify = false) {
  const type = kindOf(value);
  switch (type) {
    case 'undefined':
      return 'undefined';
    case 'null':
      return 'null';
    case 'string':
      return value.toString(); // 把可能的String对象转换为primitive string
    case 'boolean':
    case 'number':
    case 'bigint':
    case 'symbol':
    case 'function':
    case 'generatorfunction':
    case 'generator':
    case 'error':
    case 'regexp':
    case 'buffer':
    case 'promise':
      return String(value);
    case 'date':
      return value.toISOString();
    case 'int8array':
    case 'uint8array':
    case 'uint8clampedarray':
    case 'int16array':
    case 'uint16array':
    case 'int32array':
    case 'uint32array':
    case 'float32array':
    case 'float64array':
      return `[${String(value)}]`;
    case 'array':
    case 'map':
    case 'set':
    case 'weakmap':
    case 'weakset':
    case 'mapiterator':
    case 'setiterator':
    case 'stringiterator':
    case 'arrayiterator':
    case 'object':
    default:
      return jsonStringify(value, beautify);
  }
}

export default toString;
