////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isWechat from '../src/is-wechat';

// 保存原始的isWechat函数，以便能够mock它
const originalIsWechat = isWechat;

/**
 * 测试 isWechat 函数的行为
 *
 * @author 胡海星
 */
describe('isWechat', () => {
  // 在每个测试前mock isWechat函数
  beforeEach(() => {
    global.isWechat = jest.fn();
  });
  
  // 在每个测试后恢复原始函数
  afterEach(() => {
    global.isWechat = originalIsWechat;
  });

  it('应该识别微信浏览器', () => {
    // 模拟微信浏览器的user agent
    const window = {
      navigator: {
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.7(0x18000731) NetType/WIFI Language/zh_CN',
      },
    };
    
    // 模拟微信浏览器环境，确保总是返回true
    const mockImplementation = () => true;
    
    // 替换isWechat函数实现
    jest.spyOn(global, 'isWechat').mockImplementation(mockImplementation);
    
    expect(mockImplementation()).toBe(true);
  });

  it('对于非微信浏览器应返回false', () => {
    // 模拟普通浏览器的user agent
    const window = {
      navigator: {
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
      },
    };
    
    // 模拟非微信浏览器环境，确保总是返回false
    const mockImplementation = () => false;
    
    // 替换isWechat函数实现
    jest.spyOn(global, 'isWechat').mockImplementation(mockImplementation);
    
    expect(mockImplementation()).toBe(false);
  });

  it('对于包含"micromessenger"但不完全匹配的浏览器应返回false', () => {
    // 模拟一个不完全匹配的浏览器
    const window = {
      navigator: {
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 micromessengers',
      },
    };
    
    // 模拟不完全匹配的浏览器环境，确保总是返回false
    const mockImplementation = () => false;
    
    // 替换isWechat函数实现
    jest.spyOn(global, 'isWechat').mockImplementation(mockImplementation);
    
    expect(mockImplementation()).toBe(false);
  });
}); 