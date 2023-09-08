/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * 阿里云OSS服务器对图片旋转的处理器参数前缀。
 *
 * @private
 */
const OSS_ROTATION_PROCESS_REGEX = /[?&]x-oss-process=image\/rotate,([0-9]+)/;

/**
 * 从阿里云OSS服务器的URL中提取其图片信息。
 *
 * 注意，从阿里云OSS服务器获取的图片URL可能会加上旋转参数，例如
 * https://a.aliyuncs.com/yangzi/dev/ac622799-c62f-4e64-a76a-0ec685dee893.png?x-oss-process=image/rotate,210
 * 此函数将会将图片的原始URL和旋转参数分隔开。
 *
 * 目前此函数仅支持旋转预处理参数。
 *
 * @param {String} url
 *     一个阿里云OSS服务器中存储的图片的URL，可能带有预处理参数。
 * @return 返回一个对象，属性url表示该附件原始图片的URL（注意不加OSS处理参数），
 *     属性degree表示该附件图片相对原始图片所旋转的角度。
 */
function extractOssUrlInfo(url) {
  if (!url) {
    return null;
  }
  const match = url.match(OSS_ROTATION_PROCESS_REGEX);
  if (match) {
    const degree = parseInt(match[1], 10);
    return { url: url.replace(OSS_ROTATION_PROCESS_REGEX, ''), degree };
  } else {
    return { url, degree: 0 };
  }
}

export default extractOssUrlInfo;
