/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * 判断当前是否处于“我的南京”App中。
 *
 * @return {Boolean}
 *     若处于“我的南京”App中，返回true；否则返回false。
 * @author 胡海星
 */
function isMyNanjingApp() {
  return window.auth !== undefined;
}

export default isMyNanjingApp;
