/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import isHtmlElementHasClass from './is-html-element-has-class';

/**
 * 为指定的HTML元素添加指定的CSS类。
 *
 * @param {HTMLElement} el
 *     指定的HTML元素对象。
 * @param {String} cls
 *     待添加的CSS类名；可以是多个类名，用空格隔开。
 * @author 胡海星
 */
function addClassToHmlElement(el, cls) {
  if (!el) {
    return;
  }
  const classes = (cls || '').split(' ');
  let currentClass = el.className;
  for (let i = 0; i < classes.length; ++i) {
    const clsName = classes[i];
    if (!clsName) {
      continue;
    }
    if (el.classList) {
      el.classList.add(clsName);
    } else if (!isHtmlElementHasClass(el, clsName)) {
      currentClass += ` ${clsName}`;
    }
  }
  if (!el.classList) {
    el.setAttribute('class', currentClass);
  }
}

export default addClassToHmlElement;
