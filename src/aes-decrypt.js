/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2021
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/
import CryptoJS from 'crypto-js';
import { DEFAULT_KEY, DEFAULT_IV } from './aes-config';

/**
 * AES 解密。
 *
 * @param {String} text
 *     带解密的密文。
 * @param {String} key
 *     用于解密的密钥，默认值为 DEFAULT_KEY。
 * @returns {String}
 *     解密后的明文。
 */
function aesDecrypt(text, key = DEFAULT_KEY) {
  const decrypted = CryptoJS.AES.decrypt(text, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(DEFAULT_IV),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypted);
}

export default aesDecrypt;
