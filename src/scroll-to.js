////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Fallback for requestAnimationFrame
 *
 * @param {Function} callback
 *    The callback function to execute
 */
const fallbackAnimationFrame = (callback) => {
  window.setTimeout(callback, 1000 / 60);
};

/**
 * Request animation frame
 *
 * @param {Function} callback
 *    The callback function to execute
 */
const requestAnimFrame = (callback) => {
  const animationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || fallbackAnimationFrame;
  animationFrame(callback);
};

/**
 * Ease in and out quadratic function
 *
 * @param {number} t
 *    The current time
 * @param {number} b
 *    The starting value
 * @param {number} c
 *    The change in value
 * @param {number} d
 *    The duration of the animation
 * @returns {number}
 *    The eased value
 */
function easeInOutQuad(time, start, change, duration) {
  time /= duration / 2;
  if (time < 1) {
    return (change / 2) * (time * time) + start;
  }
  time--;
  return (-change / 2) * (time * (time - 2) - 1) + start;
}

/**
 * Because it's so difficult to detect the scrolling element, just move them all.
 *
 * @param {number} amount
 *    The amount to scroll
 */
function move(amount) {
  document.documentElement.scrollTop = amount;
  document.body.parentNode.scrollTop = amount;
  document.body.scrollTop = amount;
}

/**
 * Get the current scroll position of the document
 *
 * @returns {number}
 *    The current scroll position
 */
function position() {
  return document.documentElement.scrollTop
    || document.body.parentNode.scrollTop
    || document.body.scrollTop;
}

/**
 * Scroll to a specific position with an optional callback function
 *
 * @param {number} to
 *    The target position to scroll to
 * @param {number} duration
 *    The duration of the scroll animation
 * @param {Function} callback
 *    An optional callback function to execute after the animation completes
 */
function scrollTo(to, duration, callback) {
  const start = position();
  const change = to - start;
  const increment = 20;
  let currentTime = 0;
  duration = (typeof (duration) === 'undefined') ? 500 : duration;
  const animateScroll = () => {
    // increment the time
    currentTime += increment;
    // find the value with the quadratic in-out easing function
    const val = easeInOutQuad(currentTime, start, change, duration);
    // move the document.body
    move(val);
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    } else if (callback && typeof (callback) === 'function') {
      // the animation is done so lets callback
      callback();
    }
  };
  animateScroll();
}

export default scrollTo;
