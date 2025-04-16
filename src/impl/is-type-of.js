////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Checks if a value is of a given type.
 *
 * @param {any} value
 *     The value to check.
 * @param {any} type
 *     The type to check.
 * @param {boolean} nullable
 *     Whether the value is allowed to be `null` or `undefined`.
 * @return {boolean}
 *     `true` if the value is of the given type; otherwise, `false`.
 * @private
 * @author Haixing Hu
 */
function isTypeOf(value, type, nullable) {
  if ((value === undefined) || (value === null)) {
    return nullable;
  }
  switch (typeof value) {
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
    default:
      return value instanceof type;
  }
}

export default isTypeOf;
