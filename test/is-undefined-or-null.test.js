/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2020
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/
import { isUndefinedOrNull } from '../main';

/**
 * 单元测试 'isUndefinedOrNull'
 *
 * @author 胡海星
 */
describe('isUndefinedOrNull', () => {
  test('参数为undefined', () => {
    const value = undefined;
    expect(isUndefinedOrNull(value)).toBe(true);
  });
  test('参数为null', () => {
    const value = null;
    expect(isUndefinedOrNull(value)).toBe(true);
  });
  test('参数为空字符串', () => {
    const value = '';
    expect(isUndefinedOrNull(value)).toBe(false);
  });
  test('参数为非空字符串', () => {
    const value = 'xx';
    expect(isUndefinedOrNull(value)).toBe(false);
  });
  test('参数为其他非字符串类型', () => {
    const value = 123;
    expect(isUndefinedOrNull(value)).toBe(false);
  });
});
