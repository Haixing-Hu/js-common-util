////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { jsonStringify } from '../src';

/**
 * 单元测试 'jsonStringify'
 *
 * @author 胡海星
 */
describe('jsonStringify', () => {
  test('undefined', () => {
    expect(jsonStringify(undefined)).toBe('undefined');
  });
  test('null', () => {
    expect(jsonStringify(null)).toBe('null');
  });
  test('number', () => {
    expect(jsonStringify(1)).toBe('1');
    expect(jsonStringify(+1)).toBe('1');
    expect(jsonStringify(-1)).toBe('-1');
    expect(jsonStringify(+0)).toBe('0');
    expect(jsonStringify(-0)).toBe('0');
    expect(jsonStringify(Number.NaN)).toBe('null');
    expect(jsonStringify(Number.POSITIVE_INFINITY)).toBe('null');
    expect(jsonStringify(Number.NEGATIVE_INFINITY)).toBe('null');
  });
  test('Array', () => {
    const array = [1, 2, 3];
    expect(jsonStringify(array, true)).toBe('[ 1, 2, 3 ]');
  });
  test('Map', () => {
    const map = new Map();
    map.set('a', 1);
    map.set('b', 2);
    map.set('c', 3);
    expect(jsonStringify(map, true)).toBe('[ [ "a", 1 ], [ "b", 2 ], [ "c", 3 ] ]');
  });
  test('Set', () => {
    const map = new Set();
    map.add('a');
    map.add('b');
    map.add('c');
    expect(jsonStringify(map, true)).toBe('[ "a", "b", "c" ]');
  });
  test('bigint', () => {
    const x = 12345n;
    expect(jsonStringify(x, true)).toBe('"12345n"');
  });
  test('stringify cycled object', () => {
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
    const expected = {
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
    };
    expect(jsonStringify(obj, false)).toBe(JSON.stringify(expected));
  });
  
  // 测试函数类型（覆盖 replacer 函数的 default 分支，第45行）
  test('function type', () => {
    const fn = function testFunction() { return 'test'; };
    const obj = { fn };
    
    expect(jsonStringify(obj)).toContain('function testFunction()');
  });
  
  // 测试Symbol类型（覆盖 replacer 函数的 default 分支，第45行）
  test('Symbol type', () => {
    const sym = Symbol('test');
    const obj = { sym };
    
    expect(jsonStringify(obj)).toContain('Symbol(test)');
  });
  
  // 测试Date类型（覆盖 replacer 函数的 default 分支，第45行的另一种情况）
  test('Date type', () => {
    const date = new Date(2023, 0, 1); // 2023-01-01
    const obj = { 
      notConverted: date,
      // 确保Date不作为对象处理，而是通过default分支转为字符串
      forceNotObject: Object.create(null, {
        toString: { 
          value: function() { return date.toString(); }
        },
        [Symbol.toStringTag]: {
          value: 'Date'
        }
      })
    };
    
    // 检查Date对象被序列化为ISO字符串格式
    const result = jsonStringify(obj);
    expect(result).toContain(date.toISOString());
    
    // 检查日期的JSON序列化
    const parsed = JSON.parse(result);
    expect(parsed.notConverted).toBe(date.toISOString());
  });
  
  // 测试object类型默认分支（覆盖 replacer 函数中 case 'object': 下的 default 分支，第40行）
  test('custom object type', () => {
    // 创建一个不是 Map 或 Set 的普通对象
    const customObj = {
      name: 'test',
      value: 123
    };
    
    // 确保对象被正确序列化
    expect(jsonStringify(customObj)).toBe('{"name":"test","value":123}');
    
    // 测试美化输出
    const beautified = jsonStringify(customObj, true);
    expect(beautified).toContain('name');
    expect(beautified).toContain('test');
    expect(beautified).toContain('value');
    expect(beautified).toContain('123');
  });
  
  // 测试传入自定义replacer函数到decycle (覆盖第76行)
  test('jsonStringify with custom replacer passed to decycle', () => {
    const obj = {
      name: 'test',
      value: 123
    };
    
    // 模拟decycle调用，验证jsonStringify第76行覆盖
    // 创建一个对象引用自己，确保会走到decycle逻辑
    const circularObj = { name: 'circular' };
    circularObj.self = circularObj;
    
    // 手动调用jsonStringify并指定beautify为true，覆盖第73行
    const result = jsonStringify(circularObj, true);
    
    // 结果应该包含解决了循环引用的JSON字符串
    expect(result).toContain('"name"');
    expect(result).toContain('"circular"');
    expect(result).toContain('"self"');
    expect(result).toContain('$ref');
  });
  
  // 直接测试replacer函数以提高覆盖率（覆盖第27行）
  test('test replacer function directly for all type cases', () => {
    // 获取replacer函数的引用
    // 因为replacer是私有函数，我们需要模拟它的调用环境
    
    // 创建一个包含各种类型值的对象
    const testObj = {
      nullValue: null,
      undefinedValue: undefined,
      stringValue: 'test',
      booleanValue: true,
      numberValue: 123,
      bigintValue: 123n,
      mapValue: new Map([['key', 'value']]),
      setVarue: new Set(['value']),
      regularObject: { prop: 'value' },
      functionValue: function() { return 'function'; },
      symbolValue: Symbol('symbol'),
      dateValue: new Date()
    };
    
    // 序列化然后解析来间接测试replacer函数
    const serialized = jsonStringify(testObj);
    const parsed = JSON.parse(serialized);
    
    // 验证各种类型被正确处理
    expect(parsed.nullValue).toBeNull();
    expect(parsed.undefinedValue).toBeUndefined();
    expect(parsed.stringValue).toBe('test');
    expect(parsed.booleanValue).toBe(true);
    expect(parsed.numberValue).toBe(123);
    expect(parsed.bigintValue).toBe('123n');
    expect(Array.isArray(parsed.mapValue)).toBe(true);
    expect(Array.isArray(parsed.setVarue)).toBe(true);
    expect(typeof parsed.regularObject).toBe('object');
    expect(typeof parsed.functionValue).toBe('string');
    expect(typeof parsed.symbolValue).toBe('string');
    expect(typeof parsed.dateValue).toBe('string');
  });
});
