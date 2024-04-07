////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { setProperty } from '../src';

describe('test setProperty()', () => {
  test('sets a simple property on an object', () => {
    const obj = {};
    expect(setProperty(obj, 'a', 1)).toBe(true);
    expect(obj.a).toBe(1);
  });

  test('sets a deep property on an object', () => {
    const obj = { a: { b: { c: 0 } } };
    expect(setProperty(obj, 'a.b.c', 1)).toBe(true);
    expect(obj.a.b.c).toBe(1);
  });

  test('sets a value in an array', () => {
    const obj = { a: [0, 1, 2] };
    expect(setProperty(obj, 'a[1]', 3)).toBe(true);
    expect(obj.a[1]).toBe(3);
  });

  test('sets a property on an object within an array', () => {
    const obj = { a: [{ b: 0 }] };
    expect(setProperty(obj, 'a[0].b', 1)).toBe(true);
    expect(obj.a[0].b).toBe(1);
  });

  test('does nothing and returns false for null, undefined, or empty path', () => {
    const obj = {};
    expect(setProperty(null, 'a.b', 1)).toBe(false);
    expect(setProperty(obj, '', 1)).toBe(false);
    expect(setProperty(obj, 'a.b', undefined)).toBe(false);
  });

  test('creates intermediate objects or arrays when needed', () => {
    const obj = {};
    expect(setProperty(obj, 'a.b[0].c', 1)).toBe(true);
    expect(Array.isArray(obj.a.b)).toBe(true);
    expect(obj.a.b[0].c).toBe(1);
  });

  test('throws an error if the path is not a string', () => {
    const obj = {};
    expect(() => setProperty(obj, null, 1)).toThrow('The path must be a string.');
    expect(() => setProperty(obj, 123, 1)).toThrow('The path must be a string.');
  });
});
