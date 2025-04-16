////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { checkArgumentType } from '../src';

describe('checkArgumentType with single type', () => {
  test('Undefined value and not allowed to be null', () => {
    expect(() => checkArgumentType('test', undefined, String, false))
      .toThrow(/cannot be undefined/);
  });

  test('Undefined value but allowed to be null', () => {
    expect(() => checkArgumentType('test', undefined, String, true)).not.toThrow();
  });

  test('Null value and not allowed to be null', () => {
    expect(() => checkArgumentType('test', null, String, false))
      .toThrow(/cannot be null/);
  });

  test('Null value but allowed to be null', () => {
    expect(() => checkArgumentType('test', null, String, true)).not.toThrow();
  });

  test('Check primitive boolean type - correct', () => {
    expect(() => checkArgumentType('test', true, Boolean, false)).not.toThrow();
  });

  test('Check primitive boolean type - correct', () => {
    expect(() => checkArgumentType('test', false, Boolean, false)).not.toThrow();
  });

  test('Check boolean object type - correct', () => {
    expect(() => checkArgumentType('test', new Boolean(true), Boolean, false)).not.toThrow();
  });

  test('Check boolean object type - correct', () => {
    expect(() => checkArgumentType('test', new Boolean(false), Boolean, false)).not.toThrow();
  });

  test('Check boolean type - incorrect', () => {
    expect(() => checkArgumentType('test', 'true', Boolean, false)).toThrow(/'test' must be a Boolean/);
  });

  test('Check primitive number type - correct', () => {
    expect(() => checkArgumentType('test', 123, Number, false)).not.toThrow();
  });

  test('Check number object type - correct', () => {
    expect(() => checkArgumentType('test', new Number(123), Number, false)).not.toThrow();
  });

  test('Check number type - incorrect', () => {
    expect(() => checkArgumentType('test', '123', Number, false)).toThrow(/'test' must be a Number/);
  });

  test('Check primitive string type - correct', () => {
    expect(() => checkArgumentType('test', 'abc', String, false)).not.toThrow();
  });

  test('Check string object type - correct', () => {
    expect(() => checkArgumentType('test', new String('abc'), String, false)).not.toThrow();
  });

  test('Check string type - incorrect', () => {
    expect(() => checkArgumentType('test', 123, String, false)).toThrow(/'test' must be a String/);
  });

  test('Check primitive bigint type - correct', () => {
    // eslint-disable-next-line no-undef
    expect(() => checkArgumentType('test', BigInt(1), BigInt, false)).not.toThrow();
  });

  test('Check primitive bigint type - incorrect', () => {
    // eslint-disable-next-line no-undef
    expect(() => checkArgumentType('test', 123, BigInt, false)).toThrow(/'test' must be a BigInt/);
  });

  test('Check function type - correct', () => {
    expect(() => checkArgumentType('test', () => {}, Function, false)).not.toThrow();
  });

  test('Check function type - incorrect', () => {
    expect(() => checkArgumentType('test', 123, Function, false)).toThrow(/'test' must be a Function/);
  });

  test('Null value and not allowed to be null', () => {
    expect(() => checkArgumentType('test', null, Object, false)).toThrow(/'test' cannot be null/);
  });

  test('Null value but allowed to be null', () => {
    expect(() => checkArgumentType('test', null, Object, true)).not.toThrow();
  });

  test('Check object type - correct', () => {
    expect(() => checkArgumentType('test', new Date(), Date, false)).not.toThrow();
  });

  test('Check object type - incorrect', () => {
    expect(() => checkArgumentType('test', {}, Date, false)).toThrow(/'test' must be a Date/);
  });

  test('Check symbol type - correct', () => {
    expect(() => checkArgumentType('test', Symbol('symbol'), Symbol, false)).not.toThrow();
  });

  test('Check symbol type - incorrect', () => {
    expect(() => checkArgumentType('test', 'symbol', Symbol, false)).toThrow(/'test' must be a Symbol/);
  });

  test('Check object type - correct', () => {
    expect(() => checkArgumentType('test', {}, Object, false)).not.toThrow();
  });

  test('Check object type - incorrect', () => {
    expect(() => checkArgumentType('test', 'not an object', Object, false)).toThrow(/'test' must be a Object/);
  });

  test('Check object type - null but not allowed', () => {
    expect(() => checkArgumentType('test', null, Object, false)).toThrow(/'test' cannot be null/);
  });

  test('Check object type - null and allowed', () => {
    expect(() => checkArgumentType('test', null, Object, true)).not.toThrow();
  });

  test('Check primitive boolean value, incorrect required type', () => {
    expect(() => checkArgumentType('test', true, Number, true)).toThrow(/'test' must be a Number/);
  });

  test('Check primitive boolean value, correct required type', () => {
    expect(() => checkArgumentType('test', true, Boolean, true)).not.toThrow();
  });

  test('Check primitive number value, incorrect required type', () => {
    expect(() => checkArgumentType('test', 0, Boolean, true)).toThrow(/'test' must be a Boolean/);
  });

  test('Check primitive number value, correct required type', () => {
    expect(() => checkArgumentType('test', 0, Number, true)).not.toThrow();
  });

  test('Check primitive string value, incorrect required type', () => {
    expect(() => checkArgumentType('test', 'abc', Boolean, true)).toThrow(/'test' must be a Boolean/);
  });

  test('Check primitive string value, correct required type', () => {
    expect(() => checkArgumentType('test', 'abc', String, true)).not.toThrow();
  });

  test('Check primitive bigint value, incorrect required type', () => {
    expect(() => checkArgumentType('test', 123n, Boolean, true)).toThrow(/'test' must be a Boolean/);
  });

  test('Check primitive bigint value, correct required type', () => {
    // eslint-disable-next-line no-undef
    expect(() => checkArgumentType('test', 123n, BigInt, true)).not.toThrow();
  });

  test('Check primitive function value, incorrect required type', () => {
    expect(() => checkArgumentType('test', () => 0, Boolean, true)).toThrow(/'test' must be a Boolean/);
  });

  test('Check primitive function value, correct required type', () => {
    // eslint-disable-next-line no-undef
    expect(() => checkArgumentType('test', () => 0, Function, true)).not.toThrow();
  });

  test('Check primitive symbol value, incorrect required type', () => {
    expect(() => checkArgumentType('test', Symbol('symbol'), Boolean, true)).toThrow(/'test' must be a Boolean/);
  });

  test('Check primitive symbol value, correct required type', () => {
    expect(() => checkArgumentType('test', Symbol('symbol'), Symbol, true)).not.toThrow();
  });

  test('Check object value, incorrect required type', () => {
    class MyObject {}
    const foo = new MyObject();
    class Foo {}
    expect(() => checkArgumentType('test', foo, Foo, false)).toThrow(/'test' must be a Foo/);
  });

  test('Check object value, correct required type', () => {
    class MyObject {}
    const foo = new MyObject();
    expect(() => checkArgumentType('test', foo, MyObject)).not.toThrow();
  });
  
  test('Check object with undefined constructor', () => {
    const obj = {};
    Object.defineProperty(obj, 'constructor', { value: undefined });
    expect(() => checkArgumentType('test', obj, String, false)).toThrow(/'test' must be a String/);
  });
});

