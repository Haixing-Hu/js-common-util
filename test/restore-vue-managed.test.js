////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { restoreVueManaged } from '../src';
import ManagedObj from './model/ManagedObj';

/**
 * 单元测试 'restoreVueManaged'
 *
 * @author 胡海星
 */
describe('restoreVueManaged', () => {
  const Wrapper = defineComponent({
    data() {
      const obj = new ManagedObj();
      return {
        obj,
      };
    },
    template: '<div>name = {{obj.strField}}</div>',
  });
  test('测试 restoreVueManaged() 一般情况', () => {
    const wrapper = mount(Wrapper);
    expect(wrapper.vm.obj).toBeDefined();
    expect(wrapper.vm.obj).not.toBeNull();
    const result = restoreVueManaged(wrapper.vm.obj);
    expect(result.intField).toBe(0);
    expect(result.strField).toBe('hello');
    expect(result.strArray).toEqual(['a', 'b', 'c']);
    expect(result.objField).toEqual({ type: 'IDENTITY_CARD', number: '123' });
    expect(result.objArray).toEqual([
      { type: 'IDENTITY_CARD', number: '123' },
      { type: 'PASSPORT', number: 'abc' },
    ]);
    expect(result.arrayArray).toEqual([
      [
        { type: 'IDENTITY_CARD', number: '123' },
        { type: 'PASSPORT', number: 'abc' },
      ],
      [
        { type: 'IDENTITY_CARD', number: '456' },
        { type: 'PASSPORT', number: 'def' },
      ],
    ]);
  });
  test('测试restoreVueManaged(undefined)', () => {
    expect(restoreVueManaged(undefined)).toBeUndefined();
  });
  test('测试restoreVueManaged(null)', () => {
    expect(restoreVueManaged(null)).toBeNull();
  });

  // 测试各种不同类型的值的情况
  test('测试各种不同类型的值的恢复', () => {
    // 测试字符串类型
    expect(restoreVueManaged('hello')).toBe('hello');

    // 测试数字类型
    expect(restoreVueManaged(123)).toBe(123);

    // 测试布尔类型
    expect(restoreVueManaged(true)).toBe(true);

    // 测试日期类型
    const date = new Date();
    expect(restoreVueManaged(date)).toBe(date);

    // 测试函数类型
    const fn = () => {};
    expect(restoreVueManaged(fn)).toBe(fn);

    // 测试Symbol类型
    const sym = Symbol('test');
    expect(restoreVueManaged(sym)).toBe(sym);

    // 测试正则表达式类型
    const regex = /test/;
    expect(restoreVueManaged(regex)).toBe(regex);
  });

  // 测试嵌套复杂对象的恢复
  test('测试嵌套复杂对象的恢复', () => {
    const complexNestedObj = {
      a: 1,
      b: 'string',
      c: [1, 2, 3],
      d: { x: 1, y: 2 },
      e: [{ p: 1 }, { q: 2 }],
      f: null,
      g: undefined,
    };

    const wrapper = mount(defineComponent({
      data() {
        return { obj: complexNestedObj };
      },
      template: '<div></div>',
    }));

    const result = restoreVueManaged(wrapper.vm.obj);

    // 验证恢复后的对象结构与原始对象相同
    expect(result).toEqual(complexNestedObj);
    // 但不是同一个对象引用
    expect(result).not.toBe(wrapper.vm.obj);
  });

  // 测试空数组的情况
  test('测试空数组的恢复', () => {
    const emptyArray = [];

    const wrapper = mount(defineComponent({
      data() {
        return { arr: emptyArray };
      },
      template: '<div></div>',
    }));

    const result = restoreVueManaged(wrapper.vm.arr);

    // 验证恢复后的数组是空数组
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
    // 但不是同一个数组引用
    expect(result).not.toBe(wrapper.vm.arr);
  });

  // 测试空对象的情况
  test('测试空对象的恢复', () => {
    const emptyObject = {};

    const wrapper = mount(defineComponent({
      data() {
        return { obj: emptyObject };
      },
      template: '<div></div>',
    }));

    const result = restoreVueManaged(wrapper.vm.obj);

    // 验证恢复后的对象是空对象
    expect(typeof result).toBe('object');
    expect(Object.keys(result).length).toBe(0);
    // 但不是同一个对象引用
    expect(result).not.toBe(wrapper.vm.obj);
  });

  // 测试数组包含Vue管理的对象的情况
  test('测试数组包含Vue管理的对象的情况', () => {
    const arrayWithVueObjects = [
      { name: 'item1', value: 1 },
      { name: 'item2', value: 2 },
      [{ name: 'nested', value: 3 }],
    ];

    const wrapper = mount(defineComponent({
      data() {
        return { arr: arrayWithVueObjects };
      },
      template: '<div></div>',
    }));

    const result = restoreVueManaged(wrapper.vm.arr);

    // 验证恢复后的数组结构与原始数组相同
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
    expect(result[0].name).toBe('item1');
    expect(result[0].value).toBe(1);
    expect(result[1].name).toBe('item2');
    expect(result[1].value).toBe(2);
    expect(Array.isArray(result[2])).toBe(true);
    expect(result[2][0].name).toBe('nested');
    expect(result[2][0].value).toBe(3);
    // 但不是同一个数组引用
    expect(result).not.toBe(wrapper.vm.arr);
  });

  // 测试对象包含Vue管理的数组的情况
  test('测试对象包含Vue管理的数组的情况', () => {
    const objectWithVueArrays = {
      arr1: [1, 2, 3],
      arr2: ['a', 'b', 'c'],
      nested: {
        arr3: [{ x: 1 }, { y: 2 }],
      },
    };

    const wrapper = mount(defineComponent({
      data() {
        return { obj: objectWithVueArrays };
      },
      template: '<div></div>',
    }));

    const result = restoreVueManaged(wrapper.vm.obj);

    // 验证恢复后的对象结构与原始对象相同
    expect(typeof result).toBe('object');
    expect(Array.isArray(result.arr1)).toBe(true);
    expect(result.arr1).toEqual([1, 2, 3]);
    expect(Array.isArray(result.arr2)).toBe(true);
    expect(result.arr2).toEqual(['a', 'b', 'c']);
    expect(typeof result.nested).toBe('object');
    expect(Array.isArray(result.nested.arr3)).toBe(true);
    expect(result.nested.arr3).toEqual([{ x: 1 }, { y: 2 }]);
    // 但不是同一个对象引用
    expect(result).not.toBe(wrapper.vm.obj);
  });
});
