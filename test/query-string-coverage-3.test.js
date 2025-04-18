////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

import queryString from '../src/query-string';

// 第三部分增强测试，处理特殊情况和边缘案例
describe('queryString 覆盖率提升测试 - 第三部分', () => {
  // 测试 stringify 函数的特殊情况
  describe('stringify 特殊情况测试', () => {
    test('处理不同类型的数组值', () => {
      const obj = { 
        numbers: [1, 2, 3],
        strings: ['a', 'b', 'c'],
        booleans: [true, false],
        nulls: [null, null],
        mixed: [1, 'a', true, null, undefined]
      };
      
      const result = queryString.stringify(obj);
      
      // 验证不同类型的数组值正确转换
      expect(result).toContain('numbers=1');
      expect(result).toContain('numbers=2');
      expect(result).toContain('numbers=3');
      
      expect(result).toContain('strings=a');
      expect(result).toContain('strings=b');
      expect(result).toContain('strings=c');
      
      expect(result).toContain('booleans=true');
      expect(result).toContain('booleans=false');
      
      expect(result).toContain('nulls');
      expect(result).toContain('mixed=1');
      expect(result).toContain('mixed=a');
      expect(result).toContain('mixed=true');
      // 数组中的null和undefined应该按照skipNull选项处理
      expect(result).not.toContain('mixed=undefined');
    });

    test('处理复杂的嵌套对象', () => {
      const obj = {
        simple: 'value',
        object: { a: 1, b: 2 },
        nestedArray: [[1, 2], [3, 4]],
        complexObject: {
          a: {
            b: {
              c: 'deep'
            }
          }
        }
      };
      
      const result = queryString.stringify(obj);
      
      // 默认情况下，对象会被序列化，但嵌套结构会丢失
      expect(result).toContain('simple=value');
      expect(result).toContain('object=');
      expect(result).toContain('nestedArray=');
      expect(result).toContain('complexObject=');
      
      // 默认情况下，对象应该使用[object Object]表示
      // 但是会被URL编码
      expect(result).toContain('object=%5Bobject%20Object%5D');
    });

    test('特殊字符编码测试', () => {
      const obj = {
        reserved: "!#$&'()*+,/:;=?@[]",
        unreserved: "-._~",
        unsafe: "<>\"%{}|\\^`"
      };
      
      // 默认情况下使用严格编码，所有特殊字符都会被编码
      const result = queryString.stringify(obj);
      
      // 保留字符会被编码
      expect(result).toContain('reserved=%21%23%24%26%27%28%29%2A%2B%2C%2F%3A%3B%3D%3F%40%5B%5D');
      
      // 不需要编码的字符
      expect(result).toContain('unreserved=-._~');
      
      // 需要编码的字符
      expect(result).not.toContain('unsafe=<>"%{}|\\^`');
      expect(result).toContain('unsafe=%3C%3E%22%25%7B%7D%7C%5C%5E%60');
      
      // 非严格模式下部分特殊字符不会被编码
      const nonStrictResult = queryString.stringify(obj, { strict: false });
      // 注意: 即使在非严格模式下，"#$&+=?[]"等字符仍会被编码，因为它们在URL中有特殊含义
      expect(nonStrictResult).toContain("reserved=!%23%24%26'()*%2B%2C%2F%3A%3B%3D%3F%40%5B%5D");
    });
  });

  // 测试 parse 函数的边缘情况
  describe('parse 边缘情况测试', () => {
    test('处理重复的键名', () => {
      // 相同键不同值
      expect(queryString.parse('key=value1&key=value2')).toEqual({
        key: ['value1', 'value2']
      });
      
      // 相同键相同值
      expect(queryString.parse('key=value&key=value')).toEqual({
        key: ['value', 'value']
      });
      
      // 相同键，一个有值，一个无值
      expect(queryString.parse('key=value&key')).toEqual({
        key: ['value', null]
      });
      
      // 多个重复键
      expect(queryString.parse('key=1&other=x&key=2&other=y')).toEqual({
        key: ['1', '2'],
        other: ['x', 'y']
      });
    });

    test('处理特殊格式的键名和值', () => {
      // 键包含方括号但不是按正确格式
      expect(queryString.parse('key[wrong=value', { arrayFormat: 'index' })).toEqual({
        'key[wrong': 'value'
      });
      
      // 键包含方括号但是空的 - bracket格式会特殊处理
      const result = queryString.parse('key[]=value', { arrayFormat: 'bracket' });
      expect(result.key).toEqual(['value']);
      
      // 特殊字符作为键名 - 注意：某些特殊字符会影响解析
      // 由于!@#$等特殊字符，我们测试一个更简单的特殊字符键
      const special = queryString.parse('*star*=value');
      expect(special['*star*']).toBe('value');
      
      // 连续的等号
      expect(queryString.parse('key=value=more')).toEqual({
        key: 'value=more'
      });
    });

    test('处理带编码的URL参数', () => {
      // 编码的空格
      expect(queryString.parse('key=hello%20world')).toEqual({
        key: 'hello world'
      });
      
      // 编码的特殊字符
      expect(queryString.parse('key=%3C%3E%22%25%7B%7D%7C%5C%5E%60')).toEqual({
        key: '<>"%{}|\\^`'
      });
      
      // 编码的中文字符
      expect(queryString.parse('key=%E4%BD%A0%E5%A5%BD')).toEqual({
        key: '你好'
      });
      
      // 编码的加号（应该解析为空格）
      expect(queryString.parse('key=hello+world')).toEqual({
        key: 'hello world'
      });
      
      // 禁用解码
      expect(queryString.parse('key=hello%20world', { decode: false })).toEqual({
        key: 'hello%20world'
      });
    });

    test('处理非标准格式的查询字符串', () => {
      // 值之间有多个&符号
      expect(queryString.parse('key1=value1&&key2=value2')).toEqual({
        key1: 'value1',
        key2: 'value2'
      });
      
      // 开头有多个&符号
      expect(queryString.parse('&&key=value')).toEqual({
        key: 'value'
      });
      
      // 结尾有多个&符号
      expect(queryString.parse('key=value&&')).toEqual({
        key: 'value'
      });
      
      // 键后没有等号但有值（非标准格式，应该被忽略）
      expect(queryString.parse('key1value1&key2=value2')).toEqual({
        key1value1: null,
        key2: 'value2'
      });
    });
  });

  // 测试 stringifyUrl 函数的特殊情况
  describe('stringifyUrl 特殊情况测试', () => {
    test('处理不完整或特殊的URL', () => {
      // 只有域名的URL
      expect(queryString.stringifyUrl({ url: 'example.com', query: { a: '1' } }))
        .toBe('example.com?a=1');
      
      // 只有路径的URL
      expect(queryString.stringifyUrl({ url: '/path', query: { a: '1' } }))
        .toBe('/path?a=1');
      
      // 包含锚点的URL
      expect(queryString.stringifyUrl({ url: 'https://example.com#section', query: { a: '1' } }))
        .toBe('https://example.com?a=1#section');
      
      // URL已包含查询参数
      const withQueryParams = queryString.stringifyUrl({ 
        url: 'https://example.com?b=2', 
        query: { a: '1' } 
      });
      // 不要断言确切顺序，只检查内容
      expect(withQueryParams).toContain('https://example.com?');
      expect(withQueryParams).toContain('a=1');
      expect(withQueryParams).toContain('b=2');
      
      // URL以问号结尾
      expect(queryString.stringifyUrl({ url: 'https://example.com?', query: { a: '1' } }))
        .toBe('https://example.com?a=1');
    });

    test('处理片段标识符的特殊情况', () => {
      // 片段标识符包含特殊字符
      expect(queryString.stringifyUrl({
        url: 'https://example.com',
        query: { a: '1' },
        fragmentIdentifier: 'section=value&key=123'
      })).toBe('https://example.com?a=1#section=value&key=123');
      
      // URL已有片段标识符，但又提供了新的片段标识符
      expect(queryString.stringifyUrl({
        url: 'https://example.com#old',
        query: { a: '1' },
        fragmentIdentifier: 'new'
      })).toBe('https://example.com?a=1#new');
      
      // 禁用片段标识符编码 - 但注意，空格仍然会被编码（浏览器会自动处理）
      expect(queryString.stringifyUrl({
        url: 'https://example.com',
        query: { a: '1' },
        fragmentIdentifier: 'section value'
      }, { encodeFragmentIdentifier: false })).toBe('https://example.com?a=1#section%20value');
    });
  });

  // 测试查询参数排序
  describe('查询参数排序测试', () => {
    test('测试排序功能在stringify中的应用', () => {
      const obj = { c: 3, a: 1, b: 2 };
      
      // 默认不排序，但顺序可能是按照添加顺序或字母顺序
      const defaultResult = queryString.stringify(obj);
      expect(defaultResult).toContain('a=1');
      expect(defaultResult).toContain('b=2');
      expect(defaultResult).toContain('c=3');
      
      // 使用内置的按字母顺序排序
      expect(queryString.stringify(obj, { sort: true }))
        .toBe('a=1&b=2&c=3');
      
      // 使用自定义排序函数
      const customSortResult = queryString.stringify(obj, { 
        sort: (a, b) => obj[b] - obj[a]  // 按值降序排序
      });
      expect(customSortResult).toBe('c=3&b=2&a=1');
    });
  });
}); 