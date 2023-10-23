/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/

// 为了方便函数建递归调用，将所有实现函数用一个对象封装起来
const Impl = {
  /**
   * 将一个被Vue托管的对象或数组还原为原生的对象或数组。
   *
   * 在定义Vue.js的组件时，通过`data()`函数返回的绑定数据对象会被Vue.js框架托管；
   * 具体而言，为了实现数据绑定，Vue.js框架会把被托管对象的所有属性修改为`getter/setter`
   * 函数，并且在`getter/setter`函数实现时检测数据变化。对于被托管数组，Vue.js会
   * 把数组的`length`属性丢弃，直接修改数组的`0`,`1`,...这些属性值。这种不规范地修
   * 改对象和数组会给很多框架带来麻烦。
   *
   * 为了方便处理这类被托管对象和数组，此函数会递归地将其还原为原生的对象和数组，
   * 然后再传递给相关框架做进一步处理。
   *
   * 注意：此函数假设输入的被托管对象属性树中没有循环引用。
   *
   * @param {Object} obj
   *     被Vue托管的对象或数组，其属性树中不能有循环引用。
   * @return {Object|Array}
   *     原生的对象或数组，其属性值或内部元素也会被递归还原。
   * @author 胡海星
   */
  restore(obj) {
    if (obj === undefined || obj === null) {
      return obj;
    }
    // 注意因为Vue.js修改了被托管的数组后抛弃了数组的length属性，所以无法用
    // Array.isArray()判定一个被托管对象是否是数组，只能根据其toString()值进行判定
    const type = Object.prototype.toString.call(obj);
    switch (type) {
      case '[object Array]':
        return this.restoreArray(obj);
      case '[object Object]':
        return this.restoreObject(obj);
      default:
        return obj;
    }
  },

  /**
   * 将一个被Vue托管的数组还原为原生的数组。
   *
   * @param {Array} array
   *     被Vue托管的数组，其属性树中不能有循环引用。
   * @return {Array}
   *     原生的数组，其内部每一个元素都会被递归还原。
   * @author 胡海星
   */
  restoreArray(array) {
    const result = [];
    for (const index in array) {
      if (Object.prototype.hasOwnProperty.call(array, index)) {
        const item = this.restore(array[index]);   // 递归还原数组每个元素
        result.push(item);
      }
    }
    return result;
  },

  /**
   * 将一个被Vue托管的对象还原为原生的对象。
   *
   * @param {Object} obj
   *     被Vue托管的对象，其属性树中不能有循环引用。
   * @return {Object}
   *     原生的对象，其每一个属性都会被递归还原。
   * @author 胡海星
   */
  restoreObject(obj) {
    const result = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // 递归还原对象每个可枚举属性
        result[key] = this.restore(obj[key]);
      }
    }
    return result;
  },
};

/**
 * 将一个被Vue托管的对象或数组还原为原生的对象或数组。
 *
 * 在定义Vue.js的组件时，通过`data()`函数返回的绑定数据对象会被Vue.js框架托管；
 * 具体而言，为了实现数据绑定，Vue.js框架会把被托管对象的所有属性修改为`getter/setter`
 * 函数，并且在`getter/setter`函数实现时检测数据变化。对于被托管数组，Vue.js会
 * 把数组的`length`属性丢弃，直接修改数组的`0`,`1`,...这些属性值。这种不规范地修
 * 改对象和数组会给很多框架带来麻烦。
 *
 * 为了方便处理这类被托管对象和数组，此函数会递归地将其还原为原生的对象和数组，
 * 然后再传递给相关框架做进一步处理。
 *
 * 注意：此函数假设输入的被托管对象属性树中没有循环引用。
 *
 * @param {Object} obj
 *     被Vue托管的对象或数组，其属性树中不能有循环引用。
 * @return {Object|Array}
 *     原生的对象或数组，其属性值或内部元素也会被递归还原。
 * @author 胡海星
 */
function restoreVueManaged(obj) {
  return Impl.restore(obj);
}

export default restoreVueManaged;
