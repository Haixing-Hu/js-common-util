/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2022
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * 判定指定的变量是否是一个HTML的元素节点。
 *
 * @param {any} obj
 *     待判定的变量。
 * @return
 *     若该变量是一个HTML的元素节点，则返回{@code true}；否则返回{@code false}。
 * @author 胡海星
 */
function isHtmlElement(obj) {
  return obj && (obj.nodeType === Node.ELEMENT_NODE);
}

export default isHtmlElement;
