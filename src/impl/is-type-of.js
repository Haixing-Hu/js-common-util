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

export default isTypeOf;
