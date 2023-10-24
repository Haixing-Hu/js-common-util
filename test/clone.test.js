////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
/* eslint-disable max-classes-per-file */
import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { clone } from '../src';
import CredentialType from './model/CredentialType';
import Credential from './model/Credential';
import Gender from './model/Gender';
import Kinship from './model/Kinship';
import Person from './model/Person';
import Buyer from './model/Buyer';
import Guardian from './model/Guardian';
import Insurant from './model/Insurant';

/**
 * 单元测试 'clone' 函数，针对内置 primitive 类型
 *
 * @author 胡海星
 */
describe('clone primitive', () => {
  test('clone(undefined)', () => {
    expect(clone(undefined)).toBeUndefined();
  });
  test('clone(null)', () => {
    expect(clone(null)).toBeNull();
  });
  test('clone(number)', () => {
    expect(clone(1)).toBe(1);
    expect(clone(-1)).toBe(-1);
    expect(clone(+0)).toBe(+0);
    expect(clone(-0)).toBe(-0);
    expect(clone(Number.INFINITY)).toBe(Number.INFINITY);
    expect(clone(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
    expect(clone(Number.NaN)).toBeNaN();
    expect(typeof clone(1)).toBe('number');
  });
  test('clone(string)', () => {
    expect(clone('')).toBe('');
    expect(clone('abc')).toBe('abc');
  });
  test('clone(boolean)', () => {
    expect(clone(false)).toBe(false);
    expect(clone(true)).toBe(true);
  });
  test('clone(symbol)', () => {
    const symbol = Symbol('symbol');
    expect(clone(symbol)).toBe(symbol);
  });
  test('clone(bigint)', () => {
    expect(clone(0n)).toBe(0n);
    expect(clone(100n)).toBe(100n);
    expect(clone(-100n)).toBe(-100n);
  });
});

function expectAlike(var1, var2) {
  expect(var1).not.toBe(var2);
  expect(var1).toEqual(var2);
}

function expectInstanceOf(obj, type) {
  expect(Object.getPrototypeOf(obj)).toBe(type.prototype);
}

function testMonkeyPatching(obj) {
  const prop = Symbol('monkeypatched');
  obj[prop] = 'prop value 1';
  obj.prop2 = 'prop value 2';
  test('MonkeyPatched attributes are preserved', () => {
    const cloned = clone(obj);
    expect(cloned[prop]).toBe(obj[prop]);
    cloned[prop] = 'different';
    expect(cloned[prop]).not.toBe(obj[prop]);
    expect(cloned.prop2).toBe(obj.prop2);
    cloned.prop2 = 'different';
    expect(cloned.prop2).not.toBe(obj.prop2);
  });
  test('MonkeyPatched attributes donot break correctness', () => {
    const cloned = clone(obj);
    expectAlike(cloned, obj);
  });
}

/**
 * 单元测试 'clone' 函数，针对内置对象
 *
 * @author 胡海星
 */
describe('clone objects', () => {
  describe('Number', () => {
    test('simple', () => {
      const obj = new Number(3.14);
      expectAlike(clone(obj), obj);
    });
    testMonkeyPatching(new Number(3.14));
  });
  describe('String', () => {
    test('simple', () => {
      const obj = new String('hello world');
      expectAlike(clone(obj), obj);
    });
    testMonkeyPatching(new String('hello world'));
  });
  describe('Boolean', () => {
    test('simple', () => {
      const obj = new Boolean(true);
      expectAlike(clone(obj), obj);
    });
    testMonkeyPatching(new Boolean(false));
  });
  describe('Date', () => {
    test('simple', () => {
      const obj = new Date();
      expectAlike(clone(obj), obj);
    });
    testMonkeyPatching(new Date());
  });
  describe('Function', () => {
    test('simple', () => {
      const obj = function foo(x) {
        return x + 1;
      };
      expect(clone(obj)).toBe(obj);
    });
    test('arrow', () => {
      const obj = (x) => x + 1;
      expect(clone(obj)).toBe(obj);
    });
    test('generator', () => {
      // TODO
      // const obj = (x) => x + 1;
      // expect(clone(obj)).toBe(obj);
    });
  });
  describe('Promise', () => {
    // TODO
  });
  describe('RegExp', () => {
    test('simple', () => {
      const obj = /x/g;
      expectAlike(clone(obj), obj);
    });
    testMonkeyPatching(/x/g);
  });
});

/**
 * 单元测试 'clone' 函数，针对内置容器对象
 *
 * @author 胡海星
 */
describe('clone containers', () => {
  describe('Array', () => {
    test('empty', () => {
      const empty = [];
      expectAlike(clone(empty), empty);
    });
    test('nonempty', () => {
      const nonempty = [Number.INFINITY, 0, undefined, Symbol('sym'), 12];
      expectAlike(clone(nonempty), nonempty);
    });
    test('nested', () => {
      const nested = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
      const cloned = clone(nested);
      expectAlike(cloned, nested);
      for (let i = 0; i < nested.length; ++i) {
        expectAlike(cloned[i], nested[i]);
      }
    });
    test('cyclic', () => {
      const cyclic = ['before', undefined, 'after'];
      cyclic[1] = cyclic;
      const cloned = clone(cyclic);
      expect(cloned[0]).toBe('before');
      expect(cloned[1]).toBe(cloned);
      expect(cloned[2]).toBe('after');
    });
    test('diamond', () => {
      const child = ['im', 'child'];
      const parent = ['before', child, 'between', child, 'after'];
      const cloned = clone(parent);
      expectAlike(cloned, parent);
      expect(cloned[1]).not.toBe(parent[1]);
      expect(cloned[3]).toBe(cloned[3]);
    });
    test('sparse', () => {
      const sparse = [1, , 3, , 5];  // eslint-disable-line no-sparse-arrays
      expectAlike(clone(sparse), sparse);
    });
    testMonkeyPatching([3, 1, 4]);
  });
  describe('Map', () => {
    test('empty', () => {
      const empty = new Map();
      expectAlike(clone(empty), empty);
    });
    test('nonempty', () => {
      const nonempty = new Map([['ping', 'x'], ['y', 'pong']]);
      const cloned = clone(nonempty);
      expectAlike(cloned, nonempty);
    });
    test('nested', () => {
      const nested = new Map([['m', new Map([['mx', 0]])]]);
      const cloned = clone(nested);
      expectAlike(cloned, nested);
      expectAlike(cloned.get('m'), nested.get('m'));
    });
    test('cyclic', () => {
      const cyclic = new Map();
      cyclic.set('self', cyclic);
      const cloned = clone(cyclic);
      expect(cloned).not.toBe(cyclic);
      expect(cloned.size).toBe(cyclic.size);
      expect(cloned.get('self')).toBe(cloned);
    });
    test('diamond', () => {
      const child = new Map([['i am', 'child']]);
      const diamond = new Map([['a', child], ['b', child]]);
      const cloned = clone(diamond);
      expectAlike(cloned, diamond);
    });
    testMonkeyPatching(new Map([['ping', 'x'], ['y', 'pong']]));
  });
  describe('Set', () => {
    test('empty', () => {
      const empty = new Set([]);
      expectAlike(clone(empty), empty);
    });
    test('nonempty', () => {
      const nonempty = new Set([1, 2, 3]);
      expectAlike(clone(nonempty), nonempty);
    });
    test('nested', () => {
      const child = new Set(['child']);
      const parent = new Set([child]);
      expectAlike(clone(parent), parent);
    });
    test('cyclic', () => {
      const cyclic = new Set();
      cyclic.add(cyclic);
      const cloned = clone(cyclic);
      expect(cloned).not.toBe(cyclic);
      expect(cloned.has(cloned)).toBe(true);
    });
    testMonkeyPatching(new Set([1, 2, 3]));
  });
  test('WeakMap', () => {
    const map = new WeakMap();
    const k1 = {};
    const k2 = function () {};    //  eslint-disable-line func-names
    const k3 = window;
    map.set(k1, 1);
    map.set(k2, 2);
    map.set(k3, 3);
    expect(clone(map)).toBe(map); // WeakMap cannot be cloned, just return the source.
  });
  test('WeakSet', () => {
    const set = new WeakSet();
    const k1 = {};
    const k2 = function () {};  //  eslint-disable-line func-names
    const k3 = window;
    set.add(k1);
    set.add(k2);
    set.add(k3);
    expect(clone(set)).toBe(set);// WeakSet cannot be cloned, just return the source.
  });
});

/**
 * 单元测试 'clone' 函数，针对内置带类型数组
 *
 * @author 胡海星
 */
describe('clone typed arrays et al', () => {
  describe('ArrayBuffer', () => {
    test('simple', () => {
      const buffer = new ArrayBuffer(32);
      expectAlike(clone(buffer), buffer);
    });
    testMonkeyPatching(new ArrayBuffer(16));
  });
  describe('SharedArrayBuffer', () => {
    // Doesn't really seem to be any way to it these? :/
  });
  describe('DataView', () => {
    test('simple', () => {
      const buffer = new ArrayBuffer(32);
      const view = new DataView(buffer, 1, 16);
      const cloned = clone(view);
      expectAlike(cloned, view);
      expect(cloned.buffer).not.toBe(view.buffer);
      cloned.setInt16(0, 12);
      expect(view.getInt16(0)).not.toBe(12);
      expect(view.getInt16(1)).not.toBe(12);
    });
    testMonkeyPatching(new DataView(new ArrayBuffer(16)));
  });

  function testTypedArray(constructor, sampleValue) {
    describe(constructor.name, () => {
      test('empty', () => {
        const empty = new constructor(32);
        expectAlike(clone(empty), empty);
      });
      test('nonempty', () => {
        const nonempty = new constructor(32);
        nonempty[0] = sampleValue;
        nonempty[15] = sampleValue;
        nonempty[31] = sampleValue;
        expectAlike(clone(nonempty), nonempty);
      });
      const array = new constructor(32);
      array[0] = sampleValue;
      array[15] = sampleValue;
      array[31] = sampleValue;
      testMonkeyPatching(array);
    });
  }

  describe('typed arrays', () => {
    testTypedArray(BigInt64Array, 12n);     // eslint-disable-line no-undef
    testTypedArray(BigUint64Array, 12n);    // eslint-disable-line no-undef
    testTypedArray(Float32Array, 3.14);
    testTypedArray(Float64Array, 3.14);
    testTypedArray(Int8Array, 12);
    testTypedArray(Int16Array, 12);
    testTypedArray(Int32Array, 12);
    testTypedArray(Uint8Array, 12);
    testTypedArray(Uint8ClampedArray, 12);
    testTypedArray(Uint16Array, 12);
    testTypedArray(Uint32Array, 12);
  });
});

/**
 * 单元测试 'clone' 函数，针对内置Error类
 *
 * @author 胡海星
 */
describe('clone(Error)', () => {
  function testError(error) {
    describe(error.constructor.prototype.name, () => {
      test('simple', () => {
        expectAlike(clone(error), error);
      });
      testMonkeyPatching(error);
    });
  }
  describe('errors', () => {
    testError(new Error('message', 'filename', 50));
    testError(new EvalError('message', 'filename', 50));
    testError(new RangeError('message', 'filename', 50));
    testError(new ReferenceError('message', 'filename', 50));
    testError(new SyntaxError('message', 'filename', 50));
    testError(new TypeError('message', 'filename', 50));
    testError(new URIError('message', 'filename', 50));
  });
});

/**
 * 单元测试 'clone' 函数，针对对象
 *
 * @author 胡海星
 */
describe('clone plain and custom objects', () => {
  test('empty', () => {
    const empty = {};
    expectAlike(clone(empty), empty);
  });
  test('nonempty', () => {
    const nonempty = { left: 'right', up: 'down', red: 'blue' };
    expectAlike(clone(nonempty), nonempty);
  });
  test('nested', () => {
    const nested = { child: { val: 'val!' } };
    expectAlike(clone(nested), nested);
  });
  test('cyclic', () => {
    const object = { };
    object.self = object;
    const cloned = clone(object);
    expect(cloned).not.toBe(object);
    expect(cloned.self).toBe(cloned);
  });
  test('diamond', () => {
    const child = { i_am: 'child' };
    const parent = { left: child, right: child };
    const cloned = clone(parent);
    expectAlike(cloned, parent);
    expect(cloned.left).toBe(cloned.right);
  });
  test('with non-string keys', () => {
    const key = Symbol('kk');
    const nonempty = { [key]: 'val' };
    expectAlike(clone(nonempty), nonempty);
  });
  test('function prototype instances with no hierarchy', () => {
    function Pair(left, right) {
      this.left = left;
      this.right = right;
    }
    const pair = new Pair(3, 4);
    expectAlike(clone(pair), pair);
  });
  test('with prototype from Object.create', () => {
    const proto = {
      delimiter: ', ',
      toString() {
        return this.items.join(this.delimiter);
      },
    };
    const object = Object.create(proto);
    object.items = [1, 2, 3];
    expectAlike(clone(object), object);
  });
  test('with prototype from Object.create(null)', () => {
    const object = Object.create(null);
    object.items = [1, 2, 3];
    expect(Object.getPrototypeOf(object)).toBeNull();
    expectAlike(clone(object), object);
  });
  test('ES6 class instances with no hierarchy', () => {
    class Pair {
      constructor(left, right) {
        this.left = left;
        this.right = right;
      }
    }
    const pair = new Pair(3, 4);
    expectAlike(clone(pair), pair);
  });
  test('ES6 classes with hierarchy', () => {
    class Parent {
      constructor(pValue) {
        this.pValue = pValue;
      }
    }
    class Child extends Parent {
      constructor(pValue, cValue) {
        super(pValue);
        this.cValue = cValue;
      }
    }
    const child = new Child('pValue', 'cValue');
    expectAlike(clone(child), child);
  });
  test('with getters, include accessor, include non enumerable', () => {
    const object = { val: 'got' };
    Object.defineProperty(object, 'getter', {
      configurable: true,
      get() { return this.val; },
    });
    const cloned = clone(object, {
      includeAccessor: true,
      includeNonEnumerable: true,
    });
    expectAlike(cloned, object);
    cloned.val = 'not';
    expect(cloned.getter).toBe('not');
  });
  test('with getters, default options', () => {
    const object = { val: 'got' };
    Object.defineProperty(object, 'getter', {
      configurable: true,
      enumerable: true,
      get() { return this.val; },
    });
    const cloned = clone(object);
    expectAlike(cloned, object);
    cloned.val = 'not';
    expect(cloned.getter).toBe('got');
  });
});

/**
 * 单元测试 'clone' 函数，针对用户自定义对象
 *
 * @author 胡海星
 */
describe('clone customized class', () => {
  test('clone(Person)', () => {
    const obj = new Person();
    obj.id = '0';
    obj.name = 'name';
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    obj.gender = Gender.MALE.value;
    obj.birthday = '1990-01-01';
    obj.mobile = '12039495';
    obj.email = 'i@i.com';
    const result = clone(obj);
    expectInstanceOf(result, Person);
    expectAlike(result, obj);
  });
  test('clone(Buyer)', () => {
    const obj = new Buyer();
    obj.id = '0';
    obj.name = 'name';
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    obj.gender = Gender.MALE.value;
    obj.birthday = '1990-01-01';
    obj.mobile = '12039495';
    obj.email = 'i@i.com';
    const result = clone(obj);
    expectInstanceOf(result, Buyer);
    expectAlike(result, obj);
    expectAlike(result.credential, obj.credential);
  });
  test('clone(Guardian)', () => {
    const obj = new Guardian();
    obj.id = '0';
    obj.name = 'name';
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    obj.gender = Gender.MALE.value;
    obj.birthday = '1990-01-01';
    obj.mobile = '12039495';
    obj.email = 'i@i.com';
    const result = clone(obj);
    expectInstanceOf(result, Guardian);
    expectAlike(result, obj);
    expectAlike(result.credential, obj.credential);
  });
  test('clone(Insurant)', () => {
    const obj = new Insurant();
    obj.id = '0';
    obj.name = 'name';
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    obj.gender = Gender.MALE.value;
    obj.birthday = '1990-01-01';
    obj.mobile = '12039495';
    obj.email = 'i@i.com';
    obj.kinship = Kinship.PARENT.value;
    obj.guardian = new Guardian();
    obj.guardian.id = '1';
    obj.guardian.name = 'guardian';
    obj.guardian.credential = new Credential(CredentialType.IDENTITY_CARD.value, '456');
    obj.guardian.gender = Gender.FEMALE.value;
    obj.guardian.birthday = '1970-02-03';
    obj.guardian.mobile = '383789904';
    obj.guardian.email = 'c@c.com';
    const result = clone(obj);
    expectInstanceOf(result, Insurant);
    expectAlike(result, obj);
    expectAlike(result.credential, obj.credential);
    expectAlike(result.guardian, obj.guardian);
    expectAlike(result.guardian.credential, obj.guardian.credential);
  });
});

/**
 * 单元测试 'clone' 函数，针对自定义属性的类
 *
 * @author 胡海星
 */
describe('clone class with defined properties', () => {
  class Gender {}
  Object.defineProperty(Gender.prototype, 'name', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: '',
  });
  Object.defineProperty(Gender.prototype, 'value', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: '',
  });
  Gender.MALE = new Gender();
  Gender.MALE.name = '男';
  Gender.MALE.value = 'MALE';
  Object.freeze(Gender.MALE);

  Gender.FEMALE = new Gender();
  Gender.FEMALE.name = '男';
  Gender.FEMALE.value = 'FEMALE';
  Object.freeze(Gender.FEMALE);

  test('clone()', () => {
    const male = Gender.MALE;
    const copy = clone(male, { includeReadonly: true, includeNonConfigurable: true });
    expect(copy).toEqual(male);
  });
});

