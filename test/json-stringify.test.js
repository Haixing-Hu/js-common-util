/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2020
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/
import { jsonStringify } from '../main';

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
  // test('WeakMap', () => {
  //   const map = new WeakMap();
  //   const a = { a: 1 };
  //   const b = { b: 2 };
  //   const c = { c: 3 };
  //   map.set(a, 1);
  //   map.set(b, 2);
  //   map.set(c, 3);
  //   expect(jsonStringify(map)).toBe('[ [ {"a": 1}, 1 ], [ {"b": 2}, 2], [ {"c": 3}, 3] ]');
  // });
  test('Set', () => {
    const map = new Set();
    map.add('a');
    map.add('b');
    map.add('c');
    expect(jsonStringify(map, true)).toBe('[ "a", "b", "c" ]');
  });
  // test('WeakSet', () => {
  //   const map = new WeakSet();
  //   const a = { a: 1 };
  //   const b = { b: 2 };
  //   const c = { c: 3 };
  //   map.add(a);
  //   map.add(b);
  //   map.add(c);
  //   expect(jsonStringify(map)).toBe('[ {"a": 1}, {"b": 2}, {"c": 3} ]');
  // });
  test('bigint', () => {
    const x = 12345n;
    expect(jsonStringify(x, true)).toBe('"12345"');
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
});
