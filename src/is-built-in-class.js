/*******************************************************************************
 *
 *    Copyright (c) 2022 - 2023.
 *    Haixing Hu, Qubit Co. Ltd.
 *
 *    All rights reserved.
 *
 ******************************************************************************/
import {
  PromiseClass,
  MapClass,
  SetClass,
  WeakMapClass,
  WeakSetClass,
  ArrayBufferClass,
  SharedArrayBufferClass,
  DataViewClass,
  BigIntClass,
  BigInt64ArrayClass,
  BigUint64ArrayClass,
  Float32ArrayClass,
  Float64ArrayClass,
  Int8ArrayClass,
  Int16ArrayClass,
  Int32ArrayClass,
  Uint8ArrayClass,
  Uint8ClampedArrayClass,
  Uint16ArrayClass,
  Uint32ArrayClass,
  SymbolClass,
} from './impl/buildin-class';

/**
 * 判定指定的类是否是JavaScript内建的标准对象的类。
 *
 * @param {Function} Class
 *     待判定的类。
 * @return
 *     若该类是JavaScript内建的标准对象的类，则返回{@code true}；否则返回{@code false}。
 * @author 胡海星
 */
function isBuiltInClass(Class) {
  if (Class === undefined) {
    return false;
  }
  return (Class === Array)
      || (Class === Boolean)
      || (Class === Date)
      || (Class === MapClass)
      || (Class === Number)
      || (Class === Object)
      || (Class === PromiseClass)
      || (Class === RegExp)
      || (Class === SetClass)
      || (Class === String)
      || (Class === WeakMapClass)
      || (Class === WeakSetClass)
      || (Class === Function)
      || (Class === Math)
      || (Class === BigIntClass)
      || (Class === JSON)
      || (Class === ArrayBufferClass)
      || (Class === SharedArrayBufferClass)
      || (Class === DataViewClass)
      || (Class === BigInt64ArrayClass)
      || (Class === BigUint64ArrayClass)
      || (Class === Float32ArrayClass)
      || (Class === Float64ArrayClass)
      || (Class === Int8ArrayClass)
      || (Class === Int16ArrayClass)
      || (Class === Int32ArrayClass)
      || (Class === Uint8ArrayClass)
      || (Class === Uint8ClampedArrayClass)
      || (Class === Uint16ArrayClass)
      || (Class === Uint32ArrayClass)
      || (Class === Error)
      || (Class === EvalError)
      || (Class === RangeError)
      || (Class === ReferenceError)
      || (Class === SyntaxError)
      || (Class === TypeError)
      || (Class === URIError)
      || (Class === SymbolClass);
}

export default isBuiltInClass;
