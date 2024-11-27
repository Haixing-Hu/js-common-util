////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Checks if the current browser is Safari.
 *
 * @return {boolean}
 *     `true` if the current browser is Safari; otherwise, `false`.
 * @author Haixing Hu
 */
function isSafari() {
  const { vendor, userAgent } = window.navigator;
  const isAppleVendor = vendor && (vendor.indexOf('Apple') > -1);
  const isIOSAgent = userAgent
    && (userAgent.indexOf('CriOS') === -1)
    && (userAgent.indexOf('FxiOS') === -1);
  return isAppleVendor && isIOSAgent;
}

export default isSafari;
