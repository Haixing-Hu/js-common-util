/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import CryptoJS from 'crypto-js';
import { DEFAULT_KEY, DEFAULT_IV } from './aes-config';

/**
 * AES加密。
 *
 * @param {String} text
 *     带加密的明文。
 * @param {String} key
 *     用于加密的密钥，默认值为 DEFAULT_KEY。
 * @returns {String}
 *     加密后的密文。
 */
function aesEncrypt(text, key = DEFAULT_KEY) {
  const result = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(DEFAULT_IV),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return result.toString();
}

export default aesEncrypt;
