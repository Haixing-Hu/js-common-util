/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * 提供 JavaScript 原生数组的辅助函数。
 *
 * @author 胡海星
 */
const ArrayUtils = {

  /**
   * 从数组中删除指定的元素。
   *
   * 此函数通过'==='比较元素。
   *
   * @param {Array} array
   *     指定的数组。
   * @param {*} element
   *     待删除的元素。
   * @returns {boolean}
   *     若数组中存在指定的元素，则删除第一个这样的元素并返回{@code true}；否则返回
   *     {@code false}。
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
   * 从数组中删除满足条件的元素。
   *
   * @param {Array} array
   *     指定的数组。
   * @param {Function} predicate
   *     待删除元素需要满足的条件。
   * @returns {boolean}
   *     若数组中存在满足条件的元素，则删除第一个这样的元素并返回{@code true}；否则返回
   *     {@code false}。
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
