/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2022
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/
import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { restoreVueManaged } from '../main';
import ManagedObj from './model/ManagedObj';

/**
 * 单元测试 'restoreVueManaged'
 *
 * @author 胡海星
 */
describe('restoreVueManaged', () => {
  const Wrapper = Vue.extend({
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
});
