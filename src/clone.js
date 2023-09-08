/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import {
  PromisePrototype,
  MapPrototype,
  SetPrototype,
  WeakMapPrototype,
  WeakSetPrototype,
  ArrayBufferPrototype,
  SharedArrayBufferPrototype,
  DataViewPrototype,
  BigIntPrototype,
  BigInt64ArrayPrototype,
  BigUint64ArrayPrototype,
  Float32ArrayPrototype,
  Float64ArrayPrototype,
  Int8ArrayPrototype,
  Int16ArrayPrototype,
  Int32ArrayPrototype,
  Uint8ArrayPrototype,
  Uint8ClampedArrayPrototype,
  Uint16ArrayPrototype,
  Uint32ArrayPrototype,
} from './impl/buildin-prototype';

/**
 * 将源对象的属性复制到目标对象。
 *
 * 注意，为了支持Vue.js对对象的响应式监控，我们只能复制对象的enumerable属性，并且
 * 不考虑对象的getter/setter，而是直接把源对象的属性值取出来（可能是调用了源对象
 * 对应属性的getter），递归地深度克隆后复制到目标对象中（可能是调用了目标对象对
 * 应属性的setter）。因此参数options的includeAccessor和
 * includeNonEnumerable应该不设置或者设置为false.
 *
 * 关于Vue.js的响应式原理，请参见：https://cn.vuejs.org/v2/guide/reactivity.html
 *
 * @param {Object} source
 *     源对象。
 * @param {Object} result
 *     目标对象。
 * @param {Object} options
 *     克隆算法的参数。
 * @param {Map} cache
 *     对象缓存，用于防止出现循环引用对象。
 * @author 胡海星
 * @see https://cn.vuejs.org/v2/guide/reactivity.html
 * @private
 */
function mirror(source, result, options, cache) {
  const keys = Reflect.ownKeys(source);
  for (const key of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(source, key);
    if (!options.includeNonConfigurable && !descriptor.configurable) {
      continue; // ignore non-configurable properties, such as string[0]
    }
    if (!options.includeNonEnumerable && !descriptor.enumerable) {
      continue; // ignore non-enumerable properties
    }
    if (!options.includeReadonly && descriptor.writable !== undefined && !descriptor.writable) {
      console.log(`ignore readonly property ${key}`);
      continue; // ignore readonly properties
    }
    if (options.includeAccessor && (descriptor.get || descriptor.set)) {
      Object.defineProperty(result, key, descriptor);
      continue;
    }
    // use [] to get property value instead of descriptor.value, since if
    // the property has getter/setter, descriptor.value do not exist, and
    // use [] will invoke the getter, which is just what we want.
    const value = source[key];
    const clonedValue = cloneImpl(value, options, cache); // eslint-disable-line no-use-before-define
    result[key] = clonedValue;
  }
}

/**
 * Clone一个指定的数组。
 *
 * @param {Array} source
 *     源数组。
 * @param {Object} options
 *     克隆算法的参数。
 * @param {Map} cache
 *     对象缓存，用于防止出现循环引用对象。
 * @returns {Array}
 *     目标数组。
 */
function cloneArrayImpl(source, options, cache) {
  console.log('cloneArrayImpl: source = ', source, ', options = ', options);
  const result = [];
  cache.set(source, result);
  const keys = Reflect.ownKeys(source);
  // We'll assume the array is well-behaved (dense and not monkeypatched)
  // If that turns out to be false, we'll fallback to generic code
  wellBehaved: {                  // eslint-disable-line no-labels
    let i;
    for (i = 0; i < source.length; i++) {
      if (i in source) {
        result.push(cloneImpl(source[i], options, cache)); // eslint-disable-line no-use-before-define
      } else {  // Array is sparse
        break wellBehaved;        // eslint-disable-line no-labels
      }
    }
    if (i !== keys.length - 1) {  // Array is monkeypatched
      break wellBehaved;          // eslint-disable-line no-labels
    }
    return result;
  }
  // Generic fallback
  result.length = 0;
  mirror(source, result, options, cache);
  return result;
}

/**
 * Clone一个用户自定义对象。
 *
 * @param {Object} source
 *     源对象。
 * @param {Object} options
 *     克隆算法的参数。
 * @param {Map} cache
 *     对象缓存，用于防止出现循环引用对象。
 * @returns {Object}
 *     目标对象。
 */
function cloneObjectImpl(source, options, cache) {
  console.log('cloneObjectImpl: source = ', source, ', options = ', options);
  const prototype = Object.getPrototypeOf(source);
  const result = Object.create(prototype);
  cache.set(source, result);
  mirror(source, result, options, cache);
  return result;
}

