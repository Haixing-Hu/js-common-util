/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import { logger } from './logger';

const DEFAULT_TIMEOUT = 300;

/**
 * 跳转至指定的URL
 *
 * @param {String} url
 *     待跳转至的URL
 * @param {Number} timeout
 *     可选参数，表示跳转延时，单位为毫秒。如未指定则使用配置中的默认延时。
 * @return {Promise}
 *     一个{@link Promise}对象。
 * @author 胡海星
 */
function redirect(url, timeout = DEFAULT_TIMEOUT) {
  // 为了让页面上的 Toaster 消息正确显示出来，不能立即跳转，而应该等待一小段时间
  return new Promise((resolve) => {
    logger.info('Redirecting to {0}', url);
    setTimeout(() => {
      window.location.href = url;
      resolve(url);
    }, (timeout ? DEFAULT_TIMEOUT : timeout));
  });
}

export default redirect;
