/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import round from './round';
import stringToFloat from './string-to-float';

/**
 * 把一个字符串解析为表示货币金额的浮点数。
 *
 * 注意货币金额将被四舍五入并只保留指定的小数位（默认为2位小数）。
 *
 * @param {String|Number} value
 *     待转换的字符串，也可以本身就是一个数字。
 * @param {Number} digits
 *     四舍五入后小数点后保留的数字位数，必须介于[0, 20]；默认值为2，既保留两位小数。
 * @return {Number}
 *     输入值所表示的货币金额。
 * @author 胡海星
 */
function stringToMoney(value, digits = 2) {
  return round(stringToFloat(value), digits);
}

export default stringToMoney;
