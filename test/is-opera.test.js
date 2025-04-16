////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isOpera from '../src/is-opera';

// 保存原始的window对象状态
const originalNavigator = window.navigator;
const originalOpera = window.opera;
const originalOpr = window.opr;

describe('isOpera 函数测试', () => {
  afterEach(() => {
    // 恢复原始window对象状态
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      writable: true,
    });
    if (originalOpera === undefined) {
      delete window.opera;
    } else {
      window.opera = originalOpera;
    }
    if (originalOpr === undefined) {
      delete window.opr;
    } else {
      window.opr = originalOpr;
    }
  });

  it('当window.opera存在且userAgent包含Opera时应返回true', () => {
    window.opera = {};
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Opera/77.0.4054.277',
      },
      writable: true,
    });
    expect(isOpera()).toBe(true);
  });

  it('当window.opr存在且userAgent包含OPR/时应返回true', () => {
    window.opr = {};
    delete window.opera;
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 OPR/77.0.4054.277',
      },
      writable: true,
    });
    expect(isOpera()).toBe(true);
  });

  it('当window.opera存在但userAgent不包含Opera或OPR/时应返回false', () => {
    window.opera = {};
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      writable: true,
    });
    expect(isOpera()).toBe(false);
  });

  it('当window.opera不存在但userAgent包含Opera时应返回false', () => {
    delete window.opera;
    delete window.opr;
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Opera/77.0.4054.277',
      },
      writable: true,
    });
    expect(isOpera()).toBe(false);
  });
}); 