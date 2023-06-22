/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2022
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/
import { isString } from '../main';

/**
 * 单元测试 'isString'
 *
 * @author 胡海星
 */
describe('isString', () => {
  test('isString(undefined)', () => {
    expect(isString(undefined)).toBe(false);
  });
  test('isString(null)', () => {
    expect(isString(null)).toBe(false);
  });
  test('isString(123)', () => {
    expect(isString(123)).toBe(false);
  });
  test('isString("")', () => {
    expect(isString('')).toBe(true);
  });
  test('isString("abc")', () => {
    expect(isString('abc')).toBe(true);
  });
  test('isString(new String())', () => {
    expect(isString(new String())).toBe(true);
  });
  test('isString(new String(""))', () => {
    expect(isString(new String(''))).toBe(true);
  });
  test('isString(new String("123"))', () => {
    expect(isString(new String('123'))).toBe(true);
  });
  test('isString({x: "123"})', () => {
    expect(isString({ x: '123' })).toBe(false);
  });
});
