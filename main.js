/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import addClassToHmlElement from './src/add-class-to-html-element';
import addSearchParams from './src/add-search-params';
import assign from './src/assign';

import clone from './src/clone';

import decycle from './src/decycle';
import deepEqual from './src/deep-equal';
import defaultIfNull from './src/default-if-null';
import defaultIfUndefinedOrNull from './src/default-if-undefined-or-null';
import defaultIfUndefined from './src/default-if-undefined';

import emptyToNull from './src/empty-to-null';
import emptyFieldsToNull from './src/empty-fields-to-null';
import extractOssUrlInfo from './src/extract-oss-url-info';

import fixScroll from './src/fix-scroll';
import floatEqual from './src/float-equal';
import format from './src/format';

import getHash from './src/get-hash';
import getSearch from './src/get-search';
import getParsedSearch from './src/get-parsed-search';
import getSearchParam from './src/get-search-param';

import isIos from './src/is-ios';
import isMyNanjingApp from './src/is-my-nanjing-app';
import isUndefinedOrNull from './src/is-undefined-or-null';
import isUndefinedOrNullOrEmptyString from './src/is-undefined-or-null-or-empty-string';
import isUndefinedOrNullOrEmptyArray from './src/is-undefined-or-null-or-empty-array';
import isWechat from './src/is-wechat';

import isFunction from './src/is-function';
import isHtmlElement from './src/is-html-element';
import isHtmlElementHasClass from './src/is-html-element-has-class';
import isObject from './src/is-object';
import isString from './src/is-string';
import isBuiltInClass from './src/is-built-in-class';

import jsonStringify from './src/json-stringify';
import loadScript from './src/load-script';

import normalizeUrl from './src/normalize-url';

import redirect from './src/redirect';
import removeEmptyFields from './src/remove-empty-fields';
import removeClassFromHmlElement from './src/remove-class-from-html-element';
import removeSearchParam from './src/remove-search-param';
import restoreVueManaged from './src/restore-vue-managed';
import round from './src/round';

import sleep from './src/sleep';
import splitDigits from './src/split-digits';
import stringToFloat from './src/string-to-float';
import stringToMoney from './src/string-to-money';

import talkingData from './src/talking-data';
import toString from './src/to-string';
import trimString from './src/trim-string';
import trimUppercaseString from './src/trim-uppercase-string';

import uppercaseString from './src/uppercase-string';
import uriDecode from './src/uri-decode';
import uriEncode from './src/uri-encode';

import ArrayUtils from './src/array-utils';

import scrollTo from './src/scroll-to';

import getAncestorClasses from './src/get-ancestor-classes';
import getDeclaringClass from './src/get-declaring-class';

import kindOf from './src/kind-of';

import queryString from './src/query-string';

export {
  addClassToHmlElement,
  addSearchParams,
  assign,

  clone,

  decycle,
  deepEqual,
  defaultIfNull,
  defaultIfUndefinedOrNull,
  defaultIfUndefined,

  emptyToNull,
  emptyFieldsToNull,
  extractOssUrlInfo,

  fixScroll,
  floatEqual,
  format,

  getHash,
  getSearch,
  getParsedSearch,
  getSearchParam,

  isIos,
  isMyNanjingApp,
  isUndefinedOrNull,
  isUndefinedOrNullOrEmptyString,
  isUndefinedOrNullOrEmptyArray,
  isWechat,

  isFunction,
  isHtmlElement,
  isHtmlElementHasClass,
  isString,
  isObject,
  isBuiltInClass,

  jsonStringify,

  loadScript,

  normalizeUrl,

  redirect,
  removeEmptyFields,
  removeClassFromHmlElement,
  removeSearchParam,
  restoreVueManaged,
  round,

  sleep,
  splitDigits,
  stringToFloat,
  stringToMoney,

  talkingData,
  toString,
  trimString,
  trimUppercaseString,

  uppercaseString,
  uriDecode,
  uriEncode,

  ArrayUtils,
  scrollTo,
  getAncestorClasses,
  getDeclaringClass,

  kindOf,
  queryString,
};
