////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { hasProperty } from '../src';

describe('test hasProperty()', () => {
  const testData = {
    'a': {
      'b': {
        'c': 1,
        'd': null,
      },
      'e': [1, 2, { 'f': 'test' }],
    },
    'g.h': { 'i': 2 }, // 测试包含点的属性名
  };
  test('returns true for an existing object path', () => {
    expect(hasProperty(testData, 'a.b.c')).toBe(true);
  });

  test('returns true for an existing object path with null value', () => {
    expect(hasProperty(testData, 'a.b.d')).toBe(true);
  });

  test('returns false for a non-existing object path', () => {
    expect(hasProperty(testData, 'a.b.x')).toBe(false);
  });

  test('returns true for an empty path (the object itself)', () => {
    expect(hasProperty(testData, '')).toBe(true);
  });

  test('returns false for a null object', () => {
    expect(hasProperty(null, 'a')).toBe(false);
  });

  test('throws an error if the path is not a string', () => {
    expect(() => hasProperty(testData, null)).toThrow('The path must be a string.');
  });

  test('returns true for an existing array index path', () => {
    expect(hasProperty(testData, 'a.e[1]')).toBe(true);
  });

  test('returns false for a non-existing array index path', () => {
    expect(hasProperty(testData, 'a.e[5]')).toBe(false);
  });

  test('returns true for an existing mixed object and array path', () => {
    expect(hasProperty(testData, 'a.e[2].f')).toBe(true);
  });

  test('returns false for a non-existing mixed object and array path', () => {
    expect(hasProperty(testData, 'a.e[2].x')).toBe(false);
  });

  // test('returns true for a path with a property name that contains a dot', () => {
  //   expect(hasProperty(testData, 'g.h.i')).toBe(true);
  // });
});
