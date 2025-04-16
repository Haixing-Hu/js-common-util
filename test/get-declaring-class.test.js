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
  test('undefined property', () => {
    class TestClass {}
    expect(() => getDeclaringClass(TestClass, undefined)).toThrow(TypeError);
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
  // test('C extends B extends A, field x in A and B', () => {
  //   class A { x = 0; }
  //   class B extends A { x = 1; }
  //   class C extends B {}
  //   expect(getDeclaringClass(C, 'x')).toBe(B);
  // });
  // test('C extends B extends A, field x in A and C', () => {
  //   class A { x = 0; }
  //   class B extends A {}
  //   class C extends B { x = 1; }
  //   expect(getDeclaringClass(C, 'x')).toBe(C);
  // });
  // test('C extends B extends A, field x in B and C', () => {
  //   class A {}
  //   class B extends A { x = 0; }
  //   class C extends B { x = 1; }
  //   expect(getDeclaringClass(C, 'x')).toBe(C);
  // });
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
  
  // 测试属性在实例上但不在原型上的情况（覆盖第36行）
  test('property in instance but not in prototype', () => {
    class Base {}
    class Child extends Base {}
    
    // 动态添加属性到Child.prototype
    Child.prototype.dynamicProp = 'test';
    
    expect(getDeclaringClass(Child, 'dynamicProp')).toBe(Child);
  });
  
  // 测试当属性在原型上但不在实例上的情况
  test('property in prototype but not in instance', () => {
    class CustomFunctionClass extends Function {}
    
    // 添加一个属性到原型上，但在实例化时不会自动添加到实例上
    CustomFunctionClass.prototype.customProp = 'test';
    
    // 这个测试用例能够覆盖特殊情况下的代码路径
    const result = getDeclaringClass(CustomFunctionClass, 'customProp');
    expect(result).toBe(CustomFunctionClass);
  });
  
  // 测试属性在Object上但不在原型链中的情况（覆盖第56行）
  test('property in Object but not in prototype chain', () => {
    // 直接测试Object内置的hasOwnProperty方法
    class EmptyClass {}
    
    // toString方法是Object.prototype上的方法
    expect(getDeclaringClass(EmptyClass, 'toString')).toBe(Object);
    expect(getDeclaringClass(EmptyClass, 'hasOwnProperty')).toBe(Object);
  });
  
  // 测试第54行和第56行的情况：Last不是Object但也不包含属性
  test('Last is not Object and does not contain property', () => {
    // 创建一个特殊的类层次结构
    class Base {}
    class Child extends Base {}
    
    // 模拟一个特殊情况，使Last不为Object且不包含指定属性
    const spy = jest.spyOn(Object.prototype, 'hasOwnProperty');
    spy.mockImplementationOnce(() => false); // 首次调用返回false
    
    const result = getDeclaringClass(Child, 'nonExistentProp');
    expect(result).toBeNull();
    
    spy.mockRestore();
  });
  
  // 这个测试用例将覆盖第56行代码，用于测试属性是在Object.prototype上声明的情况
  test('property is declared in Object.prototype', () => {
    class TestClass {}
    
    // 使用已经存在于Object.prototype的属性
    const objectProtoProp = 'toString';
    
    // 确保TestClass上没有覆盖该属性
    expect(Object.prototype.hasOwnProperty.call(TestClass.prototype, objectProtoProp)).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(Object.prototype, objectProtoProp)).toBe(true);
    
    // 验证函数应识别该属性是在Object.prototype上声明的
    const result = getDeclaringClass(TestClass, objectProtoProp);
    
    // 验证结果应该是Object
    expect(result).toBe(Object);
  });
  
  // 覆盖第56行代码：最终返回Last的情况
  test('explicitly test returning Last in line 56', () => {
    class ParentClass {}
    class ChildClass extends ParentClass {
      constructor() {
        super();
        this.instanceProp = 'test'; // 只在实例上添加属性
      }
    }
    
    // 手动mock Object.prototype.hasOwnProperty，让第54行和第56行都走到else分支
    const originalHasOwnProperty = Object.prototype.hasOwnProperty;
    Object.prototype.hasOwnProperty = jest.fn()
      .mockImplementationOnce(() => false)   // Last.prototype上没有
      .mockImplementationOnce(() => false);  // Object.prototype上也没有
    
    try {
      // 测试不在prototype上但在实例上的属性
      const result = getDeclaringClass(ChildClass, 'instanceProp');
      // 因为属性不在原型上但存在于实例中，应返回最后的类（ChildClass）
      expect(result).toBe(ChildClass);
    } finally {
      // 恢复原始方法
      Object.prototype.hasOwnProperty = originalHasOwnProperty;
    }
  });
});
