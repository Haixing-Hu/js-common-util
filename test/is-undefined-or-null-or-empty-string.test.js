////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { isUndefinedOrNullOrEmptyString } from '../src';

/**
 * 单元测试 'isUndefinedOrNullOrEmptyString'
 *
 * @author 胡海星
 */
describe('isUndefinedOrNullOrEmptyString', () => {
  test('参数为undefined', () => {
    const value = undefined;
    expect(isUndefinedOrNullOrEmptyString(value)).toBe(true);
  });
  test('参数为null', () => {
    const value = null;
    expect(isUndefinedOrNullOrEmptyString(value)).toBe(true);
  });
  test('参数为空字符串', () => {
    const value = '';
    expect(isUndefinedOrNullOrEmptyString(value)).toBe(true);
  });
  test('参数为非空字符串', () => {
    const value = 'xx';
    expect(isUndefinedOrNullOrEmptyString(value)).toBe(false);
  });
  test('参数为其他非字符串类型', () => {
    const value = 123;
    expect(isUndefinedOrNullOrEmptyString(value)).toBe(false);
  });
});
