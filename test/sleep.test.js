////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import sleep from '../src/sleep';

/**
 * 测试 sleep 函数的行为
 *
 * @author 胡海星
 */
describe('sleep', () => {
  // 模拟计时器
  beforeEach(() => {
    jest.useFakeTimers();
  });

  // 恢复真实的计时器
  afterEach(() => {
    jest.useRealTimers();
  });

  it('应该返回一个Promise对象', () => {
    const result = sleep(100);
    expect(result).toBeInstanceOf(Promise);
  });

  it('应该暂停指定的毫秒数', async () => {
    // 创建模拟函数
    const mockFn = jest.fn();

    // 调用sleep但不等待它完成
    const promise = sleep(500).then(mockFn);

    // 确认模拟函数尚未被调用
    expect(mockFn).not.toHaveBeenCalled();

    // 快进100毫秒
    jest.advanceTimersByTime(100);

    // 确认模拟函数仍未被调用
    expect(mockFn).not.toHaveBeenCalled();

    // 快进剩余的400毫秒
    jest.advanceTimersByTime(400);

    // 执行所有待处理的Promise
    jest.runAllTimers();
    await Promise.resolve();
    await Promise.resolve();

    // 确认模拟函数现在已被调用
    expect(mockFn).toHaveBeenCalled();
  });

  it('对于0毫秒应立即解析Promise', async () => {
    const mockFn = jest.fn();
    const promise = sleep(0).then(mockFn);

    // 确认模拟函数尚未被调用
    expect(mockFn).not.toHaveBeenCalled();

    // 执行所有待处理的计时器
    jest.runAllTimers();
    await Promise.resolve();
    await Promise.resolve();

    // 确认模拟函数已被调用
    expect(mockFn).toHaveBeenCalled();
  });

  it('对于负数毫秒应当作0处理', async () => {
    const mockFn = jest.fn();
    const promise = sleep(-100).then(mockFn);

    // 确认模拟函数尚未被调用
    expect(mockFn).not.toHaveBeenCalled();

    // 执行所有待处理的计时器
    jest.runAllTimers();
    await Promise.resolve();
    await Promise.resolve();

    // 确认模拟函数已被调用
    expect(mockFn).toHaveBeenCalled();
  });
});
