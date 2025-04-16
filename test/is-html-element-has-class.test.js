////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isHtmlElementHasClass from '../src/is-html-element-has-class';

/**
 * 测试 isHtmlElementHasClass() 函数
 *
 * @author 胡海星
 */
describe('isHtmlElementHasClass', () => {
  test('对于null元素返回false', () => {
    expect(isHtmlElementHasClass(null, 'test-class')).toBe(false);
  });

  test('对于undefined元素返回false', () => {
    expect(isHtmlElementHasClass(undefined, 'test-class')).toBe(false);
  });

  test('对于null类名返回false', () => {
    const element = document.createElement('div');
    element.className = 'test-class';
    expect(isHtmlElementHasClass(element, null)).toBe(false);
  });

  test('对于undefined类名返回false', () => {
    const element = document.createElement('div');
    element.className = 'test-class';
    expect(isHtmlElementHasClass(element, undefined)).toBe(false);
  });

  test('对于空类名返回false', () => {
    const element = document.createElement('div');
    element.className = 'test-class';
    expect(isHtmlElementHasClass(element, '')).toBe(false);
  });

  test('元素拥有单个类名时应返回true', () => {
    const element = document.createElement('div');
    element.className = 'test-class';
    expect(isHtmlElementHasClass(element, 'test-class')).toBe(true);
  });

  test('元素拥有多个类名时应正确判断', () => {
    const element = document.createElement('div');
    element.className = 'class1 class2 class3';
    expect(isHtmlElementHasClass(element, 'class1')).toBe(true);
    expect(isHtmlElementHasClass(element, 'class2')).toBe(true);
    expect(isHtmlElementHasClass(element, 'class3')).toBe(true);
  });

  test('元素不拥有指定类名时应返回false', () => {
    const element = document.createElement('div');
    element.className = 'class1 class2 class3';
    expect(isHtmlElementHasClass(element, 'class4')).toBe(false);
  });

  test('元素没有任何类名时应返回false', () => {
    const element = document.createElement('div');
    expect(isHtmlElementHasClass(element, 'test-class')).toBe(false);
  });

  test('当类名包含部分匹配时应返回false', () => {
    const element = document.createElement('div');
    element.className = 'test-class-extra';
    expect(isHtmlElementHasClass(element, 'test-class')).toBe(false);
  });
}); 