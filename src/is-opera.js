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
  const matchAgent = window.navigator.userAgent.match(/Opera|OPR\//);
  return globalOpera && matchAgent;
}

export default isOpera;