/**
 * Clone函数的具体实现。
 *
 * @param {Object} source
 *     待克隆的对象。
 * @param {Object} options
 *     克隆算法的参数。
 * @param {Map} cache
 *     对象缓存，用于防止出现循环引用对象。
 * @author 胡海星
 * @private
 */
function cloneImpl(source, options, cache) {
  // Return primitive and Function values directly
  if (typeof source !== 'object' || source === null) {
    return source;
  }
  // return early on cache hit
  if (cache.has(source)) {
    return cache.get(source);
  }
  const prototype = Object.getPrototypeOf(source);
  console.log('cloneImpl: prototype = ', prototype);
  switch (prototype) {
    // Some types must be handled specially
    // (For instance if they have any internal slots)
    // I've taken this list from the list of well-known intrinsic objects:
    //   https://tc39.es/ecma262/#sec-well-known-intrinsic-objects
    // This may be overkill, but it will probably most needed cases
    case Array.prototype: {
      return cloneArrayImpl(source, options, cache);
    }
    case Boolean.prototype: {
      // We must get the primitive value of a Boolean object, since if
      // it is monkey patched, directly convertion by new Boolean(source)
      // will always get a true value. For example,
      //
      // const b = new Boolean(false);
      // b.monkeypatched = 'hello';
      // const c = new Boolean(b);
      // consloe.log(c); // c will always be true
      //
      const result = new Boolean(source.valueOf());
      mirror(source, result, options, cache);
      return result;
    }
    case Date.prototype: {
      const result = new Date(
        source.getFullYear(),
        source.getMonth(),
        source.getDate(),
        source.getHours(),
        source.getMinutes(),
        source.getSeconds(),
        source.getMilliseconds(),
      );
      mirror(source, result, options, cache);
      return result;
    }
    case MapPrototype: {
      const result = new Map();       // eslint-disable-line no-undef
      cache.set(source, result);
      mirror(source, result, options, cache);
      for (const [key, val] of source.entries()) {
        result.set(cloneImpl(key, options, cache), cloneImpl(val, options, cache));
      }
      return result;
    }
    case Number.prototype: {
      const result = new Number(source);
      mirror(source, result, options, cache);
      return result;
    }
    case Object.prototype: {
      const result = {};
      cache.set(source, result);
      mirror(source, result, options, cache);
      return result;
    }
    case PromisePrototype: {
      const result = new Promise(source.then.bind(source)); // eslint-disable-line no-undef
      mirror(source, result, options, cache);
      return result;
    }
    case RegExp.prototype: {
      const result = new RegExp(source);
      mirror(source, result, options, cache);
      return result;
    }
    case SetPrototype: {
      const result = new Set();   // eslint-disable-line no-undef
      cache.set(source, result);
      mirror(source, result, options, cache);
      for (const val of source) {
        result.add(cloneImpl(val, options, cache));
      }
      return result;
    }
    case String.prototype: {
      const result = new String(source);
      mirror(source, result, options, cache);
      return result;
    }
    case WeakMapPrototype: {        // WeakMaps cannot be cloned :(
      return source;
    }
    case WeakSetPrototype: {        // WeakSets cannot be cloned :(
      return source;
    }
    case Function.prototype: {      // Functions cannot be cloned :(
      return source;
    }
    case BigIntPrototype: {
      return new BigInt(source);    // eslint-disable-line no-undef
    }
    case ArrayBufferPrototype: {
      const result = source.slice();
      mirror(source, result, options, cache);
      return result;
    }
    case SharedArrayBufferPrototype: {
      const result = source.slice();
      mirror(source, result, options, cache);
      return result;
    }
    case DataViewPrototype: {
      const buffer = cloneImpl(source.buffer, options, cache);
      const result = new DataView(buffer, source.byteOffset, source.byteLength); // eslint-disable-line no-undef
      mirror(source, result, options, cache);
      return result;
    }
    case BigInt64ArrayPrototype: {
      const result = new BigInt64Array(source); // eslint-disable-line no-undef
      mirror(source, result, options, cache);
      return result;
    }
    case BigUint64ArrayPrototype: {
      const result = new BigUint64Array(source);  // eslint-disable-line no-undef
      mirror(source, result, options, cache);
      return result;
    }
    case Float32ArrayPrototype: {
      const result = new Float32Array(source);  // eslint-disable-line no-undef
      mirror(source, result, options, cache);
      return result;
    }
    case Float64ArrayPrototype: {
      const result = new Float64Array(source);  // eslint-disable-line no-undef
      mirror(source, result, options, cache);
      return result;
    }
    case Int8ArrayPrototype: {
      const result = new Int8Array(source);     // eslint-disable-line no-undef
      mirror(source, result, options, cache);
      return result;
    }
    case Int16ArrayPrototype: {
      const result = new Int16Array(source);    // eslint-disable-line no-undef
      mirror(source, result, options, cache);
      return result;
    }
    case Int32ArrayPrototype: {
      const result = new Int32Array(source);    // eslint-disable-line no-undef
      mirror(source, result, options, cache);
      return result;
    }
    case Uint8ArrayPrototype: {
      const result = new Uint8Array(source);    // eslint-disable-line no-undef
      mirror(source, result, options, cache);
      return result;
    }
    case Uint8ClampedArrayPrototype: {
      const result = new Uint8ClampedArray(source);   // eslint-disable-line no-undef
      mirror(source, result, options, cache);
      return result;
    }
    case Uint16ArrayPrototype: {
      const result = new Uint16Array(source);   // eslint-disable-line no-undef
      mirror(source, result, options, cache);
      return result;
    }
    case Uint32ArrayPrototype: {
      const result = new Uint32Array(source);   // eslint-disable-line no-undef
      mirror(source, result, options, cache);
      return result;
    }
    // == ERRORS == //
    case Error.prototype: {
      const result = new Error(source.message, source.fileName, source.lineNumber);
      mirror(source, result, options, cache);
      return result;
    }
    case EvalError.prototype: {
      const result = new EvalError(source.message, source.fileName, source.lineNumber);
      mirror(source, result, options, cache);
      return result;
    }
    case RangeError.prototype: {
      const result = new RangeError(source.message, source.fileName, source.lineNumber);
      mirror(source, result, options, cache);
      return result;
    }
    case ReferenceError.prototype: {
      const result = new ReferenceError(source.message, source.fileName, source.lineNumber);
      mirror(source, result, options, cache);
      return result;
    }
    case SyntaxError.prototype: {
      const result = new SyntaxError(source.message, source.fileName, source.lineNumber);
      mirror(source, result, options, cache);
      return result;
    }
    case TypeError.prototype: {
      const result = new TypeError(source.message, source.fileName, source.lineNumber);
      mirror(source, result, options, cache);
      return result;
    }
    case URIError.prototype: {
      const result = new URIError(source.message, source.fileName, source.lineNumber);
      mirror(source, result, options, cache);
      return result;
    }
    case null:  // fallback
    default: {  // Likely a user-defined type
      // 注意，有些Array对象会被修改原型(prototype)，例如被Vue托管的Array对象
      if (Array.isArray(source)) {
        return cloneArrayImpl(source, options, cache);
      } else {
        return cloneObjectImpl(source, options, cache);
      }
    }
  }
}

