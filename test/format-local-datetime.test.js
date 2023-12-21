////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { createDate, formatLocalDatetime } from '../src';

describe('Test formatLocalDatetime()', () => {
  it('formatLocalDatetime() should work for month >= 10, day >= 10, hour >= 10, minute >= 10, and second >= 10', () => {
    const date = createDate(2021, 12, 10, 13, 21, 34);
    expect(formatLocalDatetime(date)).toBe('2021-12-10 13:21:34');
  });
  it('formatLocalDatetime() should work for month < 10, day >= 10, hour >= 10, minute >= 10, and second >= 10', () => {
    const date = createDate(2021, 8, 10, 13, 21, 34);
    expect(formatLocalDatetime(date)).toBe('2021-08-10 13:21:34');
  });
  it('formatLocalDatetime() should work for month >= 10, day < 10, hour >= 10, minute >= 10, and second >= 10', () => {
    const date = createDate(2021, 11, 8, 13, 21, 34);
    expect(formatLocalDatetime(date)).toBe('2021-11-08 13:21:34');
  });
  it('formatLocalDatetime() should work for month >= 10, day >= 10, hour < 10, minute >= 10, and second >= 10', () => {
    const date = createDate(2021, 11, 8, 3, 21, 34);
    expect(formatLocalDatetime(date)).toBe('2021-11-08 03:21:34');
  });
  it('formatLocalDatetime() should work for month >= 10, day >= 10, hour >= 10, minute < 10, and second >= 10', () => {
    const date = createDate(2021, 11, 8, 13, 3, 34);
    expect(formatLocalDatetime(date)).toBe('2021-11-08 13:03:34');
  });
  it('formatLocalDatetime() should work for month >= 10, day >= 10, hour >= 10, minute >= 10, and second < 10', () => {
    const date = createDate(2021, 11, 8, 13, 21, 4);
    expect(formatLocalDatetime(date)).toBe('2021-11-08 13:21:04');
  });
  it('formatLocalDatetime() should work for month < 10, day < 10, hour >= 10, minute >= 10, and second >= 10', () => {
    const date = createDate(2021, 3, 8, 13, 21, 34);
    expect(formatLocalDatetime(date)).toBe('2021-03-08 13:21:34');
  });
  it('formatLocalDatetime() should work for month < 10, day >= 10, hour < 10, minute >= 10, and second >= 10', () => {
    const date = createDate(2021, 3, 8, 3, 21, 34);
    expect(formatLocalDatetime(date)).toBe('2021-03-08 03:21:34');
  });
  it('formatLocalDatetime() should work for month < 10, day >= 10, hour >= 10, minute < 10, and second >= 10', () => {
    const date = createDate(2021, 3, 8, 13, 3, 34);
    expect(formatLocalDatetime(date)).toBe('2021-03-08 13:03:34');
  });
  it('formatLocalDatetime() should work for month < 10, day >= 10, hour >= 10, minute >= 10, and second < 10', () => {
    const date = createDate(2021, 3, 8, 13, 21, 4);
    expect(formatLocalDatetime(date)).toBe('2021-03-08 13:21:04');
  });
  it('formatLocalDatetime() should work for month >= 10, day < 10, hour < 10, minute >= 10, and second >= 10', () => {
    const date = createDate(2021, 11, 8, 3, 21, 34);
    expect(formatLocalDatetime(date)).toBe('2021-11-08 03:21:34');
  });
  it('formatLocalDatetime() should work for month >= 10, day < 10, hour >= 10, minute < 10, and second >= 10', () => {
    const date = createDate(2021, 11, 8, 13, 3, 34);
    expect(formatLocalDatetime(date)).toBe('2021-11-08 13:03:34');
  });
  it('formatLocalDatetime() should work for month >= 10, day < 10, hour >= 10, minute >= 10, and second < 10', () => {
    const date = createDate(2021, 11, 8, 13, 21, 4);
    expect(formatLocalDatetime(date)).toBe('2021-11-08 13:21:04');
  });
  it('formatLocalDatetime() should work for month >= 10, day >= 10, hour < 10, minute < 10, and second >= 10', () => {
    const date = createDate(2021, 11, 8, 3, 3, 34);
    expect(formatLocalDatetime(date)).toBe('2021-11-08 03:03:34');
  });
  it('formatLocalDatetime() should work for month >= 10, day >= 10, hour < 10, minute >= 10, and second < 10', () => {
    const date = createDate(2021, 11, 8, 3, 21, 4);
    expect(formatLocalDatetime(date)).toBe('2021-11-08 03:21:04');
  });
  it('formatLocalDatetime() should work for month >= 10, day >= 10, hour >= 10, minute < 10, and second < 10', () => {
    const date = createDate(2021, 11, 8, 13, 3, 4);
    expect(formatLocalDatetime(date)).toBe('2021-11-08 13:03:04');
  });
  it('formatLocalDatetime() should work for month < 10, day < 10, hour < 10, minute >= 10, and second >= 10', () => {
    const date = createDate(2021, 3, 8, 3, 21, 34);
    expect(formatLocalDatetime(date)).toBe('2021-03-08 03:21:34');
  });
  it('formatLocalDatetime() should work for month < 10, day < 10, hour >= 10, minute < 10, and second >= 10', () => {
    const date = createDate(2021, 3, 8, 13, 3, 34);
    expect(formatLocalDatetime(date)).toBe('2021-03-08 13:03:34');
  });
  it('formatLocalDatetime() should work for month < 10, day < 10, hour >= 10, minute >= 10, and second < 10', () => {
    const date = createDate(2021, 3, 8, 13, 21, 4);
    expect(formatLocalDatetime(date)).toBe('2021-03-08 13:21:04');
  });
  it('formatLocalDatetime() should work for month < 10, day >= 10, hour < 10, minute < 10, and second >= 10', () => {
    const date = createDate(2021, 3, 8, 3, 3, 34);
    expect(formatLocalDatetime(date)).toBe('2021-03-08 03:03:34');
  });
  it('formatLocalDatetime() should work for month < 10, day >= 10, hour < 10, minute >= 10, and second < 10', () => {
    const date = createDate(2021, 3, 8, 3, 21, 4);
    expect(formatLocalDatetime(date)).toBe('2021-03-08 03:21:04');
  });
  it('formatLocalDatetime() should work for month < 10, day >= 10, hour >= 10, minute < 10, and second < 10', () => {
    const date = createDate(2021, 3, 8, 13, 3, 4);
    expect(formatLocalDatetime(date)).toBe('2021-03-08 13:03:04');
  });
  it('formatLocalDatetime() should work for month >= 10, day < 10, hour < 10, minute < 10, and second >= 10', () => {
    const date = createDate(2021, 11, 8, 3, 3, 34);
    expect(formatLocalDatetime(date)).toBe('2021-11-08 03:03:34');
  });
  it('formatLocalDatetime() should work for month >= 10, day < 10, hour < 10, minute >= 10, and second < 10', () => {
    const date = createDate(2021, 11, 8, 3, 21, 4);
    expect(formatLocalDatetime(date)).toBe('2021-11-08 03:21:04');
  });
  it('formatLocalDatetime() should work for month >= 10, day < 10, hour >= 10, minute < 10, and second < 10', () => {
    const date = createDate(2021, 11, 8, 13, 3, 4);
    expect(formatLocalDatetime(date)).toBe('2021-11-08 13:03:04');
  });
  it('formatLocalDatetime() should work for month < 10, day < 10, hour < 10, minute < 10, and second >= 10', () => {
    const date = createDate(2021, 3, 8, 3, 3, 34);
    expect(formatLocalDatetime(date)).toBe('2021-03-08 03:03:34');
  });
  it('formatLocalDatetime() should work for month < 10, day < 10, hour < 10, minute >= 10, and second < 10', () => {
    const date = createDate(2021, 3, 8, 3, 21, 4);
    expect(formatLocalDatetime(date)).toBe('2021-03-08 03:21:04');
  });
  it('formatLocalDatetime() should work for month < 10, day < 10, hour >= 10, minute < 10, and second < 10', () => {
    const date = createDate(2021, 3, 8, 13, 3, 4);
    expect(formatLocalDatetime(date)).toBe('2021-03-08 13:03:04');
  });
  it('formatLocalDatetime() should work for month < 10, day < 10, hour < 10, minute < 10, and second < 10', () => {
    const date = createDate(2021, 3, 8, 3, 3, 4);
    expect(formatLocalDatetime(date)).toBe('2021-03-08 03:03:04');
  });

  it('formatLocalDatetime() should throw TypeError for invalid Date argument', () => {
    expect(() => {
      formatLocalDatetime('2021-03-08');
    }).toThrow(TypeError);
  });
});
