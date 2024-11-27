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
  const { chrome, navigator, opr } = window;
  const { vendor, userAgent } = navigator;
  const isOpera = (typeof opr !== 'undefined');
  const isEdge = userAgent.indexOf('Edge') > -1;
  const isIOSChrome = userAgent.match('CriOS');
  const isChromium = userAgent.match('Chromium');
  const isDesktopChrome = (chrome !== null)
    && (chrome !== 'undefined')
    && (vendor === 'Google Inc.')
    && (isOpera === false)
    && (isEdge === false);
  return isIOSChrome || isDesktopChrome || isChromium;
}

export default isChrome;