describe('checkArgumentType with multiple types', () => {
  test('Undefined value and not allowed to be null', () => {
    expect(() => checkArgumentType('test', undefined, [String, Boolean, Number], false))
      .toThrow(/cannot be undefined/);
  });

  test('Undefined value but allowed to be null', () => {
    expect(() => checkArgumentType('test', undefined, [String, Boolean, Number], true)).not.toThrow();
  });

  test('Null value and not allowed to be null', () => {
    expect(() => checkArgumentType('test', null, [String, Boolean, Number], false))
      .toThrow(/cannot be null/);
  });

  test('Null value but allowed to be null', () => {
    expect(() => checkArgumentType('test', null, [String, Boolean, Number], true)).not.toThrow();
  });

  test('Check primitive boolean type - correct', () => {
    expect(() => checkArgumentType('test', true, [String, Boolean, Number], false)).not.toThrow();
  });

  test('Check wrap Boolean object - correct', () => {
    expect(() => checkArgumentType('test', new Boolean(false), [String, Boolean, Number], false)).not.toThrow();
  });

  test('Check primitive string type - correct', () => {
    expect(() => checkArgumentType('test', 'value', [String, Boolean, Number], false)).not.toThrow();
  });

  test('Check wrap String object - correct', () => {
    expect(() => checkArgumentType('test', new String('value'), [String, Boolean, Number], false)).not.toThrow();
  });

  test('Check primitive number type - correct', () => {
    expect(() => checkArgumentType('test', 123, [String, Boolean, Number], false)).not.toThrow();
  });

  test('Check wrap Number object - correct', () => {
    expect(() => checkArgumentType('test', new Number(123), [String, Boolean, Number], false)).not.toThrow();
  });

  test('Check primitive bigint type - correct', () => {
    expect(() => checkArgumentType('test', 123n, [String, Number, BigInt], false)).not.toThrow();
  });

  test('Check function type - correct', () => {
    expect(() => checkArgumentType('test', () => {}, [String, Boolean, Number, Function], false)).not.toThrow();
  });

  test('Check symbol type - correct', () => {
    expect(() => checkArgumentType('test', Symbol('symbol'), [String, Boolean, Number, Symbol], false)).not.toThrow();
  });

  test('Check with empty type array', () => {
    expect(() => checkArgumentType('test', 'value', [], false)).toThrow(/must be of one of the specified types/);
  });
  
  test('Check object with undefined constructor against multiple types', () => {
    const obj = {};
    Object.defineProperty(obj, 'constructor', { value: undefined });
    expect(() => checkArgumentType('test', obj, [String, Number, Boolean], false))
      .toThrow(/must be of one of the specified types/);
  });
  
  test('Check value with multiple types when none matches', () => {
    expect(() => checkArgumentType('test', {}, [String, Number, Boolean], false))
      .toThrow(/must be of one of the specified types: String, Number, Boolean/);
  });
});
