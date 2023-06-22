/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2020
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * 将消息模板和对应的参数转化为console的方法所能使用的参数数组。
 *
 * @param {String} message
 *     指定的消息模板。
 * @param {Array} args
 *     用于格式化消息字符串的参数。
 * @return {Array}
 *     一个参数数组，可直接用于console的info,debug,error等方法的调用参数。
 * @private
 */
export default function translateConsoleArguments(message, args) {
  if (!args) {
    return [message];
  }
  // 根据占位符模式 {0}, {1}, {2} ... 等分隔消息模板
  const result = message.split(/(\{[0-9]+\})/);
  // replaced[i] 表示result中第i个元素有没有被替换过
  const replaced = result.map(() => false);
  // 对于每个参数值，用它的值替换result数组中对应的占位符
  args.forEach((arg, i) => {
    // placeholder为第i个参数对应的占位符字符串'{i}'
    const placeholder = `{${String(i)}}`;
    result.forEach((value, j) => {
      if (!replaced[j] && value === placeholder) {
        // 若result[j]没被替换过且等于第i个参数对应的占位符字符串'{i}'，则用第i个参数值替换它
        result[j] = arg;
        replaced[j] = true;
      }
    });
  });
  // console.log('2. result =', result);
  // 注意，如果 message 是 'abc {0} def'，第一个参数是 123
  // 我们期望console中打印的输出字符串是 'abc 123 def'
  // 但现在我们分隔出 result 数组为 ['abc ', 123, ' def']，
  // 执行 console.log(...result)，即执行 console.log('abc ', 123, ' def')，
  // 输出会是 'abc  123  def'，注意123前后各多了一个空格，
  // 这是因为console会在所有逗号隔开的参数之间加上空格。
  // 接下来我们想办法移除这种多余的空格
  result.forEach((value, j) => {
    if (!replaced[j] && (typeof value === 'string')) {
      if (j > 0) {                            // 若当前字符串有前一个元素
        if (value.substring(0, 1) === ' ') {  // 若当前字符串开头有个空格
          value = value.substring(1);         // 则删除该空格
        }
      }
      if (j < result.length - 1) {            // 若当前字符串有后一个元素
        const last = value.length - 1;
        if (value.substring(last) === ' ') {  // 若当前字符串末尾有个空格
          value = value.substring(0, last);   // 则删除该空格
        }
      }
      result[j] = value;
    }
  });
  // 去除result数组前后的空字符串……
  while (result[0] === '') {
    result.shift();
  }
  while (result[result.length - 1] === '') {
    result.pop();
  }
  return result;
}
