////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import loadScript from '../src/load-script';

/**
 * 测试 loadScript 函数的行为
 *
 * @author 胡海星
 */
describe('loadScript', () => {
  // 模拟DOM元素和方法
  let scriptMock;
  let appendChildSpy;
  let createElementSpy;
  let getElementsByTagNameSpy;
  let documentHeadOriginal;
  
  // 在每个测试前设置模拟
  beforeEach(() => {
    // 保存原始document.head
    documentHeadOriginal = document.head;
    
    // 清除之前的所有模拟
    jest.resetAllMocks();
    
    // 创建Script元素的模拟
    scriptMock = {
      setAttribute: jest.fn(),
      onload: null,
      onerror: null,
      async: false,
      src: '',
    };
    
    // 使用spy代替直接修改document对象
    createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue(scriptMock);
    appendChildSpy = jest.fn();
    
    // 模拟document.head
    const headMock = { appendChild: appendChildSpy };
    Object.defineProperty(document, 'head', {
      get: jest.fn(() => headMock),
      configurable: true,
    });
    
    // 模拟getElementsByTagName
    getElementsByTagNameSpy = jest.spyOn(document, 'getElementsByTagName')
      .mockReturnValue([{ appendChild: appendChildSpy }]);
  });
  
  // 在每个测试后恢复原始方法
  afterEach(() => {
    createElementSpy.mockRestore();
    getElementsByTagNameSpy.mockRestore();
    
    // 恢复原始document.head
    Object.defineProperty(document, 'head', {
      value: documentHeadOriginal,
      configurable: true,
      writable: true,
    });
  });
  
  it('应该创建一个script元素并添加到head中', () => {
    loadScript('https://example.com/script.js');
    
    // 检查是否正确创建了script元素
    expect(createElementSpy).toHaveBeenCalledWith('script');
    expect(scriptMock.async).toBe(true);
    expect(scriptMock.src).toBe('https://example.com/script.js');
    
    // 检查是否将script元素添加到了document.head
    expect(appendChildSpy).toHaveBeenCalledWith(scriptMock);
  });
  
  it('应该在成功加载后解析Promise', async () => {
    const promise = loadScript('https://example.com/script.js');
    
    // 模拟脚本加载成功
    scriptMock.onload();
    
    // 等待Promise解析
    const result = await promise;
    
    // 检查Promise的解析值
    expect(result).toBe(scriptMock);
  });
  
  it('应该在加载失败时拒绝Promise', async () => {
    const promise = loadScript('https://example.com/script.js');
    
    // 模拟脚本加载失败
    scriptMock.onerror();
    
    // 检查Promise是否被拒绝
    await expect(promise).rejects.toThrow('Failed to load https://example.com/script.js');
  });
  
  it('应该将提供的属性添加到script元素', () => {
    const attrs = {
      id: 'test-script',
      'data-test': 'true',
      type: 'text/javascript',
    };
    
    loadScript('https://example.com/script.js', attrs);
    
    // 检查是否正确添加了属性
    expect(scriptMock.setAttribute).toHaveBeenCalledWith('id', 'test-script');
    expect(scriptMock.setAttribute).toHaveBeenCalledWith('data-test', 'true');
    expect(scriptMock.setAttribute).toHaveBeenCalledWith('type', 'text/javascript');
  });
  
  it('应该将script元素添加到指定的父节点', () => {
    // 创建自定义父节点
    const customParent = {
      appendChild: jest.fn(),
    };
    
    loadScript('https://example.com/script.js', undefined, customParent);
    
    // 检查是否将script元素添加到了自定义父节点
    expect(customParent.appendChild).toHaveBeenCalledWith(scriptMock);
    
    // 检查是否没有使用document.head
    expect(appendChildSpy).not.toHaveBeenCalled();
  });
  
  it('应该在document.head不可用时使用getElementsByTagName', () => {
    // 修改document.head的模拟以返回null
    Object.defineProperty(document, 'head', {
      get: jest.fn(() => null),
      configurable: true,
    });
    
    loadScript('https://example.com/script.js');
    
    // 检查是否调用了getElementsByTagName
    expect(getElementsByTagNameSpy).toHaveBeenCalledWith('head');
    expect(appendChildSpy).toHaveBeenCalledWith(scriptMock);
  });
}); 