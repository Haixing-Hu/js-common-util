/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2020
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * 判断当前是否处于iOS操作系统中。
 *
 * @return {Boolean}
 *     若处于iOS操作系统中，返回true；否则返回false。
 * @author 胡海星
 */
function isIos() {
  const agent = navigator.userAgent.toLowerCase();
  if ((agent.indexOf('iphone') !== -1) || (agent.indexOf('ipad') !== -1)) {
    return true;
  } else {
    return false;
  }
}

export default isIos;
