////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { uriEncode } from '../src';

/**
 * 单元测试 'uriEncode'
 *
 * @author 胡海星
 */
describe('uriEncode', () => {
  test('undefined', () => {
    const actual = uriEncode(undefined);
    expect(actual).toBeUndefined();
  });
  test('null', () => {
    const actual = uriEncode(null);
    expect(actual).toBeNull();
  });
  test('empty string', () => {
    const actual = uriEncode('');
    expect(actual).toBe('');
  });
  test('normal string', () => {
    const actual = uriEncode('abcd');
    expect(actual).toBe('abcd');
  });
  test('string contains space', () => {
    const actual = uriEncode('abcd efg');
    expect(actual).toBe('abcd%20efg');
  });
  test('string contains percent', () => {
    const actual = uriEncode('abcd%efg');
    expect(actual).toBe('abcd%25efg');
  });
  test('string contains Chinese', () => {
    const actual = uriEncode('abcd%efg测试中文');
    expect(actual).toBe('abcd%25efg%E6%B5%8B%E8%AF%95%E4%B8%AD%E6%96%87');
  });
  test('string contains Chinese 2', () => {
    const actual = uriEncode('测试一下 拒绝%原?因');
    expect(actual).toBe('%E6%B5%8B%E8%AF%95%E4%B8%80%E4%B8%8B%20%E6%8B%92%E7%BB%9D%25%E5%8E%9F%3F%E5%9B%A0');
  });
});
