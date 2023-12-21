////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { createDate } from '../src';

describe('Unit test of the createDate() function', () => {
  it('createDate() should work for 1 arguments', () => {
    const date = createDate(2022);
    expect(date.getFullYear()).toBe(2022);
    expect(date.getMonth()).toBe(0);
    expect(date.getDate()).toBe(1);
    expect(date.getHours()).toBe(0);
    expect(date.getMinutes()).toBe(0);
    expect(date.getSeconds()).toBe(0);
    expect(date.getMilliseconds()).toBe(0);
  });

  it('createDate() should work for 2 arguments', () => {
    const date = createDate(2022, 2);
    expect(date.getFullYear()).toBe(2022);
    expect(date.getMonth()).toBe(1);
    expect(date.getDate()).toBe(1);
    expect(date.getHours()).toBe(0);
    expect(date.getMinutes()).toBe(0);
    expect(date.getSeconds()).toBe(0);
    expect(date.getMilliseconds()).toBe(0);
  });

  it('createDate() should work for 3 arguments', () => {
    const date = createDate(2022, 2, 2);
    expect(date.getFullYear()).toBe(2022);
    expect(date.getMonth()).toBe(1);
    expect(date.getDate()).toBe(2);
    expect(date.getHours()).toBe(0);
    expect(date.getMinutes()).toBe(0);
    expect(date.getSeconds()).toBe(0);
    expect(date.getMilliseconds()).toBe(0);
  });

  it('createDate() should work for 4 arguments', () => {
    const date = createDate(2022, 2, 13, 12);
    expect(date.getFullYear()).toBe(2022);
    expect(date.getMonth()).toBe(1);
    expect(date.getDate()).toBe(13);
    expect(date.getHours()).toBe(12);
    expect(date.getMinutes()).toBe(0);
    expect(date.getSeconds()).toBe(0);
    expect(date.getMilliseconds()).toBe(0);
  });

  it('createDate() should work for 5 arguments', () => {
    const date = createDate(2022, 1, 23, 12, 30);
    expect(date.getFullYear()).toBe(2022);
    expect(date.getMonth()).toBe(0);
    expect(date.getDate()).toBe(23);
    expect(date.getHours()).toBe(12);
    expect(date.getMinutes()).toBe(30);
    expect(date.getSeconds()).toBe(0);
    expect(date.getMilliseconds()).toBe(0);
  });

  it('createDate() should work for 6 arguments', () => {
    const date = createDate(2022, 2, 28, 12, 30, 45);
    expect(date.getFullYear()).toBe(2022);
    expect(date.getMonth()).toBe(1);
    expect(date.getDate()).toBe(28);
    expect(date.getHours()).toBe(12);
    expect(date.getMinutes()).toBe(30);
    expect(date.getSeconds()).toBe(45);
    expect(date.getMilliseconds()).toBe(0);
  });

  it('createDate() should work for all 7 arguments', () => {
    const date = createDate(2022, 1, 1, 12, 30, 45, 123);
    expect(date.getFullYear()).toBe(2022);
    expect(date.getMonth()).toBe(0);
    expect(date.getDate()).toBe(1);
    expect(date.getHours()).toBe(12);
    expect(date.getMinutes()).toBe(30);
    expect(date.getSeconds()).toBe(45);
    expect(date.getMilliseconds()).toBe(123);
  });

  it('createDate() should throw TypeError for invalid arguments', () => {
    expect(() => createDate('2022')).toThrow(TypeError);
    expect(() => createDate(2022, '2')).toThrow(TypeError);
    expect(() => createDate(2022, 2, '2')).toThrow(TypeError);
    expect(() => createDate(2022, 2, 2, '12')).toThrow(TypeError);
    expect(() => createDate(2022, 2, 2, 12, '30')).toThrow(TypeError);
    expect(() => createDate(2022, 2, 2, 12, 30, '45')).toThrow(TypeError);
    expect(() => createDate(2022, 2, 2, 12, 30, 45, '123')).toThrow(TypeError);
  });

  it('createDate() should throw RangeError for invalid arguments', () => {
    expect(() => createDate(-1)).toThrow(RangeError);
    expect(() => createDate(10000)).toThrow(RangeError);
    expect(() => createDate(2022, 0)).toThrow(RangeError);
    expect(() => createDate(2022, 13)).toThrow(RangeError);
    expect(() => createDate(2022, 2, 0)).toThrow(RangeError);
    expect(() => createDate(2022, 2, 32)).toThrow(RangeError);
    expect(() => createDate(2022, 2, 2, -1)).toThrow(RangeError);
    expect(() => createDate(2022, 2, 2, 24)).toThrow(RangeError);
    expect(() => createDate(2022, 2, 2, 12, -1)).toThrow(RangeError);
    expect(() => createDate(2022, 2, 2, 12, 60)).toThrow(RangeError);
    expect(() => createDate(2022, 2, 2, 12, 30, -1)).toThrow(RangeError);
    expect(() => createDate(2022, 2, 2, 12, 30, 60)).toThrow(RangeError);
    expect(() => createDate(2022, 2, 2, 12, 30, 45, -1)).toThrow(RangeError);
    expect(() => createDate(2022, 2, 2, 12, 30, 45, 1000)).toThrow(RangeError);
  });
});
