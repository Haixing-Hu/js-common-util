////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { formatDigits } from '../src';

/**
 * Unit test of the `formatDigits()` function.
 *
 * @author Haixing Hu
 */
describe('formatDigits()', () => {
  it('formatDigits(123, 0) = "123"', () => {
    expect(formatDigits(123, 0)).toBe('123');
  });
  it('formatDigits(123, 1) = "123"', () => {
    expect(formatDigits(123, 1)).toBe('123');
  });
  it('formatDigits(123, 2) = "123"', () => {
    expect(formatDigits(123, 2)).toBe('123');
  });
  it('formatDigits(123, 3) = "123"', () => {
    expect(formatDigits(123, 3)).toBe('123');
  });
  it('formatDigits(123, 4) = "0123"', () => {
    expect(formatDigits(123, 4)).toBe('0123');
  });
  it('formatDigits(123, 5) = "00123"', () => {
    expect(formatDigits(123, 5)).toBe('00123');
  });

  it('formatDigits(0, 0) = "0"', () => {
    expect(formatDigits(0, 0)).toBe('0');
  });
  it('formatDigits(0, 1) = "0"', () => {
    expect(formatDigits(0, 1)).toBe('0');
  });
  it('formatDigits(0, 2) = "00"', () => {
    expect(formatDigits(0, 2)).toBe('00');
  });
  it('formatDigits(0, 3) = "000"', () => {
    expect(formatDigits(0, 3)).toBe('000');
  });

  it('formatDigits(-123, 0) = "-123"', () => {
    expect(formatDigits(-123, 0)).toBe('-123');
  });
  it('formatDigits(-123, 1) = "-123"', () => {
    expect(formatDigits(-123, 1)).toBe('-123');
  });
  it('formatDigits(-123, 2) = "-123"', () => {
    expect(formatDigits(-123, 2)).toBe('-123');
  });
  it('formatDigits(-123, 3) = "-123"', () => {
    expect(formatDigits(-123, 3)).toBe('-123');
  });
  it('formatDigits(-123, 4) = "-0123"', () => {
    expect(formatDigits(-123, 4)).toBe('-0123');
  });
  it('formatDigits(-123, 5) = "-00123"', () => {
    expect(formatDigits(-123, 5)).toBe('-00123');
  });

  it('formatDigits(-0, 0) = "0"', () => {
    expect(formatDigits(-0, 0)).toBe('0');
  });
  it('formatDigits(-0, 1) = "0"', () => {
    expect(formatDigits(-0, 1)).toBe('0');
  });
  it('formatDigits(-0, 2) = "00"', () => {
    expect(formatDigits(-0, 2)).toBe('00');
  });
  it('formatDigits(-0, 3) = "000"', () => {
    expect(formatDigits(-0, 3)).toBe('000');
  });

  it('formatDigits(123.456, 0) throws TypeError', () => {
    expect(() => formatDigits(123.456, 0))
      .toThrowWithMessage(TypeError, 'The value must be an integer.');
  });
  it('formatDigits("123", 0) throws TypeError', () => {
    expect(() => formatDigits('123', 0))
      .toThrowWithMessage(TypeError, 'The value must be an integer.');
  });
  it('formatDigits(true, 0) throws TypeError', () => {
    expect(() => formatDigits(true, 0))
      .toThrowWithMessage(TypeError, 'The value must be an integer.');
  });
  it('formatDigits(new Date(), 0) throws TypeError', () => {
    expect(() => formatDigits(new Date(), 0))
      .toThrowWithMessage(TypeError, 'The value must be an integer.');
  });
  it('formatDigits(undefined, 0) throws TypeError', () => {
    expect(() => formatDigits(undefined, 0))
    .toThrowWithMessage(TypeError, 'The value must be an integer.');
  });
  it('formatDigits(null, 0) throws TypeError', () => {
    expect(() => formatDigits(null, 0))
    .toThrowWithMessage(TypeError, 'The value must be an integer.');
  });

  it('formatDigits(123, "2") throw TypeError', () => {
    expect(() => formatDigits(123, '2'))
      .toThrowWithMessage(TypeError, 'The digits must be an integer.');
  });
  it('formatDigits(123, 2.1) throw TypeError', () => {
    expect(() => formatDigits(123, 2.1))
    .toThrowWithMessage(TypeError, 'The digits must be an integer.');
  });
  it('formatDigits(123, true) throw TypeError', () => {
    expect(() => formatDigits(123, true))
    .toThrowWithMessage(TypeError, 'The digits must be an integer.');
  });
  it('formatDigits(123, new Date()) throw TypeError', () => {
    expect(() => formatDigits(123, new Date()))
      .toThrowWithMessage(TypeError, 'The digits must be an integer.');
  });
  it('formatDigits(123, undefined) throw TypeError', () => {
    expect(() => formatDigits(123, undefined))
    .toThrowWithMessage(TypeError, 'The digits must be an integer.');
  });
  it('formatDigits(123, null) throw TypeError', () => {
    expect(() => formatDigits(123, null))
    .toThrowWithMessage(TypeError, 'The digits must be an integer.');
  });

  it('formatDigits(123, -2) throw RangeError', () => {
    expect(() => formatDigits(123, -2))
    .toThrowWithMessage(RangeError, 'The digits must be a non-negative integer.');
  });
});
