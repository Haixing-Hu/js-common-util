////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isEdge from '../src/is-edge';

// 保存原始的navigator对象
const originalNavigator = window.navigator;

describe('isEdge 函数测试', () => {
  afterEach(() => {
    // 恢复原始navigator对象
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      writable: true,
    });
  });

  it('当用户代理包含Edge/时应返回true', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299',
      },
      writable: true,
    });
    expect(isEdge()).toBe(true);
  });

  it('当用户代理不包含Edge/时应返回false', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      writable: true,
    });
    expect(isEdge()).toBe(false);
  });

  it('当用户代理包含Edg/而不是Edge/时应返回false', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59',
      },
      writable: true,
    });
    expect(isEdge()).toBe(false);
  });
}); 