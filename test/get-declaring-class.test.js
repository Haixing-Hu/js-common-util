/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2020
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/
import { getDeclaringClass } from '../main';

/**
  * 单元测试 'getDeclaringClass'
  *
  * @author 胡海星
  */
describe('getDeclaringClass', () => {
  test('undefined', () => {
    const cls = undefined;
    expect(getDeclaringClass(cls, 'x')).toBeNull();
  });
  test('null', () => {
    const cls = null;
    expect(getDeclaringClass(cls, 'x')).toBeNull();
  });
  test('"abc"', () => {
    const cls = 'abc';
    expect(getDeclaringClass(cls, 'x')).toBeNull();
  });
  test('Object', () => {
    expect(getDeclaringClass(Object, 'x')).toBeNull();
  });
  test('Foo, x not in Foo', () => {
    class Foo { y = 0; }
    expect(getDeclaringClass(Foo, 'x')).toBeNull();
  });
  test('Foo, x in Foo', () => {
    class Foo { x = 0; }
    expect(getDeclaringClass(Foo, 'x')).toBe(Foo);
  });
  test('C extends B extends A, x in A', () => {
    class A { x = 0; }
    class B extends A {}
    class C extends B {}
    expect(getDeclaringClass(C, 'x')).toBe(A);
  });
  test('C extends B extends A, x in A and B', () => {
    class A { x = 0; }
    class B extends A { x = 1; }
    class C extends B {}
    expect(getDeclaringClass(C, 'x')).toBe(A);
  });
  test('C extends B extends A, x in A and C', () => {
    class A { x = 0; }
    class B extends A {}
    class C extends B { x = 1; }
    expect(getDeclaringClass(C, 'x')).toBe(A);
  });
  test('C extends B extends A, x in B and C', () => {
    class A {}
    class B extends A { x = 0; }
    class C extends B { x = 1; }
    expect(getDeclaringClass(C, 'x')).toBe(B);
  });
});
