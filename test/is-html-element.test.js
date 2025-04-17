////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isHtmlElement from '../src/is-html-element';

/**
 * 测试 isHtmlElement() 函数
 *
 * @author 胡海星
 */
describe('isHtmlElement', () => {
  test('应该识别出HTML元素', () => {
    const element = document.createElement('div');
    expect(isHtmlElement(element)).toBe(true);
  });

  test('应该识别出各种HTML元素', () => {
    const elements = [
      document.createElement('div'),
      document.createElement('span'),
      document.createElement('p'),
      document.createElement('a'),
      document.createElement('input'),
      document.createElement('button'),
    ];
    elements.forEach((el) => {
      expect(isHtmlElement(el)).toBe(true);
    });
  });

  test('对于null返回false', () => {
    expect(!!isHtmlElement(null)).toBe(false);
  });

  test('对于undefined返回false', () => {
    expect(!!isHtmlElement(undefined)).toBe(false);
  });

  test('对于普通对象返回false', () => {
    expect(isHtmlElement({})).toBe(false);
  });

  test('对于数组返回false', () => {
    expect(isHtmlElement([])).toBe(false);
  });

  test('对于字符串返回false', () => {
    expect(isHtmlElement('div')).toBe(false);
  });

  test('对于数字返回false', () => {
    expect(isHtmlElement(42)).toBe(false);
  });

  test('对于布尔值返回false', () => {
    expect(isHtmlElement(true)).toBe(false);
  });

  test('对于函数返回false', () => {
    expect(isHtmlElement(() => {})).toBe(false);
  });
});
