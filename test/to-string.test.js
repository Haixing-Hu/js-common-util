/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import { toString } from '../main';
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
});
