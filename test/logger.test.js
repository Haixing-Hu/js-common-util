/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2020
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/
import { logger, Logger } from '../main';

/**
 * 单元测试 'logger'，使用默认的 console 作为输出。
 *
 * @author 胡海星
 */
describe('logger: Use console', () => {
  test('logger.debug', () => {
    const arg1 = 'hello';
    const arg2 = {
      name: 'world',
      value: 123,
    };
    logger.debug('This is a debug message: {0}, and another is {1} that is all.', arg1, arg2);
  });
  test('logger.info', () => {
    const arg1 = 'hello';
    const arg2 = {
      name: 'world',
      value: 123,
    };
    logger.info('This is a info message: {0}, and another is {1} that is all.', arg1, arg2);
  });
  test('logger.warn', () => {
    const arg1 = 'hello';
    const arg2 = {
      name: 'world',
      value: 123,
    };
    logger.warn('This is a warn message: {0}, and another is {1} that is all.', arg1, arg2);
  });
  test('logger.error', () => {
    const arg1 = 'hello';
    const arg2 = {
      name: 'world',
      value: 123,
    };
    logger.error('This is a error message: {0}, and another is {1} that is all.', arg1, arg2);
  });
});

/**
 * 单元测试 'logger'，使用自定义的 Appender 作为输出。
 *
 * @author 胡海星
 */
describe('logger: Use customized appender', () => {
  const logs = [];        // 记录所有的日志
  const appender = {
    debug: (...args) => {
      logs.push({ type: 'DEBUG', args });
      console.debug(...args);
    },
    info: (...args) => {
      logs.push({ type: 'INFO', args });
      console.info(...args);
    },
    warn: (...args) => {
      logs.push({ type: 'WARN', args });
      console.warn(...args);
    },
    error: (...args) => {
      logs.push({ type: 'ERROR', args });
      console.error(...args);
    },
  };
  logger.setAppender(appender);   // 设置自定义的 appender

  test('logger.debug', () => {
    const arg1 = 'hello';
    const arg2 = {
      name: 'world',
      value: 123,
    };
    logger.debug('This is a debug message: {0}, and another is {1} that is all.', arg1, arg2);
    expect(logs[0].type).toBe('DEBUG');
    expect(logs[0].args).toEqual([
      '[DEBUG]',
      logger.lastTimestamp,
      'This is a debug message:',
      'hello',
      ', and another is',
      arg2,
      'that is all.',
    ]);
  });
  test('logger.info', () => {
    const arg1 = 'hello';
    const arg2 = {
      name: 'world',
      value: 123,
    };
    logger.info('This is a info message: {0}, and another is {1} that is all.', arg1, arg2);
    expect(logs[1].type).toBe('INFO');
    expect(logs[1].args).toEqual([
      '[INFO]',
      logger.lastTimestamp,
      'This is a info message:',
      'hello',
      ', and another is',
      arg2,
      'that is all.',
    ]);
  });
  test('logger.warn', () => {
    const arg1 = 'hello';
    const arg2 = {
      name: 'world',
      value: 123,
    };
    logger.warn('This is a warn message: {0}, and another is {1} that is all.', arg1, arg2);
    expect(logs[2].type).toBe('WARN');
    expect(logs[2].args).toEqual([
      '[WARN]',
      logger.lastTimestamp,
      'This is a warn message:',
      'hello',
      ', and another is',
      arg2,
      'that is all.',
    ]);
  });
  test('logger.error', () => {
    const arg1 = 'hello';
    const arg2 = {
      name: 'world',
      value: 123,
    };
    logger.error('This is a error message: {0}, and another is {1} that is all.', arg1, arg2);
    expect(logs[3].type).toBe('ERROR');
    expect(logs[3].args).toEqual([
      '[ERROR]',
      logger.lastTimestamp,
      'This is a error message:',
      'hello',
      ', and another is',
      arg2,
      'that is all.',
    ]);
  });
});

/**
 * 单元测试 'logger'，设置日志级别。
 *
 * @author 胡海星
 */
describe('logger: set logging level', () => {
  let logs = [];        // 记录所有的日志
  const appender = {
    debug: (...args) => {
      logs.push({ type: 'DEBUG', args });
      console.debug(...args);
    },
    info: (...args) => {
      logs.push({ type: 'INFO', args });
      console.info(...args);
    },
    warn: (...args) => {
      logs.push({ type: 'WARN', args });
      console.warn(...args);
    },
    error: (...args) => {
      logs.push({ type: 'ERROR', args });
      console.error(...args);
    },
  };
  test('correct logging level in constructor', () => {
    const l = new Logger('ERROR', appender);
    logs = [];
    l.debug('debugging level should not be logged');
    l.info('info level should not be logged');
    l.warn('warn level should not be logged');
    l.error('error level should be logged');
    expect(logs.length).toBe(1);
    expect(logs[0].type).toBe('ERROR');
    expect(logs[0].args).toEqual([
      '[ERROR]',
      l.lastTimestamp,
      'error level should be logged',
    ]);
  });
  test('wrong logging level in constructor', () => {
    expect(() => {
      new Logger('XXX');
    }).toThrowWithMessage(
      RangeError,
      '未知的日志级别"XXX"；可选日志级别为："DEBUG", "INFO", "WARN", "ERROR", "NONE"。',
    );
  });
  test('correct logging level in setLevel()', () => {
    const l = new Logger('DEBUG', appender);
    logs = [];
    l.debug('debugging level should be logged');
    expect(logs.length).toBe(1);
    expect(logs[0]).toEqual({
      type: 'DEBUG',
      args: [
        '[DEBUG]',
        l.lastTimestamp,
        'debugging level should be logged',
      ],
    });
    l.setLevel('ERROR');
    l.info('info level should not be logged');
    l.warn('warn level should not be logged');
    l.error('error level should be logged');
    expect(logs.length).toBe(2);
    expect(logs[1]).toEqual({
      type: 'ERROR',
      args: [
        '[ERROR]',
        l.lastTimestamp,
        'error level should be logged',
      ],
    });
  });
  test('wrong logging level in setLevel()', () => {
    const l = new Logger();
    expect(() => {
      l.setLevel('YYYY');
    }).toThrowWithMessage(
      RangeError,
      '未知的日志级别"YYYY"；可选日志级别为："DEBUG", "INFO", "WARN", "ERROR", "NONE"。',
    );
  });
});
