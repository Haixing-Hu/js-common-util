////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import kindOf from 'kind-of';

/**
 * 递归地转换可能带有循环引用的对象。
 *
 * 此函数将对象中循环引用的子对象替换为：{"$ref:" PATH} 的形式，其中 PATH 是该
 * 子对象在对象结构树中第一次出现的路径。例如，
 *
 * ```javascript
 * const a = [];
 * a.push(a);
 * console.dir(decycle(a));   // 输出 '[{"$ref": "$"}]'
 * ```
 *
 * @param {any} value
 *     待转换的值或对象。
 * @param {Function} replacer
 *     可选的替换函数，若不为undefined，此函数将被作用到每个待转换的值上，对其
 *     返回值进行转换。
 * @param {String} path
 *     当前值或对象在其根对象树中的路径。
 * @param {WeakMap} pathMap
 *     用于存储对象到其路径的映射。
 * @private
 */
function convert(value, replacer, path, pathMap) {
  if (replacer !== undefined) {
    value = replacer(value);
  }
  const type = kindOf(value);
  switch (type) {
    case 'array':
    case 'map':
    case 'set':
    case 'object': {
      const oldPath = pathMap.get(value);
      if (oldPath !== undefined) {        // 发现循环引用子对象
        return { $ref: oldPath };         // 将其转换为特定格式的对象
      }
      pathMap.set(value, path);
      switch (type) {
        case 'array':
          return value.map((e, i) => convert(e, replacer, `${path}[${i}]`, pathMap));
        case 'map':
          return Array.from(value).map((e, i) => [
            convert(e[0], replacer, `${path}[${i}].key`, pathMap),
            convert(e[1], replacer, `${path}[${i}].value`, pathMap),
          ]);
        case 'set':
          return Array.from(value).map((e, i) => convert(e, replacer, `${path}[${i}]`, pathMap));
        case 'object':
        default: {
          const result = {};
          Object.keys(value).forEach((name) => {
            result[name] = convert(value[name], replacer, `${path}.${name}`, pathMap);
          });
          return result;
        }
      }
    }
    default:
      return value;
  }
}

/**
 * 将一个可能带有循环引用子对象的对象转换为非循环引用的简单对象。
 *
 * 此函数将对象中循环引用的子对象替换为：{"$ref:" PATH} 的形式，其中 PATH 是该
 * 子对象在对象结构树中第一次出现的路径。例如，
 *
 * ```javascript
 * const a = [];
 * a.push(a);
 * console.dir(decycle(a));   // 输出 '[{"$ref": "$"}]'
 * ```
 *
 * @param {*} value
 *     待转换的值或对象。
 * @param {Function} replacer
 *     可选，此函数用于替换某些类型的对象。
 * @return
 *     转换后的简单对象，不再包含循环引用的子对象。
 */
function decycle(value, replacer) {
  const pathMap = new WeakMap();
  return convert(value, replacer, '$', pathMap);
}

export default decycle;
