/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2018
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/
import dayjs from 'dayjs';
import translateConsoleArguments from './impl/translate-console-arguments';

/**
 * 预定义的日志级别。
 *
 * @author 胡海星
 * @private
 */
const LOG_LEVEL_VALUE = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4,
};

/**
 * 默认的日志级别，默认的日志级别是'DEBUG'。
 *
 * @author 胡海星
 * @private
 */
const DEFAULT_LOG_LEVEL = 'DEBUG';

/**
 * 日期时间格式。
 *
 * @author 胡海星
 * @private
 */
const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * 一个简单的日志类。
 *
 * @author 胡海星
 */
class Logger {
  /**
   * 构造一个日志对象。
   *
   * @param {String} level
   *     可选，表示该对象的日志级别。默认值为 DEFAULT_LOG_LEVEL。
   * @param {Object} appender
   *     可选，表示日志的内容输出管道。此对象必须提供 info, debug, warn, error等
   *     方法。默认值为 console。
   */
  constructor(level = DEFAULT_LOG_LEVEL, appender = console) {
    this.setLevel(level);
    this.setAppender(appender);
    this.log = this._log;
    this.debug = this._debug;
    this.info = this._info;
    this.warn = this._warn;
    this.error = this._error;
    this.lastTimestamp = '';       // 记录上次日志输出时的时间戳
  }

  /**
   * 禁用此日志对象。
   */
  disable() {
    this.log = () => {};
    this.debug = () => {};
    this.info = () => {};
    this.warn = () => {};
    this.error = () => {};
  }

  /**
   * 启用此日志对象。
   */
  enable() {
    this.log = this._log;
    this.debug = this._debug;
    this.info = this._info;
    this.warn = this._warn;
    this.error = this._error;
  }

  /**
   * 启用或禁用此日志对象。
   *
   * @param {Boolean} enabled
   *    是否启用此日志对象。
   */
  setEnabled(enabled) {
    if (enabled) {
      this.enable();
    } else {
      this.disable();
    }
  }

  /**
   * 设置新的Appender。
   *
   * @param {Object} appender
   *     新的Appender，作为日志的内容输出管道。此对象必须提供 info, debug, warn,
   *     error等方法。
   */
  setAppender(appender) {
    this.appender = appender;
  }

  /**
   * 获取此logger的日志级别。
   *
   * @return {String}
   *     此logger的日志级别。可能的返回值为'DEBUG', 'INFO', 'WARN', 'ERROR', 'NONE'。
   */
  getLevel() {
    return this.level;
  }

  /**
   * 设置新的日志级别。
   *
   * @param {String} level
   *     新的日志级别。可选的级别为'DEBUG', 'INFO', 'WARN', 'ERROR', 'NONE'。
   */
  setLevel(level) {
    if (LOG_LEVEL_VALUE[level] === undefined) {
      throw new RangeError(`未知的日志级别"${level}"；可选日志级别为："DEBUG", "INFO", "WARN", "ERROR", "NONE"。`);
    }
    this.level = level;
  }

  /**
   * 记录一条消息。
   *
   * @param {String} level
   *     该消息的日志级别。
   * @param {String} message
   *     指定的消息的模板。消息中可以包含形如{0},{1},{2}...这样的占位符，分别表示将被后面的
   *     第0个参数、第1个参数、第2个参数所替换。
   * @param {Array} args
   *     用于格式化消息字符串的参数。
   * @private
   */
  _log(level, message, args) {
    if (LOG_LEVEL_VALUE[level] < LOG_LEVEL_VALUE[this.level]) {
      return;
    }
    const timestamp = dayjs().format(TIMESTAMP_FORMAT);
    const parameters = translateConsoleArguments(message, args);
    const output = this._getOutput(level);
    output(`[${level}]`, timestamp, ...parameters);
    this.lastTimestamp = timestamp;   // 记录日志输出时的时间戳
  }

  /**
   * 获取指定日志级别对应的 appender 的输出函数。
   *
   * 注意，为了能让一些虚拟 console（例如 VConsole,  Eruda等）能正确地注入
   * console，不能用map预先定义好各级别对应的console输出函数，而必须在输出
   * 时实时地获取各级别对应的console输出函数。
   *
   * @param {String} level
   *     指定的日志级别。
   * @return {Function}
   *     根据指定的日志级别，返回对应的appender对象的方法。
   * @private
   */
  _getOutput(level) {
    switch (level) {
      case 'DEBUG':
        return this.appender.debug;
      case 'INFO':
        return this.appender.info;
      case 'WARN':
        return this.appender.warn;
      case 'ERROR':
        return this.appender.error;
      default:
        return () => {};
    }
  }

  /**
   * Logs a message in the DEBUG level.
   *
   * @param {String} message
   *     the message or message template, which may contain zero or more
   *     placeholders, e.g., '{0}', '{1}', ...
   * @param {Array} args
   *     the array of arguments used to format the message.
   * @private
   */
  _debug(message, ...args) {
    this._log('DEBUG', message, args);
  }

  /**
   * Logs a message in the INFO level.
   *
   * @param {String} message
   *     the message or message template, which may contain zero or more
   *     placeholders, e.g., '{0}', '{1}', ...
   * @param {Array} args
   *     the array of arguments used to format the message.
   * @private
   */
  _info(message, ...args) {
    this._log('INFO', message, args);
  }

  /**
   * Logs a message in the WARN level.
   *
   * @param {String} message
   *     the message or message template, which may contain zero or more
   *     placeholders, e.g., '{0}', '{1}', ...
   * @param {Array} args
   *     the array of arguments used to format the message.
   * @private
   */
  _warn(message, ...args) {
    this._log('WARN', message, args);
  }

  /**
   * Logs a message in the ERROR level.
   *
   * @param {String} message
   *     the message or message template, which may contain zero or more
   *     placeholders, e.g., '{0}', '{1}', ...
   * @param {Array} args
   *     the array of arguments used to format the message.
   * @private
   */
  _error(message, ...args) {
    this._log('ERROR', message, args);
  }
}

/**
 * A predefined default constructed logger object.
 *
 * @author 胡海星
 */
const logger = new Logger();

export {
  Logger,
  logger,
};
