////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

import splitOnFirst from '../src/split-on-first';

describe('splitOnFirst', () => {
  test('在第一次出现分隔符的位置分割字符串', () => {
    expect(splitOnFirst('a=b=c', '=')).toEqual(['a', 'b=c']);
    expect(splitOnFirst('abc=def', '=')).toEqual(['abc', 'def']);
    expect(splitOnFirst('abc/def/ghi', '/')).toEqual(['abc', 'def/ghi']);
  });

  test('当分隔符不在字符串中时返回空数组', () => {
    expect(splitOnFirst('abc', '=')).toEqual([]);
    expect(splitOnFirst('abcdef', 'x')).toEqual([]);
  });

  test('处理空字符串', () => {
    expect(splitOnFirst('', '=')).toEqual([]);
  });

  test('处理空分隔符', () => {
    expect(splitOnFirst('abc', '')).toEqual([]);
  });

  test('分隔符在字符串开头', () => {
    expect(splitOnFirst('=abc', '=')).toEqual(['', 'abc']);
  });

  test('分隔符在字符串结尾', () => {
    expect(splitOnFirst('abc=', '=')).toEqual(['abc', '']);
  });

  test('处理特殊字符', () => {
    expect(splitOnFirst('a.b.c', '.')).toEqual(['a', 'b.c']);
    expect(splitOnFirst('a?b?c', '?')).toEqual(['a', 'b?c']);
    expect(splitOnFirst('a&b&c', '&')).toEqual(['a', 'b&c']);
  });

  test('多字符分隔符', () => {
    expect(splitOnFirst('abc::def::ghi', '::')).toEqual(['abc', 'def::ghi']);
  });

  test('参数类型检查', () => {
    expect(() => splitOnFirst(null, ',')).toThrow();
    expect(() => splitOnFirst('abc', null)).toThrow();
    expect(() => splitOnFirst(123, ',')).toThrow();
    expect(() => splitOnFirst('abc', 123)).toThrow();
  });
});
