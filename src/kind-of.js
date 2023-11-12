////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Gets the constructor name of a value.
 *
 * @param {any} value
 *     the value to be checked.
 * @return {string|null}
 *     the constructor name of the value, or {@code null} if the value has no
 *     constructor.
 */
function ctorName(value) {
  return (typeof value.constructor === 'function') ? value.constructor.name : null;
}

/**
 * Tests whether a value is a generator function.
 *
 * @param {any} value
 *     the value to be checked.
 * @return {boolean}
 *     {@code true} if the value is a generator function; {@code false} otherwise.
 */
function isGeneratorFunction(value) {
  return ctorName(value) === 'GeneratorFunction'
}

/**
 * Tests whether a value is a generator object.
 *
 * @param {any} value
 *     the value to be checked.
 * @return {boolean}
 *     {@code true} if the value is a generator object; {@code false} otherwise.
 */
function isGeneratorObject(value) {
  return (typeof value.throw === 'function')
      && (typeof value.return === 'function')
      && (typeof value.next === 'function');
}

/**
 * Tests whether a value is an array.
 *
 * @param {any} value
 *     the value to be checked.
 * @return {boolean}
 *     {@code true} if the value is an array; {@code false} otherwise.
 */
function isArray(value) {
  if (Array.isArray) {
    return Array.isArray(value);
  } else {
    return (value instanceof Array);
  }
}

/**
 * Tests whether a value is a buffer.
 *
 * If you need to support Safari 5-7 (8-10 yr-old browser), take a look at
 * https://github.com/feross/is-buffer
 *
 * @param {any} value
 *     the value to be checked.
 * @return {boolean}
 *     {@code true} if the value is a buffer; {@code false} otherwise.
 */
function isBuffer(value) {
  if (value.constructor && (typeof value.constructor.isBuffer === 'function')) {
    return value.constructor.isBuffer(val);
  }
  return false;
}

/**
 * Tests whether a value is an arguments object of a function.
 *
 * @param {any} value
 *     the value to be checked.
 * @return {boolean}
 *     {@code true} if the value is an arguments object of a function;
 *     {@code false} otherwise.
 */
function isArguments(value) {
  try {
    if ((typeof value.length === 'number') && typeof (value.callee === 'function')) {
      return true;
    }
  } catch (err) {
    if (err.message.indexOf('callee') !== -1) {
      return true;
    }
  }
  return false;
}

/**
 * Tests whether a value is a `Date`.
 *
 * @param {any} value
 *     the value to be checked.
 * @return {boolean}
 *     {@code true} if the value is a `Date`; {@code false} otherwise.
 */
function isDate(value) {
  if (value instanceof Date) {
    return true;
  } else {
    return (typeof value.toDateString === 'function')
        && (typeof value.getDate === 'function')
        && (typeof value.setDate === 'function');
  }
}

/**
 * Tests whether a value is an `Error`.
 *
 * @param {any} value
 *     the value to be checked.
 * @return {boolean}
 *     {@code true} if the value is an `Error`; {@code false} otherwise.
 */
function isError(value) {
  return (value instanceof Error)
      || ((typeof value.message === 'string')
          && value.constructor
          && (typeof value.constructor.stackTraceLimit === 'number'));
}

/**
 * Tests whether a value is a regexp.
 *
 * @param {any} value
 *     the value to be checked.
 * @return {boolean}
 *     {@code true} if the value is a regexp; {@code false} otherwise.
 */
function isRegexp(value) {
  if (value instanceof RegExp) {
    return true;
  } else {
    return (typeof value.flags === 'string')
        && (typeof value.ignoreCase === 'boolean')
        && (typeof value.multiline === 'boolean')
        && (typeof value.global === 'boolean');
  }
}

