////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Dynamically loads a JavaScript script.
 *
 * @param {String} src
 *     The URL of the script to be loaded.
 * @param {Object} attrs
 *     Optional, attributes that need to be added to the newly created script
 *     tag.
 * @param {Node} parentNode
 *     Optional, the parent node of the new script tag.
 * @return {Promise}
 *     A {@link Promise} object that executes asynchronously, whose resolving
 *     value is the newly created script tag.
 * @author Haixing Hu
 */
function loadScript(src, attrs = undefined, parentNode = undefined) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        script.setAttribute(k, v);
      }
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
    const node = parentNode
      || document.head
      || document.getElementsByTagName('head')[0];
    node.appendChild(script);
  });
}

export default loadScript;
