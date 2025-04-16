////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { getSearch, removeSearchParam, queryString } from '../src';

/**
 * 单元测试 'removeSearchParam'
 *
 * @author 胡海星
 */
describe('removeSearchParam', () => {
  test('参数为字符串，querystring在hash后面', () => {
    const url = 'http://192.168.199.2:8081/#/?source=nanjing-bank&params=xxxx';
    const result = removeSearchParam('source', url);
    expect(result).toBe('http://192.168.199.2:8081/?params=xxxx#/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBeUndefined();
    expect(args.params).toBe('xxxx');
  });
  test('参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx&value=zzz';
    const result = removeSearchParam('source', url);
    expect(result).toBe('http://192.168.199.2:8081/?params=xxxx&value=zzz#finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBeUndefined();
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#/finish/?value=zzz&source=nanjing-bank&params=xxxx';
    const result = removeSearchParam('source', url);
    expect(result).toBe('http://192.168.199.2:8081/?params=xxxx&value=zzz#/finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBeUndefined();
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash后面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#?source=nanjing-bank&params=xxxx&value=zzz';
    const result = removeSearchParam('source', url);
    expect(result).toBe('http://192.168.199.2:8081/?params=xxxx&value=zzz#');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBeUndefined();
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash后面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish?source=nanjing-bank&value=zzz&params=xxxx';
    const result = removeSearchParam('source', url);
    expect(result).toBe('http://192.168.199.2:8081/?params=xxxx&value=zzz#finish');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBeUndefined();
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&value=zzz&params=xxxx#/';
    const result = removeSearchParam('source', url);
    expect(result).toBe('http://192.168.199.2:8081/?params=xxxx&value=zzz#/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBeUndefined();
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&value=zzz&params=xxxx#finish/';
    const result = removeSearchParam('source', url);
    expect(result).toBe('http://192.168.199.2:8081/?params=xxxx&value=zzz#finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBeUndefined();
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&source=value2&value=zzz&params=xxxx#/finish/';
    const result = removeSearchParam('source', url);
    expect(result).toBe('http://192.168.199.2:8081/?params=xxxx&value=zzz#/finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBeUndefined();
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=&value&params=xxxx#';
    const result = removeSearchParam('source', url);
    expect(result).toBe('http://192.168.199.2:8081/?params=xxxx&value#');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBeUndefined();
    expect(args.params).toBe('xxxx');
    expect(args.value).toBeNull();
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source&value=v1&params=xxxx&value=v2#finish';
    const result = removeSearchParam('source', url);
    expect(result).toBe('http://192.168.199.2:8081/?params=xxxx&value=v1&value=v2#finish');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBeUndefined();
    expect(args.params).toBe('xxxx');
    expect(args.value).toBeArray();
    expect(args.value).toEqual(['v1', 'v2']);
  });
  test('参数为字符串，没有hash，只有参数', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&%24value=zzz%26yyy&params=xxxx';
    const result = removeSearchParam('source', url);
    expect(result).toBe('http://192.168.199.2:8081/?%24value=zzz%26yyy&params=xxxx');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBeUndefined();
    expect(args.params).toBe('xxxx');
    expect(args.$value).toBe('zzz&yyy');
  });
  test('参数为字符串，没有hash，没有参数', () => {
    const url = 'http://192.168.199.2:8081/';
    const result = removeSearchParam('source', url);
    expect(result).toBe('http://192.168.199.2:8081/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBeUndefined();
    expect(args.value).toBeUndefined();
  });
  test('bug', () => {
    const url = 'https://stage.njzhyl.cn/iot-box-nurse-v2/#/bind/device/trigger?udid=1c8688fe-8d8e-bbd0-588a-669addf9cba1';
    const result = removeSearchParam('code', url);
    expect(result).toBe('https://stage.njzhyl.cn/iot-box-nurse-v2/?udid=1c8688fe-8d8e-bbd0-588a-669addf9cba1#/bind/device/trigger');
  });
  it('参数为URL实例', () => {
    const urlObj = new URL('http://example.com?param1=value1&param2=value2#hash');
    const result = removeSearchParam('param1', urlObj);
    expect(result).toBe('http://example.com/?param2=value2#hash');
  });
  
  it('没有查询参数的URL', () => {
    const url = 'http://example.com#hash';
    const result = removeSearchParam('nonExistentParam', url);
    expect(result).toBe('http://example.com/#hash');
  });
  
  it('search为null的情况', () => {
    // 通过测试getSearch返回null的情况
    const url = 'http://example.com';
    const result = removeSearchParam('anyParam', url);
    expect(result).toBe('http://example.com/');
  });

  it('空的查询字符串', () => {
    // 确保当search是空字符串时的情况也被测试
    const url = 'http://example.com?';
    const result = removeSearchParam('anyParam', url);
    expect(result).toBe('http://example.com/');
  });
  
  // 测试当没有提供url参数时使用window.location（覆盖第30行）
  it('未提供url参数时应使用window.location', () => {
    // 保存原始window.location
    const originalLocation = window.location;
    
    // 模拟window.location
    delete window.location;
    window.location = new URL('http://example.com/path?param=value#hash');
    
    try {
      const result = removeSearchParam('param');
      // URL中可能有一个空的查询字符串（包含一个问号），这也是合法的
      expect(result).toBe('http://example.com/path?#hash');
    } finally {
      // 恢复原始window.location
      window.location = originalLocation;
    }
  });
  
  // 测试当尝试删除不存在的参数时的情况
  it('当尝试删除不存在的参数时应保持query string不变', () => {
    const url = 'http://example.com/path?param1=value1&param2=value2';
    const result = removeSearchParam('param3', url);
    expect(result).toBe('http://example.com/path?param1=value1&param2=value2');
  });
});
