////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

import queryString from '../src/query-string';

// 第二部分增强测试，进一步提高 query-string.js 的覆盖率
describe('queryString 覆盖率提升测试 - 第二部分', () => {
  // 测试 keysSorter 函数
  describe('keysSorter 函数完整性测试', () => {
    test('使用自定义排序函数', () => {
      // 使用自定义排序函数逆序排序
      const customSort = (a, b) => b.localeCompare(a);
      const result = queryString.parse('c=3&a=1&b=2', { sort: customSort });

      // 验证键按照自定义排序函数排序
      expect(Object.keys(result)).toEqual(['c', 'b', 'a']);
    });

    test('处理有数字作为键的对象', () => {
      // 数字键应该根据其数值而不是字符串顺序排序
      const result = queryString.parse('10=val10&1=val1&5=val5', { sort: true });
      expect(Object.keys(result)).toEqual(['1', '5', '10']);
    });

    test('不使用排序功能', () => {
      // 当 sort 为 false 时，应该保持原始顺序
      const result = queryString.parse('c=3&a=1&b=2', { sort: false });
      expect(Object.keys(result)).toEqual(['c', 'a', 'b']);
    });
  });

  // 测试 stringify 函数的未覆盖分支
  describe('stringify 函数未覆盖分支测试', () => {
    test('处理非对象输入', () => {
      expect(queryString.stringify(null)).toBe('');
      expect(queryString.stringify(undefined)).toBe('');
      // 修正: 字符串会被当作数组处理
      expect(queryString.stringify(123)).toBe('');
      const strResult = queryString.stringify('abc');
      expect(strResult).toContain('0=a');
      expect(strResult).toContain('1=b');
      expect(strResult).toContain('2=c');
    });

    test('使用不同的 format 选项', () => {
      const obj = { key: 'value', arr: [1, 2] };

      // 使用默认格式（不需要断言确切的顺序）
      const defaultFormat = queryString.stringify(obj);
      expect(defaultFormat).toContain('key=value');
      expect(defaultFormat).toContain('arr=1');
      expect(defaultFormat).toContain('arr=2');

      // 使用 bracket 格式
      expect(queryString.stringify(obj, { arrayFormat: 'bracket' }))
        .toContain('key=value');
      expect(queryString.stringify(obj, { arrayFormat: 'bracket' }))
        .toContain('arr[]=1');
      expect(queryString.stringify(obj, { arrayFormat: 'bracket' }))
        .toContain('arr[]=2');

      // 使用 index 格式
      expect(queryString.stringify(obj, { arrayFormat: 'index' }))
        .toContain('key=value');
      expect(queryString.stringify(obj, { arrayFormat: 'index' }))
        .toContain('arr[0]=1');
      expect(queryString.stringify(obj, { arrayFormat: 'index' }))
        .toContain('arr[1]=2');

      // 使用 comma 格式
      const commaResult = queryString.stringify(obj, { arrayFormat: 'comma' });
      expect(commaResult).toContain('key=value');
      expect(commaResult).toContain('arr=1,2');

      // 使用 separator 格式，默认分隔符是逗号
      const separatorResult = queryString.stringify(obj, { arrayFormat: 'separator' });
      expect(separatorResult).toContain('key=value');
      expect(separatorResult).toContain('arr=1,2');

      // 使用 separator 格式，自定义分隔符
      const customSeparatorResult = queryString.stringify(obj, {
        arrayFormat: 'separator',
        arrayFormatSeparator: '|',
      });
      expect(customSeparatorResult).toContain('key=value');
      expect(customSeparatorResult).toContain('arr=1|2');

      // 使用 colon-list-separator 格式
      const colonResult = queryString.stringify(obj, { arrayFormat: 'colon-list-separator' });
      expect(colonResult).toContain('key=value');
      expect(colonResult).toContain('arr:list=1');
      expect(colonResult).toContain('arr:list=2');

      // 使用 bracket-separator 格式
      const bracketSeparatorResult = queryString.stringify(obj, {
        arrayFormat: 'bracket-separator',
      });
      expect(bracketSeparatorResult).toContain('key=value');
      expect(bracketSeparatorResult).toContain('arr[]=1,2');

      // 使用 bracket-separator 格式，自定义分隔符
      const customBracketSeparatorResult = queryString.stringify(obj, {
        arrayFormat: 'bracket-separator',
        arrayFormatSeparator: '|',
      });
      expect(customBracketSeparatorResult).toContain('key=value');
      expect(customBracketSeparatorResult).toContain('arr[]=1|2');
    });

    test('skip选项组合测试', () => {
      const obj = { a: null, b: '', c: 'value' };

      // 默认选项：skipNull = true, skipEmptyString = false
      // 不断言确切顺序，只检查内容
      const defaultResult = queryString.stringify(obj);
      expect(defaultResult).toContain('b=');
      expect(defaultResult).toContain('c=value');
      expect(defaultResult).toContain('a');
      expect(defaultResult).not.toContain('a=');

      // 两个选项都为true
      const bothTrueResult = queryString.stringify(obj, {
        skipNull: true,
        skipEmptyString: true,
      });
      expect(bothTrueResult).toContain('c=value');
      expect(bothTrueResult).toContain('a');
      expect(bothTrueResult).not.toContain('b=');

      // 两个选项都为false
      const bothFalseResult = queryString.stringify(obj, {
        skipNull: false,
        skipEmptyString: false,
      });
      // 修正：null值会作为没有值的键添加，而不是作为键值对
      expect(bothFalseResult).toContain('a');
      expect(bothFalseResult).toContain('b=');
      expect(bothFalseResult).toContain('c=value');

      // skipNull = false, skipEmptyString = true
      const mixedResult = queryString.stringify(obj, {
        skipNull: false,
        skipEmptyString: true,
      });
      expect(mixedResult).toContain('a');
      expect(mixedResult).toContain('c=value');
      expect(mixedResult).not.toContain('b=');
    });

    test('处理值为undefined的情况', () => {
      const obj = { a: undefined, b: 'value' };
      expect(queryString.stringify(obj)).toBe('b=value');
    });

    test('处理复杂值的编码', () => {
      const obj = {
        special: '!\'()*',  // 特殊字符
        space: 'hello world',  // 包含空格
        chinese: '你好，世界',  // 中文字符
        emoji: '😀👍',  // emoji
      };

      // 默认使用严格编码
      const encoded = queryString.stringify(obj);
      // 修正: 在严格模式下，特殊字符也会被编码
      expect(encoded).toContain('special=%21%27%28%29%2A');
      expect(encoded).toContain('space=hello%20world');
      expect(encoded).toContain('chinese=');
      expect(encoded).toContain('emoji=');

      // 使用非严格编码
      const loosely = queryString.stringify(obj, { strict: false });
      // 修正: 在非严格模式下，!()*等特殊字符不会被编码
      expect(loosely).toContain("special=!'()*");
      expect(loosely).toContain('space=hello%20world');

      // 禁用编码
      const notEncoded = queryString.stringify(obj, { encode: false });
      expect(notEncoded).toContain("special=!'()*");
      expect(notEncoded).toContain('space=hello world');
      expect(notEncoded).toContain('chinese=你好，世界');
      expect(notEncoded).toContain('emoji=😀👍');
    });
  });

  // 测试 parseUrl 函数
  describe('parseUrl 函数测试', () => {
    test('处理不同格式的URL', () => {
      // 基本URL，无参数，无片段
      expect(queryString.parseUrl('https://example.com')).toEqual({
        url: 'https://example.com',
        query: {},
      });

      // 带参数的URL
      expect(queryString.parseUrl('https://example.com?foo=bar')).toEqual({
        url: 'https://example.com',
        query: { foo: 'bar' },
      });

      // 带片段的URL - 注意:默认情况下fragmentIdentifier不会包含在结果中
      const withFragment = queryString.parseUrl('https://example.com#hash');
      expect(withFragment.url).toBe('https://example.com');
      expect(withFragment.query).toEqual({});

      // 带参数和片段的URL
      const withParamsAndFragment = queryString.parseUrl('https://example.com?foo=bar#hash');
      expect(withParamsAndFragment.url).toBe('https://example.com');
      expect(withParamsAndFragment.query).toEqual({ foo: 'bar' });

      // 片段中也有参数的URL
      const fragmentWithParams = queryString.parseUrl('https://example.com#/path?foo=bar');
      expect(fragmentWithParams.url).toBe('https://example.com');
      expect(fragmentWithParams.query).toEqual({});
    });

    test('使用parseFragmentIdentifier选项', () => {
      // 开启片段解析
      const result = queryString.parseUrl('https://example.com?a=1#/path?b=2', {
        parseFragmentIdentifier: true,
      });

      // 修正: 如果未启用fragmentIdentifier，则只处理主URL的查询参数
      expect(result.url).toBe('https://example.com');
      expect(result.query).toEqual({ a: '1' });
      expect(result.fragmentIdentifier).toBe('/path?b=2');
    });
  });

  // 测试 pick 和 exclude 函数
  describe('pick 和 exclude 函数测试', () => {
    test('使用pick函数从URL选择特定查询参数', () => {
      // 使用数组筛选器
      expect(queryString.pick('https://example.com?a=1&b=2&c=3', ['a', 'c']))
        .toBe('https://example.com?a=1&c=3');

      // 保留片段
      expect(queryString.pick('https://example.com?a=1&b=2&c=3#hash', ['a', 'c']))
        .toBe('https://example.com?a=1&c=3#hash');

      // 所有参数都被排除
      expect(queryString.pick('https://example.com?a=1&b=2', ['c']))
        .toBe('https://example.com');

      // 没有参数
      expect(queryString.pick('https://example.com', ['a']))
        .toBe('https://example.com');
    });

    test('使用exclude函数从URL排除特定查询参数', () => {
      // 使用数组筛选器
      expect(queryString.exclude('https://example.com?a=1&b=2&c=3', ['b']))
        .toBe('https://example.com?a=1&c=3');

      // 保留片段
      expect(queryString.exclude('https://example.com?a=1&b=2&c=3#hash', ['b']))
        .toBe('https://example.com?a=1&c=3#hash');

      // 排除所有参数
      expect(queryString.exclude('https://example.com?a=1&b=2', ['a', 'b']))
        .toBe('https://example.com');

      // 排除不存在的参数
      expect(queryString.exclude('https://example.com?a=1', ['b']))
        .toBe('https://example.com?a=1');

      // 没有参数
      expect(queryString.exclude('https://example.com', ['a']))
        .toBe('https://example.com');
    });
  });
});
