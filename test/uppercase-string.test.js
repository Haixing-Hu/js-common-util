////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { uppercaseString } from '../src';

/**
 * 单元测试 'uppercaseString' 函数
 *
 * @author 胡海星
 */
describe('uppercaseString', () => {
  test('uppercaseString(undefined)', () => {
    expect(uppercaseString(undefined)).toBe('');
  });
  
  test('uppercaseString(null)', () => {
    expect(uppercaseString(null)).toBe('');
  });
  
  test('uppercaseString("")', () => {
    expect(uppercaseString('')).toBe('');
  });
  
  test('uppercaseString("abc")', () => {
    expect(uppercaseString('abc')).toBe('ABC');
  });
  
  test('uppercaseString("aBc")', () => {
    expect(uppercaseString('aBc')).toBe('ABC');
  });
  
  test('uppercaseString("a B c")', () => {
    expect(uppercaseString('a B c')).toBe('A B C');
  });
  
  test('uppercaseString("ABC")', () => {
    expect(uppercaseString('ABC')).toBe('ABC');
  });
  
  test('uppercaseString("123")', () => {
    expect(uppercaseString('123')).toBe('123');
  });
  
  test('uppercaseString("abc123")', () => {
    expect(uppercaseString('abc123')).toBe('ABC123');
  });
  
  test('uppercaseString("特殊字符!@#")', () => {
    expect(uppercaseString('特殊字符!@#')).toBe('特殊字符!@#');
  });
  
  test('uppercaseString("汉字与英文mix")', () => {
    expect(uppercaseString('汉字与英文mix')).toBe('汉字与英文MIX');
  });
  
  test('uppercaseString(123)', () => {
    expect(uppercaseString(123)).toBe('');
  });
  
  test('uppercaseString({})', () => {
    expect(uppercaseString({})).toBe('');
  });
  
  test('uppercaseString([])', () => {
    expect(uppercaseString([])).toBe('');
  });
  
  test('uppercaseString(new String("abc"))', () => {
    expect(uppercaseString(new String('abc'))).toBe('ABC');
  });
}); 