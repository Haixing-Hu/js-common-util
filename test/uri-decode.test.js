/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
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
});
