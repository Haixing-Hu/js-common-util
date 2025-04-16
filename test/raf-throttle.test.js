////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import rafThrottle from '../src/raf-throttle';

/**
 * 测试 rafThrottle() 函数
 *
 * @author 胡海星
 */
describe('rafThrottle', () => {
  // 模拟 window.requestAnimationFrame
  const originalRequestAnimationFrame = window.requestAnimationFrame;
  
  beforeEach(() => {
    // 在每个测试之前，使用 jest.fn() 替换 requestAnimationFrame
    window.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 0));
  });
  
  afterEach(() => {
    // 在每个测试之后，恢复原始的 requestAnimationFrame
    window.requestAnimationFrame = originalRequestAnimationFrame;
    jest.clearAllMocks();
  });
  
  test('应该创建一个函数', () => {
    const fn = jest.fn();
    const throttled = rafThrottle(fn);
    
    expect(typeof throttled).toBe('function');
  });
  
  test('节流函数应该在动画帧中执行原始函数', async () => {
    const fn = jest.fn();
    const throttled = rafThrottle(fn);
    
    throttled();
    
    // 在调用之后，函数不应该立即执行
    expect(fn).not.toHaveBeenCalled();
    
    // 等待下一个动画帧
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // 函数应该在下一个动画帧中被调用
    expect(fn).toHaveBeenCalledTimes(1);
  });
  
  test('多次调用节流函数应该只执行一次原始函数', async () => {
    const fn = jest.fn();
    const throttled = rafThrottle(fn);
    
    // 连续多次调用节流函数
    throttled();
    throttled();
    throttled();
    
    // 等待下一个动画帧
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // 原始函数应该只被调用一次
    expect(fn).toHaveBeenCalledTimes(1);
  });
  
  test('节流函数应该正确传递参数', async () => {
    const fn = jest.fn();
    const throttled = rafThrottle(fn);
    const arg1 = 'test';
    const arg2 = { key: 'value' };
    
    throttled(arg1, arg2);
    
    // 等待下一个动画帧
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // 验证参数是否正确传递
    expect(fn).toHaveBeenCalledWith(arg1, arg2);
  });
  
  test('节流函数应该保持正确的this上下文', async () => {
    const context = { name: 'test-context' };
    const fn = jest.fn(function() {
      expect(this).toBe(context);
    });
    const throttled = rafThrottle(fn);
    
    // 使用call绑定上下文
    throttled.call(context);
    
    // 等待下一个动画帧
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // 确保函数被调用
    expect(fn).toHaveBeenCalledTimes(1);
  });
  
  test('在动画帧执行后应该能够再次调用', async () => {
    const fn = jest.fn();
    const throttled = rafThrottle(fn);
    
    // 第一次调用
    throttled();
    
    // 等待第一个动画帧
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // 第二次调用
    throttled();
    
    // 等待第二个动画帧
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // 函数应该被调用两次
    expect(fn).toHaveBeenCalledTimes(2);
  });
  
  test('连续多次调用应该在各自的动画帧中分别执行', async () => {
    const fn = jest.fn();
    const throttled = rafThrottle(fn);
    
    // 第一次调用
    throttled('first');
    
    // 等待第一个动画帧
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // 检查第一次调用
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith('first');
    
    // 第二次调用
    throttled('second');
    
    // 等待第二个动画帧
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // 检查第二次调用
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith('second');
  });
}); 