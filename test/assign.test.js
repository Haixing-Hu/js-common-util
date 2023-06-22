/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2020
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/
import { assign } from '../main';
import CredentialType from './model/CredentialType';
import Credential from './model/Credential';
import Gender from './model/Gender';
import Kinship from './model/Kinship';
import Person from './model/Person';
import Buyer from './model/Buyer';
import Guardian from './model/Guardian';
import Insurant from './model/Insurant';

/**
 * 单元测试 'assign' 函数
 *
 * @author 胡海星
 */
describe('assign', () => {
  test('assign(person, undefined, undefined)', () => {
    const person = new Person();
    person.id = '0';
    person.name = 'name';
    person.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    person.gender = Gender.MALE.value;
    person.birthday = '1990-01-01';
    person.mobile = '12039495';
    person.email = 'i@i.com';
    const other = undefined;
    const changes = assign(person, other);
    expect(person.id).toBe('0');
    expect(person.name).toBe('name');
    expect(person.credential.type).toBe(CredentialType.IDENTITY_CARD.value);
    expect(person.credential.number).toBe('123');
    expect(person.gender).toBe(Gender.MALE.value);
    expect(person.birthday).toBe('1990-01-01');
    expect(person.mobile).toBe('12039495');
    expect(person.email).toBe('i@i.com');
    expect(changes).toEqual({});
  });
  test('assign(person, undefined, changes)', () => {
    const person = new Person();
    person.id = '0';
    person.name = 'name';
    person.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    person.gender = Gender.MALE.value;
    person.birthday = '1990-01-01';
    person.mobile = '12039495';
    person.email = 'i@i.com';
    const other = undefined;
    const changes = { x: 1 };
    assign(person, other, changes);
    expect(person.id).toBe('0');
    expect(person.name).toBe('name');
    expect(person.credential.type).toBe(CredentialType.IDENTITY_CARD.value);
    expect(person.credential.number).toBe('123');
    expect(person.gender).toBe(Gender.MALE.value);
    expect(person.birthday).toBe('1990-01-01');
    expect(person.mobile).toBe('12039495');
    expect(person.email).toBe('i@i.com');
    expect(changes).toEqual({ x: 1 });
  });
  test('assign(person, null, undefined)', () => {
    const person = new Person();
    person.id = '0';
    person.name = 'name';
    person.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    person.gender = Gender.MALE.value;
    person.birthday = '1990-01-01';
    person.mobile = '12039495';
    person.email = 'i@i.com';
    const other = null;
    const changes = assign(person, other);
    expect(person.id).toBe('0');
    expect(person.name).toBe('name');
    expect(person.credential.type).toBe(CredentialType.IDENTITY_CARD.value);
    expect(person.credential.number).toBe('123');
    expect(person.gender).toBe(Gender.MALE.value);
    expect(person.birthday).toBe('1990-01-01');
    expect(person.mobile).toBe('12039495');
    expect(person.email).toBe('i@i.com');
    expect(changes).toEqual({});
  });
  test('assign(person, null, changes)', () => {
    const person = new Person();
    person.id = '0';
    person.name = 'name';
    person.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    person.gender = Gender.MALE.value;
    person.birthday = '1990-01-01';
    person.mobile = '12039495';
    person.email = 'i@i.com';
    const other = null;
    const changes = { x: 1 };
    assign(person, other, changes);
    expect(person.id).toBe('0');
    expect(person.name).toBe('name');
    expect(person.credential.type).toBe(CredentialType.IDENTITY_CARD.value);
    expect(person.credential.number).toBe('123');
    expect(person.gender).toBe(Gender.MALE.value);
    expect(person.birthday).toBe('1990-01-01');
    expect(person.mobile).toBe('12039495');
    expect(person.email).toBe('i@i.com');
    expect(Object.keys(changes)).toEqual(['x']);
    expect(changes).toEqual({ x: 1 });
  });
  test('assign(person, other, undefined)', () => {
    const person = new Person();
    person.id = '0';
    person.name = 'name';
    person.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    person.gender = Gender.MALE.value;
    person.birthday = '1990-01-01';
    person.mobile = '12039495';
    person.email = 'i@i.com';
    const other = new Person();
    other.id = '1';
    other.name = 'name';
    other.credential = new Credential(CredentialType.PASSPORT.value, '123');
    other.gender = Gender.FEMALE.value;
    other.birthday = undefined;
    other.mobile = '7777';
    other.email = 'i@i.com';
    const changes = assign(person, other);
    expect(person.id).toBe('1');
    expect(person.name).toBe('name');
    expect(person.credential).not.toBeNull();
    expect(Object.getPrototypeOf(person.credential)).toBe(Credential.prototype);
    expect(person.credential.type).toBe(CredentialType.PASSPORT.value);
    expect(person.credential.number).toBe('123');
    expect(person.gender).toBe(Gender.FEMALE.value);
    expect(person.birthday).toBe('1990-01-01');
    expect(person.mobile).toBe('7777');
    expect(person.email).toBe('i@i.com');
    expect(Object.keys(changes)).toEqual(['id', 'credential', 'gender', 'mobile']);
    expect(changes.id).toBe('1');
    expect(changes.credential).not.toBeUndefined();
    expect(Object.getPrototypeOf(changes.credential)).toBe(Credential.prototype);
    expect(changes.credential).not.toBe(other.credential);
    expect(changes.credential).toEqual(other.credential);
    expect(changes.gender).toBe(Gender.FEMALE.value);
    expect(changes.mobile).toBe('7777');
  });
  test('assign(person, other, changes)', () => {
    const person = new Person();
    person.id = '0';
    person.name = 'name';
    person.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    person.gender = Gender.MALE.value;
    person.birthday = '1990-01-01';
    person.mobile = '12039495';
    person.email = 'i@i.com';
    const other = new Person();
    other.id = '1';
    other.name = 'name';
    other.credential = new Credential(CredentialType.PASSPORT.value, '123');
    other.gender = Gender.FEMALE.value;
    other.birthday = undefined;
    other.mobile = '7777';
    other.email = 'i@i.com';
    const changes = { x: 1 };
    assign(person, other, changes);
    expect(person.id).toBe('1');
    expect(person.name).toBe('name');
    expect(person.credential).not.toBeNull();
    expect(Object.getPrototypeOf(person.credential)).toBe(Credential.prototype);
    expect(person.credential.type).toBe(CredentialType.PASSPORT.value);
    expect(person.credential.number).toBe('123');
    expect(person.gender).toBe(Gender.FEMALE.value);
    expect(person.birthday).toBe('1990-01-01');
    expect(person.mobile).toBe('7777');
    expect(person.email).toBe('i@i.com');
    expect(Object.keys(changes)).toEqual(['x', 'id', 'credential', 'gender', 'mobile']);
    expect(changes.x).toBe(1);
    expect(changes.id).toBe('1');
    expect(changes.credential).not.toBeUndefined();
    expect(Object.getPrototypeOf(changes.credential)).toBe(Credential.prototype);
    expect(changes.credential).not.toBe(other.credential);
    expect(changes.credential).toEqual(other.credential);
    expect(changes.gender).toBe(Gender.FEMALE.value);
    expect(changes.mobile).toBe('7777');
  });

  test('assign(insurant, undefined, undefined)', () => {
    const insurant = new Insurant();
    insurant.id = '0';
    insurant.name = 'name';
    insurant.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    insurant.gender = Gender.MALE.value;
    insurant.birthday = '1990-01-01';
    insurant.mobile = '12039495';
    insurant.email = 'i@i.com';
    insurant.kinship = Kinship.PARENT.value;
    insurant.guardian = new Guardian();
    insurant.guardian.id = '1';
    insurant.guardian.name = 'guardian';
    insurant.guardian.credential = new Credential(CredentialType.IDENTITY_CARD.value, '456');
    insurant.guardian.gender = Gender.FEMALE.value;
    insurant.guardian.birthday = '1970-02-03';
    insurant.guardian.mobile = '383789904';
    insurant.guardian.email = 'c@c.com';
    const other = undefined;
    const changes = assign(insurant, other);
    expect(insurant.id).toBe('0');
    expect(insurant.name).toBe('name');
    expect(insurant.credential.type).toBe(CredentialType.IDENTITY_CARD.value);
    expect(insurant.credential.number).toBe('123');
    expect(insurant.gender).toBe(Gender.MALE.value);
    expect(insurant.birthday).toBe('1990-01-01');
    expect(insurant.mobile).toBe('12039495');
    expect(insurant.email).toBe('i@i.com');
    expect(insurant.kinship).toBe(Kinship.PARENT.value);
    expect(insurant.guardian).not.toBeNull();
    expect(insurant.guardian.id).toBe('1');
    expect(insurant.guardian.name).toBe('guardian');
    expect(insurant.guardian.credential.type).toBe(CredentialType.IDENTITY_CARD.value);
    expect(insurant.guardian.credential.number).toBe('456');
    expect(insurant.guardian.gender).toBe(Gender.FEMALE.value);
    expect(insurant.guardian.birthday).toBe('1970-02-03');
    expect(insurant.guardian.mobile).toBe('383789904');
    expect(insurant.guardian.email).toBe('c@c.com');
    expect(changes).toEqual({});
  });
  test('assign(insurant, undefined, changes)', () => {
    const insurant = new Insurant();
    insurant.id = '0';
    insurant.name = 'name';
    insurant.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    insurant.gender = Gender.MALE.value;
    insurant.birthday = '1990-01-01';
    insurant.mobile = '12039495';
    insurant.email = 'i@i.com';
    insurant.kinship = Kinship.PARENT.value;
    insurant.guardian = new Guardian();
    insurant.guardian.id = '1';
    insurant.guardian.name = 'guardian';
    insurant.guardian.credential = new Credential(CredentialType.IDENTITY_CARD.value, '456');
    insurant.guardian.gender = Gender.FEMALE.value;
    insurant.guardian.birthday = '1970-02-03';
    insurant.guardian.mobile = '383789904';
    insurant.guardian.email = 'c@c.com';
    const other = undefined;
    const changes = { x: 1 };
    assign(insurant, other, changes);
    expect(insurant.id).toBe('0');
    expect(insurant.name).toBe('name');
    expect(insurant.credential.type).toBe(CredentialType.IDENTITY_CARD.value);
    expect(insurant.credential.number).toBe('123');
    expect(insurant.gender).toBe(Gender.MALE.value);
    expect(insurant.birthday).toBe('1990-01-01');
    expect(insurant.mobile).toBe('12039495');
    expect(insurant.email).toBe('i@i.com');
    expect(insurant.kinship).toBe(Kinship.PARENT.value);
    expect(insurant.guardian).not.toBeNull();
    expect(insurant.guardian.id).toBe('1');
    expect(insurant.guardian.name).toBe('guardian');
    expect(insurant.guardian.credential.type).toBe(CredentialType.IDENTITY_CARD.value);
    expect(insurant.guardian.credential.number).toBe('456');
    expect(insurant.guardian.gender).toBe(Gender.FEMALE.value);
    expect(insurant.guardian.birthday).toBe('1970-02-03');
    expect(insurant.guardian.mobile).toBe('383789904');
    expect(insurant.guardian.email).toBe('c@c.com');
    expect(changes).toEqual({ x: 1 });
  });
  test('assign(insurant, other, undefined)', () => {
    const insurant = new Insurant();
    insurant.id = '0';
    insurant.name = 'name';
    insurant.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    insurant.gender = Gender.MALE.value;
    insurant.birthday = '1990-01-01';
    insurant.mobile = '12039495';
    insurant.email = 'i@i.com';
    insurant.kinship = Kinship.PARENT.value;
    insurant.guardian = new Guardian();
    insurant.guardian.id = '1';
    insurant.guardian.name = 'guardian';
    insurant.guardian.credential = new Credential(CredentialType.IDENTITY_CARD.value, '456');
    insurant.guardian.gender = Gender.FEMALE.value;
    insurant.guardian.birthday = '1970-02-03';
    insurant.guardian.mobile = '383789904';
    insurant.guardian.email = 'c@c.com';
    const other = new Insurant();
    other.id = '0';
    other.name = 'name';
    other.credential = new Credential(CredentialType.PASSPORT.value, '123');
    other.gender = Gender.FEMALE.value;
    other.birthday = '1990-01-01';
    other.mobile = '7777';
    other.email = 'i@i.com';
    other.kinship = Kinship.SELF.value;
    other.guardian = new Guardian();
    other.guardian.id = '3';
    other.guardian.name = 'other-guardian';
    other.guardian.credential = new Credential(CredentialType.IDENTITY_CARD.value, '789');
    other.guardian.gender = Gender.MALE.value;
    other.guardian.birthday = '1970-02-03';
    other.guardian.mobile = '383789904';
    other.guardian.email = 'c@c.com';
    const changes = assign(insurant, other);
    expect(insurant.id).toBe('0');
    expect(insurant.name).toBe('name');
    expect(insurant.credential).not.toBeNull();
    expect(Object.getPrototypeOf(insurant.credential)).toBe(Credential.prototype);
    expect(insurant.credential).not.toBe(other.credential);
    expect(insurant.credential).toEqual(other.credential);
    expect(insurant.gender).toBe(Gender.FEMALE.value);
    expect(insurant.birthday).toBe('1990-01-01');
    expect(insurant.mobile).toBe('7777');
    expect(insurant.email).toBe('i@i.com');
    expect(insurant.kinship).toBe(Kinship.SELF.value);
    expect(insurant.guardian).not.toBeNull();
    expect(Object.getPrototypeOf(insurant.guardian)).toBe(Guardian.prototype);
    expect(insurant.guardian).not.toBe(other.guardian);
    expect(insurant.guardian).toEqual(other.guardian);
    expect(Object.keys(changes)).toEqual(['credential', 'gender', 'mobile', 'guardian', 'kinship']);
    expect(changes.credential).not.toBeUndefined();
    expect(Object.getPrototypeOf(changes.credential)).toBe(Credential.prototype);
    expect(changes.credential).not.toBe(other.credential);
    expect(changes.credential).toEqual(other.credential);
    expect(changes.gender).toBe(Gender.FEMALE.value);
    expect(changes.mobile).toBe('7777');
    expect(changes.guardian).not.toBeUndefined();
    expect(Object.getPrototypeOf(changes.guardian)).toBe(Guardian.prototype);
    expect(changes.guardian).not.toBe(other.guardian);
    expect(changes.guardian).toEqual(other.guardian);
    expect(changes.kinship).toBe(Kinship.SELF.value);
  });
  test('assign(insurant, buyer, changes)', () => {
    const insurant = new Insurant();
    insurant.id = '0';
    insurant.name = 'name';
    insurant.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    insurant.gender = Gender.MALE.value;
    insurant.birthday = '1990-01-01';
    insurant.mobile = '12039495';
    insurant.email = 'i@i.com';
    insurant.kinship = Kinship.PARENT.value;
    insurant.guardian = new Guardian();
    insurant.guardian.id = '1';
    insurant.guardian.name = 'guardian';
    insurant.guardian.credential = new Credential(CredentialType.IDENTITY_CARD.value, '456');
    insurant.guardian.gender = Gender.FEMALE.value;
    insurant.guardian.birthday = '1970-02-03';
    insurant.guardian.mobile = '383789904';
    insurant.guardian.email = 'c@c.com';
    const buyer = new Buyer();
    buyer.id = '0';
    buyer.name = 'name';
    buyer.credential = new Credential(CredentialType.PASSPORT.value, '456');
    buyer.gender = Gender.FEMALE.value;
    buyer.birthday = '1990-01-01';
    buyer.mobile = '7777';
    buyer.email = 'i@i.com';
    const changes = { x: 1 };
    assign(insurant, buyer, changes);
    expect(insurant.id).toBe('0');
    expect(insurant.name).toBe('name');
    expect(insurant.credential.type).toBe(CredentialType.PASSPORT.value);
    expect(insurant.credential.number).toBe('456');
    expect(insurant.gender).toBe(Gender.FEMALE.value);
    expect(insurant.birthday).toBe('1990-01-01');
    expect(insurant.mobile).toBe('7777');
    expect(insurant.email).toBe('i@i.com');
    expect(insurant.kinship).toBe(Kinship.PARENT.value);
    expect(insurant.guardian).not.toBeNull();
    expect(insurant.guardian.id).toBe('1');
    expect(insurant.guardian.name).toBe('guardian');
    expect(insurant.guardian.credential.type).toBe(CredentialType.IDENTITY_CARD.value);
    expect(insurant.guardian.credential.number).toBe('456');
    expect(insurant.guardian.gender).toBe(Gender.FEMALE.value);
    expect(insurant.guardian.birthday).toBe('1970-02-03');
    expect(insurant.guardian.mobile).toBe('383789904');
    expect(insurant.guardian.email).toBe('c@c.com');
    expect(Object.keys(changes)).toEqual(['x', 'credential', 'gender', 'mobile']);
    expect(changes.x).toBe(1);
    expect(changes.credential).not.toBeUndefined();
    expect(Object.getPrototypeOf(changes.credential)).toBe(Credential.prototype);
    expect(changes.credential).not.toBe(buyer.credential);
    expect(changes.credential).toEqual(buyer.credential);
    expect(changes.gender).toBe(Gender.FEMALE.value);
    expect(changes.mobile).toBe('7777');
    const expectedChanges = {
      x: 1,
      credential: {
        type: CredentialType.PASSPORT.value,
        number: '456',
      },
      gender: Gender.FEMALE.value,
      mobile: '7777',
    };
    expect(JSON.stringify(changes)).toBe(JSON.stringify(expectedChanges));
    // console.dir(Object.getPrototypeOf(changes));
    // console.dir(Object.getPrototypeOf(expectedChanges));
    // expect(changes).toEqual(expectedChanges);  // FIXME: why they do not eql?
  });
});
