////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isEmpty from './is-empty';

/**
 * Map an empty value to `null`.
 *
 * If the value is a string, or an array, or a typed array, then it is empty if
 * its length is zero. If the value is a map, or a set, then it is empty if its
 * size is zero. Otherwise, if the value has the numeric `length` or `size`
 * property, then it is empty if its `length` or `size` property is zero. If the
 * value has the `isEmpty()` method, then it is empty if the `isEmpty()` method
 * returns `true`. Otherwise, the value is not empty.
 *
 * @param {any} value
 *    The value to be mapped.
 * @return
 *    If the value is `undefined` or `null`, or an "empty" value, returns `null`;
 *    otherwise, returns the value itself.
 * @author Haixing Hu
 * @see isEmpty
 */
function emptyToNull(value) {
  if (value === undefined || value === null) {
    return null;
  } else if (isEmpty(value)) {
    return null;
  } else {
    return value;
  }
}

export default emptyToNull;
