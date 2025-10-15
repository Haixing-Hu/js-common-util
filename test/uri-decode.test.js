////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { uriDecode } from '../src';
import { decodeUriComponentEx } from '../src/uri-decode';

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

  // 新增测试：uriDecode处理非字符串输入的情况
  test('uriDecode处理非字符串输入', () => {
    // 测试 null
    expect(() => uriDecode(null)).toThrow(TypeError);
    expect(() => uriDecode(null)).toThrow('Expected `str` to be of type `string`, got `object`');

    // 测试 undefined
    expect(() => uriDecode(undefined)).toThrow(TypeError);
    expect(() => uriDecode(undefined)).toThrow('Expected `str` to be of type `string`, got `undefined`');
  });

  // 测试包含多个非法编码序列的情况，覆盖decode函数的for循环（第35-37行）
  test('包含多个非法编码序列', () => {
    // 这种情况会触发decode函数中的for循环多次迭代
    expect(uriDecode('%E4%BD%A0%E5%A5%BD%')).toBe('你好%');
    expect(uriDecode('%ab%cd%ef')).toBe('%ab%cd%ef');
  });

  // 测试混合了合法和非法编码的复杂情况
  test('混合合法和非法编码', () => {
    // 这会触发decodeComponents的递归调用（第27行）和不同的split值（第23行）
    expect(uriDecode('%E4%BD%A0%xy%E5%A5%BD')).toBe('你%xy好');
    expect(uriDecode('test%20%zz%20end')).toBe('test %zz end');
  });

  // 测试连续的非法编码序列
  test('连续的非法编码序列', () => {
    // 触发decode函数中tokens.length > 1的情况
    expect(uriDecode('%a%b%c')).toBe('%a%b%c');
    expect(uriDecode('%zz%yy%xx')).toBe('%zz%yy%xx');
  });

  // 测试单个编码字符和文本混合
  test('单个编码字符和文本混合', () => {
    // 测试singleMatcher匹配不同token的情况
    expect(uriDecode('a%20b%20c')).toBe('a b c');
    expect(uriDecode('hello%2Bworld')).toBe('hello+world');
  });

  // 测试只有单个非法编码的情况（覆盖components.length === 1的分支）
  test('单个非法编码', () => {
    expect(uriDecode('%')).toBe('%');
    expect(uriDecode('%z')).toBe('%z');
  });

  // 测试复杂的非法编码组合（触发decode函数中match返回null的情况）
  test('复杂非法编码组合', () => {
    // 包含多个连续的非法编码，触发for循环的多次迭代
    expect(uriDecode('%E4%BD%A0%ab%cd%E5%A5%BD')).toBe('你%ab%cd好');
    // 测试整个字符串无法匹配singleMatcher的情况
    expect(uriDecode('normaltext')).toBe('normaltext');
  });

  // 测试特殊的编码序列组合（覆盖for循环中的各种路径）
  test('特殊编码序列组合', () => {
    // 测试包含多个token的情况，使for循环执行多次
    expect(uriDecode('%E4%BD%A0%E5%A5')).toBe('你%E5%A5');
    expect(uriDecode('%20%20%20')).toBe('   ');
    // 测试非常短的非法编码
    expect(uriDecode('%1')).toBe('%1');
  });

  // 测试空字符串和边界情况
  test('空字符串和边界情况', () => {
    expect(uriDecode('')).toBe('');
    expect(uriDecode('   ')).toBe('   ');
  });
});

/**
 * 单元测试 'decodeUriComponentEx' 内部函数
 */
describe('decodeUriComponentEx', () => {
  // 测试正常解码功能
  test('基本解码功能', () => {
    expect(decodeUriComponentEx('%E4%BD%A0%E5%A5%BD')).toBe('你好');
    expect(decodeUriComponentEx('st%C3%A5le')).toBe('ståle');
  });

  // 测试解码失败时的fallback功能
  test('解码失败时fallback到高级解码器', () => {
    // 这种非法编码会让decodeURIComponent抛出异常
    // 但customDecodeURIComponent会尝试尽可能解码
    expect(decodeUriComponentEx('%')).toBe('%');
    expect(decodeUriComponentEx('%FE%FF')).toBe('\uFFFD\uFFFD');
    expect(decodeUriComponentEx('%C2')).toBe('\uFFFD');
  });

  // 测试类型检查 - 关键测试，覆盖第74行
  test('参数类型检查', () => {
    // 测试 null
    expect(() => decodeUriComponentEx(null)).toThrow(TypeError);
    expect(() => decodeUriComponentEx(null)).toThrow('Expected `encodedURI` to be of type `string`, got `object`');

    // 测试 undefined
    expect(() => decodeUriComponentEx(undefined)).toThrow(TypeError);
    expect(() => decodeUriComponentEx(undefined)).toThrow('Expected `encodedURI` to be of type `string`, got `undefined`');

    // 测试数字
    expect(() => decodeUriComponentEx(123)).toThrow(TypeError);
    expect(() => decodeUriComponentEx(123)).toThrow('Expected `encodedURI` to be of type `string`, got `number`');

    // 测试布尔值
    expect(() => decodeUriComponentEx(true)).toThrow(TypeError);
    expect(() => decodeUriComponentEx(true)).toThrow('Expected `encodedURI` to be of type `string`, got `boolean`');

    // 测试对象
    expect(() => decodeUriComponentEx({})).toThrow(TypeError);
    expect(() => decodeUriComponentEx({})).toThrow('Expected `encodedURI` to be of type `string`, got `object`');

    // 测试数组
    expect(() => decodeUriComponentEx([])).toThrow(TypeError);
    expect(() => decodeUriComponentEx([])).toThrow('Expected `encodedURI` to be of type `string`, got `object`');
  });
});
