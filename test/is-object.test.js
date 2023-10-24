////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { isObject } from '../src';

/**
 * 单元测试 'isObject'
 *
 * @author 胡海星
 */
describe('isObject', () => {
  test('isObject(undefined)', () => {
    expect(isObject(undefined)).toBe(false);
  });
  test('isObject(null)', () => {
    expect(isObject(null)).toBe(false);
  });
  test('isObject(123)', () => {
    expect(isObject(123)).toBe(false);
  });
  test('isObject("")', () => {
    expect(isObject('')).toBe(false);
  });
  test('isObject("abc")', () => {
    expect(isObject('abc')).toBe(false);
  });
  test('isObject(new String())', () => {
    expect(isObject(new String())).toBe(false);
  });
  test('isObject(new String(""))', () => {
    expect(isObject(new String(''))).toBe(false);
  });
  test('isObject(new String("123"))', () => {
    expect(isObject(new String('123'))).toBe(false);
  });
  test('isObject(/xxx/)', () => {
    expect(isObject(/xxx/)).toBe(false);
  });
  test('isObject(new Date())', () => {
    expect(isObject(new Date())).toBe(false);
  });
  test('isObject(Math))', () => {
    expect(isObject(Math)).toBe(false);
  });
  test('isObject(JSON))', () => {
    expect(isObject(JSON)).toBe(false);
  });
  test('isObject({x: "123"})', () => {
    expect(isObject({ x: '123' })).toBe(true);
  });
  class Foo {
    value = 123;
  }
  const foo = new Foo();
  test('isObject(foo)', () => {
    expect(isObject(foo)).toBe(true);
  });
  test('isObject(Foo)', () => {
    expect(isObject(Foo)).toBe(false);
  });
});
