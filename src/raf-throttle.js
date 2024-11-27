////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2024.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Throttle a high-frequency function to be called at most once in a animation frame.
 *
 * ## How it works:
 * 1. The function uses a `locked` flag to prevent multiple calls within the same animation frame.
 * 2. When the returned function is invoked:
 *    - If `locked` is `true`, the function immediately returns, preventing `fn` from being called.
 *    - If `locked` is `false`, the `locked` flag is set to `true`, and `fn` is scheduled to run
 *      on the next animation frame using `requestAnimationFrame`.
 * 3. After `fn` executes, the `locked` flag is reset to `false`, allowing the next call to proceed.
 *
 * ## Use cases:
 * - Useful for reducing the frequency of function executions in high-frequency events like `scroll`,
 *  `resize`, `mousemove`, etc., to improve performance.
 * - Ensures smooth, browser-friendly execution synchronized with the screen's refresh rate.
 *
 * @param {function} fn
 *     The function to throttle. This function will only be executed once per
 *     animation frame (usually 16.7ms for 60fps).
 * @return {function}
 *     A throttled version of the input function `fn`.
 * @author Haixing Hu
 */
function rafThrottle(fn) {
  let locked = false;
  return function unnamed(...args) {
    if (locked) {
      return;
    }
    locked = true;
    window.requestAnimationFrame(() => {
      fn.apply(this, args);
      locked = false;
    });
  };
}

export default rafThrottle;
