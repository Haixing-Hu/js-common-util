////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

// Classes that define various ES5+ built-in objects

/* eslint-disable no-undef */
export const PromiseClass = (typeof Promise !== 'undefined' ? Promise : undefined);
export const MapClass = (typeof Map !== 'undefined' ? Map : undefined);
export const SetClass = (typeof Set !== 'undefined' ? Set : undefined);
export const WeakMapClass = (typeof WeakMap !== 'undefined' ? WeakMap : undefined);
export const WeakSetClass = (typeof WeakSet !== 'undefined' ? WeakSet : undefined);
export const ArrayBufferClass = (typeof ArrayBuffer !== 'undefined' ? ArrayBuffer : undefined);
export const SharedArrayBufferClass = (typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined);
export const DataViewClass = (typeof DataView !== 'undefined' ? DataView : undefined);
export const BigIntClass = (typeof BigInt !== 'undefined' ? BigInt : undefined);
export const BigInt64ArrayClass = (typeof BigInt64Array !== 'undefined' ? BigInt64Array : undefined);
export const BigUint64ArrayClass = (typeof BigUint64Array !== 'undefined' ? BigUint64Array : undefined);
export const Float32ArrayClass = (typeof Float32Array !== 'undefined' ? Float32Array : undefined);
export const Float64ArrayClass = (typeof Float64Array !== 'undefined' ? Float64Array : undefined);
export const Int8ArrayClass = (typeof Int8Array !== 'undefined' ? Int8Array : undefined);
export const Int16ArrayClass = (typeof Int16Array !== 'undefined' ? Int16Array : undefined);
export const Int32ArrayClass = (typeof Int32Array !== 'undefined' ? Int32Array : undefined);
export const Uint8ArrayClass = (typeof Uint8Array !== 'undefined' ? Uint8Array : undefined);
export const Uint8ClampedArrayClass = (typeof Uint8ClampedArray !== 'undefined' ? Uint8ClampedArray : undefined);
export const Uint16ArrayClass = (typeof Uint16Array !== 'undefined' ? Uint16Array : undefined);
export const Uint32ArrayClass = (typeof Uint32Array !== 'undefined' ? Uint32Array : undefined);
export const SymbolClass = (typeof Symbol !== 'undefined' ? Symbol : undefined);
