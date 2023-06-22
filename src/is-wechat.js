/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2020
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * 判断当前是否处于“微信”App中。
 *
 * @return {Boolean}
 *     若处于“微信”App中，返回true；否则返回false。
 * @author 胡海星
 */
function isWechat() {
  const agent = window.navigator.userAgent.toLowerCase();
  const result = agent.match(/MicroMessenger/i);
  return result && (result[0] === 'micromessenger');
}

export default isWechat;
