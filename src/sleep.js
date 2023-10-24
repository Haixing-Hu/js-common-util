////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

/**
 * 异步sleep函数。用下面语句调用可让当前异步线程暂停指定的时间：
 *
 * await sleep(milliseconds)
 *
 * 注意上述调用只能用于 async 函数。
 *
 * @param {Number} milliseconds
 *     带休眠的时间，单位为毫秒。
 * @return {Promise}
 *     一个{@link Promise}对象，用于异步等待。
 */
async function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export default sleep;
