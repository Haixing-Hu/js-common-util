////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { toString } from '../src';
import CredentialType from './model/CredentialType';
import Credential from './model/Credential';
import Gender from './model/Gender';
import Kinship from './model/Kinship';
import Guardian from './model/Guardian';
import Insurant from './model/Insurant';

/**
 * 单元测试 'toString' 函数
 *
 * @author 胡海星
 */
describe('toString', () => {
  test('toString(undefined)', () => {
    const obj = undefined;
    expect(toString(obj)).toBe('undefined');
  });
  test('toString(null)', () => {
    const obj = null;
    expect(toString(obj)).toBe('null');
  });
  test('toString(String)', () => {
    let obj = '';
    expect(toString(obj)).toBe('');
    obj = 'abc';
    expect(toString(obj)).toBe('abc');
    obj = new String('def');
    expect(toString(obj)).toBe('def');
  });
  test('toString(Boolean)', () => {
    let obj = true;
    expect(toString(obj)).toBe('true');
    obj = false;
    expect(toString(obj)).toBe('false');
    obj = new Boolean(true);
    expect(toString(obj)).toBe('true');
    obj = new Boolean(false);
    expect(toString(obj)).toBe('false');
  });
  test('toString(Number)', () => {
    let obj = 123.456;
    expect(toString(obj)).toBe('123.456');
    obj = -0.00001;
    expect(toString(obj)).toBe('-0.00001');
    obj = new Number(123.456);
    expect(toString(obj)).toBe('123.456');
    obj = new Number(-0.00001);
    expect(toString(obj)).toBe('-0.00001');
  });
  // test('toString(BigInt)', () => {
  //   let obj = 123456n;
  //   expect(toString(obj)).toBe('123456');
  //   obj = -123456n;
  //   expect(toString(obj)).toBe('-123456');
  //   obj = new BigInt(123456n);
  //   expect(toString(obj)).toBe('123456');
  //   obj = new BigInt(-123456n);
  //   expect(toString(obj)).toBe('-123456');
  // });
  test('toString(Date)', () => {
    const obj = new Date();
    expect(toString(obj)).toBe(obj.toISOString());
  });
  
  test('toString(TypedArray)', () => {
    const obj = new Uint8Array([1, 2, 3]);
    expect(toString(obj)).toBe('[1,2,3]');
  });
  
  test('toString(Array)', () => {
    const obj = [1, 'two', true];
    expect(toString(obj)).toBe(JSON.stringify(obj));
  });
  
  test('toString(Map)', () => {
    const obj = new Map();
    obj.set('key1', 'value1');
    obj.set('key2', 42);
    // Map转为JSON后是一个带键值对数组的对象
    expect(toString(obj)).toContain('key1');
    expect(toString(obj)).toContain('value1');
    expect(toString(obj)).toContain('key2');
    expect(toString(obj)).toContain('42');
  });
  
  test('toString(Set)', () => {
    const obj = new Set(['a', 'b', 'c']);
    // Set转为JSON后是一个带值数组的对象
    expect(toString(obj)).toContain('a');
    expect(toString(obj)).toContain('b');
    expect(toString(obj)).toContain('c');
  });
  
  test('toString(Iterator)', () => {
    function* generator() {
      yield 1;
      yield 2;
      yield 3;
    }
    const obj = generator();
    // Iterator会被转换为空对象或者特定实现方式
    const result = toString(obj);
    expect(result).toBeTruthy();
  });
  
  test('toString(Class)', () => {
    class TestClass {
      constructor() {
        this.prop = 'value';
      }
    }
    const obj = new TestClass();
    expect(toString(obj)).toBe('{"prop":"value"}');
  });
  
  // TODO：增加对其他类型的测试
  test('toString(Insurant)', () => {
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
    const str = toString(obj, false);
    expect(str).toBe(JSON.stringify(obj));
  });
  test('toString cycled object', () => {
    const obj = {
      name: 'obj',
      value: 123,
      left: {
        name: 'obj.left',
      },
      right: {
        name: 'obj.right',
      },
    };
    obj.left.parent = obj;
    obj.right.brother = obj.left;
    const expected = {
      name: 'obj',
      value: 123,
      left: {
        name: 'obj.left',
        parent: { $ref: '$' },
      },
      right: {
        name: 'obj.right',
        brother: { $ref: '$.left' },
      },
    };
    expect(toString(obj)).toBe(JSON.stringify(expected));
  });
  
  test('toString with beautify option', () => {
    const obj = { name: 'test', value: 123 };
    const beautified = toString(obj, true);
    const regular = toString(obj, false);
    
    // 由于是使用json-beautify库格式化，结果的确应该更长
    expect(beautified.length).toBeGreaterThan(regular.length);
    
    // 检查是否为格式化字符串（可能包含空格而非换行符）
    // json-beautify格式化方式可能不一定使用换行符，而是使用空格
    expect(beautified).not.toBe(regular);
  });
});
