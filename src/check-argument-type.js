////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isTypeOf from './impl/is-type-of';

/**
 * Checks if a value is of a given type.
 *
 * @param {string} name
 *     The name of the parameter to check.
 * @param {any} value
 *     The value of the parameter to check.
 * @param {any} type
 *     The constructor of the specified type. If the value is a primitive type
 *     value, use the constructor of the corresponding wrapping object. If this
 *     argument is an array, the value must be one of the specified types in
 *     the array.
 * @param {boolean} nullable
 *     If `true`, the parameter value is allowed to be `null` or `undefined`;
 *     otherwise, it is not allowed.
 * @throws TypeError
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
      const typeNames = type.map((t) => t.name).join(', ');
      const valueTypeName = value.constructor ? value.constructor.name : 'Unknown';
      throw new TypeError(`The value of the argument '${name}' must be of one `
        + `of the specified types: ${typeNames}, `
        + `but it is a ${valueTypeName}.`);
    }
  } else if (!isTypeOf(value, type, nullable)) {
    const typeName = type.name;
    const valueTypeName = value.constructor ? value.constructor.name : 'Unknown';
    throw new TypeError(`The value of the argument '${name}' must be a ${typeName}, `
      + `but it is a ${valueTypeName}.`);
  }
}

export default checkArgumentType;
