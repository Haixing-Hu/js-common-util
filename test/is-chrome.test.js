////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isChrome from '../src/is-chrome';

// 保存原始的window对象属性
const originalWindow = { ...window };
const originalNavigator = window.navigator;
const originalChrome = window.chrome;

/**
 * 测试 isChrome 函数的行为
 *
 * @author 胡海星
 */
describe('isChrome', () => {
  afterEach(() => {
    // 恢复原始window对象属性
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      writable: true,
    });
    if (originalChrome) {
      window.chrome = originalChrome;
    } else {
      delete window.chrome;
    }
    if (originalWindow.opr) {
      window.opr = originalWindow.opr;
    } else {
      delete window.opr;
    }
  });

  // 测试桌面Chrome浏览器
  it('应该正确识别桌面Chrome浏览器', () => {
    window.chrome = {};
    Object.defineProperty(window, 'navigator', {
      value: {
        vendor: 'Google Inc.',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      writable: true,
    });
    delete window.opr;
    expect(isChrome()).toBe(true);
  });

  // 测试iOS上的Chrome浏览器
  it('应该正确识别iOS上的Chrome浏览器', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/91.0.4472.80 Mobile/15E148 Safari/604.1',
      },
      writable: true,
    });
    expect(isChrome()).toBe(true);
  });

  // 测试Chromium浏览器
  it('应该正确识别Chromium浏览器', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chromium/91.0.4472.77 Safari/537.36',
      },
      writable: true,
    });
    expect(isChrome()).toBe(true);
  });

  // 测试Opera浏览器 (不是Chrome)
  it('不应将Opera浏览器识别为Chrome', () => {
    window.opr = {};
    window.chrome = {};
    Object.defineProperty(window, 'navigator', {
      value: {
        vendor: 'Google Inc.',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 OPR/77.0.4054.277',
      },
      writable: true,
    });
    expect(isChrome()).toBe(false);
  });

  // 测试Edge浏览器 (不是Chrome)
  it('不应将Edge浏览器识别为Chrome', () => {
    window.chrome = {};
    Object.defineProperty(window, 'navigator', {
      value: {
        vendor: 'Google Inc.',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59',
      },
      writable: true,
    });
    expect(isChrome()).toBe(false);
  });

  // 测试Firefox浏览器 (不是Chrome)
  it('不应将Firefox浏览器识别为Chrome', () => {
    delete window.chrome;
    Object.defineProperty(window, 'navigator', {
      value: {
        vendor: '',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
      },
      writable: true,
    });
    expect(isChrome()).toBe(false);
  });

  // 测试Safari浏览器 (不是Chrome)
  it('不应将Safari浏览器识别为Chrome', () => {
    delete window.chrome;
    Object.defineProperty(window, 'navigator', {
      value: {
        vendor: 'Apple Computer, Inc.',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
      },
      writable: true,
    });
    expect(isChrome()).toBe(false);
  });

  // 测试window对象不存在的情况
  it('当window对象不存在时应该返回false', () => {
    // 保存原始的window
    const originalWindowRef = global.window;
    // 删除window对象
    delete global.window;
    expect(isChrome()).toBe(false);
    // 恢复window对象
    global.window = originalWindowRef;
  });

  // 测试navigator对象不存在的情况
  it('当navigator对象不存在时应该返回false', () => {
    // 设置navigator为undefined
    Object.defineProperty(window, 'navigator', {
      value: undefined,
      writable: true,
    });
    expect(isChrome()).toBe(false);
  });

  // 测试chrome对象为undefined的情况
  it('当chrome对象为undefined时正确处理', () => {
    delete window.chrome;
    Object.defineProperty(window, 'navigator', {
      value: {
        vendor: 'Google Inc.',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
      },
      writable: true,
    });
    expect(isChrome()).toBe(false);
  });
});
