////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { uriDecode } from '../src';

/**
 * 单元测试 'uriDecode'
 *
 * @author 胡海星
 */
describe('uriDecode', () => {
  test('RSA数字签名', () => {
    expect(uriDecode('zkeAp3LNpFRcpdmlcGGlQx5uK6PyXzDqwZrcsLzB25GJMyW46zGPmc%2F1%2F9pWe9J%2BBxMIdj8T%2FuZCAwupHuSrDQjD9hhFkw5au0D2J1MsV098kufyfn1NVsoU9ddP8HaNFa0ySv1v1q6aMhwrpdqstDC8Yc%2Ba%2FrJvwEazc3agMzo%3D'))
      .toBe('zkeAp3LNpFRcpdmlcGGlQx5uK6PyXzDqwZrcsLzB25GJMyW46zGPmc/1/9pWe9J+BxMIdj8T/uZCAwupHuSrDQjD9hhFkw5au0D2J1MsV098kufyfn1NVsoU9ddP8HaNFa0ySv1v1q6aMhwrpdqstDC8Yc+a/rJvwEazc3agMzo=');
  });
  test('URI编码的中文', () => {
    expect(uriDecode('%E4%BD%A0%E5%A5%BD')).toBe('你好');
  });
  test('URI编码的中文和空格', () => {
    expect(uriDecode('%E4%BD%A0%E5%A5%BD%20%E4%BD%A0%E5%A5%BD')).toBe('你好 你好');
  });
  test('URI编码中包含+号', () => {
    expect(uriDecode('hello+world')).toBe('hello world');
  });
  test('URI编码："%25"', () => {
    expect(uriDecode('%25')).toBe('%');
  });
  test('URI编码："%"', () => {
    expect(uriDecode('%')).toBe('%');
  });
  test('URI编码："st%C3%A5le"', () => {
    expect(uriDecode('st%C3%A5le')).toBe('ståle');
  });
  test('URI编码："%st%C3%A5le%"', () => {
    expect(uriDecode('%st%C3%A5le%')).toBe('%ståle%');
  });
  test('URI编码："%%7Bst%C3%A5le%7D%"', () => {
    expect(uriDecode('%%7Bst%C3%A5le%7D%')).toBe('%{ståle}%');
  });
  test('URI编码："%7B%ab%%7C%de%%7D"', () => {
    expect(uriDecode('%7B%ab%%7C%de%%7D')).toBe('{%ab%|%de%}');
  });
  test('URI编码："%FE%FF"', () => {
    expect(uriDecode('%FE%FF')).toBe('\uFFFD\uFFFD');
  });
  test('URI编码："%C2"', () => {
    expect(uriDecode('%C2')).toBe('\uFFFD');
  });
  test('URI编码："%C2%B5"', () => {
    expect(uriDecode('%C2%B5')).toBe('µ');
  });
});
