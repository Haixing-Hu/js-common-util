////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

import excludeKeys from '../src/exclude-keys';

describe('excludeKeys', () => {
  test('使用数组排除对象属性', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    expect(excludeKeys(obj, ['a', 'c'])).toEqual({ b: 2, d: 4 });
  });

  test('使用Set排除对象属性', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const keysToExclude = new Set(['b', 'd']);
    expect(excludeKeys(obj, keysToExclude)).toEqual({ a: 1, c: 3 });
  });

  test('使用函数排除对象属性', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    // 排除值大于2的属性
    const result = excludeKeys(obj, (key, value) => value > 2);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  test('函数谓词能够访问键、值和原始对象', () => {
    const obj = { a: 1, b: 2, c: 3 };
    // 测试谓词函数能够接收key, value, object参数
    let receivedKey, receivedValue, receivedObject;
    excludeKeys(obj, (key, value, object) => {
      if (key === 'b') {
        receivedKey = key;
        receivedValue = value;
        receivedObject = object;
        return true; // 排除b
      }
      return false;
    });

    expect(receivedKey).toBe('b');
    expect(receivedValue).toBe(2);
    expect(receivedObject).toBe(obj);
  });

  test('处理空对象', () => {
    expect(excludeKeys({}, ['a', 'b'])).toEqual({});
    expect(excludeKeys({}, new Set(['a', 'b']))).toEqual({});
    expect(excludeKeys({}, () => true)).toEqual({});
  });

  test('排除不存在的键不影响结果', () => {
    const obj = { a: 1, b: 2 };
    expect(excludeKeys(obj, ['c', 'd'])).toEqual({ a: 1, b: 2 });
    expect(excludeKeys(obj, new Set(['c', 'd']))).toEqual({ a: 1, b: 2 });
  });

  test('保留属性描述符', () => {
    const obj = {};
    Object.defineProperty(obj, 'a', {
      value: 1,
      enumerable: true,
      configurable: false,
      writable: false
    });
    Object.defineProperty(obj, 'b', {
      value: 2,
      enumerable: true
    });
    Object.defineProperty(obj, 'c', {
      value: 3,
      enumerable: true
    });

    const result = excludeKeys(obj, ['c']);
    
    // 测试属性描述符是否被保留
    const aDesc = Object.getOwnPropertyDescriptor(result, 'a');
    expect(aDesc.configurable).toBe(false);
    expect(aDesc.writable).toBe(false);
    
    // 测试值是否正确
    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
    expect(result.c).toBeUndefined();
  });

  test('不可枚举的属性处理', () => {
    const obj = {};
    Object.defineProperty(obj, 'a', {
      value: 1,
      enumerable: false
    });
    Object.defineProperty(obj, 'b', {
      value: 2,
      enumerable: true
    });

    // 不可枚举的属性不会出现在结果中
    expect(excludeKeys(obj, ['b'])).toEqual({});
    expect(excludeKeys(obj, new Set(['b']))).toEqual({});
  });

  test('处理Symbol键', () => {
    const sym1 = Symbol('sym1');
    const sym2 = Symbol('sym2');
    const obj = {
      a: 1,
      b: 2,
      [sym1]: 'symbol1',
      [sym2]: 'symbol2',
    };

    // 排除所有非Symbol键
    const result = excludeKeys(obj, (key) => typeof key !== 'symbol');
    
    // 验证结果，应该只包含Symbol键
    expect(Object.getOwnPropertyNames(result)).toEqual([]);
    expect(Object.getOwnPropertySymbols(result)).toHaveLength(2);
    expect(result[sym1]).toBe('symbol1');
    expect(result[sym2]).toBe('symbol2');
  });

  test('当排除所有键时返回空对象', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(excludeKeys(obj, ['a', 'b', 'c'])).toEqual({});
    expect(excludeKeys(obj, new Set(['a', 'b', 'c']))).toEqual({});
    expect(excludeKeys(obj, () => true)).toEqual({});
  });

  test('当不排除任何键时返回所有可枚举属性', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(excludeKeys(obj, [])).toEqual({ a: 1, b: 2, c: 3 });
    expect(excludeKeys(obj, new Set())).toEqual({ a: 1, b: 2, c: 3 });
    expect(excludeKeys(obj, () => false)).toEqual({ a: 1, b: 2, c: 3 });
  });
}); 