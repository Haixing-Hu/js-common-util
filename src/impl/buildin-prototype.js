/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/

// 定义各类ES5+内置对象的prototype

/* eslint-disable no-undef */

export const PromisePrototype = (typeof Promise !== 'undefined' ? Promise.prototype : undefined);
export const MapPrototype = (typeof Map !== 'undefined' ? Map.prototype : undefined);
export const SetPrototype = (typeof Set !== 'undefined' ? Set.prototype : undefined);
export const WeakMapPrototype = (typeof WeakMap !== 'undefined' ? WeakMap.prototype : undefined);
export const WeakSetPrototype = (typeof WeakSet !== 'undefined' ? WeakSet.prototype : undefined);
export const ArrayBufferPrototype = (typeof ArrayBuffer !== 'undefined' ? ArrayBuffer.prototype : undefined);
export const SharedArrayBufferPrototype = (typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer.prototype : undefined);
export const DataViewPrototype = (typeof DataView !== 'undefined' ? DataView.prototype : undefined);
export const BigIntPrototype = (typeof BigInt !== 'undefined' ? BigInt.prototype : undefined);
export const BigInt64ArrayPrototype = (typeof BigInt64Array !== 'undefined' ? BigInt64Array.prototype : undefined);
export const BigUint64ArrayPrototype = (typeof BigUint64Array !== 'undefined' ? BigUint64Array.prototype : undefined);
export const Float32ArrayPrototype = (typeof Float32Array !== 'undefined' ? Float32Array.prototype : undefined);
export const Float64ArrayPrototype = (typeof Float64Array !== 'undefined' ? Float64Array.prototype : undefined);
export const Int8ArrayPrototype = (typeof Int8Array !== 'undefined' ? Int8Array.prototype : undefined);
export const Int16ArrayPrototype = (typeof Int16Array !== 'undefined' ? Int16Array.prototype : undefined);
export const Int32ArrayPrototype = (typeof Int32Array !== 'undefined' ? Int32Array.prototype : undefined);
export const Uint8ArrayPrototype = (typeof Uint8Array !== 'undefined' ? Uint8Array.prototype : undefined);
export const Uint8ClampedArrayPrototype = (typeof Uint8ClampedArray !== 'undefined' ? Uint8ClampedArray.prototype : undefined);
export const Uint16ArrayPrototype = (typeof Uint16Array !== 'undefined' ? Uint16Array.prototype : undefined);
export const Uint32ArrayPrototype = (typeof Uint32Array !== 'undefined' ? Uint32Array.prototype : undefined);
