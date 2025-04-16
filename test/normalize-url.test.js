////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { getSearch, normalizeUrl, queryString } from '../src';
import getHash from '../src/get-hash';

/**
 * 单元测试 'normalizeUrl'
 *
 * @author 胡海星
 */
describe('normalizeUrl', () => {
  test('参数为字符串，querystring在hash后面', () => {
    const url = 'http://192.168.199.2:8081/#/?source=nanjing-bank&params=xxxx&value=zzz';
    const result = normalizeUrl(url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx&value=zzz';
    const result = normalizeUrl(url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#/finish/?source=nanjing-bank&params=xxxx&value=zzz';
    const result = normalizeUrl(url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash后面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#?source=nanjing-bank&params=xxxx&value=zzz';
    const result = normalizeUrl(url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash后面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish?source=nanjing-bank&params=xxxx&value=zzz';
    const result = normalizeUrl(url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/';
    const result = normalizeUrl(url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish/';
    const result = normalizeUrl(url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/finish/';
    const result = normalizeUrl(url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#';
    const result = normalizeUrl(url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish';
    const result = normalizeUrl(url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，没有hash，只有参数', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz';
    const result = normalizeUrl(url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，没有hash，没有参数', () => {
    const url = 'http://192.168.199.2:8081/';
    const result = normalizeUrl(url);
    expect(result).toBe('http://192.168.199.2:8081/');
  });

  test('参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾，querystring参数为URL编码', () => {
    const url = 'http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy';
    const result = normalizeUrl(url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy#finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.$value).toBe('zzz&yyy');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾，querystring参数为URL编码', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy#finish';
    const result = normalizeUrl(url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy#finish');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.$value).toBe('zzz&yyy');
  });
  test('参数为字符串，没有hash，只有querystring，querystring参数为URL编码', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy';
    const result = normalizeUrl(url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.$value).toBe('zzz&yyy');
  });
  test('参数为字符串，没有hash，没有querystring', () => {
    const url = 'http://192.168.199.2:8081/';
    const result = normalizeUrl(url);
    expect(result).toBe('http://192.168.199.2:8081/');
  });

  test('参数为字符串，没有hash，querystring参数值为空字符串，querystring参数为URL编码', () => {
    const url = 'http://192.168.199.2:8081/?%24value=';
    const result = normalizeUrl(url);
    expect(result).toBe('http://192.168.199.2:8081/?%24value=');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.$value).toBe('');
  });
  
  // 测试未传入参数时使用 window.location（覆盖第27行）
  test('未传入url参数时使用window.location', () => {
    // 保存原始window.location
    const originalLocation = window.location;
    
    // 模拟window.location
    delete window.location;
    window.location = new URL('http://example.com/path?query=value#hash');
    
    try {
      const result = normalizeUrl();
      expect(result).toBe('http://example.com/path?query=value#hash');
    } finally {
      // 恢复原始window.location
      window.location = originalLocation;
    }
  });
  
  // 测试传入非URL实例的情况（覆盖第28行）
  test('传入非URL实例时创建新的URL对象', () => {
    // 传入字符串URL，测试第28行
    const url = 'http://example.com/path?query=value#hash';
    const result = normalizeUrl(url);
    expect(result).toBe('http://example.com/path?query=value#hash');
    
    // 传入无效URL字符串，应该抛出错误
    expect(() => {
      normalizeUrl('invalid-url');
    }).toThrow();
    
    // 传入数字，应该抛出错误
    expect(() => {
      normalizeUrl(123);
    }).toThrow();
    
    // 传入null，应该抛出错误
    expect(() => {
      normalizeUrl(null);
    }).toThrow();
  });
  
  // 测试当search和hash都为null的情况
  test('当search和hash都为null时应该只返回base部分', () => {
    // 创建一个模拟的URL对象，它的search和hash方法将返回null
    const urlObj = new URL('http://example.com/path');
    
    // 模拟getSearch和getHash函数返回null
    const originalGetSearch = getSearch;
    const originalGetHash = getHash;
    
    // 替换为mock函数
    global.getSearch = jest.fn().mockReturnValue(null);
    global.getHash = jest.fn().mockReturnValue(null);
    
    try {
      const result = normalizeUrl(urlObj);
      expect(result).toBe('http://example.com/path');
    } finally {
      // 恢复原始函数
      global.getSearch = originalGetSearch;
      global.getHash = originalGetHash;
    }
  });
});
