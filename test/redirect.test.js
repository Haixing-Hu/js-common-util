////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import redirect from '../src/redirect';

/**
 * 测试 redirect 函数的行为
 *
 * @author 胡海星
 */
describe('redirect', () => {
  // 保存原始的location对象
  const originalLocation = global.window.location;

  // 模拟计时器
  beforeEach(() => {
    // 删除并重置window.location
    delete global.window.location;
    global.window.location = { href: '' };
    jest.useFakeTimers();
  });

  // 恢复原始location和计时器
  afterEach(() => {
    global.window.location = originalLocation;
    jest.useRealTimers();
  });

  it('应该返回一个Promise对象', () => {
    const result = redirect('https://example.com');
    expect(result).toBeInstanceOf(Promise);
  });

  it('应该在指定延迟后重定向到指定URL', async () => {
    // 调用redirect但不等待它完成
    const promise = redirect('https://example.com');

    // 检查地址是否尚未更改
    expect(window.location.href).toBe('');

    // 快进默认的300ms
    jest.advanceTimersByTime(300);

    // 确保Promise有时间解析
    await Promise.resolve();

    // 检查地址是否已更改
    expect(window.location.href).toBe('https://example.com');
  });

  it('Promise解析值应为重定向的URL', async () => {
    // 调用redirect并监听Promise解析值
    const resultPromise = redirect('https://example.com');

    // 执行所有待处理的计时器
    jest.runAllTimers();

    // 等待Promise解析
    const result = await resultPromise;

    // 检查Promise解析值
    expect(result).toBe('https://example.com');
  });

  it('应该使用传入的超时值而不是默认值', async () => {
    // 模拟redirect的实现，使用spy来检查setTimeout的调用参数
    const spy = jest.spyOn(global, 'setTimeout');

    // 调用redirect并使用自定义超时值500ms
    redirect('https://example.com', 500);

    // 验证setTimeout被调用并传入了正确的超时值
    expect(spy).toHaveBeenCalledWith(expect.any(Function), 500);

    // 恢复原始实现
    spy.mockRestore();
  });

  it('对于0超时值应使用默认超时', async () => {
    const DEFAULT_TIMEOUT = 300; // 默认超时值

    // 模拟redirect的实现，使用spy来检查setTimeout的调用参数
    const spy = jest.spyOn(global, 'setTimeout');

    // 使用0作为超时值
    redirect('https://example.com', 0);

    // 验证setTimeout被调用并传入了默认的超时值
    expect(spy).toHaveBeenCalledWith(expect.any(Function), DEFAULT_TIMEOUT);

    // 恢复原始实现
    spy.mockRestore();
  });
});
