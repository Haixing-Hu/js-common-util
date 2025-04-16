////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import scrollTo from '../src/scroll-to';

/**
 * 测试 scrollTo 函数的行为
 *
 * @author 胡海星
 */
describe('scrollTo', () => {
  // 保存原始的DOM对象和函数
  let originalDocumentElement;
  let originalBody;
  let originalRequestAnimationFrame;
  let originalMath;
  
  beforeEach(() => {
    // 保存原始值
    originalDocumentElement = document.documentElement;
    originalBody = document.body;
    originalRequestAnimationFrame = window.requestAnimationFrame;
    originalMath = Object.assign({}, Math);
    
    // 模拟DOM元素
    const mockScrollableElement = {
      scrollTop: 0,
    };
    
    // 模拟document.documentElement和document.body
    Object.defineProperty(document, 'documentElement', {
      value: { ...mockScrollableElement },
      writable: true,
    });
    
    Object.defineProperty(document, 'body', {
      value: {
        scrollTop: 0,
        parentNode: { scrollTop: 0 },
      },
      writable: true,
    });
    
    // 模拟requestAnimationFrame
    window.requestAnimationFrame = jest.fn(callback => {
      // 立即执行callback以简化测试
      callback();
      return 0;
    });
    
    // 确保window.webkitRequestAnimationFrame和window.mozRequestAnimationFrame不存在
    window.webkitRequestAnimationFrame = undefined;
    window.mozRequestAnimationFrame = undefined;
    
    // 模拟Math.easeInOutQuad方法，返回线性值以简化测试
    Math.easeInOutQuad = jest.fn((t, b, c, d) => {
      // 使用线性插值以便于预测
      return b + (c * (t / d));
    });
  });
  
  afterEach(() => {
    // 恢复原始值
    Object.defineProperty(document, 'documentElement', {
      value: originalDocumentElement,
      writable: true,
    });
    
    Object.defineProperty(document, 'body', {
      value: originalBody,
      writable: true,
    });
    
    window.requestAnimationFrame = originalRequestAnimationFrame;
    
    // 恢复原始Math对象
    Object.keys(originalMath).forEach(key => {
      Math[key] = originalMath[key];
    });
  });
  
  it('应该滚动到指定位置', () => {
    // 设置初始滚动位置
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.body.parentNode.scrollTop = 0;
    
    // 调用scrollTo
    scrollTo(100, 500);
    
    // 由于我们的模拟使requestAnimationFrame立即执行callback并完成滚动
    // 所以我们期望滚动位置达到目标
    expect(document.documentElement.scrollTop).toBe(100);
    expect(document.body.scrollTop).toBe(100);
    expect(document.body.parentNode.scrollTop).toBe(100);
  });
  
  it('应该使用默认持续时间500ms', () => {
    // 设置初始滚动位置
    document.documentElement.scrollTop = 0;
    
    // 不指定持续时间调用scrollTo
    scrollTo(100);
    
    // 验证Math.easeInOutQuad被调用并使用了默认持续时间500
    expect(Math.easeInOutQuad).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.anything(), 500);
  });
  
  it('应该使用指定的持续时间', () => {
    // 设置初始滚动位置
    document.documentElement.scrollTop = 0;
    
    // 指定持续时间调用scrollTo
    scrollTo(100, 1000);
    
    // 验证Math.easeInOutQuad被调用并使用了指定持续时间1000
    expect(Math.easeInOutQuad).toHaveBeenCalledWith(expect.anything(), expect.anything(), expect.anything(), 1000);
  });
  
  it('滚动完成后应调用回调函数', () => {
    // 设置初始滚动位置
    document.documentElement.scrollTop = 0;
    
    // 创建模拟回调函数
    const mockCallback = jest.fn();
    
    // 调用scrollTo并传入回调
    scrollTo(100, 500, mockCallback);
    
    // 由于我们的模拟使所有动画立即完成，所以回调应该被调用
    expect(mockCallback).toHaveBeenCalled();
  });
  
  it('应该使用fallback定时器如果requestAnimationFrame不可用', () => {
    // 模拟setTimeout
    jest.useFakeTimers();
    
    // 移除requestAnimationFrame
    window.requestAnimationFrame = undefined;
    
    // 设置初始滚动位置
    document.documentElement.scrollTop = 0;
    
    // 创建一个spy来检查setTimeout是否被调用
    const spy = jest.spyOn(window, 'setTimeout');
    
    // 调用scrollTo
    scrollTo(100, 500);
    
    // 验证setTimeout被调用
    expect(spy).toHaveBeenCalled();
    
    // 恢复真实计时器
    jest.useRealTimers();
    spy.mockRestore();
  });
  
  it('应该使用webkitRequestAnimationFrame如果可用', () => {
    // 移除标准requestAnimationFrame
    window.requestAnimationFrame = undefined;
    
    // 添加webkit版本
    window.webkitRequestAnimationFrame = jest.fn(callback => {
      callback();
      return 0;
    });
    
    // 设置初始滚动位置
    document.documentElement.scrollTop = 0;
    
    // 调用scrollTo
    scrollTo(100, 500);
    
    // 验证webkitRequestAnimationFrame被调用
    expect(window.webkitRequestAnimationFrame).toHaveBeenCalled();
  });
  
  it('应该使用mozRequestAnimationFrame如果可用', () => {
    // 移除标准requestAnimationFrame和webkit版本
    window.requestAnimationFrame = undefined;
    window.webkitRequestAnimationFrame = undefined;
    
    // 添加moz版本
    window.mozRequestAnimationFrame = jest.fn(callback => {
      callback();
      return 0;
    });
    
    // 设置初始滚动位置
    document.documentElement.scrollTop = 0;
    
    // 调用scrollTo
    scrollTo(100, 500);
    
    // 验证mozRequestAnimationFrame被调用
    expect(window.mozRequestAnimationFrame).toHaveBeenCalled();
  });
}); 