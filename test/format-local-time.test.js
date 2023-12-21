////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { createDate, formatLocalTime } from '../src';

describe('Test formatLocalTime()', () => {
  it('formatLocalTime() should work for hour >= 10, minute >= 10, and second >= 10', () => {
    const date = createDate(2021, 12, 10, 13, 21, 34);
    expect(formatLocalTime(date)).toBe('13:21:34');
  });
  it('formatLocalTime() should work for hour < 10, minute >= 10, and second >= 10', () => {
    const date = createDate(2021, 8, 10, 3, 21, 34);
    expect(formatLocalTime(date)).toBe('03:21:34');
  });
  it('formatLocalTime() should work for hour >= 10, minute < 10, and second >= 10', () => {
    const date = createDate(2021, 11, 8, 13, 3, 34);
    expect(formatLocalTime(date)).toBe('13:03:34');
  });
  it('formatLocalTime() should work for hour >= 10, minute >= 10, and second < 10', () => {
    const date = createDate(2021, 11, 8, 13, 21, 4);
    expect(formatLocalTime(date)).toBe('13:21:04');
  });
  it('formatLocalTime() should work for hour < 10, minute < 10, and second >= 10', () => {
    const date = createDate(2021, 3, 8, 3, 3, 34);
    expect(formatLocalTime(date)).toBe('03:03:34');
  });
  it('formatLocalTime() should work for hour < 10, minute >= 10, and second < 10', () => {
    const date = createDate(2021, 3, 8, 3, 21, 4);
    expect(formatLocalTime(date)).toBe('03:21:04');
  });
  it('formatLocalTime() should work for hour >= 10, minute < 10, and second < 10', () => {
    const date = createDate(2021, 3, 8, 13, 3, 4);
    expect(formatLocalTime(date)).toBe('13:03:04');
  });
  it('formatLocalTime() should work for hour < 10, minute < 10, and second < 10', () => {
    const date = createDate(2021, 3, 8, 3, 3, 4);
    expect(formatLocalTime(date)).toBe('03:03:04');
  });
  it('formatLocalTime() should throw TypeError for invalid Date argument', () => {
    expect(() => {
      formatLocalTime('2021-03-08');
    }).toThrow(TypeError);
  });
});
