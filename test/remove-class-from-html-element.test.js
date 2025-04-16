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
  
  // 测试同时移除多个类
  test('应该能同时移除多个类名', () => {
    const element = document.getElementById('test');
    removeClassFromHtmlElement(element, 'class1 class3');
    expect(element.className).toBe('class2');
  });
  
  test('移除包含空格的多个类名时应正确处理', () => {
    const element = document.getElementById('test');
    removeClassFromHtmlElement(element, 'class1  class3');
    expect(element.className).toBe('class2');
  });
  
  test('移除包含空字符串的多个类名时应正确处理', () => {
    const element = document.getElementById('test');
    removeClassFromHtmlElement(element, 'class1  class3');
    expect(element.className).toBe('class2');
  });
  
  // 测试不使用classList的情况
  test('当元素没有classList属性时应使用className', () => {
    const element = document.getElementById('test');
    // 模拟不支持classList的环境
    const originalClassList = element.classList;
    Object.defineProperty(element, 'classList', {
      value: undefined,
      configurable: true
    });
    
    removeClassFromHtmlElement(element, 'class2');
    expect(element.className).toBe('class1 class3');
    
    // 恢复classList
    Object.defineProperty(element, 'classList', {
      value: originalClassList,
      configurable: true
    });
  });
  
  test('当多次调用时没有classList属性应正确处理', () => {
    const element = document.getElementById('test');
    // 模拟不支持classList的环境
    const originalClassList = element.classList;
    Object.defineProperty(element, 'classList', {
      value: undefined,
      configurable: true
    });
    
    removeClassFromHtmlElement(element, 'class1 class3');
    expect(element.className).toBe('class2');
    
    // 恢复classList
    Object.defineProperty(element, 'classList', {
      value: originalClassList,
      configurable: true
    });
  });
  
  test('参数包含不存在和存在的类时应正确处理', () => {
    const element = document.getElementById('test');
    removeClassFromHtmlElement(element, 'class1 nonexistent');
    expect(element.className).toBe('class2 class3');
  });
  
  test('参数包含空字符串类名时应跳过', () => {
    const element = document.getElementById('test');
    removeClassFromHtmlElement(element, 'class1  ');
    expect(element.className).toBe('class2 class3');
  });
  
  // 针对行34的测试
  test('同时测试元素有classList和无classList两种情况', () => {
    // 创建新元素，确保每次测试使用单独的元素
    document.body.innerHTML = '<div id="test1" class="class1 class2 class3"></div>' +
                            '<div id="test2" class="class1 class2 class3"></div>';
    
    // 测试有classList的情况
    const elementWithClassList = document.getElementById('test1');
    removeClassFromHtmlElement(elementWithClassList, 'class2');
    expect(elementWithClassList.className).toBe('class1 class3');
    
    // 测试无classList的情况，使用不同的元素
    const elementWithoutClassList = document.getElementById('test2');
    const originalClassList = elementWithoutClassList.classList;
    
    Object.defineProperty(elementWithoutClassList, 'classList', {
      value: undefined,
      configurable: true
    });
    
    removeClassFromHtmlElement(elementWithoutClassList, 'class1');
    expect(elementWithoutClassList.className).toBe('class2 class3');
    
    // 恢复classList
    Object.defineProperty(elementWithoutClassList, 'classList', {
      value: originalClassList,
      configurable: true
    });
  });
  
  // 测试第45行的情况：元素的className为空且使用传统方式
  test('在fallback模式下，当元素的className为空字符串时应返回', () => {
    // 创建一个空类名的元素
    const element = document.createElement('div');
    element.className = '   '; // 只包含空格的类名
    
    // 禁用classList
    const originalClassList = element.classList;
    Object.defineProperty(element, 'classList', {
      value: undefined,
      configurable: true
    });
    
    // 应该正确处理空字符串情况
    removeClassFromHtmlElement(element, 'someClass');
    expect(element.className).toBe('   '); // 保持原样
    
    // 恢复classList
    Object.defineProperty(element, 'classList', {
      value: originalClassList,
      configurable: true
    });
  });
  
  // 专门测试第35-57行的覆盖范围
  test('测试fallback模式下的类名为空字符串不同情况', () => {
    // 创建一个空类名的元素
    const element = document.createElement('div');
    element.className = ''; // 完全空的类名
    
    // 禁用classList
    const originalClassList = element.classList;
    Object.defineProperty(element, 'classList', {
      value: undefined,
      configurable: true
    });
    
    // 尝试删除一个类，应该直接返回
    removeClassFromHtmlElement(element, 'someClass');
    expect(element.className).toBe(''); // 保持为空
    
    // 恢复classList
    Object.defineProperty(element, 'classList', {
      value: originalClassList,
      configurable: true
    });
  });
  
  // 测试在fallback模式下，当元素的类名包含要删除的类，但不在列表开头或结尾
  test('在fallback模式下，删除中间位置的类名', () => {
    const element = document.createElement('div');
    element.className = 'class1 class2 class3';
    
    // 禁用classList
    const originalClassList = element.classList;
    Object.defineProperty(element, 'classList', {
      value: undefined,
      configurable: true
    });
    
    removeClassFromHtmlElement(element, 'class2');
    expect(element.className).toBe('class1 class3');
    
    // 恢复classList
    Object.defineProperty(element, 'classList', {
      value: originalClassList,
      configurable: true
    });
  });
  
  // 直接从源码复制修改条件表达式来覆盖所有分支
  test('测试所有分支覆盖', () => {
    // 创建新元素，确保每次测试使用单独的元素
    document.body.innerHTML = '<div id="test1" class="class1 class2 class3"></div>' +
                            '<div id="test2" class="class1 class2 class3"></div>' +
                            '<div id="test3" class="class1 class2 class3"></div>';
    
    // 测试 if (!el || !cls) 的分支
    removeClassFromHtmlElement(undefined, 'class1'); // !el 为 true 的分支
    removeClassFromHtmlElement(document.getElementById('test1'), undefined); // !cls 为 true 的分支
    
    // 测试 if (!clsName) 的分支
    const element1 = document.getElementById('test1');
    removeClassFromHtmlElement(element1, ' '); // 产生空类名，会跳过
    
    // 测试 if (el.classList) 的分支
    const element2 = document.getElementById('test2');
    removeClassFromHtmlElement(element2, 'class1'); // el.classList 存在的分支
    
    // 测试 else if (isHtmlElementHasClass(el, clsName)) 的分支
    const element3 = document.getElementById('test3');
    const originalClassList = element3.classList;
    
    Object.defineProperty(element3, 'classList', {
      value: undefined,
      configurable: true
    });
    
    removeClassFromHtmlElement(element3, 'class2'); // classList不存在，但有类名的分支
    
    // 测试 if (!el.classList) 的分支
    expect(element3.className).toBe('class1 class3'); // 确认上一步操作结果
    
    // 恢复classList
    Object.defineProperty(element3, 'classList', {
      value: originalClassList,
      configurable: true
    });
  });
}); 