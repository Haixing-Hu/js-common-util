////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isMyNanjingApp from '../src/is-my-nanjing-app';

describe('isMyNanjingApp 函数测试', () => {
  // 保存原始的window.auth状态
  const originalAuth = window.auth;

  afterEach(() => {
    // 恢复原始window.auth状态
    if (originalAuth === undefined) {
      delete window.auth;
    } else {
      window.auth = originalAuth;
    }
  });

  it('当window.auth存在时应返回true', () => {
    // 设置window.auth为一个对象模拟我的南京App环境
    window.auth = {};
    expect(isMyNanjingApp()).toBe(true);
  });

  it('当window.auth不存在时应返回false', () => {
    // 确保window.auth不存在
    delete window.auth;
    expect(isMyNanjingApp()).toBe(false);
  });
});
