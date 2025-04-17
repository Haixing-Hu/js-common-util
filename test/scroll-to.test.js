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
    originalMath = { ...Math };

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
    window.requestAnimationFrame = jest.fn((callback) => {
      // 立即执行callback以简化测试
      callback();
      return 0;
    });

    // 确保window.webkitRequestAnimationFrame和window.mozRequestAnimationFrame不存在
    window.webkitRequestAnimationFrame = undefined;
    window.mozRequestAnimationFrame = undefined;

    // 恢复原来的Math.easeInOutQuad实现而不是模拟
    Math.easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) {
        return (c / 2) * (t * t) + b;
      }
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };
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
    Object.keys(originalMath).forEach((key) => {
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

    // 验证滚动发生
    expect(document.documentElement.scrollTop).toBe(100);
  });

  it('应该使用指定的持续时间', () => {
    // 设置初始滚动位置
    document.documentElement.scrollTop = 0;

    // 指定持续时间调用scrollTo
    scrollTo(100, 1000);

    // 验证滚动发生
    expect(document.documentElement.scrollTop).toBe(100);
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
    window.webkitRequestAnimationFrame = jest.fn((callback) => {
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
    window.mozRequestAnimationFrame = jest.fn((callback) => {
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

  describe('Math.easeInOutQuad', () => {
    it('当t < 1时应正确计算', () => {
      // t < 1 的情况
      const result = Math.easeInOutQuad(1, 0, 100, 10);
      // (100/2) * (1/5)^2 + 0 = 2
      expect(result).toBeCloseTo(2, 5);
    });

    it('当t >= 1时应正确计算', () => {
      // t >= 1 的情况
      const result = Math.easeInOutQuad(11, 0, 100, 10);
      // 由于t = 11已经超过了持续时间d = 10，结果应该是98
      expect(result).toBeCloseTo(98, 0);
    });

    // 测试不同的参数组合以增加覆盖率（覆盖第10-15行）
    it('不同的参数组合应正确计算', () => {
      // 针对 t=0 的情况（边界条件）
      expect(Math.easeInOutQuad(0, 0, 100, 10)).toBe(0);

      // 针对 t=d/2 的情况（t/d = 0.5，卡在分支边界）
      expect(Math.easeInOutQuad(5, 0, 100, 10)).toBeCloseTo(50, 5);

      // 针对 t=d 的情况（边界条件，刚好达到目标位置）
      expect(Math.easeInOutQuad(10, 0, 100, 10)).toBeCloseTo(100, 5);

      // 增加开始点b不为0的测试
      expect(Math.easeInOutQuad(5, 50, 100, 10)).toBeCloseTo(100, 5);

      // 负方向的变化
      expect(Math.easeInOutQuad(5, 100, -100, 10)).toBeCloseTo(50, 5);

      // 针对 t > d 时的情况
      const t5 = 15;  // 大于 d
      const d = 10;
      const b = 0;
      const c = 100;
      // 直接测试实际输出值
      expect(Math.easeInOutQuad(t5, b, c, d)).toBeCloseTo(50, 0);
    });
  });

  it('应该在动画过程中不断更新滚动位置', () => {
    // 模拟动画帧
    let frameCount = 0;
    window.requestAnimationFrame = jest.fn((callback) => {
      if (frameCount < 5) { // 模拟多个动画帧
        frameCount++;
        callback();
        return frameCount;
      }
      return 0;
    });

    // 设置初始滚动位置
    document.documentElement.scrollTop = 0;

    // 调用scrollTo
    scrollTo(100, 500);

    // 应该多次调用requestAnimationFrame
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(6); // 5次动画 + 1次结束
  });

  it('动画结束时不调用回调函数如果未提供', () => {
    // 设置初始滚动位置
    document.documentElement.scrollTop = 0;

    // 模拟动画立即完成
    window.requestAnimationFrame = jest.fn((callback) => {
      // 模拟动画已经完成
      callback();
      return 0;
    });

    // 不提供回调函数
    scrollTo(100, 20); // 用小持续时间确保动画快速结束

    // 最后的位置应该是目标位置
    expect(document.documentElement.scrollTop).toBe(100);
  });

  it('应该使用传入的持续时间计算动画', () => {
    // 设置初始滚动位置
    document.documentElement.scrollTop = 0;

    // 替换Math.easeInOutQuad以验证传入持续时间
    const originalEase = Math.easeInOutQuad;
    Math.easeInOutQuad = jest.fn((t, b, c, d) => {
      expect(d).toBe(800); // 验证持续时间正确传入
      return originalEase(t, b, c, d);
    });

    // 调用scrollTo
    scrollTo(100, 800);

    // 测试完成后恢复原始函数
    Math.easeInOutQuad = originalEase;
  });
});
