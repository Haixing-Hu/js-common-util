////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import addClassToHmlElement from './add-class-to-html-element';
import addSearchParams from './add-search-params';
import assign from './assign';

import clone from './clone';

import decycle from './decycle';
import deepEqual from './deep-equal';
import defaultIfNull from './default-if-null';
import defaultIfUndefinedOrNull from './default-if-undefined-or-null';
import defaultIfUndefined from './default-if-undefined';

import emptyToNull from './empty-to-null';
import emptyFieldsToNull from './empty-fields-to-null';
import extractOssUrlInfo from './extract-oss-url-info';

import fixScroll from './fix-scroll';
import floatEqual from './float-equal';
import format from './format';

import getHash from './get-hash';
import getSearch from './get-search';
import getParsedSearch from './get-parsed-search';
import getSearchParam from './get-search-param';

import isIos from './is-ios';
import isMyNanjingApp from './is-my-nanjing-app';
import isUndefinedOrNull from './is-undefined-or-null';
import isUndefinedOrNullOrEmptyString from './is-undefined-or-null-or-empty-string';
import isUndefinedOrNullOrEmptyArray from './is-undefined-or-null-or-empty-array';
import isWechat from './is-wechat';

import isFunction from './is-function';
import isHtmlElement from './is-html-element';
import isHtmlElementHasClass from './is-html-element-has-class';
import isObject from './is-object';
import isString from './is-string';
import isBuiltInClass from './is-built-in-class';

import jsonStringify from './json-stringify';
import loadScript from './load-script';

import normalizeUrl from './normalize-url';

import redirect from './redirect';
import removeEmptyFields from './remove-empty-fields';
import removeClassFromHmlElement from './remove-class-from-html-element';
import removeSearchParam from './remove-search-param';
import restoreVueManaged from './restore-vue-managed';
import round from './round';

import sleep from './sleep';
import splitDigits from './split-digits';
import stringToFloat from './string-to-float';
import stringToMoney from './string-to-money';

import talkingData from './talking-data';
import toString from './to-string';
import trimString from './trim-string';
import trimUppercaseString from './trim-uppercase-string';

import uppercaseString from './uppercase-string';
import uriDecode from './uri-decode';
import uriEncode from './uri-encode';

import ArrayUtils from './array-utils';

import scrollTo from './scroll-to';

import getAncestorClasses from './get-ancestor-classes';
import getDeclaringClass from './get-declaring-class';

import kindOf from './kind-of';

import queryString from './query-string';

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