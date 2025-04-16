////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { getHash } from '../src';

/**
 * 单元测试 'getHash'
 *
 * @author 胡海星
 */
describe('getHash', () => {
  test('参数为字符串，querystring在hash后面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#/?source=nanjing-bank&params=xxxx';
    expect(getHash(url))
      .toBe('/');
  });
  test('参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx';
    expect(getHash(url))
      .toBe('finish/');
  });
  test('参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#/finish/?source=nanjing-bank&params=xxxx';
    expect(getHash(url))
      .toBe('/finish/');
  });
  test('参数为字符串，querystring在hash后面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#?source=nanjing-bank&params=xxxx';
    expect(getHash(url))
      .toBe('');
  });
  test('参数为字符串，querystring在hash后面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish?source=nanjing-bank&params=xxxx';
    expect(getHash(url))
      .toBe('finish');
  });
  test('参数为字符串，querystring在hash前面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#/';
    expect(getHash(url))
      .toBe('/');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#finish/';
    expect(getHash(url))
      .toBe('finish/');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#/finish/';
    expect(getHash(url))
      .toBe('/finish/');
  });
  test('参数为字符串，querystring在hash前面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#';
    expect(getHash(url))
      .toBe('');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#finish';
    expect(getHash(url))
      .toBe('finish');
  });
  test('参数为字符串，没有hash，只有参数', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx';
    expect(getHash(url))
      .toBe(null);
  });
  test('参数为字符串，没有hash，没有参数', () => {
    const url = 'http://192.168.199.2:8081/';
    expect(getHash(url))
      .toBe(null);
  });

  test('参数为URL对象，querystring在hash后面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/#/?source=nanjing-bank&params=xxxx');
    expect(getHash(url))
      .toBe('/');
  });
  test('参数为URL对象，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx');
    expect(getHash(url))
      .toBe('finish/');
  });
  test('参数为URL对象，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/#/finish/?source=nanjing-bank&params=xxxx');
    expect(getHash(url))
      .toBe('/finish/');
  });
  test('参数为URL对象，querystring在hash后面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/#?source=nanjing-bank&params=xxxx');
    expect(getHash(url))
      .toBe('');
  });
  test('参数为URL对象，querystring在hash后面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/#finish?source=nanjing-bank&params=xxxx');
    expect(getHash(url))
      .toBe('finish');
  });
  test('参数为URL对象，querystring在hash前面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#/');
    expect(getHash(url))
      .toBe('/');
  });
  test('参数为URL对象，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#finish/');
    expect(getHash(url))
      .toBe('finish/');
  });
  test('参数为URL对象，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#/finish/');
    expect(getHash(url))
      .toBe('/finish/');
  });
  test('参数为URL对象，querystring在hash前面，hash为空URL对象，hash不以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#');
    expect(getHash(url))
      .toBe('');
  });
  test('参数为URL对象，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#finish');
    expect(getHash(url))
      .toBe('finish');
  });
  test('参数为URL对象，没有hash，只有参数', () => {
    const url = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx');
    expect(getHash(url))
      .toBe(null);
  });
  test('参数为URL对象，没有hash，没有参数', () => {
    const url = new URL('http://192.168.199.2:8081/');
    expect(getHash(url))
      .toBe(null);
  });
  
  // 测试无效URL的情况（覆盖第26行）
  test('参数为无效URL', () => {
    // 在jsdom环境中模拟window.location
    const originalWindowLocation = window.location;
    delete window.location;
    window.location = new URL('http://example.com/#test');
    
    try {
      // 传入一个无效的URL
      const result = getHash('invalid-url');
      expect(result).toBe('test');
    } finally {
      // 恢复原始的window.location
      window.location = originalWindowLocation;
    }
  });
  
  // 测试URL为null的情况（覆盖第38行）
  test('URL为null时返回null', () => {
    // 在jsdom环境中模拟window.location
    const originalWindowLocation = window.location;
    delete window.location;
    window.location = null;
    
    try {
      const result = getHash();
      expect(result).toBe(null);
    } finally {
      // 恢复原始的window.location
      window.location = originalWindowLocation;
    }
  });
  
  // 特殊情况：URL以#结尾（覆盖第38行另一个分支）
  test('URL以#结尾但没有hash内容时返回空字符串', () => {
    const url = 'http://www.baidu.com/?source=xxx#';
    expect(getHash(url)).toBe('');
  });
});
