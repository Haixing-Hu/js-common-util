////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import getParsedSearch from '../src/get-parsed-search';
import getSearchParam from '../src/get-search-param';

// 模拟 get-parsed-search 的实现
jest.mock('../src/get-parsed-search');

/**
 * 测试 getSearchParam 函数的行为
 *
 * @author 胡海星
 */
describe('getSearchParam', () => {
  beforeEach(() => {
    getParsedSearch.mockClear();
  });
  
  it('当参数存在时应返回相应的参数值', () => {
    // 设置模拟返回值
    getParsedSearch.mockReturnValue({
      foo: 'bar',
      test: '123',
    });
    
    const result = getSearchParam('foo');
    
    expect(getParsedSearch).toHaveBeenCalledWith(undefined);
    expect(result).toBe('bar');
  });
  
  it('当参数不存在时应返回null', () => {
    // 设置模拟返回值
    getParsedSearch.mockReturnValue({
      foo: 'bar',
    });
    
    const result = getSearchParam('notExist');
    
    expect(getParsedSearch).toHaveBeenCalledWith(undefined);
    expect(result).toBe(null);
  });
  
  it('当getParsedSearch返回undefined时应返回null', () => {
    // 设置模拟返回值
    getParsedSearch.mockReturnValue(undefined);
    
    const result = getSearchParam('foo');
    
    expect(getParsedSearch).toHaveBeenCalledWith(undefined);
    expect(result).toBe(null);
  });
  
  it('当getParsedSearch返回null时应返回null', () => {
    // 设置模拟返回值
    getParsedSearch.mockReturnValue(null);
    
    const result = getSearchParam('foo');
    
    expect(getParsedSearch).toHaveBeenCalledWith(undefined);
    expect(result).toBe(null);
  });
  
  it('当参数值为undefined时应返回null', () => {
    // 设置模拟返回值
    getParsedSearch.mockReturnValue({
      foo: undefined,
    });
    
    const result = getSearchParam('foo');
    
    expect(getParsedSearch).toHaveBeenCalledWith(undefined);
    expect(result).toBe(null);
  });
  
  it('当参数值为null时应返回null', () => {
    // 设置模拟返回值
    getParsedSearch.mockReturnValue({
      foo: null,
    });
    
    const result = getSearchParam('foo');
    
    expect(getParsedSearch).toHaveBeenCalledWith(undefined);
    expect(result).toBe(null);
  });
  
  it('应该正确传递url参数给getParsedSearch', () => {
    // 设置模拟返回值
    getParsedSearch.mockReturnValue({
      foo: 'bar',
    });
    
    const customUrl = 'https://example.com/path?foo=bar';
    const result = getSearchParam('foo', customUrl);
    
    expect(getParsedSearch).toHaveBeenCalledWith(customUrl);
    expect(result).toBe('bar');
  });
}); 