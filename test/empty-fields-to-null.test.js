/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import { emptyFieldsToNull } from '../src';
import ShallowObject from './model/ShallowObject';
import DeepObject from './model/DeepObject';

/**
 * 单元测试 'emptyFieldsToNull'
 *
 * @author 胡海星
 */
describe('emptyFieldsToNull', () => {
  test('参数为undefined', () => {
    const obj = undefined;
    expect(emptyFieldsToNull(obj)).toBeUndefined();
  });
  test('参数为null', () => {
    const obj = null;
    expect(emptyFieldsToNull(obj)).toBeNull();
  });
  test('参数为非空字符串', () => {
    const obj = 'abc';
    expect(emptyFieldsToNull(obj)).toBe('abc');
  });
  test('参数为空字符串', () => {
    const obj = '';
    expect(emptyFieldsToNull(obj)).toBeNull();
  });
  test('参数为数字', () => {
    const obj = 123;
    expect(emptyFieldsToNull(obj)).toBe(123);
  });
  test('参数为布尔', () => {
    const obj = true;
    expect(emptyFieldsToNull(obj)).toBe(true);
  });
  test('参数为BigInt', () => {
    const obj = 123n;
    expect(emptyFieldsToNull(obj)).toBe(123n);
  });
  test('参数为RegExp', () => {
    const obj = /[abc]/;
    expect(emptyFieldsToNull(obj)).toEqual(/[abc]/);
  });
  test('参数为Date', () => {
    const now = new Date();
    const obj = new Date(now);
    expect(emptyFieldsToNull(obj)).toEqual(now);
  });
  test('参数为普通浅层对象，不包含空字符串属性', () => {
    const obj = new ShallowObject('abc', 123);
    const result = emptyFieldsToNull(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });
  test('参数为普通浅层对象，包含空字符串属性', () => {
    const obj = new ShallowObject('', 123);
    const result = emptyFieldsToNull(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    expect(result.name).toBeNull();
    expect(result.value).toBe(123);
  });
  test('参数为复杂嵌套对象，不包含空字符串属性', () => {
    const obj = new DeepObject('abc', 123, 'def', 456);
    const result = emptyFieldsToNull(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });
  test('参数为复杂嵌套对象，包含空字符串属性', () => {
    const obj = new DeepObject('', 123, '', 456);
    const result = emptyFieldsToNull(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    expect(result.description).toBeNull();
    expect(result.price).toBe(123);
    expect(result.shallow).not.toBeNull();
    expect(result.shallow.name).toBeNull();
    expect(result.shallow.value).toBe(456);
  });
  test('参数为数字类型数组', () => {
    const obj = [1, 2, 3];
    const result = emptyFieldsToNull(obj);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });
  test('参数为字符串类型数组，不包含空字符串', () => {
    const obj = ['a', 'b', 'c'];
    const result = emptyFieldsToNull(obj);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });
  test('参数为字符串类型数组，包含空字符串', () => {
    const obj = ['a', 'b', ''];
    const result = emptyFieldsToNull(obj);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    expect(result).toEqual(['a', 'b', null]);
  });
  test('参数为浅层对象数组，每个对象不包含空字符串属性', () => {
    const obj = [new ShallowObject('abc', 123), new ShallowObject('def', 456)];
    const result = emptyFieldsToNull(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });
  test('参数为浅层对象数组，某个对象不包含空字符串属性', () => {
    const obj = [new ShallowObject('abc', 123), new ShallowObject('', 456)];
    const result = emptyFieldsToNull(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    expect(result).toEqual([new ShallowObject('abc', 123), new ShallowObject(null, 456)]);
  });
  test('参数为嵌套对象数组，每个对象不包含空字符串属性', () => {
    const obj = [new DeepObject('a', 1, 'b', 2), new DeepObject('c', 3, 'd', 4)];
    const result = emptyFieldsToNull(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });
  test('参数为嵌套对象数组，某个对象不包含空字符串属性', () => {
    const obj = [new DeepObject('a', 1, 'b', 2), new DeepObject('', 3, '', 4)];
    const result = emptyFieldsToNull(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    expect(result).toEqual([new DeepObject('a', 1, 'b', 2), new DeepObject(null, 3, null, 4)]);
  });
});
