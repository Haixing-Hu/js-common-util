////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import fixScroll from '../src/fix-scroll';
import isIos from '../src/is-ios';

// Mock isIos function
jest.mock('../src/is-ios');

/**
 * 测试 fixScroll() 函数
 *
 * @author 胡海星
 */
describe('fixScroll', () => {
  let originalBodyOverflow;
  let originalBodyPosition;
  let originalBodyTop;
  let originalBodyWidth;
  let originalBodyHeight;
  let mockSetTimeout;

  beforeEach(() => {
    // 保存原始的body样式
    originalBodyOverflow = document.body.style.overflow;
    originalBodyPosition = document.body.style.position;
    originalBodyTop = document.body.style.top;
    originalBodyWidth = document.body.style.width;
    originalBodyHeight = document.body.style.height;

    // Mock setTimeout
    mockSetTimeout = jest.spyOn(window, 'setTimeout');
    mockSetTimeout.mockImplementation((callback) => {
      callback();
      return 1;
    });

    // Mock window.scrollTo
    window.scrollTo = jest.fn();

    // Mock document.body.scrollTop
    Object.defineProperty(document.body, 'scrollTop', {
      get: jest.fn().mockReturnValue(0),
      set: jest.fn(),
      configurable: true,
    });
  });

  afterEach(() => {
    // 恢复原始的body样式
    document.body.style.overflow = originalBodyOverflow;
    document.body.style.position = originalBodyPosition;
    document.body.style.top = originalBodyTop;
    document.body.style.width = originalBodyWidth;
    document.body.style.height = originalBodyHeight;

    // 清除mock
    mockSetTimeout.mockRestore();
    jest.clearAllMocks();
  });

  test('在iOS设备上应该调用window.scrollTo', () => {
    // 模拟iOS环境
    isIos.mockImplementation(() => true);

    fixScroll(true);

    // 验证是否调用了setTimeout
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 50);

    // 验证是否调用了window.scrollTo
    expect(window.scrollTo).toHaveBeenCalledWith(0, 1);
  });

  test('在非iOS设备上不应该调用window.scrollTo', () => {
    // 模拟非iOS环境
    isIos.mockImplementation(() => false);

    fixScroll(false);

    // 验证没有调用window.scrollTo
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  test('在iOS设备上当scrollTop >= 1时应该调用两次window.scrollTo', () => {
    // 模拟iOS环境
    isIos.mockImplementation(() => true);

    // 模拟scrollTop >= 1
    Object.defineProperty(document.body, 'scrollTop', {
      get: jest.fn().mockReturnValue(10),
      set: jest.fn(),
      configurable: true,
    });

    fixScroll(true);

    // 验证是否调用了setTimeout
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 50);

    // 验证是否调用了window.scrollTo两次
    expect(window.scrollTo).toHaveBeenCalledTimes(2);
    expect(window.scrollTo).toHaveBeenNthCalledWith(1, 0, 11);
    expect(window.scrollTo).toHaveBeenNthCalledWith(2, 0, 9);
  });
});
