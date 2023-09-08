/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * 动态载入JavaScript脚本。
 *
 * @param {String} src
 *     待载入的脚本的URL。
 * @param {Object} attrs
 *     可选，需要加在新建的script标签上的属性。
 * @param {Node} parentNode
 *     可选，新建的script标签的父节点。
 * @return {Promise}
 *     一个异步执行的{@link Promise}对象。
 * @author 胡海星
 */
function loadScript(src, attrs, parentNode) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    for (const [k, v] of Object.entries(attrs || {})) {
      script.setAttribute(k, v);
    }
    script.onload = () => {
      script.onerror = null;
      script.onload = null;
      resolve(script);
    };
    script.onerror = () => {
      script.onerror = null;
      script.onload = null;
      reject(new Error(`Failed to load ${src}`));
    };
    const node = parentNode || document.head || document.getElementsByTagName('head')[0];
    node.appendChild(script);
  });
}

export default loadScript;
