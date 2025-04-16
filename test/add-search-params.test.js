////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { getSearch, addSearchParams, queryString } from '../src';

/**
 * 单元测试 'addSearchParam'
 *
 * @author 胡海星
 */
describe('addSearchParam', () => {
  test('参数为字符串，querystring在hash后面', () => {
    const url = 'http://192.168.199.2:8081/#/?source=nanjing-bank&params=xxxx';
    const result = addSearchParams({ value: 'zzz' }, url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx';
    const result = addSearchParams({ value: 'zzz' }, url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#/finish/?source=nanjing-bank&params=xxxx';
    const result = addSearchParams({ value: 'zzz' }, url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash后面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#?source=nanjing-bank&params=xxxx';
    const result = addSearchParams({ value: 'zzz' }, url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash后面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish?source=nanjing-bank&params=xxxx';
    const result = addSearchParams({ value: 'zzz' }, url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#/';
    const result = addSearchParams({ value: 'zzz' }, url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#finish/';
    const result = addSearchParams({ value: 'zzz' }, url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#/finish/';
    const result = addSearchParams({ value: 'zzz' }, url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#';
    const result = addSearchParams({ value: 'zzz' }, url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#finish';
    const result = addSearchParams({ value: 'zzz' }, url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，没有hash，只有参数', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx';
    const result = addSearchParams({ value: 'zzz' }, url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，没有hash，没有参数', () => {
    const url = 'http://192.168.199.2:8081/';
    const result = addSearchParams({ value: 'zzz' }, url);
    expect(result).toBe('http://192.168.199.2:8081/?value=zzz');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.value).toBe('zzz');
  });

  test('参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾，需要URL编码新参数和值', () => {
    const url = 'http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx';
    const result = addSearchParams({ $value: 'zzz&yyy' }, url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy#finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.$value).toBe('zzz&yyy');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾，需要URL编码新参数和值', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#finish';
    const result = addSearchParams({ $value: 'zzz&yyy' }, url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy#finish');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.$value).toBe('zzz&yyy');
  });
  test('参数为字符串，没有hash，只有参数，需要URL编码新参数和值', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx';
    const result = addSearchParams({ $value: 'zzz&yyy' }, url);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.$value).toBe('zzz&yyy');
  });
  test('参数为字符串，没有hash，没有参数，需要URL编码新参数和值', () => {
    const url = 'http://192.168.199.2:8081/';
    const result = addSearchParams({ $value: 'zzz&yyy' }, url);
    expect(result).toBe('http://192.168.199.2:8081/?%24value=zzz%26yyy');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.$value).toBe('zzz&yyy');
  });

  test('参数为字符串，没有hash，没有参数，新参数值为空字符串', () => {
    const url = 'http://192.168.199.2:8081/';
    const result = addSearchParams({ $value: '' }, url);
    expect(result).toBe('http://192.168.199.2:8081/?%24value=');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.$value).toBe('');
  });
  
  test('参数为URL对象', () => {
    const urlObj = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx');
    const result = addSearchParams({ value: 'zzz' }, urlObj);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  
  test('参数为URL对象，有hash值', () => {
    const urlObj = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#finish');
    const result = addSearchParams({ value: 'zzz' }, urlObj);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  
  test('url参数为undefined', () => {
    // 备份并模拟window.location
    const originalLocation = window.location;
    delete window.location;
    window.location = {
      origin: 'http://192.168.199.2:8081',
      pathname: '/',
      hash: '',
      search: '?source=nanjing-bank'
    };
    
    const result = addSearchParams({ value: 'zzz' }, undefined);
    expect(result).toBe('http://192.168.199.2:8081/?source=nanjing-bank&value=zzz');
    
    // 恢复window.location
    window.location = originalLocation;
  });
  
  test('hash为null的情况', () => {
    const url = 'http://192.168.199.2:8081/';
    // 模拟getHash返回null
    const originalGetHash = require('../src/get-hash').default;
    jest.mock('../src/get-hash', () => {
      return jest.fn().mockReturnValue(null);
    });
    
    const result = addSearchParams({ value: 'zzz' }, url);
    expect(result).toBe('http://192.168.199.2:8081/?value=zzz');
    
    // 恢复getHash
    jest.unmock('../src/get-hash');
  });
  
  test('没有search参数的情况', () => {
    const url = 'http://192.168.199.2:8081/#finish';
    const result = addSearchParams({ value: 'zzz' }, url);
    expect(result).toBe('http://192.168.199.2:8081/?value=zzz#finish');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.value).toBe('zzz');
  });
});