/**
 * Gets the name of the type of the specified value.
 *
 * @param {any} value
 *     the specified value.
 * @returns {string}
 *     the name of the type of the specified value. The possible values are:
 *     - `'undefined'`: if the value is `undefined`.
 *     - `'null'`: if the value is `null`.
 *     - `'boolean'`: if the value is a boolean value.
 *     - `'string'`: if the value is a string value.
 *     - `'number'`: if the value is a number value.
 *     - `'symbol'`: if the value is a symbol value.
 *     - `'function'`: if the value is a function.
 *     - `'generator-function'`: if the value is a generator function.
 *     - `'array'`: if the value is an array, i.e., the JavaScript built-in
 *       `Array` object.
 *     - `'arguments'`: if the value is an arguments object of a function.
 *     - `'buffer'`: if the value is a buffer, i.e., the JavaScript built-in
 *       `Buffer` object.
 *     - `'date'`: if the value is a date, i.e., the JavaScript built-in `Date`
 *       object.
 *     - `'error'`: if the value is an error, i.e., the JavaScript built-in
 *       `Error` object.
 *     - `'regexp'`: if the value is a regular expression, i.e., the JavaScript
 *       built-in `RegExp` object.
 *     - `'promise'`: if the value is a promise, i.e., the JavaScript built-in
 *       `Promise` object.
 *     - `'weak-map'`: if the value is a weak map, i.e., the JavaScript built-in
 *       `WeakMap` object.
 *     - `'weak-set'`: if the value is a weak set, i.e., the JavaScript built-in
 *       `WeakSet` object.
 *     - `'map'`: if the value is a map, i.e., the JavaScript built-in `Map`
 *       object.
 *     - `'set'`: if the value is a set, i.e., the JavaScript built-in `Set`
 *       object.
 *     - `'int8-array'`: if the value is an 8-bit typed array, i.e., the
 *       JavaScript built-in `Int8Array` object.
 *     - `'uint8-array'`: if the value is an unsigned 8-bit typed array, i.e.,
 *       the JavaScript built-in `Uint8Array` object.
 *     - `'uint8-clamped-array'`: if the value is an unsigned 8-bit clamped
 *       typed array, i.e., the JavaScript built-in `Uint8ClampedArray` object.
 *     - `'int16-array'`: if the value is a 16-bit typed array, i.e., the
 *       JavaScript built-in `Int16Array` object.
 *     - `'uint16-array'`: if the value is an unsigned 16-bit typed array, i.e.,
 *       the JavaScript built-in `Uint16Array` object.
 *     - `'int32-array'`: if the value is a 32-bit typed array, i.e., the
 *       JavaScript built-in `Int32Array` object.
 *     - `'uint32-array'`: if the value is an unsigned 32-bit typed array, i.e.,
 *       the JavaScript built-in `Uint32Array` object.
 *     - `'float32-array'`: if the value is a 32-bit float typed array, i.e.,
 *       the JavaScript built-in `Float32Array` object.
 *     - `'float64-array'`: if the value is a 64-bit float typed array, i.e.,
 *       the JavaScript built-in `Float64Array` object.
 *     - `'bigint64array'`: if the value is a 64-bit signed integer array,
 *       i.e., the JavaScript built-in `BigInt64Array` object.
 *     - `'biguint64array'`: if the value is a 64-bit unsigned integer array,
 *       i.e., the JavaScript built-in `BigUint64Array` object.
 *     - `'generator'`: if the value is a JavaScript generator object.
 *     - `'map-iterator'`: if the value is an iterator of a JavaScript built-in
 *       `Map` object.
 *     - `'set-iterator'`: if the value is an iterator of a JavaScript built-in
 *       `Set` object.
 *     - `'string-iterator'`: if the value is an iterator of a JavaScript built-in
 *       `String` object.
 *     - `'array-iterator'`: if the value is an iterator of a JavaScript built-in
 *       `Array` object.
 *     - `'object'`: if the value is a plain object.
 */
function kindOf(value) {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  const type = typeof value;
  switch (type) {
    case 'boolean':
      return 'boolean';
    case 'string':
      return 'string';
    case 'number':
      return 'number';
    case 'symbol':
      return 'symbol';
    case 'function':
      return isGeneratorFunction(value) ? 'generator-function': 'function';
    // drop down
  }
  if (isArray(value)) return 'array';
  if (isBuffer(value)) return 'buffer';
  if (isArguments(value)) return 'arguments';
  if (isDate(value)) return 'date';
  if (isError(value)) return 'error';
  if (isRegexp(value)) return 'regexp';

  switch (ctorName(value)) {
    case 'Symbol': return 'symbol';
    case 'Promise': return 'promise';
    // Set, Map, WeakSet, WeakMap
    case 'WeakMap': return 'weak-map';
    case 'WeakSet': return 'weak-set';
    case 'Map': return 'map';
    case 'Set': return 'set';
    // 8-bit typed arrays
    case 'Int8Array': return 'int8-array';
    case 'Uint8Array': return 'uint8-array';
    case 'Uint8ClampedArray': return 'uint8-clamped-array';
    // 16-bit typed arrays
    case 'Int16Array': return 'int16-array';
    case 'Uint16Array': return 'uint16-array';
    // 32-bit typed arrays
    case 'Int32Array': return 'int32-array';
    case 'Uint32Array': return 'uint32-array';
    case 'Float32Array': return 'float32-array';
    case 'Float64Array': return 'float64-array';
    // drop down
  }
  if (isGeneratorObject(value)) return 'generator';
  // Non-plain objects
  const str = Object.prototype.toString.call(value);
  switch (str) {
    case '[object Object]': return 'object';
    // iterators
    case '[object Map Iterator]': return 'map-iterator';
    case '[object Set Iterator]': return 'set-iterator';
    case '[object String Iterator]': return 'string-iterator';
    case '[object Array Iterator]': return 'array-iterator';
    // drop down
  }
  // other
  return str.slice(8, -1).toLowerCase().replace(/\s/g, '');
}

export default kindOf;
