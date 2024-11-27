////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Checks if the current browser is Android browser.
 *
 * @return {boolean}
 *     `true` if the current browser is Android browser; otherwise, `false`.
 * @author Haixing Hu
 */
function isAndroid() {
  const { userAgent } = window.navigator;
  return (userAgent.indexOf('Android') > -1)
    && (userAgent.indexOf('Mozilla/5.0') > -1)
    && (userAgent.indexOf('AppleWebKit') > -1);
}

export default isAndroid;
