////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { isEmpty } from '../src';

describe('Unit test of isEmpty() function', () => {
  test('Test with empty string', () => {
    expect(isEmpty('')).toBe(true);
  });
  test('Test with non-empty string', () => {
    expect(isEmpty('Hello, world!')).toBe(false);
  });
  test('Test with empty array', () => {
    expect(isEmpty([])).toBe(true);
  });
  test('Test with non-empty array', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });
  test('Test with empty typed array', () => {
    expect(isEmpty(new Int8Array())).toBe(true);
  });
  test('Test with non-empty typed array', () => {
    expect(isEmpty(new Int8Array([1, 2, 3]))).toBe(false);
  });
  test('Test with empty map', () => {
    expect(isEmpty(new Map())).toBe(true);
  });
  test('Test with non-empty map', () => {
    const map = new Map();
    map.set('a', 1);
    map.set('b', 2);
    map.set('c', 3);
    expect(isEmpty(map)).toBe(false);
  });
  test('Test with empty set', () => {
    expect(isEmpty(new Set())).toBe(true);
  });
  test('Test with non-empty set', () => {
    const set = new Set();
    set.add(1);
    set.add(2);
    set.add(3);
    expect(isEmpty(set)).toBe(false);
  });
  test('Test with empty object', () => {
    expect(isEmpty({})).toBe(false);
  });
  test('Test with non-empty object', () => {
    expect(isEmpty({ a: 1, b: 2, c: 3 })).toBe(false);
  });
  test('Test with empty object with length property', () => {
    const obj = {};
    Object.defineProperty(obj, 'length', { value: 0 });
    expect(isEmpty(obj)).toBe(true);
  });
  test('Test with non-empty object with length property', () => {
    const obj = {};
    Object.defineProperty(obj, 'length', { value: 3 });
    expect(isEmpty(obj)).toBe(false);
  });
  test('Test with empty object with size property', () => {
    const obj = {};
    Object.defineProperty(obj, 'size', { value: 0 });
    expect(isEmpty(obj)).toBe(true);
  });
  test('Test with non-empty object with size property', () => {
    const obj = {};
    Object.defineProperty(obj, 'size', { value: 3 });
    expect(isEmpty(obj)).toBe(false);
  });
  test('Test with empty object with isEmpty method', () => {
    const obj = {};
    obj.isEmpty = () => true;
    expect(isEmpty(obj)).toBe(true);
  });
  test('Test with non-empty object with isEmpty method', () => {
    const obj = {};
    obj.isEmpty = () => false;
    expect(isEmpty(obj)).toBe(false);
  });
  test('Test with empty object with length property and isEmpty method', () => {
    const obj = {};
    Object.defineProperty(obj, 'length', { value: 0 });
    obj.isEmpty = () => true;
    expect(isEmpty(obj)).toBe(true);
  });
  test('Test with non-empty object with length property and isEmpty method', () => {
    const obj = {};
    Object.defineProperty(obj, 'length', { value: 3 });
    obj.isEmpty = () => false;
    expect(isEmpty(obj)).toBe(false);
  });
  test('Test with empty object with size property and isEmpty method', () => {
    const obj = {};
    Object.defineProperty(obj, 'size', { value: 0 });
    obj.isEmpty = () => true;
    expect(isEmpty(obj)).toBe(true);
  });
  test('Test with non-empty object with size property and isEmpty method', () => {
    const obj = {};
    Object.defineProperty(obj, 'size', { value: 3 });
    obj.isEmpty = () => false;
    expect(isEmpty(obj)).toBe(false);
  });
  test('Test with empty object with length property and size property', () => {
    const obj = {};
    Object.defineProperty(obj, 'length', { value: 0 });
    Object.defineProperty(obj, 'size', { value: 0 });
    expect(isEmpty(obj)).toBe(true);
  });
  test('Test with non-empty object with length property and size property', () => {
    const obj = {};
    Object.defineProperty(obj, 'length', { value: 3 });
    Object.defineProperty(obj, 'size', { value: 3 });
    expect(isEmpty(obj)).toBe(false);
  });
  test('Test with empty object with length property and size property and isEmpty method', () => {
    const obj = {};
    Object.defineProperty(obj, 'length', { value: 0 });
    Object.defineProperty(obj, 'size', { value: 0 });
    obj.isEmpty = () => true;
    expect(isEmpty(obj)).toBe(true);
  });
  test('Test with non-empty object with length property and size property and isEmpty method', () => {
    const obj = {};
    Object.defineProperty(obj, 'length', { value: 3 });
    Object.defineProperty(obj, 'size', { value: 3 });
    obj.isEmpty = () => false;
    expect(isEmpty(obj)).toBe(false);
  });
  test('Test with null', () => {
    expect(isEmpty(null)).toBe(false);
  });
  test('Test with undefined', () => {
    expect(isEmpty(undefined)).toBe(false);
  });
  test('Test with boolean', () => {
    expect(isEmpty(true)).toBe(false);
    expect(isEmpty(false)).toBe(false);
  });
  test('Test with number', () => {
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(1)).toBe(false);
    expect(isEmpty(-1)).toBe(false);
    expect(isEmpty(1.5)).toBe(false);
    expect(isEmpty(-1.5)).toBe(false);
  });
  test('Test with bigint', () => {
    expect(isEmpty(0n)).toBe(false);
    expect(isEmpty(1n)).toBe(false);
    expect(isEmpty(-1n)).toBe(false);
  });
  test('Test with symbol', () => {
    expect(isEmpty(Symbol('test'))).toBe(false);
  });
  test('Test with function', () => {
    expect(isEmpty(() => { })).toBe(false);
  });
  test('Test with class', () => {
    class A { }
    expect(isEmpty(A)).toBe(false);
  });
});
