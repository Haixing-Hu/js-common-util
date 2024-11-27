////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Checks if the current browser is Firefox.
 *
 * @return {boolean}
 *     `true` if the current browser is Firefox; otherwise, `false`.
 * @author Haixing Hu
 */
function isFirefox() {
  return window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

export default isFirefox;
