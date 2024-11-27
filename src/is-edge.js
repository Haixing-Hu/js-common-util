////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Checks if the current browser is Edge.
 *
 * @return {boolean}
 *     `true` if the current browser is Edge; otherwise, `false`.
 * @author Haixing Hu
 */
function isEdge() {
  return window.navigator.userAgent.indexOf('Edge/') > 0;
}

export default isEdge;
