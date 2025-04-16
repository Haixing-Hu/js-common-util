////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isSafari from '../src/is-safari';

// 保存原始的navigator对象
const originalNavigator = window.navigator;

describe('isSafari 函数测试', () => {
  afterEach(() => {
    // 恢复原始navigator对象
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      writable: true,
    });
  });

  it('当vendor包含Apple且userAgent不包含CriOS和FxiOS时应返回true', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        vendor: 'Apple Computer, Inc.',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
      },
      writable: true,
    });
    expect(isSafari()).toBe(true);
  });

  it('当vendor不包含Apple时应返回false', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        vendor: 'Google Inc.',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      writable: true,
    });
    expect(isSafari()).toBe(false);
  });

  it('当userAgent包含CriOS时应返回false', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        vendor: 'Apple Computer, Inc.',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/91.0.4472.80 Mobile/15E148 Safari/604.1',
      },
      writable: true,
    });
    expect(isSafari()).toBe(false);
  });

  it('当userAgent包含FxiOS时应返回false', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        vendor: 'Apple Computer, Inc.',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/34.0 Mobile/15E148 Safari/605.1.15',
      },
      writable: true,
    });
    expect(isSafari()).toBe(false);
  });
}); 