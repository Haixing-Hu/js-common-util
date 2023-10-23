/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import qs from 'qs';
import { Logger } from '@haixing_hu/common-logging';
import getSearch from './get-search';
import addSearchParams from './add-search-params';
import redirect from './redirect';
import loadScript from './load-script';

/**
 * The URL of TalkingData’s H5 SDK.
 *
 * @private
 */
const SDK_URL = 'https://jic.talkingdata.com/app/h5/v1';

const logger = Logger.getLogger('TalkingData');

/**
 * Encapsulates the API function of TalkingData application tracking.
 *
 * @author Haixing Hu
 */
class TalkingData {
  constructor() {
    this.source = '';   // 记录当前渠道代码
  }

  /**
   * Initialize the SDK of TalkingData.
   *
   * @param {String} appId
   *     The App ID of the application in TalkingData.
   * @param {String} appName
   *     The name of the application.
   * @param {String} appVersion
   *     The version of the application.
   * @param {String} defaultSource
   *     The optional default source of the application.
   * @return {Promise}
   *     A {@link Promise} object.
   */
  init(appId, appName, appVersion, defaultSource = undefined) {
    return new Promise((resolve, reject) => {
      logger.info('Initializing the TalkingData SDK ...');
      const search = getSearch();
      const args = qs.parse(search);
      if (!args.source) {
        if (defaultSource) {
          const url = addSearchParams({
            td_channelid: defaultSource,
            source: defaultSource,
          });
          redirect(url, 0).then(() => resolve(null));
          return;
        }
        // if the `defaultSource` is `undefined`, pass through
      } else if (!args.td_channelid) {
        const url = addSearchParams({
          td_channelid: args.source,
        });
        redirect(url, 0).then(() => resolve(null));
        return;
      }
      // Remember the source. Note that the source maybe `undefined`
      this.source = args.source || defaultSource;
      const url = `${SDK_URL}?appid=${appId}&vn=${appName}&vc=${appVersion}`;
      logger.info('Loading Talking Data SDK script:', url);
      loadScript(url).then((script) => {
        logger.info('Successfully loading the Talking Data SDK script.');
        resolve(script);
      }).catch((error) => {
        logger.error('Failed to load the Talking Data SDK script:', error);
        reject(error);
      });
    });
  }

  /**
   * Triggers the TalkingData application usage statistics tracking event.
   *
   * Do not call this function directly. It is recommended to use the
   * {@link enter} and {@link perform} functions.
   *
   * @param {String} event
   *     The event.
   * @param {String} label
   *     The optional tag.
   * @author Haixing Hu
   */
  trace(event, label = undefined) {
    if (window.TDAPP) {
      if (label) {
        logger.info('Fire the event: %s (%s)', event, label);
        window.TDAPP.onEvent(event, label);
      } else {
        logger.info('Fire the event:', event);
        window.TDAPP.onEvent(event);
      }
    } else if (label) {
      logger.error('Fire the event: %s (%s), but the TalkingData SKD was not '
        + 'loaded.', event, label);
    } else {
      logger.error('Fire the event: %s, but the TalkingData SKD was not loaded.', event);
    }
  }

  /**
   * When visiting a page, a TalkingData application usage statistics tracking
   * event is triggered.
   *
   * @param {String} page
   *     The name of the page.
   * @param {String} source
   *     The optional source code. If this parameter is not provided, the
   *     source code obtained from the URL during initialization is used.
   */
  enter(page, source = undefined) {
    this.trace(`Enter ${page}`, source || this.source);
  }

  /**
   * When an operation is performed on a specified page, the TalkingData
   * application usage statistics tracking event is triggered.
   *
   * @param {String} page
   *     The name of the page.
   * @param {String} action
   *     The name of the operation.
   * @param {String} source
   *     The optional source code. if this parameter is not provided, the
   *     source code obtained from the URL during initialization is used.
   */
  perform(page, action, source = undefined) {
    this.trace(`Enter ${page} and perform ${action}`, source || this.source);
  }
}

const talkingData = new TalkingData();

export default talkingData;
