////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isAndroid from '../src/is-android';

// 保存原始的window.navigator
const originalNavigator = window.navigator;

describe('isAndroid', () => {
  afterEach(() => {
    // 测试后恢复原始navigator
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      writable: true,
    });
  });

  it('应该正确识别Android设备', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
      },
      writable: true,
    });
    expect(isAndroid()).toBe(true);
  });

  it('应该正确识别非Android设备', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
      },
      writable: true,
    });
    expect(isAndroid()).toBe(false);
  });

  it('Android但缺少Mozilla/5.0时应返回false', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Android 11; SM-G991B AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
      },
      writable: true,
    });
    expect(isAndroid()).toBe(false);
  });

  it('Android但缺少AppleWebKit时应返回false', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) Chrome/91.0.4472.120 Mobile Safari/537.36',
      },
      writable: true,
    });
    expect(isAndroid()).toBe(false);
  });
});
