////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { getAncestorClasses } from '../src';

/**
  * Unit test `getAncestorClasses()`
  *
  * @author Haixing Hu
  */
describe('getAncestorClasses', () => {
  test('getAncestorClasses(undefined)', () => {
    const obj = undefined;
    expect(getAncestorClasses(obj)).toEqual([]);
  });
  test('getAncestorClasses(null)', () => {
    const obj = null;
    expect(getAncestorClasses(obj)).toEqual([]);
  });
  test('getAncestorClasses("abc")', () => {
    const obj = 'abc';
    expect(getAncestorClasses(obj)).toEqual([]);
  });
  test('getAncestorClasses(Object)', () => {
    const obj = Object;
    expect(getAncestorClasses(obj)).toEqual([Object]);
  });
  test('getAncestorClasses(Foo)', () => {
    class Foo {x = 0;}
    expect(getAncestorClasses(Foo)).toEqual([Foo]);
  });
  test('getAncestorClasses(C extends B extends A)', () => {
    class A {}
    class B extends A {}
    class C extends B {}
    const ancestors = getAncestorClasses(C);
    console.log(ancestors);
    expect(ancestors).toEqual([C, B, A]);
  });
  test('getAncestorClasses(Foo extends Object)', () => {
    class Foo extends Object {x = 0;}
    const ancestors = getAncestorClasses(Foo);
    console.log(ancestors);
    expect(ancestors.length === 2 || ancestors.length === 3);
    if (ancestors.length === 2) {
      expect(ancestors).toEqual([Foo, Object]);
    } else if (ancestors.length === 3) {
      // babel 转译时，会在Foo和Object之间添加一个 Wrapper 函数
      expect(ancestors[0]).toBe(Foo);
      expect(ancestors[2]).toBe(Object);
    }
  });
});
