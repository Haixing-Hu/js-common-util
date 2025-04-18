////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2025.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

import includeKeys from '../src/include-keys';

describe('includeKeys', () => {
  test('使用数组过滤对象属性', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    expect(includeKeys(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });

  test('使用Set过滤对象属性', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const keys = new Set(['b', 'd']);
    expect(includeKeys(obj, keys)).toEqual({ b: 2, d: 4 });
  });

  test('使用函数过滤对象属性', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    // 只保留值大于2的属性
    const result = includeKeys(obj, (key, value) => value > 2);
    expect(result).toEqual({ c: 3, d: 4 });
  });

  test('函数谓词能够访问键、值和原始对象', () => {
    const obj = { a: 1, b: 2, c: 3 };
    // 测试谓词函数能够接收key, value, object参数
    let receivedKey, receivedValue, receivedObject;
    includeKeys(obj, (key, value, object) => {
      if (key === 'b') {
        receivedKey = key;
        receivedValue = value;
        receivedObject = object;
        return true;
      }
      return false;
    });

    expect(receivedKey).toBe('b');
    expect(receivedValue).toBe(2);
    expect(receivedObject).toBe(obj);
  });

  test('处理空对象', () => {
    expect(includeKeys({}, ['a', 'b'])).toEqual({});
    expect(includeKeys({}, new Set(['a', 'b']))).toEqual({});
    expect(includeKeys({}, () => true)).toEqual({});
  });

  test('处理不存在的键', () => {
    const obj = { a: 1, b: 2 };
    expect(includeKeys(obj, ['c', 'd'])).toEqual({});
    expect(includeKeys(obj, new Set(['c', 'd']))).toEqual({});
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

    const result = includeKeys(obj, ['a', 'b']);
    
    // 测试属性描述符是否被保留
    const aDesc = Object.getOwnPropertyDescriptor(result, 'a');
    expect(aDesc.configurable).toBe(false);
    expect(aDesc.writable).toBe(false);
    
    // 测试值是否正确
    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
  });

  test('不包含不可枚举的属性', () => {
    const obj = {};
    Object.defineProperty(obj, 'a', {
      value: 1,
      enumerable: false
    });
    Object.defineProperty(obj, 'b', {
      value: 2,
      enumerable: true
    });

    // 即使指定了不可枚举的属性，也不应该被包含
    expect(includeKeys(obj, ['a', 'b'])).toEqual({ b: 2 });
    expect(includeKeys(obj, new Set(['a', 'b']))).toEqual({ b: 2 });
  });

  test('处理Symbol键', () => {
    const sym1 = Symbol('sym1');
    const sym2 = Symbol('sym2');
    const obj = {
      a: 1,
      [sym1]: 'symbol1',
      [sym2]: 'symbol2',
    };

    // 使用函数谓词过滤Symbol键
    const result = includeKeys(obj, (key) => typeof key === 'symbol');
    
    // 验证结果，应该只包含Symbol键
    expect(Object.getOwnPropertyNames(result)).toEqual([]);
    expect(Object.getOwnPropertySymbols(result)).toHaveLength(2);
    expect(result[sym1]).toBe('symbol1');
    expect(result[sym2]).toBe('symbol2');
  });
}); 