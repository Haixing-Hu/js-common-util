/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import kindOf from 'kind-of';

/**
 * 根据某个对象，创建一个新的对象，但将其所有为空字符串，或为null的属性值全部移除
 *
 * @param {any} obj
 *    待转换的对象或值。
 * @return {any}
 *    若obj为undefined，返回undefined；
 *    若obj为null，返回undefined；
 *    若obj为字符串，对于空字符串返回undefined，对于其他返回obj；
 *    若obj为数字、布尔，或符号，返回obj；
 *    若obj为{@link Array}, {@link Set}, 或{@link Map}，则返回obj的浅拷贝；
 *    否则，返回obj的一份拷贝，但将其所有为空字符串的属性值全部修改为undefined。
 * @author 胡海星
 */
function removeEmptyFields(obj) {
  const type = kindOf(obj);
  switch (type) {
    case 'undefined':
    case 'null':
      return undefined;
    case 'string':
      return (obj === '' ? undefined : obj);               // 递归终止点
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
    case 'date':
    case 'int8array':
    case 'uint8array':
    case 'uint8clampedarray':
    case 'int16array':
    case 'uint16array':
    case 'int32array':
    case 'uint32array':
    case 'float32array':
    case 'float64array':
    case 'mapiterator':
    case 'setiterator':
    case 'stringiterator':
    case 'arrayiterator':
      return obj;                                       // 递归终止点
    case 'array': {
      const result = [];
      for (const value of obj) {
        const newValue = removeEmptyFields(value);      // 递归处理每个元素
        if (newValue !== undefined) {
          result.push(newValue);
        }
      }
      return result;
    }
    case 'map':
    case 'weakmap': {
      const result = new Map();
      for (const key of obj.keys()) {
        const value = obj.get(key);
        const newValue = removeEmptyFields(value);      // 递归处理每个元素
        if (newValue !== undefined) {
          result.set(key, newValue);
        }
      }
      return result;
    }
    case 'set':
    case 'weakset': {
      const result = new Set();
      for (const value of obj.values()) {
        const newValue = removeEmptyFields(value);      // 递归处理每个元素
        if (newValue !== undefined) {
          result.add(newValue);
        }
      }
      return result;
    }
    case 'object':
    default: {
      // 创建同类型对象
      const prototype = Object.getPrototypeOf(obj);
      const result = Object.create(prototype);
      Object.keys(obj).forEach((key) => {
        const value = removeEmptyFields(obj[key]);      // 递归处理每个属性
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
