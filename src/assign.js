////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import clone from '@haixing_hu/clone';
import deepEqual from './deep-equal';

/**
 * Copies all attribute values of the source object to the corresponding
 * attributes of the target object, but only changes those different attribute
 * values (determined by {@link deepEqual}), and returns an object containing
 * all changed attribute values.
 *
 * @param {Object} target
 *     The target object, which can be an instance of a user-defined class.
 *     Calling this function will change some properties of this object.
 * @param {Object} source
 *     The source object, which can be an instance of a user-defined class. It
 *     can have a different prototype than the target (that is, they can be of
 *     different classes).
 * @param {Object} changes
 *     Optional argument, which will be used to store the deep clones of changed
 *     property of the source object. The default value of this argument is an
 *     empty object.
 * @return {Object}
 *     For all attributes of the target object, this function deep clones the
 *     value of the attribute with the same name in the source object and copies
 *     it to the corresponding attribute of the source object, but only changes
 *     the attribute values that are different in the target and source
 *     (determined by {@link deepEqual} ). This function will make a deep copy
 *     of all changed attribute values into the changes parameter object, and
 *     finally return the changes object.
 * @author Haixing Hu
 */
function assign(target, source, changes = {}) {
  if ((target === undefined)
      || (target === null)
      || (source === undefined)
      || (source === null)
      || (typeof target !== 'object')
      || (typeof source !== 'object')) {
    return changes;
  }
  Object.keys(target).forEach((prop) => {
    const our = target[prop];
    const their = source[prop];
    if ((their !== undefined) && (their !== null) && !deepEqual(their, our)) {
      target[prop] = clone(their);  // Note that a deep clone is required here.
      changes[prop] = clone(their); // Note that a deep clone is required here.
    }
  });
  return changes;
}

export default assign;
