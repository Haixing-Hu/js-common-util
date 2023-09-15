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
 * Adds CSS classes to the specified HTML element.
 *
 * @param {HTMLElement} el
 *     The specified HTML element object.
 * @param {String} cls
 *     The name of the CSS class to be added; it can be multiple class names,
 *     separated by spaces.
 * @author Haixing Hu
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
