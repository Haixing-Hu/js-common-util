/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import translateConsoleArguments from '../src/impl/translate-console-arguments';

/**
 * 单元测试 translateConsoleArguments()
 *
 * @author 胡海星
 */
describe('translateConsoleArguments', () => {
  test('空参数数组', () => {
    const message = 'Hello World';
    const args = [];
    const result = translateConsoleArguments(message, args);
    expect(result).toEqual([message]);
  });
  test('消息模板中包含正常的参数占位符', () => {
    const message = 'Hello {0} World {1}';
    const args = [123, 456];
    const result = translateConsoleArguments(message, args);
    expect(result).toEqual(['Hello', 123, 'World', 456]);
  });
  test('消息模板中包含正常的参数占位符', () => {
    const message = '{0} World {1}, and {0} or {1} still continue';
    const args = [123, 456];
    const result = translateConsoleArguments(message, args);
    expect(result).toEqual([123, 'World', 456, ', and', 123, 'or', 456, 'still continue']);
  });
  test('消息模板中包含正常的参数占位符，参数包含对象', () => {
    const message = '{0} World {1}, and {0} or {1} still continue';
    const args = [123, { a: 1, b: '2' }];
    const result = translateConsoleArguments(message, args);
    expect(result).toEqual([123, 'World', { a: 1, b: '2' }, ', and', 123, 'or', { a: 1, b: '2' }, 'still continue']);
  });
  test('消息模板中包含正常的参数占位符，参数包含对象，有些占位符没有对应参数', () => {
    const message = '{0} World {1}, and {0} or {1} still {3}';
    const args = [123, { a: 1, b: '2' }];
    const result = translateConsoleArguments(message, args);
    expect(result).toEqual([123, 'World', { a: 1, b: '2' }, ', and', 123, 'or', { a: 1, b: '2' }, 'still', '{3}']);
  });
});
