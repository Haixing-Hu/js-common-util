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
 * Recursively convert objects that may have circular references.
 *
 * This function replaces the circularly referenced sub-object in the object
 * with the form: `{'$ref': PATH}`, where `PATH` is the path of the first
 * occurrence of the sub-object in the object structure tree. For example,
 * ```js
 * const a = [];
 * a.push(a);
 * console.dir(decycle(a));   // output `[{ $ref: '$' }]`
 * ```
 *
 * @param {any} value
 *     The value or object to be converted.
 * @param {Function} replacer
 *     Optional replacement function. If it is not `undefined`, the function
 *     will be applied to each value to be converted and its return value will
 *     be converted.
 * @param {String} path
 *     The current value or path of the object in its root object tree.
 * @param {WeakMap} pathMap
 *     Used to store a mapping of objects to their paths.
 * @author Haixing Hu
 */
function convert(value, replacer, path, pathMap) {
  if (replacer !== undefined) {
    value = replacer(value);
  }
  const info = typeInfo(value);
  if (info.type !== 'object') {
    return value;
  }
  switch (info.category) {
    case 'array':
    case 'map':
    case 'set':
    case 'object':
    case 'class': {
      const oldPath = pathMap.get(value);
      if (oldPath !== undefined) {        // found a circular reference to sub-object
        return { $ref: oldPath };         // Convert it to an object in a specific format
      }
      pathMap.set(value, path);
      switch (info.category) {
        case 'array':
          return value.map((e, i) => convert(e, replacer, `${path}[${i}]`, pathMap));
        case 'map':
          return new Map(Array.from(value, ([k, v], i) => [
              convert(k, replacer, `${path}[${i}].key`, pathMap),
              convert(v, replacer, `${path}[${i}].value`, pathMap),
            ]));
        case 'set':
          return new Set(Array.from(value,
            (e, i) => convert(e, replacer, `${path}[${i}]`, pathMap)));
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
 * Converts an object that may have circular references to sub-objects into a
 * simple object without circular references.
 *
 * This function replaces the circularly referenced sub-object in the object
 * with the form: `{'$ref': PATH}`, where `PATH` is the path of the first
 * occurrence of the sub-object in the object structure tree. For example,
 * ```js
 * const a = [];
 * a.push(a);
 * console.dir(decycle(a));   // output `[{ $ref: '$' }]`
 * ```
 *
 * @param {any} value
 *     The value or object to be converted.
 * @param {function} replacer
 *     Optionally, this function is used to replace certain types of objects.
 * @return
 *     The converted simple object no longer contains cyclically referenced
 *     sub-objects.
 */
function decycle(value, replacer) {
  const pathMap = new WeakMap();
  return convert(value, replacer, '$', pathMap);
}

export default decycle;
