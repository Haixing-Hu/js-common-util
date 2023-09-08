/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { removeEmptyFields } from '../main';
import ShallowObject from './model/ShallowObject';
import DeepObject from './model/DeepObject';
import Insurant from './model/Insurant';
import Credential from './model/Credential';
import CredentialType from './model/CredentialType';
import Guardian from './model/Guardian';
import Kinship from './model/Kinship';
import Gender from './model/Gender';

/**
 * 单元测试 'removeEmptyFields'
 *
 * @author 胡海星
 */
describe('removeEmptyFields', () => {
  test('参数为undefined', () => {
    const obj = undefined;
    expect(removeEmptyFields(obj)).toBeUndefined();
  });
  test('参数为null', () => {
    const obj = null;
    expect(removeEmptyFields(obj)).toBeUndefined();
  });
  test('参数为非空字符串', () => {
    const obj = 'abc';
    expect(removeEmptyFields(obj)).toBe('abc');
  });
  test('参数为空字符串', () => {
    const obj = '';
    expect(removeEmptyFields(obj)).toBeUndefined();
  });
  test('参数为数字', () => {
    const obj = 123;
    expect(removeEmptyFields(obj)).toBe(123);
  });
  test('参数为布尔', () => {
    const obj = true;
    expect(removeEmptyFields(obj)).toBe(true);
  });
  test('参数为BigInt', () => {
    const obj = 123n;
    expect(removeEmptyFields(obj)).toBe(123n);
  });
  test('参数为RegExp', () => {
    const obj = /[abc]/;
    expect(removeEmptyFields(obj)).toEqual(/[abc]/);
  });
  test('参数为Date', () => {
    const now = new Date();
    const obj = new Date(now);
    expect(removeEmptyFields(obj)).toEqual(now);
  });
  test('参数为普通浅层对象，不包含空字符串属性', () => {
    const obj = new ShallowObject('abc', 123);
    const result = removeEmptyFields(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });
  test('参数为普通浅层对象，包含空字符串属性', () => {
    const obj = new ShallowObject('', 123);
    const result = removeEmptyFields(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    expect(result.name).toBeUndefined();
    expect(result.value).toBe(123);
  });
  test('参数为复杂嵌套对象，不包含空字符串属性', () => {
    const obj = new DeepObject('abc', 123, 'def', 456);
    const result = removeEmptyFields(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });
  test('参数为复杂嵌套对象，包含空字符串属性和null属性', () => {
    const obj = new DeepObject('', 123, null, 456);
    const result = removeEmptyFields(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    expect(result.description).toBeUndefined();
    expect(result.price).toBe(123);
    expect(result.shallow).not.toBeNull();
    expect(result.shallow.name).toBeUndefined();
    expect(result.shallow.value).toBe(456);
  });
  test('参数为数字类型数组', () => {
    const obj = [1, 2, 3];
    const result = removeEmptyFields(obj);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });
  test('参数为字符串类型数组，不包含空字符串', () => {
    const obj = ['a', 'b', 'c'];
    const result = removeEmptyFields(obj);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });
  test('参数为字符串类型数组，包含空字符串', () => {
    const obj = ['a', 'b', ''];
    const result = removeEmptyFields(obj);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    expect(result).toEqual(['a', 'b']);
  });
  test('参数为浅层对象数组，每个对象不包含空字符串属性', () => {
    const obj = [new ShallowObject('abc', 123), new ShallowObject('def', 456)];
    const result = removeEmptyFields(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });
  test('参数为浅层对象数组，某个对象不包含空字符串属性', () => {
    const obj = [new ShallowObject('abc', 123), new ShallowObject('', 456)];
    const result = removeEmptyFields(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    const s = new ShallowObject(null, 456);
    delete s.name;
    expect(result).toEqual([new ShallowObject('abc', 123), s]);
  });
  test('参数为嵌套对象数组，每个对象不包含空字符串属性', () => {
    const obj = [new DeepObject('a', 1, 'b', 2), new DeepObject('c', 3, 'd', 4)];
    const result = removeEmptyFields(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).toEqual(obj);
  });
  test('参数为嵌套对象数组，某个对象不包含空字符串属性', () => {
    const obj = [new DeepObject('a', 1, 'b', 2), new DeepObject('', 3, null, 4)];
    const result = removeEmptyFields(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    const s = new DeepObject(null, 3, null, 4);
    delete s.description;
    delete s.shallow.name;
    expect(result).toEqual([new DeepObject('a', 1, 'b', 2), s]);
  });
  test('参数为无类型对象，某个属性包含空字符串', () => {
    const obj = {
      name: 'jack',
      prop: '',
      value: 123,
      val: null,
      child: {
        child_name: 'child',
        child_value: null,
      },
    };
    const result = removeEmptyFields(obj);
    expect(result.constructor.name).toBe(obj.constructor.name);
    expect(result).not.toBe(obj);
    expect(result).not.toEqual(obj);
    expect(result).toEqual({
      name: 'jack',
      value: 123,
      child: {
        child_name: 'child',
      },
    });
  });
  const Wrapper = Vue.extend({
    data() {
      const obj = new Insurant();
      obj.id = '0';
      obj.name = 'name';
      obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
      obj.gender = Gender.MALE.value;
      obj.birthday = '1990-01-01';
      obj.mobile = '12039495';
      obj.email = '';
      obj.kinship = Kinship.PARENT.value;
      obj.guardian = new Guardian();
      obj.guardian.id = '1';
      obj.guardian.name = 'guardian';
      obj.guardian.credential = new Credential(CredentialType.IDENTITY_CARD.value, '');
      obj.guardian.gender = Gender.FEMALE.value;
      obj.guardian.birthday = '1970-02-03';
      obj.guardian.mobile = null;
      obj.guardian.email = null;
      return {
        insurant: obj,
      };
    },
    template: '<div>name = {{insurant.name}}</div>',
  });
  test('参数为一个Vue组件内部数据', () => {
    const wrapper = mount(Wrapper);
    expect(wrapper.vm.insurant).toBeDefined();
    expect(wrapper.vm.insurant).not.toBeNull();
    const result = removeEmptyFields(wrapper.vm.insurant);
    expect(result.constructor.name).toBe('Insurant');
    expect(result.id).toBe('0');
    expect(result.name).toBe('name');
    expect(result.credential).toEqual(new Credential(CredentialType.IDENTITY_CARD.value, '123'));
    expect(result.gender).toBe(Gender.MALE.value);
    expect(result.birthday).toBe('1990-01-01');
    expect(result.mobile).toBe('12039495');
    expect(result.email).toBeUndefined();
    expect(result.kinship).toBe(Kinship.PARENT.value);
    expect(result.guardian.constructor.name).toBe('Guardian');
    expect(result.guardian.id).toBe('1');
    expect(result.guardian.name).toBe('guardian');
    expect(result.guardian.credential.constructor.name).toBe('Credential');
    expect(result.guardian.credential.type).toBe(CredentialType.IDENTITY_CARD.value);
    expect(result.guardian.credential.number).toBeUndefined();
    expect(result.guardian.gender).toBe(Gender.FEMALE.value);
    expect(result.guardian.birthday).toBe('1970-02-03');
    expect(result.guardian.mobile).toBeUndefined();
    expect(result.guardian.email).toBeUndefined();
  });
});
