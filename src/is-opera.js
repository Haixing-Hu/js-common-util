////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Checks if the current browser is Opera.
 *
 * @return {boolean}
 *     `true` if the current browser is Opera; otherwise, `false`.
 * @author Haixing Hu
 */
function isOpera() {
  const globalOpera = window.opera || window.opr;
  if (!globalOpera) {
    return false;
  }
  const { userAgent } = window.navigator;
  return userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR/') > -1;
}

export default isOpera;