/**
 * 深度克隆一个值或对象。
 *
 * 注意，为了支持`Vue.js`对对象的响应式监控，我们只复制对象的`enumerable`属性，并且
 * 不考虑对象的`getter/setter`，而是直接把源对象的属性值取出来（可能是调用了源对象
 * 对应属性的`getter`），递归地深度克隆后复制到目标对象中（可能是调用了目标对象对
 * 应属性的`setter`）。
 *
 * @param {any} source
 *     待克隆的值或对象。
 * @param {Object} options
 *     可选，克隆算法的参数。默认值为空对象。目前可选的参数有：
 *     - `includeAccessor` - 此参数为 `true` 表示克隆对象属性的 accessor (即 getter
 *     和 setter )，默认值为 `false`；
 *     - `includeNonEnumerable` - 此参数为 `true` 表示克隆对象的 non-enumerable 属
 *     性，默认值为 `false` ；
 *     - `includeReadonly` - 此参数为 `true` 表示克隆对象的 readonly 属性，默认值为
 *     `true` ；
 *     - `includeNonConfigurable` - 此参数为 `true` 表示克隆对象的 non-configurable
 *     属性，默认值为 `false` ；
 * @return {any}
 *     指定的值或对象的深度克隆。
 * @author 胡海星
 */
function clone(source, options = { includeReadonly: true }) {
  // We want to preserve correct structure in objects with tricky references,
  // e.g. cyclic structures or structures with two references to the same object.
  // To do this, we'll cache the results of this function during this invokation,
  // and return from this cache when possible.
  // Note that we only store certiain values, like Arrays or plain object
  const cache = new WeakMap();
  return cloneImpl(source, options, cache);
}

export default clone;
