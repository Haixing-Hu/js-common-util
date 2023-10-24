////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { round } from '../src';

/**
 * 单元测试 'round' 函数
 *
 * @author 胡海星
 */
describe('round', () => {
  test('round(3.14)', () => {
    const value = 3.14;
    expect(round(value)).toBe(3);
  });
  test('round(3.49)', () => {
    const value = 3.49;
    expect(round(value)).toBe(3);
  });
  test('round(3.50)', () => {
    const value = 3.50;
    expect(round(value)).toBe(4);
  });

  test('round(3.1415926, 2)', () => {
    const value = 3.1415926;
    const digits = 2;
    expect(round(value, digits)).toBe(3.14);
  });
  test('round(3.1415926, 3)', () => {
    const value = 3.1415926;
    const digits = 3;
    expect(round(value, digits)).toBe(3.142);
  });
  test('round(3.1415926, 4)', () => {
    const value = 3.1415926;
    const digits = 4;
    expect(round(value, digits)).toBe(3.1416);
  });
  test('round(3.1015926, 2)', () => {
    const value = 3.1015926;
    const digits = 2;
    expect(round(value, digits)).toBe(3.1);
  });
  test('round(NaN, 2)', () => {
    const value = NaN;
    const digits = 2;
    expect(round(value, digits)).toBeNaN;
  });
  test('round("", 2)', () => {
    const value = 'xx';
    const digits = 2;
    expect(round(value, digits)).toBeNaN;
  });
  test('round(3.14, "x")', () => {
    const value = 3.14;
    const digits = 'x';
    expect(round(value, digits)).toBeNaN;
  });

  test('round(Infinity, 2)', () => {
    const value = Infinity;
    const digits = 2;
    expect(round(value, digits)).not.toBeFinite();
  });
  test('round(-Infinity, 2)', () => {
    const value = -Infinity;
    const digits = 2;
    expect(round(value, digits)).not.toBeFinite();
  });
});
