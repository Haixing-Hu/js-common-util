/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2022
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/
import isHtmlElementHasClass from './is-html-element-has-class';
import trimString from './trim-string';

/**
 * 从指定的HTML元素的类列表中删除指定的CSS类。
 *
 * @param {HTMLElement} el
 *     指定的HTML元素对象。
 * @param {String} cls
 *     待删除的CSS类名；可以是多个类名，用空格隔开。
 * @author 胡海星
 */
function removeClassFromHmlElement(el, cls) {
  if (!el || !cls) {
    return;
  }
  const classes = cls.split(' ');
  let currentClass = ` ${el.className} `;
  for (let i = 0; i < classes.length; ++i) {
    const clsName = classes[i];
    if (!clsName) {
      continue;
    }
    if (el.classList) {
      el.classList.remove(clsName);
    } else if (isHtmlElementHasClass(el, clsName)) {
      currentClass = currentClass.replace(` ${clsName} `, ' ');
    }
  }
  if (!el.classList) {
    el.setAttribute('class', trimString(currentClass));
  }
}

export default removeClassFromHmlElement;
