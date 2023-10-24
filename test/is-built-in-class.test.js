////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { isBuiltInClass } from '../src';

/**
 * 单元测试 'isBuiltInClass'
 *
 * @author 胡海星
 */
describe('isBuiltInClass', () => {
  test('isBuiltInClass(undefined)', () => {
    expect(isBuiltInClass(undefined)).toBe(false);
  });
  test('isBuiltInClass(null)', () => {
    expect(isBuiltInClass(null)).toBe(false);
  });
  test('isBuiltInClass(Array)', () => {
    expect(isBuiltInClass(Array)).toBe(true);
  });
  test('isBuiltInClass(Boolean)', () => {
    expect(isBuiltInClass(Boolean)).toBe(true);
  });
  test('isBuiltInClass(Number)', () => {
    expect(isBuiltInClass(Number)).toBe(true);
  });
  test('isBuiltInClass(String)', () => {
    expect(isBuiltInClass(String)).toBe(true);
  });
  test('isBuiltInClass(Object)', () => {
    expect(isBuiltInClass(Object)).toBe(true);
  });
  test('isBuiltInClass(Date)', () => {
    expect(isBuiltInClass(Date)).toBe(true);
  });
  test('isBuiltInClass(Function)', () => {
    expect(isBuiltInClass(Function)).toBe(true);
  });
  test('isBuiltInClass(Error)', () => {
    expect(isBuiltInClass(Error)).toBe(true);
  });
  test('isBuiltInClass(RegExp)', () => {
    expect(isBuiltInClass(RegExp)).toBe(true);
  });
  test('isBuiltInClass(Math)', () => {
    expect(isBuiltInClass(Math)).toBe(true);
  });
  test('isBuiltInClass(Math)', () => {
    expect(isBuiltInClass(JSON)).toBe(true);
  });
  class Foo {
    value = 123;
  }
  test('isBuiltInClass(Foo)', () => {
    expect(isBuiltInClass(Foo)).toBe(false);
  });
});
