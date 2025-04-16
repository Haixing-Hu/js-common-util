////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { stringToFloat } from '../src';

/**
 * 单元测试 'stringToFloat' 函数
 *
 * @author 胡海星
 */
describe('stringToFloat', () => {
  test('stringToFloat(undefined)', () => {
    const value = undefined;
    expect(stringToFloat(value)).toBeNaN();
  });
  test('stringToFloat(null)', () => {
    const value = null;
    expect(stringToFloat(value)).toBeNaN();
  });
  test('stringToFloat("")', () => {
    const value = '';
    expect(stringToFloat(value)).toBeNaN();
  });
  test('stringToFloat("12.323")', () => {
    const value = '12.323';
    expect(stringToFloat(value)).toBe(12.323);
  });
  test('stringToFloat("-.123")', () => {
    const value = '-.123';
    expect(stringToFloat(value)).toBe(-0.123);
  });
  test('stringToFloat("  -.1e2  ")', () => {
    const value = '  -.123e2  ';
    expect(stringToFloat(value)).toBe(-12.3);
  });
  test('stringToFloat(new Number(12.323))', () => {
    const value = new Number(12.323);
    expect(stringToFloat(value)).toBe(12.323);
  });
  test('stringToFloat(new String("12.323"))', () => {
    const value = new String('12.323');
    expect(stringToFloat(value)).toBe(12.323);
  });
  test('stringToFloat({})', () => {
    const value = {};
    expect(stringToFloat(value)).toBeNaN();
  });
  test('stringToFloat([])', () => {
    const value = [];
    expect(stringToFloat(value)).toBeNaN();
  });
  test('stringToFloat(true)', () => {
    const value = true;
    expect(stringToFloat(value)).toBeNaN();
  });
  
  // 添加更多测试用例覆盖第23行和后续代码
  test('stringToFloat(function)', () => {
    const value = function() {};
    expect(stringToFloat(value)).toBeNaN();
  });
  
  test('stringToFloat(Symbol)', () => {
    const value = Symbol('test');
    expect(stringToFloat(value)).toBeNaN();
  });
  
  test('stringToFloat(Date)', () => {
    const value = new Date();
    expect(stringToFloat(value)).toBeNaN();
  });
  
  test('stringToFloat(RegExp)', () => {
    const value = /test/;
    expect(stringToFloat(value)).toBeNaN();
  });
  
  test('stringToFloat(Map)', () => {
    const value = new Map();
    expect(stringToFloat(value)).toBeNaN();
  });
  
  test('stringToFloat(Set)', () => {
    const value = new Set();
    expect(stringToFloat(value)).toBeNaN();
  });
  
  test('stringToFloat(custom class)', () => {
    class TestClass {}
    const value = new TestClass();
    expect(stringToFloat(value)).toBeNaN();
  });
  
  test('stringToFloat(123)', () => {
    const value = 123;
    expect(stringToFloat(value)).toBe(123);
  });
  
  test('stringToFloat(NaN)', () => {
    const value = NaN;
    expect(stringToFloat(value)).toBeNaN();
  });
  
  test('stringToFloat(Infinity)', () => {
    const value = Infinity;
    expect(stringToFloat(value)).toBe(Infinity);
  });
  
  test('stringToFloat(-Infinity)', () => {
    const value = -Infinity;
    expect(stringToFloat(value)).toBe(-Infinity);
  });
});
