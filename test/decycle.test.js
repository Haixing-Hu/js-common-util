/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import { decycle } from '../main';

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
});
