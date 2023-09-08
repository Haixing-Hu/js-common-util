/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import { ArrayUtils } from '../main';

/**
 * 单元测试 'ArrayUtils.remove()'
 *
 * @author 胡海星
 */
describe('ArrayUtils.remove()', () => {
  test('成功删除中间元素', () => {
    const array = [1, 2, 3, 4, 5];
    const result = ArrayUtils.remove(array, 3);
    expect(result).toBe(true);
    expect(array).toEqual([1, 2, 4, 5]);
  });
  test('成功删除首元素', () => {
    const array = [1, 2, 3, 4, 5];
    const result = ArrayUtils.remove(array, 1);
    expect(result).toBe(true);
    expect(array).toEqual([2, 3, 4, 5]);
  });
  test('成功删除末尾元素', () => {
    const array = [1, 2, 3, 4, 5];
    const result = ArrayUtils.remove(array, 5);
    expect(result).toBe(true);
    expect(array).toEqual([1, 2, 3, 4]);
  });
  test('待删除元素不存在', () => {
    const array = [1, 2, 3, 4, 5];
    const result = ArrayUtils.remove(array, 0);
    expect(result).toBe(false);
    expect(array).toEqual([1, 2, 3, 4, 5]);
  });
  test('成功从单个元素数组中删除', () => {
    const array = [1];
    const result = ArrayUtils.remove(array, 1);
    expect(result).toBe(true);
    expect(array).toEqual([]);
  });
  test('从空数组中删除', () => {
    const array = [];
    const result = ArrayUtils.remove(array, 1);
    expect(result).toBe(false);
    expect(array).toEqual([]);
  });
  test('指定元素多次出现但只删除第一个', () => {
    const array = [1, 2, 3, 4, 3, 5];
    const result = ArrayUtils.remove(array, 3);
    expect(result).toBe(true);
    expect(array).toEqual([1, 2, 4, 3, 5]);
  });
  test('成功从字符串数组中删除字符串元素', () => {
    const array = ['1', '2', '3', '4', '5'];
    const result = ArrayUtils.remove(array, '3');
    expect(result).toBe(true);
    expect(array).toEqual(['1', '2', '4', '5']);
  });
  test('从字符串数组中删除数字元素失败', () => {
    const array = ['1', '2', '3', '4', '5'];
    const result = ArrayUtils.remove(array, 3);
    expect(result).toBe(false);
    expect(array).toEqual(['1', '2', '3', '4', '5']);
  });
});

/**
 * 单元测试 'ArrayUtils.removeIf()'
 *
 * @author 胡海星
 */
describe('ArrayUtils.removeIf()', () => {
  test('成功删除中间元素', () => {
    const array = [1, 2, 3, 4, 5];
    const result = ArrayUtils.removeIf(array, (e) => (e === 3));
    expect(result).toBe(true);
    expect(array).toEqual([1, 2, 4, 5]);
  });
  test('成功删除首元素', () => {
    const array = [1, 2, 3, 4, 5];
    const result = ArrayUtils.removeIf(array, (e) => (e === 1));
    expect(result).toBe(true);
    expect(array).toEqual([2, 3, 4, 5]);
  });
  test('成功删除末尾元素', () => {
    const array = [1, 2, 3, 4, 5];
    const result = ArrayUtils.removeIf(array, (e) => (e === 5));
    expect(result).toBe(true);
    expect(array).toEqual([1, 2, 3, 4]);
  });
  test('待删除元素不存在', () => {
    const array = [1, 2, 3, 4, 5];
    const result = ArrayUtils.removeIf(array, (e) => (e < 0));
    expect(result).toBe(false);
    expect(array).toEqual([1, 2, 3, 4, 5]);
  });
  test('成功从单个元素数组中删除', () => {
    const array = [1];
    const result = ArrayUtils.removeIf(array, (e) => (e >= 1));
    expect(result).toBe(true);
    expect(array).toEqual([]);
  });
  test('从空数组中删除', () => {
    const array = [];
    const result = ArrayUtils.removeIf(array, (e) => (e >= 1));
    expect(result).toBe(false);
    expect(array).toEqual([]);
  });
  test('指定元素多次出现但只删除第一个', () => {
    const array = [1, 2, 3, 4, 3, 5];
    const result = ArrayUtils.removeIf(array, (e) => (e >= 3));
    expect(result).toBe(true);
    expect(array).toEqual([1, 2, 4, 3, 5]);
  });
});
