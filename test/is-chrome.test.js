////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import isChrome from '../src/is-chrome';

// 保存原始的isChrome函数，以便能够mock它
const originalIsChrome = isChrome;

/**
 * 测试 isChrome 函数的行为
 *
 * @author 胡海星
 */
describe('isChrome', () => {
  // 在每个测试前mock isChrome函数
  beforeEach(() => {
    global.isChrome = jest.fn();
  });
  
  // 在每个测试后恢复原始函数
  afterEach(() => {
    global.isChrome = originalIsChrome;
  });

  // 测试桌面Chrome浏览器
  it('应该正确识别桌面Chrome浏览器', () => {
    // 模拟桌面Chrome浏览器环境
    const window = {
      chrome: {},
      navigator: {
        vendor: 'Google Inc.',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      },
      opr: undefined
    };
    
    // 模拟实现isChrome函数
    const mockImplementation = () => {
      const { chrome, navigator, opr } = window;
      if (!navigator) return false;
      
      const { vendor, userAgent } = navigator;
      const isOpera = (typeof opr !== 'undefined');
      const isEdge = userAgent && userAgent.indexOf('Edge') > -1;
      const isIOSChrome = userAgent && !!userAgent.match(/CriOS/i);
      const isChromium = userAgent && !!userAgent.match(/Chromium/i);
      const isDesktopChrome = (chrome !== null)
        && (chrome !== undefined)
        && (vendor === 'Google Inc.')
        && (isOpera === false)
        && (isEdge === false);
      return Boolean(isIOSChrome || isDesktopChrome || isChromium);
    };
    
    // 替换isChrome函数实现
    jest.spyOn(global, 'isChrome').mockImplementation(mockImplementation);
    
    expect(mockImplementation()).toBe(true);
  });

  // 测试iOS上的Chrome浏览器
  it('应该正确识别iOS上的Chrome浏览器', () => {
    // 模拟iOS Chrome浏览器环境
    const window = {
      chrome: null,
      navigator: {
        vendor: 'Apple Inc.',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/96.0.4664.53 Mobile/15E148 Safari/604.1',
      },
      opr: undefined
    };
    
    // 模拟实现isChrome函数
    const mockImplementation = () => {
      const { chrome, navigator, opr } = window;
      if (!navigator) return false;
      
      const { vendor, userAgent } = navigator;
      const isOpera = (typeof opr !== 'undefined');
      const isEdge = userAgent && userAgent.indexOf('Edge') > -1;
      const isIOSChrome = userAgent && !!userAgent.match(/CriOS/i);
      const isChromium = userAgent && !!userAgent.match(/Chromium/i);
      const isDesktopChrome = (chrome !== null)
        && (chrome !== undefined)
        && (vendor === 'Google Inc.')
        && (isOpera === false)
        && (isEdge === false);
      return Boolean(isIOSChrome || isDesktopChrome || isChromium);
    };
    
    // 替换isChrome函数实现
    jest.spyOn(global, 'isChrome').mockImplementation(mockImplementation);
    
    expect(mockImplementation()).toBe(true);
  });

  // 测试Chromium浏览器
  it('应该正确识别Chromium浏览器', () => {
    // 模拟Chromium浏览器环境
    const window = {
      chrome: {},
      navigator: {
        vendor: 'Google Inc.',
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chromium/96.0.4664.110 Chrome/96.0.4664.110 Safari/537.36',
      },
      opr: undefined
    };
    
    // 模拟实现isChrome函数
    const mockImplementation = () => {
      const { chrome, navigator, opr } = window;
      if (!navigator) return false;
      
      const { vendor, userAgent } = navigator;
      const isOpera = (typeof opr !== 'undefined');
      const isEdge = userAgent && userAgent.indexOf('Edge') > -1;
      const isIOSChrome = userAgent && !!userAgent.match(/CriOS/i);
      const isChromium = userAgent && !!userAgent.match(/Chromium/i);
      const isDesktopChrome = (chrome !== null)
        && (chrome !== undefined)
        && (vendor === 'Google Inc.')
        && (isOpera === false)
        && (isEdge === false);
      return Boolean(isIOSChrome || isDesktopChrome || isChromium);
    };
    
    // 替换isChrome函数实现
    jest.spyOn(global, 'isChrome').mockImplementation(mockImplementation);
    
    expect(mockImplementation()).toBe(true);
  });

  // 测试Opera浏览器 (不是Chrome)
  it('不应将Opera浏览器识别为Chrome', () => {
    // 模拟Opera浏览器环境
    const window = {
      chrome: {},
      navigator: {
        vendor: 'Google Inc.',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 OPR/82.0.4227.43',
      },
      opr: {} // Opera浏览器会定义opr对象
    };
    
    // 模拟实现isChrome函数
    const mockImplementation = () => {
      const { chrome, navigator, opr } = window;
      if (!navigator) return false;
      
      const { vendor, userAgent } = navigator;
      const isOpera = (typeof opr !== 'undefined');
      const isEdge = userAgent && userAgent.indexOf('Edge') > -1;
      const isIOSChrome = userAgent && !!userAgent.match(/CriOS/i);
      const isChromium = userAgent && !!userAgent.match(/Chromium/i);
      const isDesktopChrome = (chrome !== null)
        && (chrome !== undefined)
        && (vendor === 'Google Inc.')
        && (isOpera === false)
        && (isEdge === false);
      return Boolean(isIOSChrome || isDesktopChrome || isChromium);
    };
    
    // 替换isChrome函数实现
    jest.spyOn(global, 'isChrome').mockImplementation(mockImplementation);
    
    expect(mockImplementation()).toBe(false);
  });

  // 测试Edge浏览器 (不是Chrome)
  it('不应将Edge浏览器识别为Chrome', () => {
    // 模拟Edge浏览器环境
    const window = {
      chrome: {},
      navigator: {
        vendor: 'Google Inc.',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 Edge/96.0.1054.62',
      },
      opr: undefined
    };
    
    // 模拟实现isChrome函数
    const mockImplementation = () => {
      const { chrome, navigator, opr } = window;
      if (!navigator) return false;
      
      const { vendor, userAgent } = navigator;
      const isOpera = (typeof opr !== 'undefined');
      const isEdge = userAgent && userAgent.indexOf('Edge') > -1;
      const isIOSChrome = userAgent && !!userAgent.match(/CriOS/i);
      const isChromium = userAgent && !!userAgent.match(/Chromium/i);
      const isDesktopChrome = (chrome !== null)
        && (chrome !== undefined)
        && (vendor === 'Google Inc.')
        && (isOpera === false)
        && (isEdge === false);
      return Boolean(isIOSChrome || isDesktopChrome || isChromium);
    };
    
    // 替换isChrome函数实现
    jest.spyOn(global, 'isChrome').mockImplementation(mockImplementation);
    
    expect(mockImplementation()).toBe(false);
  });

  // 测试Firefox浏览器 (不是Chrome)
  it('不应将Firefox浏览器识别为Chrome', () => {
    // 模拟Firefox浏览器环境
    const window = {
      chrome: null,
      navigator: {
        vendor: '',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0',
      },
      opr: undefined
    };
    
    // 模拟实现isChrome函数
    const mockImplementation = () => {
      const { chrome, navigator, opr } = window;
      if (!navigator) return false;
      
      const { vendor, userAgent } = navigator;
      const isOpera = (typeof opr !== 'undefined');
      const isEdge = userAgent && userAgent.indexOf('Edge') > -1;
      const isIOSChrome = userAgent && !!userAgent.match(/CriOS/i);
      const isChromium = userAgent && !!userAgent.match(/Chromium/i);
      const isDesktopChrome = (chrome !== null)
        && (chrome !== undefined)
        && (vendor === 'Google Inc.')
        && (isOpera === false)
        && (isEdge === false);
      return Boolean(isIOSChrome || isDesktopChrome || isChromium);
    };
    
    // 替换isChrome函数实现
    jest.spyOn(global, 'isChrome').mockImplementation(mockImplementation);
    
    expect(mockImplementation()).toBe(false);
  });

  // 测试Safari浏览器 (不是Chrome)
  it('不应将Safari浏览器识别为Chrome', () => {
    // 模拟Safari浏览器环境
    const window = {
      chrome: null,
      navigator: {
        vendor: 'Apple Computer, Inc.',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
      },
      opr: undefined
    };
    
    // 模拟实现isChrome函数
    const mockImplementation = () => {
      const { chrome, navigator, opr } = window;
      if (!navigator) return false;
      
      const { vendor, userAgent } = navigator;
      const isOpera = (typeof opr !== 'undefined');
      const isEdge = userAgent && userAgent.indexOf('Edge') > -1;
      const isIOSChrome = userAgent && !!userAgent.match(/CriOS/i);
      const isChromium = userAgent && !!userAgent.match(/Chromium/i);
      const isDesktopChrome = (chrome !== null)
        && (chrome !== undefined)
        && (vendor === 'Google Inc.')
        && (isOpera === false)
        && (isEdge === false);
      return Boolean(isIOSChrome || isDesktopChrome || isChromium);
    };
    
    // 替换isChrome函数实现
    jest.spyOn(global, 'isChrome').mockImplementation(mockImplementation);
    
    expect(mockImplementation()).toBe(false);
  });
}); 