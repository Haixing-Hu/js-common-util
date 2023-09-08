/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import { stringToFloat } from '../main';

/**
 * 单元测试 'stringToFloat' 函数
 *
 * @author 胡海星
 */
describe('stringToFloat', () => {
  test('stringToFloat(undefined)', () => {
    const value = undefined;
    expect(stringToFloat(value)).toBeNaN;
  });
  test('stringToFloat(null)', () => {
    const value = null;
    expect(stringToFloat(value)).toBeNaN;
  });
  test('stringToFloat("")', () => {
    const value = '';
    expect(stringToFloat(value)).NaN;
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
});
