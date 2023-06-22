/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2020
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/
import { trimString } from '../main';

/**
 * 单元测试 'trimString' 函数
 *
 * @author 胡海星
 */
describe('trimString', () => {
  test('trimString(undefined)', () => {
    expect(trimString(undefined)).toBe('');
  });
  test('trimString(null)', () => {
    expect(trimString(null)).toBe('');
  });
  test('trimString("")', () => {
    expect(trimString('')).toBe('');
  });
  test('trimString("   ")', () => {
    expect(trimString('   ')).toBe('');
  });
  test('trimString("  ab")', () => {
    expect(trimString('  ab')).toBe('ab');
  });
  test('trimString("  ab  ")', () => {
    expect(trimString('  ab  ')).toBe('ab');
  });
  test('trimString("  a b")', () => {
    expect(trimString('  a b')).toBe('a b');
  });
  test('trimString("  ab  \uFEFF")', () => {
    expect(trimString('  ab  \uFEFF')).toBe('ab');
  });
  test('trimString("  \uFEFFab  \uFEFF")', () => {
    expect(trimString('  \uFEFFab  \uFEFF')).toBe('ab');
  });
  test('trimString(123)', () => {
    expect(trimString(123)).toBe('');
  });
  test('trimString(new String(" abc "))', () => {
    expect(trimString(new String(' abc '))).toBe('abc');
  });
});
