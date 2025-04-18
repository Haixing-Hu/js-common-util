////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

import queryString from '../src/query-string';

// 新增测试，专门用于提高 query-string.js 的覆盖率
describe('queryString 覆盖率提升测试', () => {
  // 测试 encoderForArrayFormat 函数未覆盖的分支
  describe('encoderForArrayFormat 未覆盖分支测试', () => {
    test('处理各种数组格式的null值', () => {
      // 测试 index 格式下的null值处理
      expect(queryString.stringify({ arr: [null] }, { arrayFormat: 'index' }))
        .toBe('arr[0]');

      // 测试 bracket 格式下的null值处理
      expect(queryString.stringify({ arr: [null] }, { arrayFormat: 'bracket' }))
        .toBe('arr[]');

      // 测试 colon-list-separator 格式下的null值处理
      expect(queryString.stringify({ arr: [null] }, { arrayFormat: 'colon-list-separator' }))
        .toBe('arr:list=');

      // 测试默认格式下的null值处理
      expect(queryString.stringify({ arr: [null] }))
        .toBe('arr');
    });

    test('bracket-separator 格式处理空数组', () => {
      // 不同格式处理空数组时的测试，覆盖 encoderForArrayFormat 函数中的相关分支
      expect(queryString.stringify({ arr: [] }, { arrayFormat: 'bracket-separator' }))
        .toBe('arr[]');
    });
  });

  // 测试 parserForArrayFormat 函数的未覆盖分支
  describe('parserForArrayFormat 未覆盖分支测试', () => {
    test('index 格式处理无索引值的情况', () => {
      const result = queryString.parse('cleanKey=value', { arrayFormat: 'index' });
      expect(result).toEqual({ cleanKey: 'value' });
    });

    test('bracket 格式处理无括号的情况', () => {
      const result = queryString.parse('cleanKey=value', { arrayFormat: 'bracket' });
      expect(result).toEqual({ cleanKey: 'value' });
    });

    test('colon-list-separator 格式处理无:list的情况', () => {
      const result = queryString.parse('cleanKey=value', { arrayFormat: 'colon-list-separator' });
      expect(result).toEqual({ cleanKey: 'value' });
    });

    test('bracket-separator 格式处理无括号的情况', () => {
      const result = queryString.parse('cleanKey=value', { arrayFormat: 'bracket-separator' });
      expect(result).toEqual({ cleanKey: 'value' });
    });

    test('bracket-separator 格式处理null值', () => {
      const result = queryString.parse('arr[]=', { arrayFormat: 'bracket-separator' });
      expect(result).toEqual({ arr: [''] });
    });
  });

  // 测试 stringifyUrl 函数的未覆盖分支
  describe('stringifyUrl 未覆盖分支测试', () => {
    test('处理不指定options.encodeFragmentIdentifier的情况', () => {
      const url = queryString.stringifyUrl({
        url: 'https://example.com',
        query: { foo: 'bar' },
        fragmentIdentifier: 'hash',
      });

      expect(url).toBe('https://example.com?foo=bar#hash');
    });

    test('URL构造失败时仍能拼接查询字符串和片段', () => {
      const result = queryString.stringifyUrl({
        url: 'invalid://url:with:colon',
        query: { foo: 'bar' },
        fragmentIdentifier: 'hash',
      });

      // 检查是否包含原始URL和查询参数
      expect(result).toContain('invalid://url:with:colon');
      expect(result).toContain('foo=bar');
      expect(result).toContain('#hash');
    });
  });

  // 测试 removeHash 函数的未覆盖分支
  describe('removeHash 函数测试', () => {
    test('处理没有哈希的URL', () => {
      expect(queryString.parseUrl('https://example.com').url)
        .toBe('https://example.com');
    });

    test('处理以哈希结尾的URL', () => {
      expect(queryString.parseUrl('https://example.com#').url)
        .toBe('https://example.com');
    });
  });

  // 测试 getHash 函数的未覆盖分支
  describe('getHash 函数测试', () => {
    test('处理非URL的输入', () => {
      // 覆盖 getHash 函数中 try-catch 的错误处理路径
      const result = queryString.parseUrl(':invalid-url');
      expect(result).toBeDefined();
    });
  });

  // 测试 validateArrayFormatSeparator 函数
  describe('validateArrayFormatSeparator 函数测试', () => {
    test('验证数组格式分隔符必须是单个字符', () => {
      expect(() => {
        queryString.stringify({ arr: [1, 2] }, {
          arrayFormat: 'separator',
          arrayFormatSeparator: '&&',
        });
      }).toThrow('arrayFormatSeparator must be single character string');
    });
  });

  // 测试 parseValue 函数的特殊情况
  describe('parseValue 函数特殊情况测试', () => {
    test('通过types选项为特定键提供类型转换', () => {
      const result = queryString.parse('key1=1&key2=true', {
        types: {
          key1: 'number',
          key2: 'boolean',
          nonExistentKey: 'string',
        },
      });

      expect(result.key1).toBe(1);
      expect(result.key2).toBe('true');
      expect(result.nonExistentKey).toBeUndefined();
    });

    test('处理更多特殊数字转换情况', () => {
      const result = queryString.parse('inf=Infinity&neginf=-Infinity&nan=NaN', {
        parseNumbers: true,
      });

      expect(result.inf).toBe(Infinity);
      expect(result.neginf).toBe(-Infinity);
      expect(result.nan).toBe('NaN');
    });
  });

  // 测试extract函数的覆盖情况
  describe('extract 函数测试', () => {
    test('处理带问号的URL', () => {
      expect(queryString.extract('https://example.com?foo=bar')).toBe('foo=bar');
    });

    test('处理不带问号的URL', () => {
      expect(queryString.extract('foo=bar')).toBe('');
    });

    test('处理空URL', () => {
      expect(queryString.extract('')).toBe('');
    });

    test('处理只有问号的URL', () => {
      expect(queryString.extract('?')).toBe('');
    });

    test('处理非字符串输入', () => {
      expect(queryString.extract(123)).toBe('');
      expect(queryString.extract(null)).toBe('');
      expect(queryString.extract(undefined)).toBe('');
    });
  });
});
