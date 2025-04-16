////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Checks if the current browser is Chrome.
 *
 * @return {boolean}
 *     `true` if the current browser is Chrome; otherwise, `false`.
 * @author Haixing Hu
 */
function isChrome() {
  // 检查window对象是否存在
  if (typeof window === 'undefined') {
    return false;
  }
  const { chrome, navigator, opr } = window;
  // 检查navigator对象是否存在
  if (!navigator) {
    return false;
  }
  const { vendor, userAgent } = navigator;
  const isOpera = (typeof opr !== 'undefined');
  const isEdge = userAgent && userAgent.indexOf('Edge') > -1;
  const isIOSChrome = userAgent && !!userAgent.match(/CriOS/i);
  const isChromium = userAgent && !!userAgent.match(/Chromium/i);
  const isDesktopChrome = (chrome !== null)
    && (chrome !== undefined)
    && (vendor === 'Google Inc.')
    && (isOpera === false)
    && (isEdge === false);
  return (isIOSChrome || isDesktopChrome || isChromium);
}

export default isChrome;
