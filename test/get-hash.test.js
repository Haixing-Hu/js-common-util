/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import { getHash } from '../main';

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
});
