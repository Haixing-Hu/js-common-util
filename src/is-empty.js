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
 * Tests whether the specified value is empty.
 *
 * If the value is a string, or an array, or a typed array, then it is empty if
 * its length is zero. If the value is a map, or a set, then it is empty if its
 * size is zero. Otherwise, if the value has the numeric `length` or `size`
 * property, then it is empty if its `length` or `size` property is zero. If the
 * value has the `isEmpty()` method, then it is empty if the `isEmpty()` method
 * returns `true`. Otherwise, the value is not empty.
 *
 * @param {any} value
 *     the specified value to be tested.
 * @returns {boolean}
 *    `true` if the specified value is empty; `false` otherwise.
 */
function isEmpty(value) {
  const info = typeInfo(value);
  switch (info.category) {
    case 'string':
    case 'array':
    case 'typed-array':
      return value.length === 0;
    case 'map':
    case 'set':
      return value.size === 0;
    case 'object':
    case 'class':
      if (typeof value.isEmpty === 'function') {
        return value.isEmpty();
      } else if (typeof value.length === 'number') {
        return value.length === 0;
      } else if (typeof value.size === 'number') {
        return value.size === 0;
      }
      return false;
    default:
      return false;
  }
}

export default isEmpty;
