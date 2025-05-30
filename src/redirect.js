////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

const DEFAULT_TIMEOUT = 300;

/**
 * Jumps to the specified URL.
 *
 * @param {String} url
 *     The URL to be redirected to.
 * @param {Number} timeout
 *     Optional parameter, indicating jump delay, is milliseconds. If not
 *     specified, the default delay in the configuration `DEFAULT_TIMEOUT`
 *     (300ms) is used.
 * @return {Promise}
 *     A {@link Promise} object, whose resolving value is the URL to be
 *     redirected to.
 * @author Haixing Hu
 */
function redirect(url, timeout = DEFAULT_TIMEOUT) {
  // In order for the toaster message on the page to be displayed correctly,
  // you cannot jump immediately, but should wait for a short period of time.
  return new Promise((resolve) => {
    setTimeout(() => {
      window.location.href = url;
      resolve(url);
    }, (timeout > 0 ? timeout : DEFAULT_TIMEOUT));
  });
}

export default redirect;
