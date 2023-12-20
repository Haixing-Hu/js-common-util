////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { emptyToNull } from '../src';

describe('Unit test of emptyToNull() function', () => {
  test('empty string', () => {
    expect(emptyToNull('')).toBeNull();
  });
  test('non-empty string', () => {
    expect(emptyToNull('Hello, world!')).toBe('Hello, world!');
  });
  test('empty array', () => {
    expect(emptyToNull([])).toBeNull();
  });
  test('non-empty array', () => {
    const array = [1, 2, 3];
    expect(emptyToNull(array)).toBe(array);
  });
  test('empty typed array', () => {
    expect(emptyToNull(new Int8Array())).toBeNull();
  });
  test('non-empty typed array', () => {
    const array = new Int8Array([1, 2, 3]);
    expect(emptyToNull(array)).toBe(array);
  });
  test('empty map', () => {
    expect(emptyToNull(new Map())).toBeNull();
  });
  test('non-empty map', () => {
    const map = new Map();
    map.set('a', 1);
    map.set('b', 2);
    map.set('c', 3);
    expect(emptyToNull(map)).toBe(map);
  });
  test('empty set', () => {
    expect(emptyToNull(new Set())).toBeNull();
  });
  test('non-empty set', () => {
    const set = new Set();
    set.add(1);
    set.add(2);
    set.add(3);
    expect(emptyToNull(set)).toBe(set);
  });
  test('empty object', () => {
    const obj = {};
    expect(emptyToNull(obj)).toBe(obj);
  });
  test('non-empty object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(emptyToNull(obj)).toBe(obj);
  });
  test('empty object with length property', () => {
    const obj = {};
    Object.defineProperty(obj, 'length', { value: 0 });
    expect(emptyToNull(obj)).toBeNull();
  });
  test('non-empty object with length property', () => {
    const obj = {};
    Object.defineProperty(obj, 'length', { value: 3 });
    expect(emptyToNull(obj)).toBe(obj);
  });
  test('empty object with size property', () => {
    const obj = {};
    Object.defineProperty(obj, 'size', { value: 0 });
    expect(emptyToNull(obj)).toBeNull();
  });
  test('non-empty object with size property', () => {
    const obj = {};
    Object.defineProperty(obj, 'size', { value: 3 });
    expect(emptyToNull(obj)).toBe(obj);
  });
  test('empty object with emptyToNull method', () => {
    const obj = {};
    obj.isEmpty = () => true;
    expect(emptyToNull(obj)).toBeNull();
  });
  test('non-empty object with emptyToNull method', () => {
    const obj = {};
    obj.isEmpty = () => false;
    expect(emptyToNull(obj)).toBe(obj);
  });
  test('empty object with length property and isEmpty() method', () => {
    const obj = {};
    Object.defineProperty(obj, 'length', { value: 0 });
    obj.isEmpty = () => true;
    expect(emptyToNull(obj)).toBeNull();
  });
  test('non-empty object with length property and isEmpty() method', () => {
    const obj = {};
    Object.defineProperty(obj, 'length', { value: 3 });
    obj.isEmpty = () => false;
    expect(emptyToNull(obj)).toBe(obj);
  });
  test('empty object with size property and isEmpty() method', () => {
    const obj = {};
    Object.defineProperty(obj, 'size', { value: 0 });
    obj.isEmpty = () => true;
    expect(emptyToNull(obj)).toBeNull();
  });
  test('non-empty object with size property and isEmpty() method', () => {
    const obj = {};
    Object.defineProperty(obj, 'size', { value: 3 });
    obj.isEmpty = () => false;
    expect(emptyToNull(obj)).toBe(obj);
  });
  test('empty object with length property and size property', () => {
    const obj = {};
    Object.defineProperty(obj, 'length', { value: 0 });
    Object.defineProperty(obj, 'size', { value: 0 });
    expect(emptyToNull(obj)).toBeNull();
  });
  test('non-empty object with length property and size property', () => {
    const obj = {};
    Object.defineProperty(obj, 'length', { value: 3 });
    Object.defineProperty(obj, 'size', { value: 3 });
    expect(emptyToNull(obj)).toBe(obj);
  });
  test('empty object with length property and size property and isEmpty() method', () => {
    const obj = {};
    Object.defineProperty(obj, 'length', { value: 0 });
    Object.defineProperty(obj, 'size', { value: 0 });
    obj.isEmpty = () => true;
    expect(emptyToNull(obj)).toBeNull();
  });
  test('non-empty object with length property and size property and isEmpty() method', () => {
    const obj = {};
    Object.defineProperty(obj, 'length', { value: 3 });
    Object.defineProperty(obj, 'size', { value: 3 });
    obj.isEmpty = () => false;
    expect(emptyToNull(obj)).toBe(obj);
  });
  test('null', () => {
    expect(emptyToNull(null)).toBe(null);
  });
  test('undefined', () => {
    expect(emptyToNull(undefined)).toBe(null);
  });
  test('boolean', () => {
    expect(emptyToNull(true)).toBe(true);
    expect(emptyToNull(false)).toBe(false);
  });
  test('number', () => {
    expect(emptyToNull(0)).toBe(0);
    expect(emptyToNull(1)).toBe(1);
    expect(emptyToNull(-1)).toBe(-1);
    expect(emptyToNull(1.5)).toBe(1.5);
    expect(emptyToNull(-1.5)).toBe(-1.5);
  });
  test('bigint', () => {
    expect(emptyToNull(0n)).toBe(0n);
    expect(emptyToNull(1n)).toBe(1n);
    expect(emptyToNull(-1n)).toBe(-1n);
  });
  test('symbol', () => {
    const s = Symbol('test');
    expect(emptyToNull(s)).toBe(s);
  });
  test('function', () => {
    const func = () => { };
    expect(emptyToNull(func)).toBe(func);
  });
  test('class', () => {
    class A { }
    expect(emptyToNull(A)).toBe(A);
  });
});
