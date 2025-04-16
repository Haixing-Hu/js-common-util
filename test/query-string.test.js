////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import queryString from '../src/query-string';
import originalQueryString from 'query-string';

describe('query-string 模块测试', () => {
  it('应该正确导出并保持原有功能', () => {
    // 验证导入的模块与原始库相同
    expect(queryString).toBe(originalQueryString);

    // 简单测试parse功能
    const parsed = queryString.parse('foo=bar&abc=xyz');
    expect(parsed).toEqual({
      foo: 'bar',
      abc: 'xyz',
    });

    // 简单测试stringify功能
    const stringified = queryString.stringify({ foo: 'bar', abc: 'xyz' });
    // 不使用严格的字符串比较，查检包含所有正确的参数对
    expect(stringified.includes('foo=bar')).toBe(true);
    expect(stringified.includes('abc=xyz')).toBe(true);
    expect(stringified.includes('&')).toBe(true);
  });
}); 