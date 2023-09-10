/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import qs from 'qs';
import { logger } from './logger';
import getSearch from './get-search';
import addSearchParams from './add-search-params';
import redirect from './redirect';
import loadScript from './load-script';

/**
 * TalkingData 的 H5 SDK 的 URL。
 *
 * @private
 */
const SDK_URL = 'https://jic.talkingdata.com/app/h5/v1';

/**
 * 封装了 TalkingData 应用跟踪的 API 函数。
 *
 * @author 胡海星
 */
class TalkingData {
  constructor() {
    this.source = '';   // 记录当前渠道代码
  }

  /**
   * 初始化 TalkingData 的SDK.
   *
   * @param {Object} options
   *     配置参数对象，必须包含以下属性：default_source，表示应用默认的渠道编码；
   *     app_name，表示应用名称；app_version，表示应用版本号；talking_data_app_id，
   *     表示TalkingData的APP ID；
   * @return {Promise}
   *     一个{@link Promise}对象。
   * @author 胡海星
   */
  init(options) {
    return new Promise((resolve, reject) => {
      logger.info('Initializing the TalkingData SDK ...');
      const search = getSearch();
      const args = qs.parse(search);
      if (!args.source) {
        let url = addSearchParams({ source: options.default_source });
        url = addSearchParams({ td_channelid: options.default_source }, url);
        redirect(url, 0).then(() => resolve(null));
      } else if (!args.td_channelid) {
        const url = addSearchParams({ td_channelid: args.source });
        redirect(url, 0).then(() => resolve(null));
      } else {
        this.source = args.source;  //  记录渠道代码
        const url = `${SDK_URL}?appid=${options.talking_data_app_id}&vn=${options.app_name}&vc=${options.app_version}`;
        logger.info('Loading Talking Data SDK script: {0}', url);
        loadScript(url).then((script) => {
          logger.info('Successfully loading the Talking Data SDK script.');
          resolve(script);
        }).catch((error) => {
          logger.error('Failed to load the Talking Data SDK script: {0}', error);
          reject(error);
        });
      }
    });
  }

  /**
   * 触发 Talking Data 应用使用统计跟踪事件。
   *
   * 尽量不要直接调用此函数，推荐使用{@link enter}和{@link perform}函数。
   *
   * @param {String} event
   *    事件名称。
   * @param {String} label
   *    标签名称。
   * @author 胡海星
   */
  trace(event, label) {
    if (window.TDAPP) {
      if (label) {
        logger.info(`[TalkingData] ${event} - ${label}`);
        window.TDAPP.onEvent(event, label);
      } else {
        logger.info(`[TalkingData] ${event}`);
        window.TDAPP.onEvent(event);
      }
    } else if (label) {
      logger.error(`[TalkingData] ${event} - ${label}: TalkingData SKD was not loaded.`);
    } else {
      logger.error(`[TalkingData] ${event}: TalkingData SKD was not loaded.`);
    }
  }

  /**
   * 进入一个页面时，触发 Talking Data 应用使用统计跟踪事件。
   *
   * @param {String} page
   *     进入的页面的名称。
   * @param {String} source
   *     可选，指定的渠道代码；如果不提供此参数，则使用初始化时从URL中获取的渠道码。
   */
  enter(page, source) {
    this.trace(`${page}——进入`, source || this.source);
  }

  /**
   * 在某个页面上进行某种操作时，触发 Talking Data 应用使用统计跟踪事件。
   *
   * @param {String} page
   *     页面的名称。
   * @param {String} action
   *     操作的名称。
   * @param {String} source
   *     可选，指定的渠道代码；如果不提供此参数，则使用初始化时从URL中获取的渠道码。
   */
  perform(page, action, source) {
    this.trace(`${page}——操作——${action}`, source || this.source);
  }
}

const talkingData = new TalkingData();

export default talkingData;
