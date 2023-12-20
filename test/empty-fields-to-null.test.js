////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { emptyFieldsToNull } from '../src';
import ShallowObject from './model/ShallowObject';
import DeepObject from './model/DeepObject';

/**
 * Unit test of the 'emptyFieldsToNull()' function.
 *
 * @author Haixing Hu
 */
describe('Test emptyFieldsToNull()', () => {
  test('undefined', () => {
    const obj = undefined;
    expect(emptyFieldsToNull(obj)).toBeUndefined();
  });
  test('null', () => {
    const obj = null;
    expect(emptyFieldsToNull(obj)).toBeNull();
  });
  test('non-empty string', () => {
    expect(emptyFieldsToNull('abc')).toBe('abc');
  });
  test('empty string', () => {
    expect(emptyFieldsToNull('')).toBeNull();
  });
  test('non-empty String object', () => {
    const obj = new String('abc');
    expect(emptyFieldsToNull(obj)).toBe(obj);
  });
  test('empty String object', () => {
    const obj = new String('');
    expect(emptyFieldsToNull(obj)).toBeNull();
  });
  test('number', () => {
    const obj = 123;
    expect(emptyFieldsToNull(obj)).toBe(123);
  });
  test('boolean', () => {
    const obj = true;
    expect(emptyFieldsToNull(obj)).toBe(true);
  });
  test('bigint', () => {
    const obj = 123n;
    expect(emptyFieldsToNull(obj)).toBe(123n);
  });
  test('regexp', () => {
    const obj = /[abc]/;
    expect(emptyFieldsToNull(obj)).toEqual(/[abc]/);
  });
  test('Date', () => {
    const now = new Date();
    const obj = new Date(now);
    expect(emptyFieldsToNull(obj)).toEqual(now);
  });
  test('ordinary shallow object without empty string properties', () => {
    const obj = new ShallowObject('abc', 123);
    const result = emptyFieldsToNull(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });
  test('ordinary shallow object with an empty string property', () => {
    const obj = new ShallowObject('', 123);
    const result = emptyFieldsToNull(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    expect(result.name).toBeNull();
    expect(result.value).toBe(123);
  });
  test('ordinary shallow object with an empty String object property', () => {
    const obj = new ShallowObject(new String(''), 123);
    const result = emptyFieldsToNull(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    expect(result.name).toBeNull();
    expect(result.value).toBe(123);
  });
  test('complex nested objects without empty string properties', () => {
    const obj = new DeepObject('abc', 123, 'def', 456);
    const result = emptyFieldsToNull(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });
  test('complex nested objects with an empty string property', () => {
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
  test('complex nested objects with an empty String object property', () => {
    const obj = new DeepObject(new String(''), 123, new String(''), 456);
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
  test('array of numeric types', () => {
    const obj = [1, 2, 3];
    const result = emptyFieldsToNull(obj);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });
  test('array of strings, without empty strings', () => {
    const obj = ['a', 'b', 'c'];
    const result = emptyFieldsToNull(obj);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });
  test('array of strings, with empty strings', () => {
    const obj = ['a', 'b', ''];
    const result = emptyFieldsToNull(obj);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    expect(result).toEqual(['a', 'b', null]);
  });
  test('array of strings, with empty String objects', () => {
    const obj = ['a', 'b', new String('')];
    const result = emptyFieldsToNull(obj);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    expect(result).toEqual(['a', 'b', null]);
  });
  test('array of String objects, without empty String object', () => {
    const obj = [new String('a'), new String('b'), new String('c')];
    const result = emptyFieldsToNull(obj);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });
  test('array of String objects, with empty String object', () => {
    const obj = [new String('a'), new String('b'), new String('')];
    const expected = [new String('a'), new String('b'), null];
    const result = emptyFieldsToNull(obj);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    expect(result).toEqual(expected);
  });
  test('array of shallow objects, each does not contain empty string properties', () => {
    const obj = [new ShallowObject('abc', 123), new ShallowObject('def', 456)];
    const result = emptyFieldsToNull(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });
  test('array of shallow objects, one of them contains an empty string property', () => {
    const obj = [new ShallowObject('abc', 123), new ShallowObject('', 456)];
    const expected = [new ShallowObject('abc', 123), new ShallowObject(null, 456)];
    const result = emptyFieldsToNull(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    expect(result).toEqual(expected);
  });
  test('array of shallow objects, one of them contains an empty String object property', () => {
    const obj = [new ShallowObject('abc', 123), new ShallowObject(new String(''), 456)];
    const expected = [new ShallowObject('abc', 123), new ShallowObject(null, 456)];
    const result = emptyFieldsToNull(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    expect(result).toEqual(expected);
  });
  test('array of nested objects, each does not contain empty string properties', () => {
    const obj = [new DeepObject('a', 1, 'b', 2), new DeepObject('c', 3, 'd', 4)];
    const result = emptyFieldsToNull(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });
  test('array of nested objects, an object contains empty string properties', () => {
    const obj = [new DeepObject('a', 1, 'b', 2), new DeepObject('', 3, '', 4)];
    const result = emptyFieldsToNull(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    expect(result).toEqual([new DeepObject('a', 1, 'b', 2), new DeepObject(null, 3, null, 4)]);
  });
  test('array of nested objects, an object contains empty String object properties', () => {
    const obj = [new DeepObject('a', 1, 'b', 2), new DeepObject(new String(''), 3, new String(''), 4)];
    const result = emptyFieldsToNull(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    expect(result).toEqual([new DeepObject('a', 1, 'b', 2), new DeepObject(null, 3, null, 4)]);
  });
});
