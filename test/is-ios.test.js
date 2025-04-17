////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isIos from '../src/is-ios';

/**
 * 测试 isIos 函数的行为
 *
 * @author 胡海星
 */
describe('isIos', () => {
  // 保存原始的navigator对象
  const originalNavigator = global.navigator;

  // 在每个测试后恢复原始navigator
  afterEach(() => {
    global.navigator = originalNavigator;
  });

  it('应该正确识别iPhone设备', () => {
    // 模拟iPhone的user agent
    Object.defineProperty(global, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
      },
      writable: true,
    });

    expect(isIos()).toBe(true);
  });

  it('应该正确识别iPad设备', () => {
    // 模拟iPad的user agent
    Object.defineProperty(global, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
      },
      writable: true,
    });

    expect(isIos()).toBe(true);
  });

  it('对于安卓设备应返回false', () => {
    // 模拟安卓设备的user agent
    Object.defineProperty(global, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.127 Mobile Safari/537.36',
      },
      writable: true,
    });

    expect(isIos()).toBe(false);
  });

  it('对于桌面浏览器应返回false', () => {
    // 模拟桌面浏览器的user agent
    Object.defineProperty(global, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
      },
      writable: true,
    });

    expect(isIos()).toBe(false);
  });
});
