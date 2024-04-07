////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { dequote } from '../src';

describe('dequote function', () => {
  // 正确去除双引号
  test('removes double quotes from the beginning and end of the string', () => {
    expect(dequote('"quoted"')).toEqual('quoted');
  });

  // 正确去除单引号
  test('removes single quotes from the beginning and end of the string', () => {
    expect(dequote('\'quoted\'')).toEqual('quoted');
  });

  // 保留未以相同引号开头和结尾的字符串
  test('does not remove quotes if they are not the same at both ends', () => {
    expect(dequote('\'quoted"')).toEqual('\'quoted"');
    expect(dequote('"quoted\'')).toEqual('"quoted\'');
  });

  // 返回长度小于 2 的字符串
  test('returns the string as is if its length is less than 2', () => {
    expect(dequote('a')).toEqual('a');
    expect(dequote('')).toEqual('');
  });

  // 处理 null
  test('returns null if the input is null', () => {
    expect(dequote(null)).toBeNull();
  });
  // 处理undefined
  test('returns undefined if the input is undefined', () => {
    expect(dequote(undefined)).toBeUndefined();
  });
  // 处理非字符串输入
  test('throws a TypeError if the input is not a string', () => {
    expect(() => dequote(123)).toThrow(TypeError);
    expect(() => dequote({})).toThrow(TypeError);
  });

  // 引号内的特殊字符处理
  test('handles special characters inside quotes correctly', () => {
    expect(dequote('"quoted\\"value"')).toEqual('quoted\\"value');
    expect(dequote('\'quoted\\\'value\'')).toEqual('quoted\\\'value');
  });

  // 确保多层引号被正确处理
  test('removes only the outermost quotes', () => {
    expect(dequote('""double quoted""')).toEqual('"double quoted"');
    expect(dequote('\'\'single quoted\'\'')).toEqual('\'single quoted\'');
  });
});
