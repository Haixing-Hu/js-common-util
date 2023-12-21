////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { createDate, formatLocalDate } from '../src';

describe('Test formatLocalDate()', () => {
  it('formatLocalDate() should work for month >= 10 and day >= 10', () => {
    const date = createDate(2021, 12, 10, 13, 21, 34);
    expect(formatLocalDate(date)).toBe('2021-12-10');
  });
  it('formatLocalDate() should work for month < 10 and day >= 10', () => {
    const date = createDate(2021, 8, 10, 13, 21, 34);
    expect(formatLocalDate(date)).toBe('2021-08-10');
  });
  it('formatLocalDate() should work for month >= 10 and day < 10', () => {
    const date = createDate(2021, 11, 8, 13, 21, 34);
    expect(formatLocalDate(date)).toBe('2021-11-08');
  });
  it('formatLocalDate() should work for month < 10 and day < 10', () => {
    const date = createDate(2021, 3, 8, 13, 21, 34);
    expect(formatLocalDate(date)).toBe('2021-03-08');
  });
  it('formatLocalDate() should throw TypeError for invalid Date argument', () => {
    expect(() => {
      formatLocalDate('2021-03-08');
    }).toThrow(TypeError);
  });
});
