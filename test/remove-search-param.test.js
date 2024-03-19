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
});
