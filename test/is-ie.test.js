////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isIE from '../src/is-ie';

// 保存原始的navigator对象
const originalNavigator = window.navigator;

describe('isIE 函数测试', () => {
  afterEach(() => {
    // 恢复原始navigator对象
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      writable: true,
    });
  });

  it('当用户代理包含MSIE时应返回true', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
      },
      writable: true,
    });
    expect(isIE()).toBe(true);
  });

  it('当用户代理包含Trident/时应返回true', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
      },
      writable: true,
    });
    expect(isIE()).toBe(true);
  });

  it('当用户代理不包含MSIE或Trident/时应返回false', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      writable: true,
    });
    expect(isIE()).toBe(false);
  });
}); 