/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import { trimUppercaseString } from '../main';

/**
 * 单元测试 'trimUppercaseString' 函数
 *
 * @author 胡海星
 */
describe('trimUppercaseString', () => {
  test('trimUppercaseString(undefined)', () => {
    expect(trimUppercaseString(undefined)).toBe('');
  });
  test('trimUppercaseString(null)', () => {
    expect(trimUppercaseString(null)).toBe('');
  });
  test('trimUppercaseString("")', () => {
    expect(trimUppercaseString('')).toBe('');
  });
  test('trimUppercaseString("   ")', () => {
    expect(trimUppercaseString('   ')).toBe('');
  });
  test('trimUppercaseString("  ab")', () => {
    expect(trimUppercaseString('  ab')).toBe('AB');
  });
  test('trimUppercaseString("  aBc  ")', () => {
    expect(trimUppercaseString('  aBc  ')).toBe('ABC');
  });
  test('trimUppercaseString("  a B c")', () => {
    expect(trimUppercaseString('  a B c')).toBe('A B C');
  });
  test('trimUppercaseString("  ab  \uFEFF")', () => {
    expect(trimUppercaseString('  ab  \uFEFF')).toBe('AB');
  });
  test('trimUppercaseString("  \uFEFFab  \uFEFF")', () => {
    expect(trimUppercaseString('  \uFEFFab  \uFEFF')).toBe('AB');
  });
  test('trimUppercaseString(123)', () => {
    expect(trimUppercaseString(123)).toBe('');
  });
  test('trimUppercaseString(new String(" abc "))', () => {
    expect(trimUppercaseString(new String(' abc '))).toBe('ABC');
  });
});
