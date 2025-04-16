////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import addClassToHtmlElement from '../src/add-class-to-html-element';

/**
 * 测试 addClassToHtmlElement() 函数
 *
 * @author 胡海星
 */
describe('addClassToHtmlElement', () => {
  beforeEach(() => {
    // 设置 document body
    document.body.innerHTML = '<div id="test"></div>';
  });

  test('不传入元素时不应修改任何元素', () => {
    addClassToHtmlElement(undefined, 'test-class');
    expect(document.getElementById('test').className).toBe('');
  });

  test('不传入类名时不应添加任何类', () => {
    const element = document.getElementById('test');
    addClassToHtmlElement(element, undefined);
    expect(element.className).toBe('');
  });

  test('传入空类名时不应添加任何类', () => {
    const element = document.getElementById('test');
    addClassToHtmlElement(element, '');
    expect(element.className).toBe('');
  });

  test('应该能正确添加类名', () => {
    const element = document.getElementById('test');
    addClassToHtmlElement(element, 'test-class');
    expect(element.className).toBe('test-class');
  });

  test('已有的类名不应重复添加', () => {
    const element = document.getElementById('test');
    element.className = 'existing-class';
    addClassToHtmlElement(element, 'existing-class');
    expect(element.className).toBe('existing-class');
  });

  test('应该能添加多个类名', () => {
    const element = document.getElementById('test');
    element.className = 'existing-class';
    addClassToHtmlElement(element, 'test-class');
    expect(element.className).toBe('existing-class test-class');
  });
}); 