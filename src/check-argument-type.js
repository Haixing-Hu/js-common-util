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
 * @param {string} name
 *     The name of the parameter to check.
 * @param {any} value
 *     The value of the parameter to check.
 * @param {BooleanConstructor|NumberConstructor|FunctionConstructor|Function} type
 *     The constructor of the specified type. If it is a primitive type value,
 *     use the corresponding object constructor.
 * @param {boolean} nullable
 *     If `true`, the parameter value is allowed to be `null` or `undefined`;
 *     otherwise, it is not allowed.
 * @throws Error
 *     Throws an exception if the value of the parameter to check is not of the
 *     specified type.
 */
function checkArgumentType(name, value, type, nullable = false) {
  switch (typeof value) {
    case 'undefined':
      if (!nullable) {
        throw new Error(`The value of the argument '${name}' cannot be undefined.`);
      }
      return;
    case 'boolean':
      if (type !== Boolean) {
        throw new Error(`The value of the argument '${name}' must be a ${type.name}.`);
      }
      return;
    case 'number':
      if (type !== Number) {
        throw new Error(`The value of the argument '${name}' must be a ${type.name}.`);
      }
      return;
    case 'string':
      if (type !== String) {
        throw new Error(`The value of the argument '${name}' must be a ${type.name}.`);
      }
      return;
    case 'bigint':
      // eslint-disable-next-line no-undef
      if (type !== BigInt) {
        throw new Error(`The value of the argument '${name}' must be a ${type.name}.`);
      }
      return;
    case 'function':
      if (type !== Function) {
        throw new Error(`The value of the argument '${name}' must be a ${type.name}.`);
      }
      return;
    case 'symbol':
      if (type !== Symbol) {
        throw new Error(`The value of the argument '${name}' must be a ${type.name}.`);
      }
      return;
    case 'object':
      if (value === null) {
        if (!nullable) {
          throw new Error(`The value of the argument '${name}' cannot be null.`);
        }
      } else if (!(value instanceof type)) {
        throw new Error(`The value of the argument '${name}' must be an instance of ${type.name}.`);
      }
    // eslint-disable-next-line no-fallthrough
    default:
  }
}

export default checkArgumentType;
