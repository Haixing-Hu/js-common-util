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
 * Copies the properties of the source object to the target object.
 *
 * **NOTE:** In order to support the reactivity of Vue.js, we only copy the
 * enumerable properties of the object, and do not consider the getters and
 * setters of the object. We directly take out the property value from the
 * source object (possibly by calling the getter), recursively deep-clone it
 * and copy it to the target object (possibly by calling the setter). Therefore,
 * the `includeAccessor` and `includeNonEnumerable` parameters of options should
 * not be set or should be set to `false`.
 *
 * For the reactivity of Vue.js, see:
 * <a href="https://v2.vuejs.org/v2/guide/reactivity.html">Reactivity</a>
 *
 * @param {Object} source
 *     The source object.
 * @param {Object} result
 *     The target object.
 * @param {Object} options
 *     The options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @private
 * @see https://v2.vuejs.org/v2/guide/reactivity.html
 * @author Haixing Hu
 */
function mirror(source, result, options, cache) {
  const keys = Reflect.ownKeys(source);
  for (const key of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(source, key);
    if ((!options.includeNonConfigurable) && (!descriptor.configurable)) {
      continue; // ignore non-configurable properties, such as string[0]
    }
    if ((!options.includeNonEnumerable) && (!descriptor.enumerable)) {
      continue; // ignore non-enumerable properties
    }
    if ((!options.includeReadonly)
        && (descriptor.writable !== undefined)
        && (!descriptor.writable)) {
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
    // eslint-disable-next-line no-use-before-define
    result[key] = cloneImpl(value, options, cache);
  }
}

/**
 * Clones a specified array.
 *
 * @param {Array} source
 *     The source array.
 * @param {Object} options
 *     Options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @returns {Array}
 *     The target array.
 * @private
 * @author Haixing Hu
 */
function cloneArrayImpl(source, options, cache) {
  // console.log('cloneArrayImpl: source = ', source, ', options = ', options);
  const result = [];
  cache.set(source, result);
  const keys = Reflect.ownKeys(source);
  // We'll assume the array is well-behaved (dense and not monkeypatched)
  // If that turns out to be false, we'll fallback to generic code
  wellBehaved: {                  // eslint-disable-line no-labels
    let i;
    for (i = 0; i < source.length; i++) {
      if (i in source) {
        // eslint-disable-next-line no-use-before-define
        result.push(cloneImpl(source[i], options, cache));
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
 * Clone a user-defined object.
 *
 * @param {Object} source
 *     The source object.
 * @param {Object} options
 *     Options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @returns {Object}
 *     The target object.
 * @private
 * @author Haixing Hu
 */
function cloneObjectImpl(source, options, cache) {
  // console.log('cloneObjectImpl: source = ', source, ', options = ', options);
  const prototype = Object.getPrototypeOf(source);
  const result = Object.create(prototype);
  cache.set(source, result);
  mirror(source, result, options, cache);
  return result;
}

/**
 * The implementation of the `clone` function.
 *
 * @param {Object} source
 *     The object to be cloned.
 * @param {Object} options
 *     The options of the cloning algorithm.
 * @param {WeakMap} cache
 *     The object cache used to prevent circular references.
 * @private
 * @author Haixing Hu
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
  // console.log('cloneImpl: prototype = ', prototype);
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
      // it is monkey patched, directly conversion by new Boolean(source)
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
      // eslint-disable-next-line no-undef
      const result = new Map();
      cache.set(source, result);
      mirror(source, result, options, cache);
      for (const [key, val] of source.entries()) {
        result.set(cloneImpl(key, options, cache),
          cloneImpl(val, options, cache));
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
      // eslint-disable-next-line no-undef
      const result = new Promise(source.then.bind(source));
      mirror(source, result, options, cache);
      return result;
    }
    case RegExp.prototype: {
      const result = new RegExp(source);
      mirror(source, result, options, cache);
      return result;
    }
    case SetPrototype: {
      // eslint-disable-next-line no-undef
      const result = new Set();
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
      // eslint-disable-next-line no-undef
      const result = new DataView(buffer, source.byteOffset, source.byteLength);
      mirror(source, result, options, cache);
      return result;
    }
    case BigInt64ArrayPrototype: {
      // eslint-disable-next-line no-undef
      const result = new BigInt64Array(source);
      mirror(source, result, options, cache);
      return result;
    }
    case BigUint64ArrayPrototype: {
      // eslint-disable-next-line no-undef
      const result = new BigUint64Array(source);
      mirror(source, result, options, cache);
      return result;
    }
    case Float32ArrayPrototype: {
      // eslint-disable-next-line no-undef
      const result = new Float32Array(source);
      mirror(source, result, options, cache);
      return result;
    }
    case Float64ArrayPrototype: {
      // eslint-disable-next-line no-undef
      const result = new Float64Array(source);
      mirror(source, result, options, cache);
      return result;
    }
    case Int8ArrayPrototype: {
      // eslint-disable-next-line no-undef
      const result = new Int8Array(source);
      mirror(source, result, options, cache);
      return result;
    }
    case Int16ArrayPrototype: {
      // eslint-disable-next-line no-undef
      const result = new Int16Array(source);
      mirror(source, result, options, cache);
      return result;
    }
    case Int32ArrayPrototype: {
      // eslint-disable-next-line no-undef
      const result = new Int32Array(source);
      mirror(source, result, options, cache);
      return result;
    }
    case Uint8ArrayPrototype: {
      // eslint-disable-next-line no-undef
      const result = new Uint8Array(source);
      mirror(source, result, options, cache);
      return result;
    }
    case Uint8ClampedArrayPrototype: {
      // eslint-disable-next-line no-undef
      const result = new Uint8ClampedArray(source);
      mirror(source, result, options, cache);
      return result;
    }
    case Uint16ArrayPrototype: {
      // eslint-disable-next-line no-undef
      const result = new Uint16Array(source);
      mirror(source, result, options, cache);
      return result;
    }
    case Uint32ArrayPrototype: {
      // eslint-disable-next-line no-undef
      const result = new Uint32Array(source);
      mirror(source, result, options, cache);
      return result;
    }
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
      // Note that some `Array` objects may have their prototype modified, such
      // as the Array objects managed by `Vue`.
      if (Array.isArray(source)) {
        return cloneArrayImpl(source, options, cache);
      } else {
        return cloneObjectImpl(source, options, cache);
      }
    }
  }
}

/**
 * Deep clone a value or an object.
 *
 * **NOTE:** In order to support the reactivity of Vue.js, we only copy the
 * enumerable properties of the object, and do not consider the getters and
 * setters of the object. We directly take out the property value from the
 * source object (possibly by calling the getter), recursively deep-clone it
 * and copy it to the target object (possibly by calling the setter).
 *
 * The cloning algorithm have the following options:
 *
 * - `includeAccessor` - If this options is set to `true`, the cloning algorithm
 *   will clone the accessors of the properties (i.e. getters and setters) from
 *   the source object. The default value of this option is `false`.
 * - `includeNonEnumerable` - If this options is set to `true`, the cloning
 *   algorithm will clone the non-enumerable attributes from the source object.
 *   The default value of this option is `false`.
 * - `includeReadonly` - If this options is set to `true`, the cloning algorithm
 *   will clone the readonly attributes from the source object. The default
 *   value of this option is `true`.
 * - `includeNonConfigurable` - If this options is set to `true`, the cloning
 *   algorithm will clone the non-configurable attributes from the source
 *   object. The default value of this option is `false`.
 *
 * @param {any} source
 *     The value or object to be cloned.
 * @param {Object} options
 *     Optional argument, representing the options of the cloning algorithm.
 *     The default value is `{includeReadonly: true}`.
 * @return {any}
 *     The deep clone of the specified value or object.
 * @author Haixing Hu
 */
function clone(source, options = { includeReadonly: true }) {
  // We want to preserve correct structure in objects with tricky references,
  // e.g. cyclic structures or structures with two references to the same object.
  // To do this, we'll cache the results of this function during this invocation,
  // and return from this cache when possible.
  // Note that we only store certain values, like Arrays or plain object.
  const cache = new WeakMap();
  return cloneImpl(source, options, cache);
}

export default clone;
