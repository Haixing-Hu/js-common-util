/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * 判定指定的HTML元素是否具有指定的CSS类。
 *
 * @param {HTMLElement} el
 *     指定的HTML元素对象。
 * @param {String} cls
 *     指定的CSS类名。
 * @returns
 *     如果指定的HTML元素具有指定的CSS类，返回{@code true}；否则返回{@code false}。
 * @author 胡海星
 */
function isHtmlElementHasClass(el, cls) {
  if (!el || !cls) {
    return false;
  }
  if (cls.indexOf(' ') !== -1) {
    throw new Error('className should not contain space.');
  }
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (` ${el.className} `).indexOf(` ${cls} `) > -1;
  }
}

export default isHtmlElementHasClass;
