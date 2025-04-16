////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import format from '../src/format';
import toString from '../src/to-string';

// Mock toString模块
jest.mock('../src/to-string', () => {
  return jest.fn(obj => {
    if (obj && typeof obj === 'object' && typeof obj.toString === 'function') {
      return obj.toString();
    }
    if (obj === null) return 'null';
    if (obj === undefined) return 'undefined';
    return String(obj);
  });
});

/**
 * 测试 format() 函数
 *
 * @author 胡海星
 */
describe('format', () => {
  beforeEach(() => {
    toString.mockClear();
  });

  test('应该正确替换单个占位符', () => {
    expect(format('Hello, {0}!', ['World'])).toBe('Hello, World!');
  });

  test('应该正确替换多个占位符', () => {
    expect(format('{0} plus {1} equals {2}', [1, 2, 3])).toBe('1 plus 2 equals 3');
  });

  test('应该正确处理重复的占位符', () => {
    expect(format('{0} {0} {0}', ['repeat'])).toBe('repeat repeat repeat');
  });

  test('应该正确处理非顺序的占位符', () => {
    expect(format('{1} comes before {0}', ['second', 'first'])).toBe('first comes before second');
  });

  test('应该保留没有对应参数的占位符', () => {
    expect(format('Hello, {0}! Today is {1}.', ['World'])).toBe('Hello, World! Today is {1}.');
  });

  test('应该忽略多余的参数', () => {
    expect(format('Hello, {0}!', ['World', 'Extra'])).toBe('Hello, World!');
  });

  test('应该处理数字参数', () => {
    expect(format('The answer is {0}.', [42])).toBe('The answer is 42.');
  });

  test('应该处理对象参数', () => {
    // 创建一个有自定义toString方法的对象
    const obj = {
      toString() {
        return 'object';
      }
    };
    expect(format('The object is {0}.', [obj])).toBe('The object is object.');
  });

  test('应该处理null和undefined参数', () => {
    expect(format('Null: {0}, Undefined: {1}', [null, undefined])).toBe('Null: null, Undefined: undefined');
  });

  test('没有参数时应返回原始字符串', () => {
    expect(format('Hello, World!')).toBe('Hello, World!');
  });

  test('第一个参数为null或undefined时应返回空字符串', () => {
    // 根据实现，null和undefined应返回null和undefined
    expect(format(null)).toBe(null);
    expect(format(undefined)).toBe(undefined);
  });
}); 