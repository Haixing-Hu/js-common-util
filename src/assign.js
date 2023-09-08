/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import deepEqual from 'deep-equal';
import clone from './clone';

/**
 * 将源对象的所有属性值，复制到目标对象的对应属性中，但仅仅更改那些不同的属性值
 * （通过{@link deepEqual}判定），返回一个对象包含所有被更改过的属性值。
 *
 * @param {Object} target
 *     目标对象，必须是一个{@link Object}，可以是用户自定义类。调用此函数后将更改
 *     此对象的某些属性。
 * @param {Object} source
 *     源对象，必须是一个{@link Object}，可以是用户自定义类。可以和target
 *     具有不同的prototype（即可以是不同的类）。
 * @param {Object} changes
 *     可选，用于存储source对象所有更改的属性值的深度克隆。默认值为一个
 *     空对象。
 * @return {Object}
 *     对于target对象的所有属性，此函数将source对象中同名属性的值，
 *     深度克隆后复制到source对象的对应属性中，但仅仅更改那些target
 *     和source中不同的属性值（通过{@link deepEqual}判定）；此函数会将所
 *     有更改后的属性值，复制一份深度拷贝到changes参数对象中，并最终返回
 *     changes对象。
 * @author 胡海星
 */
function assign(target, source, changes = {}) {
  if (target === undefined || target === null
      || source === undefined || source === null
      || typeof target !== 'object' || typeof source !== 'object') {
    return changes;
  }
  Object.keys(target).forEach((prop) => {
    const our = target[prop];
    const their = source[prop];
    if (their !== undefined && their !== null && !deepEqual(their, our)) {
      target[prop] = clone(their);  // 注意这里需要deep clone属性值
      changes[prop] = clone(their); // 注意这里需要deep clone属性值
    }
  });
  return changes;
}

export default assign;
