////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { getParsedSearch } from '../src';

/**
 * 单元测试 'getParsedSearch'
 *
 * @author 胡海星
 */
describe('getParsedSearch', () => {
  test('参数为字符串，querystring在hash后面', () => {
    const url = 'http://192.168.199.2:8081/#/?source=nanjing-bank&params=xxxx';
    const args = getParsedSearch(url);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
  });
  test('参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx&value=zzz';
    const args = getParsedSearch(url);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#/finish/?source=nanjing-bank&params=xxxx&value=zzz';
    const args = getParsedSearch(url);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash后面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#?source=nanjing-bank&params=xxxx&value=zzz';
    const args = getParsedSearch(url);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash后面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish?source=nanjing-bank&params=xxxx&value=zzz';
    const args = getParsedSearch(url);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/';
    const args = getParsedSearch(url);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish/';
    const args = getParsedSearch(url);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/finish';
    const args = getParsedSearch(url);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#';
    const args = getParsedSearch(url);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish';
    const args = getParsedSearch(url);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，没有hash，只有参数', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz';
    const args = getParsedSearch(url);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.value).toBe('zzz');
  });
  test('参数为字符串，没有hash，没有参数', () => {
    const url = 'http://192.168.199.2:8081/?value=zzz';
    const args = getParsedSearch(url);
    expect(args.value).toBe('zzz');
  });

  test('参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾，需要URL编码新参数和值', () => {
    const url = 'http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy';
    const args = getParsedSearch(url);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.$value).toBe('zzz&yyy');
  });
  test('参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾，需要URL编码新参数和值', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy#finish';
    const args = getParsedSearch(url);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.$value).toBe('zzz&yyy');
  });
  test('参数为字符串，没有hash，只有参数，需要URL编码新参数和值', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy';
    const args = getParsedSearch(url);
    expect(args.source).toBe('nanjing-bank');
    expect(args.params).toBe('xxxx');
    expect(args.$value).toBe('zzz&yyy');
  });
  test('参数为字符串，没有hash，没有参数，需要URL编码新参数和值', () => {
    const url = 'http://192.168.199.2:8081/?%24value=zzz%26yyy';
    const args = getParsedSearch(url);
    expect(args.$value).toBe('zzz&yyy');
  });

  test('参数为字符串，没有hash，没有参数，新参数值为空字符串', () => {
    const url = 'http://192.168.199.2:8081/?%24value=';
    const args = getParsedSearch(url);
    expect(args.$value).toBe('');
  });
  
  // 测试没有查询参数的情况
  test('URL中没有查询参数应返回null', () => {
    const url = 'http://192.168.199.2:8081/';
    const args = getParsedSearch(url);
    expect(args).toBeNull();
  });
  
  test('URL中只有hash但没有查询参数应返回null', () => {
    const url = 'http://192.168.199.2:8081/#/path';
    const args = getParsedSearch(url);
    expect(args).toBeNull();
  });
  
  test('URL为空字符串应返回null', () => {
    const url = '';
    const args = getParsedSearch(url);
    expect(args).toBeNull();
  });
  
  test('URL为无效格式应返回null', () => {
    const url = '://invalid-url';
    const args = getParsedSearch(url);
    expect(args).toBeNull();
  });
  
  test('不传入URL参数时应使用window.location.href', () => {
    // 备份原始的window.location
    const originalLocation = window.location;
    
    // 模拟window.location
    delete window.location;
    window.location = {
      href: 'http://example.com/?test=value',
      search: '?test=value',
      hash: ''
    };
    
    // 不传入URL参数调用
    const args = getParsedSearch();
    expect(args).not.toBeNull();
    expect(args.test).toBe('value');
    
    // 恢复原始location
    window.location = originalLocation;
  });
  
  test('URL为null应返回null', () => {
    expect(getParsedSearch(null)).toBeNull();
  });

  test('URL为undefined应使用window.location.href', () => {
    // 备份原始的window.location
    const originalLocation = window.location;
    
    // 模拟window.location
    delete window.location;
    window.location = {
      href: 'http://example.com/?test=value',
      search: '?test=value',
      hash: ''
    };
    
    // 传入undefined参数调用
    const args = getParsedSearch(undefined);
    expect(args).not.toBeNull();
    expect(args.test).toBe('value');
    
    // 恢复原始location
    window.location = originalLocation;
  });
});
