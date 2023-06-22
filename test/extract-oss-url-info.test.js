/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2020
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/
import { extractOssUrlInfo } from '../main';

/**
 * 单元测试 'extractOssUrlInfo'
 *
 * @author 胡海星
 */
describe('extractOssUrlInfo', () => {
  test('参数为undefined', () => {
    const url = undefined;
    expect(extractOssUrlInfo(url)).toBeNull();
  });
  test('参数为null', () => {
    const url = null;
    expect(extractOssUrlInfo(url)).toBeNull();
  });
  test('参数为空字符串', () => {
    const url = '';
    expect(extractOssUrlInfo(url)).toBeNull();
  });
  test('参数为不带预处理参数的URL', () => {
    const url = 'https://a.aliyuncs.com/ac622799-c62f-4e64-a76a-0ec685dee893.png';
    const expected = {
      url: 'https://a.aliyuncs.com/ac622799-c62f-4e64-a76a-0ec685dee893.png',
      degree: 0,
    };
    expect(extractOssUrlInfo(url)).toEqual(expected);
  });
  test('参数为带旋转预处理参数的URL', () => {
    const url = 'https://a.aliyuncs.com/ac622799-c62f-4e64-a76a-0ec685dee893.png?x-oss-process=image/rotate,210';
    const expected = {
      url: 'https://a.aliyuncs.com/ac622799-c62f-4e64-a76a-0ec685dee893.png',
      degree: 210,
    };
    expect(extractOssUrlInfo(url)).toEqual(expected);
  });
  test('参数为带旋转预处理参数以及其他预处理参数的URL', () => {
    const url = 'https://a.aliyuncs.com/ac622799-c62f-4e64-a76a-0ec685dee893.png?x-oss-process=image/resize,h_100,m_lfit&x-oss-process=image/rotate,210';
    const expected = {
      url: 'https://a.aliyuncs.com/ac622799-c62f-4e64-a76a-0ec685dee893.png?x-oss-process=image/resize,h_100,m_lfit',
      degree: 210,
    };
    expect(extractOssUrlInfo(url)).toEqual(expected);
  });
  test('参数为带旋转预处理参数以及多个其他预处理参数的URL', () => {
    const url = 'https://a.aliyuncs.com/ac622799-c62f-4e64-a76a-0ec685dee893.png?x-oss-process=image/resize,h_100,m_lfit&x-oss-process=image/rotate,210&x-oss-process=image/bright,50';
    const expected = {
      url: 'https://a.aliyuncs.com/ac622799-c62f-4e64-a76a-0ec685dee893.png?x-oss-process=image/resize,h_100,m_lfit&x-oss-process=image/bright,50',
      degree: 210,
    };
    expect(extractOssUrlInfo(url)).toEqual(expected);
  });
});
