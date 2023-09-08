/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import { isUndefinedOrNullOrEmptyArray } from '../main';

/**
 * 单元测试 'isUndefinedOrNullOrEmptyArray'
 *
 * @author 胡海星
 */
describe('isUndefinedOrNullOrEmptyArray', () => {
  test('参数为undefined', () => {
    const value = undefined;
    expect(isUndefinedOrNullOrEmptyArray(value)).toBe(true);
  });
  test('参数为null', () => {
    const value = null;
    expect(isUndefinedOrNullOrEmptyArray(value)).toBe(true);
  });
  test('参数为空字符串', () => {
    const value = '';
    expect(isUndefinedOrNullOrEmptyArray(value)).toBe(false);
  });
  test('参数为非空字符串', () => {
    const value = 'xx';
    expect(isUndefinedOrNullOrEmptyArray(value)).toBe(false);
  });
  test('参数为空数组', () => {
    const value = [];
    expect(isUndefinedOrNullOrEmptyArray(value)).toBe(true);
  });
  test('参数为非空数组', () => {
    const value = [1, 2, 3];
    expect(isUndefinedOrNullOrEmptyArray(value)).toBe(false);
  });
  test('参数为其他非数组类型', () => {
    const value = 123;
    expect(isUndefinedOrNullOrEmptyArray(value)).toBe(false);
  });
});
