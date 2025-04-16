////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { decycle } from '../src';

/**
 * 单元测试 'decycle'
 *
 * @author 胡海星
 */
describe('decycle', () => {
  test('decycle undefined', () => {
    expect(decycle(undefined)).toBeUndefined();
  });
  test('decycle null', () => {
    expect(decycle(null)).toBeNull();
  });
  test('decycle string', () => {
    expect(decycle('str')).toBe('str');
  });
  test('decycle number', () => {
    expect(decycle(123)).toBe(123);
  });
  test('decycle simple object', () => {
    const obj = {
      name: 'obj',
      value: 123,
    };
    expect(decycle(obj)).not.toBe(obj);
    expect(decycle(obj)).toEqual(obj);
  });
  test('decycle cycled object', () => {
    const obj = {
      name: 'obj',
      value: 123,
      left: {
        name: 'obj.left',
      },
      right: {
        name: 'obj.right',
      },
    };
    obj.left.parent = obj;
    obj.right.brother = obj.left;
    expect(decycle(obj)).toEqual({
      name: 'obj',
      value: 123,
      left: {
        name: 'obj.left',
        parent: { $ref: '$' },
      },
      right: {
        name: 'obj.right',
        brother: { $ref: '$.left' },
      },
    });
  });
  
  test('decycle array with circular reference', () => {
    const arr = [1, 2, 3];
    arr.push(arr); // 循环引用
    const result = decycle(arr);
    expect(result).toEqual([1, 2, 3, { $ref: '$' }]);
  });
  
  test('decycle object with Date', () => {
    const date = new Date('2023-01-01');
    const obj = { date };
    const result = decycle(obj);
    expect(result).toEqual({ date });
  });
  
  test('decycle using replacer function', () => {
    const obj = {
      name: 'obj',
      value: 123
    };
    const replacer = (value) => {
      if (typeof value === 'number') {
        return value * 2;
      }
      return value;
    };
    expect(decycle(obj, replacer)).toEqual({
      name: 'obj',
      value: 246
    });
  });
  
  test('decycle Map object', () => {
    const map = new Map();
    map.set('key1', 'value1');
    map.set('key2', { nested: 'value2' });
    
    const result = decycle(map);
    expect(result instanceof Map).toBe(true);
    expect(result.get('key1')).toBe('value1');
    expect(result.get('key2')).toEqual({ nested: 'value2' });
  });
  
  test('decycle Map with circular reference', () => {
    const map = new Map();
    map.set('key1', 'value1');
    map.set('self', map); // 循环引用
    
    const result = decycle(map);
    expect(result instanceof Map).toBe(true);
    expect(result.get('key1')).toBe('value1');
    expect(result.get('self')).toEqual({ $ref: '$' });
  });
  
  test('decycle Map with circular reference to key', () => {
    const obj = {};
    const map = new Map();
    map.set(obj, 'value1');
    obj.map = map; // 循环引用
    
    const result = decycle(obj);
    expect(result.map instanceof Map).toBe(true);
    
    // Map使用引用作为键时，需检查其设置的内容是否存在，而不是直接用$ref对象作为键获取
    // Map的键对象在序列化后地址改变，无法直接通过{$ref: '$'}获取
    const entries = Array.from(result.map.entries());
    expect(entries.length).toBe(1);
    expect(entries[0][1]).toBe('value1');
  });
  
  test('decycle Set object', () => {
    const set = new Set(['value1', { nested: 'value2' }]);
    
    const result = decycle(set);
    expect(result instanceof Set).toBe(true);
    expect(result.has('value1')).toBe(true);
    
    // 找到嵌套对象元素并验证它
    const nestedObj = Array.from(result).find(item => typeof item === 'object');
    expect(nestedObj).toEqual({ nested: 'value2' });
  });
  
  test('decycle Set with circular reference', () => {
    const set = new Set(['value1']);
    set.add(set); // 循环引用
    
    const result = decycle(set);
    expect(result instanceof Set).toBe(true);
    expect(result.has('value1')).toBe(true);
    
    // 找到循环引用元素并验证它
    const refObj = Array.from(result).find(item => item.$ref === '$');
    expect(refObj).toEqual({ $ref: '$' });
  });

  test('decycle complex object with Date and RegExp', () => {
    const obj = {
      date: new Date('2023-01-01'),
      regex: /test/g,
    };
    const result = decycle(obj);
    expect(result).toEqual(obj);
  });
  
  test('decycle non-object values with replacer', () => {
    const replacer = (value) => {
      if (typeof value === 'string') {
        return value.toUpperCase();
      }
      return value;
    };
    expect(decycle('test', replacer)).toBe('TEST');
    expect(decycle(123, replacer)).toBe(123);
  });
});
