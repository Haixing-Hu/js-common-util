////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * 判断当前是否处于"微信"App中。
 *
 * @return {Boolean}
 *     若处于"微信"App中，返回true；否则返回false。
 * @author 胡海星
 */
function isWechat() {
  // 检查window对象和navigator对象是否存在
  if (typeof window === 'undefined' || !window.navigator || !window.navigator.userAgent) {
    return false;
  }
  const agent = window.navigator.userAgent.toLowerCase();
  return agent.indexOf('micromessenger') !== -1;
}

export default isWechat;