/**
 * 单元测试 'clone' 函数，针对被Vue.js托管的数组属性。
 *
 * @author 胡海星
 */
describe('clone被Vue托管数组', () => {
  test('clone正常的数组', () => {
    const array = [1, 2, 3];
    const result = clone(array);
    console.log('result = ', result);
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result).toBeArray();
    expect(result.length).toBe(3);
    expect(result).toEqual([1, 2, 3]);
  });
  const Wrapper = Vue.extend({
    data() {
      return {
        array: [1, 2, 3],
      };
    },
    template: '<div>length = {{array.length}}</div>',
  });
  test('clone被Vue托管数组', () => {
    const wrapper = mount(Wrapper);
    expect(wrapper.vm.array).toBeDefined();
    expect(wrapper.vm.array).not.toBeNull();
    expect(wrapper.vm.array).toBeArray();
    expect(wrapper.vm.array.length).toBe(3);
    console.log('wrapper.vm.array = ', wrapper.vm.array);
    const result = clone(wrapper.vm.array);
    console.log('result = ', result);
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result).toBeArray();
    expect(result.length).toBe(3);
    expect(result).toEqual([1, 2, 3]);
  });
});

/**
 * 单元测试 'clone' 函数，针对用户自定义对象
 *
 * @author 胡海星
 */
describe('clone array of customized class', () => {
  test('clone([Person])', () => {
    const obj = new Person();
    obj.id = '0';
    obj.name = 'name';
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    obj.gender = Gender.MALE.value;
    obj.birthday = '1990-01-01';
    obj.mobile = '12039495';
    obj.email = 'i@i.com';
    const result = clone([obj]);
    expect(result).toBeArray();
    expect(result.length).toBe(1);
    expect(result[0]).toBeInstanceOf(Person);
    expectAlike(result[0], obj);
  });
});
