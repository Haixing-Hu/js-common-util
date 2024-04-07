////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { getProperty } from '../src';

describe('getProperty', () => {
  // 测试正常情况
  test('should return the correct value for a given path', () => {
    const obj = { a: { b: { c: 1 } } };
    expect(getProperty(obj, 'a')).toEqual({ b: { c: 1 } });
    expect(getProperty(obj, 'a.b')).toEqual({ c: 1 });
    expect(getProperty(obj, 'a.b.c')).toEqual(1);
  });
  // 测试边界情况
  test('should return the object itself for an empty path', () => {
    const obj = { a: { b: { c: 1 } } };
    expect(getProperty(obj, '')).toBe(obj);
  });
  // 测试错误输入
  test('should throw an error if the path is not a string', () => {
    const obj = { a: { b: { c: 1 } } };
    expect(() => getProperty(obj, null)).toThrow('The path must be a string.');
  });
  test('should return defaultValue for non-object input', () => {
    expect(getProperty(null, 'a.b', 'defaultValue')).toBe('defaultValue');
    expect(getProperty(undefined, 'a.b', 'defaultValue')).toBe('defaultValue');
    expect(getProperty(0, 'a.b', 'defaultValue')).toBe('defaultValue');
    expect(getProperty(0.0, 'a.b', 'defaultValue')).toBe('defaultValue');
    expect(getProperty('xyz', 'a.b', 'defaultValue')).toBe('defaultValue');
  });
  // 测试默认值
  test('should return the default value if the path does not exist', () => {
    const obj = { a: { b: 2 } };
    expect(getProperty(obj, 'a.c', 'defaultValue')).toBe('defaultValue');
  });
  test('should return the default value if the path does not exist', () => {
    const obj = { a: { b: null } };
    expect(getProperty(obj, 'a.b.c', 'defaultValue')).toBe('defaultValue');
  });
  test('should return the default value if the path exist but the value is undefined', () => {
    const obj = { person: { age: undefined } };
    expect(getProperty(obj, 'person.age', 22)).toBe(22);
  });
  test('should return null if the path exist and the value is null', () => {
    const obj = { person: { age: null } };
    expect(getProperty(obj, 'person.age', 22)).toBeNull();
  });
  // 测试数组索引
  test('should handle array indexes', () => {
    const obj = { a: { b: [1, 2, 3] } };
    expect(getProperty(obj, 'a.b[1]')).toBe(2);
  });
  // 测试嵌套对象和数组
  test('should handle nested objects and arrays', () => {
    const obj = { a: { b: [{ c: 1 }, { c: 2 }] } };
    expect(getProperty(obj, 'a.b[1].c')).toBe(2);
  });
  // 测试组合情况
  test('returns specified value or default using path', () => {
    const jay = {
      name: 'jay',
      age: 17,
      friends: [
        {
          name: 'carl',
          age: 17,
          friends: [
            {
              name: 'sara',
              age: 17,
            },
          ],
        },
      ],
    };
    expect(getProperty(jay, 'friends[0].age')).toBe(17);
    expect(getProperty(jay, 'friends["0"].age')).toBe(17);
    expect(getProperty(jay, 'friends.0.age')).toBe(17);
    expect(getProperty(jay, 'friends.1.age')).toBeUndefined();
    expect(getProperty(jay, 'friends.0.friends[0].name')).toBe('sara');
    expect(getProperty(jay, 'name')).toBe('jay');
    expect(getProperty(jay, '[name]')).toBe('jay');
    expect(getProperty(jay, '["name"]')).toBe('jay');
    expect(getProperty(jay, 'friends[0][name]')).toBe('carl');
    expect(getProperty(jay, 'friends[0].friends[0].friends[0].age', 22)).toBe(22);
  });
  // 测试混合对象和数组的路径
  it('handles mixed paths with objects and arrays', () => {
    const obj = { a: [{ b: { c: [1, 2, 3] } }] };
    expect(getProperty(obj, 'a[0].b.c[2]')).toEqual(3);
  });
  // 测试未定义的默认值
  it('returns undefined for non-existent path with no default value', () => {
    const obj = { a: 1 };
    expect(getProperty(obj, 'b')).toBeUndefined();
  });
  // 测试空对象和空数组
  it('returns the object or array itself if the path is empty', () => {
    const obj = {};
    const arr = [];
    expect(getProperty(obj, '')).toEqual(obj);
    expect(getProperty(arr, '')).toEqual(arr);
  });
  // 测试包含特殊字符的属性名
  it('handles property names with spaces and special characters', () => {
    const obj = { 'a complex key': { '@value': 42 } };
    expect(getProperty(obj, 'a complex key.@value')).toEqual(42);
  });
  // 测试数字作为路径
  it('should handle paths that are numeric strings', () => {
    const obj = { a: { b: ['first', 'second'] } };
    expect(getProperty(obj, 'a.b[1]')).toEqual('second');
  });
  // 测试路径中包含引号
  it('correctly accesses properties with path with quotes', () => {
    const obj = { 'some': { 'key': { 'other-key': 1 } }, 'arr': [{ '2': 2 }] };
    expect(getProperty(obj, 'some.key["other-key"]')).toEqual(1);
    expect(getProperty(obj, 'arr[0]["2"]')).toEqual(2);
  });
  // 测试带有引号的键名
  it('correctly accesses properties with keys with quotes', () => {
    const obj = { 'some': { 'key': { '"other-key': 1 } }, 'arr': [{ '2': 2 }] };
    expect(getProperty(obj, 'some.key["other-key]')).toEqual(1);
    expect(getProperty(obj, 'arr[0]["2"]')).toEqual(2);
  });
  // 测试路径为非标准格式时的错误处理
  it('should returns default value for incorrectly formatted paths', () => {
    const obj = { a: 1 };
    expect(getProperty(obj, 'a[0].b')).toBeUndefined();
    expect(getProperty(obj, 'a[0].b', 'defaultValue')).toBe('defaultValue');
  });
  // 测试路径中包含异常字符
  // it('should ignore dots and brackets as part of actual keys', () => {
  //   const obj = { 'a.b': { '[c]': 1 } };
  //   expect(getProperty(obj, "a.b['[c]']")).toEqual(1);
  // });
});
