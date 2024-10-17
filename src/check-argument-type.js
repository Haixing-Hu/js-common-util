////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

function isTypeOf(value, type, nullable) {
  switch (typeof value) {
    case 'undefined':
      return nullable;
    case 'boolean':
      return type === Boolean;
    case 'number':
      return type === Number;
    case 'string':
      return type === String;
    case 'bigint':
      return type === BigInt;
    case 'function':
      return type === Function;
    case 'symbol':
      return type === Symbol;
    case 'object':
      if (value === null) {
        if (!nullable) {
          return false;
        }
      } else if (!(value instanceof type)) {
        return false;
      }
      return true;
    default:
      return true;
  }
}

/**
 * Checks if a value is of a given type.
 *
 * @param {string} name
 *     The name of the parameter to check.
 * @param {any} value
 *     The value of the parameter to check.
 * @param {BooleanConstructor|NumberConstructor|FunctionConstructor|Function|Array} type
 *     The constructor of the specified type. If the value is a primitive type
 *     value, use the constructor of the corresponding wrapping object. If this
 *     argument is an array, the value must be one of the specified types in
 *     the array.
 * @param {boolean} nullable
 *     If `true`, the parameter value is allowed to be `null` or `undefined`;
 *     otherwise, it is not allowed.
 * @throws Error
 *     Throws an exception if the value of the parameter to check is not of the
 *     specified type.
 */
function checkArgumentType(name, value, type, nullable = false) {
  if (value === null) {
    if (!nullable) {
      throw new TypeError(`The value of the argument '${name}' cannot be null.`);
    }
  } else if (value === undefined) {
    if (!nullable) {
      throw new TypeError(`The value of the argument '${name}' cannot be undefined.`);
    }
  } else if (Array.isArray(type)) {
    if (!type.some((t) => isTypeOf(value, t, nullable))) {
      throw new TypeError(`The value of the argument '${name}' must be of one of the specified types: ${type.map((t) => t.name).join(', ')}.`);
    }
  } else if (!isTypeOf(value, type, nullable)) {
    throw new TypeError(`The value of the argument '${name}' must be a ${type.name}.`);
  }
}

export default checkArgumentType;
