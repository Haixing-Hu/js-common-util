////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import talkingData from '../src/talking-data';
import loadScript from '../src/load-script';
import redirect from '../src/redirect';
import queryString from '../src/query-string';
import getSearch from '../src/get-search';
import addSearchParams from '../src/add-search-params';

// 模拟依赖
jest.mock('../src/load-script');
jest.mock('../src/redirect');
jest.mock('../src/get-search');
jest.mock('../src/add-search-params');

/**
 * 测试 TalkingData 类的行为
 *
 * @author 测试工程师
 */
describe('TalkingData', () => {
  // 在每个测试前设置模拟
  beforeEach(() => {
    // 重置所有模拟
    jest.clearAllMocks();

    // 重置talkingData实例的状态
    talkingData.source = '';

    // 模拟console方法
    jest.spyOn(console, 'info').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    // 模拟window.TDAPP对象
    global.window.TDAPP = {
      onEvent: jest.fn(),
    };

    // 模拟getSearch返回空字符串
    getSearch.mockReturnValue('');

    // 模拟queryString.parse返回空对象
    queryString.parse = jest.fn().mockReturnValue({});

    // 模拟loadScript返回解析的Promise
    loadScript.mockResolvedValue({});

    // 模拟redirect返回解析的Promise
    redirect.mockResolvedValue(null);

    // 模拟addSearchParams返回修改后的URL
    addSearchParams.mockImplementation((params) => {
      const queryParts = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
      return `?${queryParts}`;
    });
  });

  // 在每个测试后清理
  afterEach(() => {
    // 恢复console方法
    console.info.mockRestore();
    console.error.mockRestore();

    // 删除window.TDAPP对象
    delete global.window.TDAPP;
  });

  describe('init', () => {
    it('没有source参数时应添加默认source并重定向', async () => {
      // 调用init方法
      const promise = talkingData.init('test-app-id', 'test-app', '1.0.0', 'default-source');

      // 验证检查URL参数
      expect(getSearch).toHaveBeenCalled();
      expect(queryString.parse).toHaveBeenCalled();

      // 验证添加了正确的搜索参数
      expect(addSearchParams).toHaveBeenCalledWith({
        td_channelid: 'default-source',
        source: 'default-source',
      });

      // 验证调用了redirect
      expect(redirect).toHaveBeenCalled();

      // 验证未加载SDK
      expect(loadScript).not.toHaveBeenCalled();

      // 等待Promise解析
      await promise;
    });

    it('没有source参数且没有提供defaultSource时应直接加载SDK', async () => {
      // 调用init方法，不提供defaultSource
      const promise = talkingData.init('test-app-id', 'test-app', '1.0.0');

      // 验证检查URL参数
      expect(getSearch).toHaveBeenCalled();
      expect(queryString.parse).toHaveBeenCalled();

      // 验证source被设置为undefined
      expect(talkingData.source).toBeUndefined();

      // 验证加载了SDK
      expect(loadScript).toHaveBeenCalledWith('https://jic.talkingdata.com/app/h5/v1?appid=test-app-id&vn=test-app&vc=1.0.0');

      // 验证未调用redirect
      expect(redirect).not.toHaveBeenCalled();

      // 等待Promise解析
      await promise;
    });

    it('URL中有source但没有td_channelid时应添加td_channelid并重定向', async () => {
      // 模拟URL中已有source参数
      queryString.parse.mockReturnValue({ source: 'url-source' });

      // 调用init方法
      const promise = talkingData.init('test-app-id', 'test-app', '1.0.0');

      // 验证添加了正确的搜索参数
      expect(addSearchParams).toHaveBeenCalledWith({
        td_channelid: 'url-source',
      });

      // 验证调用了redirect
      expect(redirect).toHaveBeenCalled();

      // 验证未加载SDK
      expect(loadScript).not.toHaveBeenCalled();

      // 等待Promise解析
      await promise;
    });

    it('URL中同时有source和td_channelid时应加载SDK', async () => {
      // 模拟URL中已有source和td_channelid参数
      queryString.parse.mockReturnValue({
        source: 'url-source',
        td_channelid: 'url-source',
      });

      // 调用init方法
      const promise = talkingData.init('test-app-id', 'test-app', '1.0.0');

      // 验证source被保存
      expect(talkingData.source).toBe('url-source');

      // 验证加载了SDK
      expect(loadScript).toHaveBeenCalledWith('https://jic.talkingdata.com/app/h5/v1?appid=test-app-id&vn=test-app&vc=1.0.0');

      // 验证未调用redirect
      expect(redirect).not.toHaveBeenCalled();

      // 等待Promise解析
      await promise;
    });

    it('URL中同时有source和td_channelid，并且提供了defaultSource时，source应取URL中的值', async () => {
      // 模拟URL中已有source和td_channelid参数
      queryString.parse.mockReturnValue({
        source: 'url-source',
        td_channelid: 'url-source',
      });

      // 调用init方法
      const promise = talkingData.init('test-app-id', 'test-app', '1.0.0', 'default-source');

      // 验证source被保存为URL中的值而不是默认值
      expect(talkingData.source).toBe('url-source');

      // 验证加载了SDK
      expect(loadScript).toHaveBeenCalledWith('https://jic.talkingdata.com/app/h5/v1?appid=test-app-id&vn=test-app&vc=1.0.0');

      // 等待Promise解析
      await promise;
    });

    it('加载SDK失败时应拒绝Promise', async () => {
      // 模拟URL中已有source和td_channelid参数
      queryString.parse.mockReturnValue({
        source: 'url-source',
        td_channelid: 'url-source',
      });

      // 模拟loadScript失败
      const testError = new Error('Test error');
      loadScript.mockRejectedValue(testError);

      // 调用init方法并期望它拒绝
      await expect(talkingData.init('test-app-id', 'test-app', '1.0.0'))
        .rejects.toEqual(testError);

      // 验证调用了loadScript
      expect(loadScript).toHaveBeenCalled();
    });
  });

  describe('trace', () => {
    it('当TDAPP存在且有label时应调用TDAPP.onEvent', () => {
      // 调用trace方法
      talkingData.trace('test-event', 'test-label');

      // 验证调用了TDAPP.onEvent
      expect(global.window.TDAPP.onEvent).toHaveBeenCalledWith('test-event', 'test-label');
    });

    it('当TDAPP存在且没有label时应调用TDAPP.onEvent只传一个参数', () => {
      // 调用trace方法
      talkingData.trace('test-event');

      // 验证调用了TDAPP.onEvent
      expect(global.window.TDAPP.onEvent).toHaveBeenCalledWith('test-event');
    });

    it('当TDAPP不存在且有label时应记录错误', () => {
      // 删除TDAPP对象
      delete global.window.TDAPP;

      // 调用trace方法
      talkingData.trace('test-event', 'test-label');

      // 验证记录了错误
      expect(console.error).toHaveBeenCalled();
    });

    it('当TDAPP不存在且没有label时应记录错误', () => {
      // 删除TDAPP对象
      delete global.window.TDAPP;

      // 调用trace方法
      talkingData.trace('test-event');

      // 验证记录了错误
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('enter', () => {
    it('应使用正确的事件名称调用trace', () => {
      // 设置source
      talkingData.source = 'test-source';

      // 模拟trace方法
      jest.spyOn(talkingData, 'trace');

      // 调用enter方法
      talkingData.enter('test-page');

      // 验证调用了trace
      expect(talkingData.trace).toHaveBeenCalledWith('Enter test-page', 'test-source');
    });

    it('如果提供了source应使用提供的source而不是默认source', () => {
      // 设置source
      talkingData.source = 'default-source';

      // 模拟trace方法
      jest.spyOn(talkingData, 'trace');

      // 调用enter方法
      talkingData.enter('test-page', 'provided-source');

      // 验证调用了trace
      expect(talkingData.trace).toHaveBeenCalledWith('Enter test-page', 'provided-source');
    });
  });

  describe('perform', () => {
    it('应使用正确的事件名称调用trace', () => {
      // 设置source
      talkingData.source = 'test-source';

      // 模拟trace方法
      jest.spyOn(talkingData, 'trace');

      // 调用perform方法
      talkingData.perform('test-page', 'test-action');

      // 验证调用了trace
      expect(talkingData.trace).toHaveBeenCalledWith('Enter test-page and perform test-action', 'test-source');
    });

    it('如果提供了source应使用提供的source而不是默认source', () => {
      // 设置source
      talkingData.source = 'default-source';

      // 模拟trace方法
      jest.spyOn(talkingData, 'trace');

      // 调用perform方法
      talkingData.perform('test-page', 'test-action', 'provided-source');

      // 验证调用了trace
      expect(talkingData.trace).toHaveBeenCalledWith('Enter test-page and perform test-action', 'provided-source');
    });
  });
});
