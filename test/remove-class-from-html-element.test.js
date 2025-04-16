////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import removeClassFromHtmlElement from '../src/remove-class-from-html-element';

/**
 * 测试 removeClassFromHtmlElement() 函数
 *
 * @author 胡海星
 */
describe('removeClassFromHtmlElement', () => {
  beforeEach(() => {
    // 设置 document body
    document.body.innerHTML = '<div id="test" class="class1 class2 class3"></div>';
  });

  test('不传入元素时不应修改任何元素', () => {
    removeClassFromHtmlElement(undefined, 'class1');
    expect(document.getElementById('test').className).toBe('class1 class2 class3');
  });

  test('不传入类名时不应移除任何类', () => {
    const element = document.getElementById('test');
    removeClassFromHtmlElement(element, undefined);
    expect(element.className).toBe('class1 class2 class3');
  });

  test('传入空类名时不应移除任何类', () => {
    const element = document.getElementById('test');
    removeClassFromHtmlElement(element, '');
    expect(element.className).toBe('class1 class2 class3');
  });

  test('元素没有类名时不应有任何影响', () => {
    const element = document.createElement('div');
    removeClassFromHtmlElement(element, 'class1');
    expect(element.className).toBe('');
  });

  test('应该能正确移除类名', () => {
    const element = document.getElementById('test');
    removeClassFromHtmlElement(element, 'class2');
    expect(element.className).toBe('class1 class3');
  });

  test('移除不存在的类名时不应有任何影响', () => {
    const element = document.getElementById('test');
    removeClassFromHtmlElement(element, 'class4');
    expect(element.className).toBe('class1 class2 class3');
  });

  test('应该能移除第一个类名', () => {
    const element = document.getElementById('test');
    removeClassFromHtmlElement(element, 'class1');
    expect(element.className).toBe('class2 class3');
  });

  test('应该能移除最后一个类名', () => {
    const element = document.getElementById('test');
    removeClassFromHtmlElement(element, 'class3');
    expect(element.className).toBe('class1 class2');
  });

  test('移除元素唯一的类名后应为空', () => {
    const element = document.createElement('div');
    element.className = 'single-class';
    removeClassFromHtmlElement(element, 'single-class');
    expect(element.className).toBe('');
  });
}); 