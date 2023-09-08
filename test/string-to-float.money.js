/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import { stringToMoney } from '../main';

/**
 * 单元测试 'stringToMoney' 函数
 *
 * @author 胡海星
 */
describe('stringToMoney', () => {
  test('stringToMoney(undefined)', () => {
    const value = undefined;
    expect(stringToMoney(value)).toBeNaN;
  });
  test('stringToMoney(null)', () => {
    const value = null;
    expect(stringToMoney(value)).toBeNaN;
  });
  test('stringToMoney("")', () => {
    const value = '';
    expect(stringToMoney(value)).NaN;
  });
  test('stringToMoney("12.323")', () => {
    const value = '12.323';
    expect(stringToMoney(value)).toBe(12.32);
  });
  test('stringToMoney("-.123")', () => {
    const value = '-.123';
    expect(stringToMoney(value)).toBe(-0.12);
  });
  test('stringToMoney("  -.1e2  ")', () => {
    const value = '  -.123e2  ';
    expect(stringToMoney(value)).toBe(-12.30);
  });

  test('stringToMoney(".1249")', () => {
    const value = '.1249';
    expect(stringToMoney(value)).toBe(0.12);
  });
  test('stringToMoney(".12501")', () => {
    const value = '.12501';
    expect(stringToMoney(value)).toBe(0.13);
  });

  test('stringToMoney(".1249", 3)', () => {
    const value = '.1249';
    const digits = 3;
    expect(stringToMoney(value, digits)).toBe(0.125);
  });
  test('stringToMoney(".12501")', () => {
    const value = '.12501';
    const digits = 4;
    expect(stringToMoney(value, digits)).toBe(0.1250);
  });

});
