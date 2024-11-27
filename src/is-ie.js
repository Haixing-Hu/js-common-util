////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Checks if the current browser is IE.
 *
 * @return {boolean}
 *     `true` if the current browser is IE; otherwise, `false`.
 * @author Haixing Hu
 */
function isIE() {
  const { userAgent } = window.navigator;
  const msie = userAgent.indexOf('MSIE ');
  const trident = userAgent.indexOf('Trident/');
  return msie > 0 || trident > 0;
}

export default isIE;
