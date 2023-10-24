////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Provides helper functions for JavaScript native arrays.
 *
 * @author Haixing Hu
 */
const ArrayUtils = {

  /**
   * Removes the specified element from the array.
   *
   * This function compares elements via `===`.
   *
   * @param {Array} array
   *     the specified array.
   * @param {*} element
   *     The element to be deleted.
   * @returns {boolean}
   *     If the specified element exists in the array, delete the first such
   *     element and return {@code true}; otherwise return {@code false}.
   * @see {@link removeIf}
   * @author Haixing Hu
   */
  remove(array, element) {
    for (let i = 0; i < array.length; ++i) {
      if (array[i] === element) {
        array.splice(i, 1);
        return true;
      }
    }
    return false;
  },

  /**
   * Remove elements that meet the condition from the array.
   *
   * @param {Array} array
   *     the specified array.
   * @param {Function} predicate
   *     Conditions that need to be met for the element to be deleted.
   * @returns {boolean}
   *     If there is an element in the array that satisfies the specified
   *     predicate, deletes the first such element and returns {@code true};
   *     otherwise, returns {@code false}.
   * @author Haixing Hu
   */
  removeIf(array, predicate) {
    for (let i = 0; i < array.length; ++i) {
      if (predicate(array[i], i)) {
        array.splice(i, 1);
        return true;
      }
    }
    return false;
  },
};

export default ArrayUtils;
