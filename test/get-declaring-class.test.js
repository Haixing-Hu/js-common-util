////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { getDeclaringClass } from '../src';

/**
  * 单元测试 'getDeclaringClass'
  *
  * @author 胡海星
  */
describe('getDeclaringClass', () => {
  test('undefined', () => {
    const cls = undefined;
    expect(() => getDeclaringClass(cls, 'x')).toThrow(TypeError);
  });
  test('null', () => {
    const cls = null;
    expect(() => getDeclaringClass(cls, 'x')).toThrow(TypeError);
  });
  test('"abc"', () => {
    const cls = 'abc';
    expect(() => getDeclaringClass(cls, 'x')).toThrow(TypeError);
  });
  test('Object', () => {
    expect(getDeclaringClass(Object, 'x')).toBeNull();
    expect(getDeclaringClass(Object, 'toString')).toBe(Object);
  });
  test('Foo, x not in Foo', () => {
    class Foo { y = 0; }
    expect(getDeclaringClass(Foo, 'x')).toBeNull();
  });
  test('Foo, x in Foo', () => {
    class Foo {
 x = 0;

 foo() {}
    }
    expect(getDeclaringClass(Foo, 'x')).toBe(Foo);
    expect(getDeclaringClass(Foo, 'foo')).toBe(Foo);
  });
  test('C extends B extends A, field x in A', () => {
    class A { x = 0; }
    class B extends A {}
    class C extends B {}
    expect(getDeclaringClass(C, 'x')).toBe(A);
  });
  test('C extends B extends A, field x in B', () => {
    class A { }
    class B extends A { x = 0; }
    class C extends B {}
    expect(getDeclaringClass(C, 'x')).toBe(B);
  });
  test('C extends B extends A, field x in C', () => {
    class A { }
    class B extends A { }
    class C extends B { x = 0; }
    expect(getDeclaringClass(C, 'x')).toBe(C);
  });
  test('C extends B extends A, method x in A', () => {
    class A { x() {} }
    class B extends A {}
    class C extends B {}
    expect(getDeclaringClass(C, 'x')).toBe(A);
  });
  test('C extends B extends A, method x in B', () => {
    class A { }
    class B extends A { x() {} }
    class C extends B {}
    expect(getDeclaringClass(C, 'x')).toBe(B);
  });
  test('C extends B extends A, method x in C', () => {
    class A { }
    class B extends A { }
    class C extends B { x() {} }
    expect(getDeclaringClass(C, 'x')).toBe(C);
  });
  test('C extends B extends A, field x in A and B', () => {
    class A { x = 0; }
    class B extends A { x = 1; }
    class C extends B {}
    expect(getDeclaringClass(C, 'x')).toBe(B);
  });
  test('C extends B extends A, field x in A and C', () => {
    class A { x = 0; }
    class B extends A {}
    class C extends B { x = 1; }
    expect(getDeclaringClass(C, 'x')).toBe(C);
  });
  test('C extends B extends A, field x in B and C', () => {
    class A {}
    class B extends A { x = 0; }
    class C extends B { x = 1; }
    expect(getDeclaringClass(C, 'x')).toBe(C);
  });
  test('C extends B extends A, method x in A and B', () => {
    class A { x() {} }
    class B extends A { x() {} }
    class C extends B {}
    expect(getDeclaringClass(C, 'x')).toBe(B);
  });
  test('C extends B extends A, method x in A and C', () => {
    class A { x() {} }
    class B extends A {}
    class C extends B { x() {} }
    expect(getDeclaringClass(C, 'x')).toBe(C);
  });
  test('C extends B extends A, method x in B and C', () => {
    class A {}
    class B extends A { x = 0; }
    class C extends B { x() {} }
    expect(getDeclaringClass(C, 'x')).toBe(C);
  });
  test('C extends B extends A, method toString in Object', () => {
    class A {}
    class B extends A { x = 0; }
    class C extends B { x = 1; }
    expect(getDeclaringClass(C, 'toString')).toBe(Object);
  });
  test('C extends B extends A, method toString in A', () => {
    class A { toString() {} }
    class B extends A { x = 0; }
    class C extends B { x = 1; }
    expect(getDeclaringClass(C, 'toString')).toBe(A);
  });
  test('C extends B extends A, method toString in A and B', () => {
    class A { toString() {} }
    class B extends A {
 x = 0;

 toString() {}
    }
    class C extends B { x = 1; }
    expect(getDeclaringClass(C, 'toString')).toBe(B);
  });
  test('C extends B extends A, property yy not exist', () => {
    class A { toString() {} }
    class B extends A { x = 0; }
    class C extends B { x = 1; }
    expect(getDeclaringClass(C, 'yy')).toBeNull();
  });
});
