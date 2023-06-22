/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2022
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/
import { splitDigits } from '../main';

/**
 * 单元测试 'splitDigits'
 *
 * @author 胡海星
 */
describe('splitDigits', () => {
  test('splitDigits(0)', () => {
    expect(splitDigits(0)).toEqual([0]);
  });
  test('splitDigits(1)', () => {
    expect(splitDigits(1)).toEqual([1]);
  });
  test('splitDigits(12)', () => {
    expect(splitDigits(12)).toEqual([1, 2]);
  });
  test('splitDigits(123)', () => {
    expect(splitDigits(123)).toEqual([1, 2, 3]);
  });
  test('splitDigits(1234)', () => {
    expect(splitDigits(1234)).toEqual([1, 2, 3, 4]);
  });
  test('splitDigits(12345)', () => {
    expect(splitDigits(12345)).toEqual([1, 2, 3, 4, 5]);
  });
  test('splitDigits(undefined)', () => {
    expect(() => splitDigits(undefined)).toThrow('value must be a non-negative integer.');
  });
  test('splitDigits(null)', () => {
    expect(() => splitDigits(null)).toThrow('value must be a non-negative integer.');
  });
  test('splitDigits("123")', () => {
    expect(() => splitDigits('123')).toThrow('value must be a non-negative integer.');
  });
  test('splitDigits(-12)', () => {
    expect(() => splitDigits(-12)).toThrow('value must be a non-negative integer.');
  });

  test('splitDigits(0, 3)', () => {
    expect(splitDigits(0, 3)).toEqual([0, 0, 0]);
  });
  test('splitDigits(1, 1)', () => {
    expect(splitDigits(1, 1)).toEqual([1]);
  });
  test('splitDigits(12, 1)', () => {
    expect(splitDigits(12, 1)).toEqual([1, 2]);
  });
  test('splitDigits(123, 6)', () => {
    expect(splitDigits(123, 6)).toEqual([0, 0, 0, 1, 2, 3]);
  });
  test('splitDigits(1234, 4)', () => {
    expect(splitDigits(1234, 4)).toEqual([1, 2, 3, 4]);
  });
  test('splitDigits(12345, 6)', () => {
    expect(splitDigits(12345, 6)).toEqual([0, 1, 2, 3, 4, 5]);
  });
  test('splitDigits(undefined, 1)', () => {
    expect(() => splitDigits(undefined, 1)).toThrow('value must be a non-negative integer.');
  });
  test('splitDigits(null, 2)', () => {
    expect(() => splitDigits(null, 2)).toThrow('value must be a non-negative integer.');
  });
  test('splitDigits("123", 3)', () => {
    expect(() => splitDigits('123', 3)).toThrow('value must be a non-negative integer.');
  });
  test('splitDigits(-12, 4)', () => {
    expect(() => splitDigits(-12, 4)).toThrow('value must be a non-negative integer.');
  });
});
