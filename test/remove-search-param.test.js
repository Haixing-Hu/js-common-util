////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import queryString from 'qs';
import { getSearch, removeSearchParam } from '../src';

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
    expect(result).toBe('http://192.168.199.2:8081/?value=zzz&params=xxxx#/finish/');
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
    expect(result).toBe('http://192.168.199.2:8081/?value=zzz&params=xxxx#finish');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBeUndefined();
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&value=zzz&params=xxxx#/';
    const result = removeSearchParam('source', url);
    expect(result).toBe('http://192.168.199.2:8081/?value=zzz&params=xxxx#/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBeUndefined();
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&value=zzz&params=xxxx#finish/';
    const result = removeSearchParam('source', url);
    expect(result).toBe('http://192.168.199.2:8081/?value=zzz&params=xxxx#finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBeUndefined();
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&source=value2&value=zzz&params=xxxx#/finish/';
    const result = removeSearchParam('source', url);
    expect(result).toBe('http://192.168.199.2:8081/?value=zzz&params=xxxx#/finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBeUndefined();
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=&value&params=xxxx#';
    const result = removeSearchParam('source', url);
    expect(result).toBe('http://192.168.199.2:8081/?value=&params=xxxx#');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).toBeUndefined();
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source&value[]=v1&params=xxxx&value[]=v2#finish';
    const result = removeSearchParam('source', url);
    expect(result).toBe('http://192.168.199.2:8081/?value%5B0%5D=v1&value%5B1%5D=v2&params=xxxx#finish');
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
});
