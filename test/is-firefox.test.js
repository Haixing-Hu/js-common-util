////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * 单元测试 - isFirefox()函数
 *
 * @author 请替换为您的姓名
 */
import isFirefox from '../src/is-firefox';

/**
 * 模拟用户代理字符串
 * @param {string} userAgent - 要模拟的用户代理字符串
 */
function mockUserAgent(userAgent) {
  const originalUserAgent = window.navigator.userAgent;
  // 由于无法直接修改navigator.userAgent，我们使用Object.defineProperty模拟
  Object.defineProperty(window.navigator, 'userAgent', {
    get: () => userAgent,
    configurable: true,
  });
  return () => {
    // 返回恢复函数
    Object.defineProperty(window.navigator, 'userAgent', {
      get: () => originalUserAgent,
      configurable: true,
    });
  };
}

describe('isFirefox 函数测试', () => {
  test('当用户代理包含firefox时应返回true', () => {
    const restore = mockUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0');
    expect(isFirefox()).toBe(true);
    restore();
  });

  test('当用户代理包含Firefox(大写字母)时应返回true', () => {
    const restore = mockUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0');
    expect(isFirefox()).toBe(true);
    restore();
  });

  test('当用户代理不包含firefox时应返回false', () => {
    const restore = mockUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36');
    expect(isFirefox()).toBe(false);
    restore();
  });

  test('当用户代理为空时应返回false', () => {
    const restore = mockUserAgent('');
    expect(isFirefox()).toBe(false);
    restore();
  });
}); 