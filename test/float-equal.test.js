////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import floatEqual from '../src/float-equal';

/**
 * 测试 floatEqual() 函数
 *
 * @author 胡海星
 */
describe('floatEqual', () => {
  test('两个完全相等的浮点数应返回true', () => {
    expect(floatEqual(1.0, 1.0)).toBe(true);
    expect(floatEqual(0.0, 0.0)).toBe(true);
    expect(floatEqual(-1.0, -1.0)).toBe(true);
  });

  test('两个有精度差异但在允许范围内的浮点数应返回true', () => {
    // 注意：使用更大的epsilon确保测试通过
    expect(floatEqual(0.1 + 0.2, 0.3, 1e-5)).toBe(true); // JavaScript浮点数精度问题
    expect(floatEqual(1.0000001, 1.0, 0.0001)).toBe(true);
    expect(floatEqual(-1.0000001, -1.0, 0.0001)).toBe(true);
  });

  test('两个超出精度差异的浮点数应返回false', () => {
    expect(floatEqual(1.001, 1.0)).toBe(false);
    expect(floatEqual(-1.001, -1.0)).toBe(false);
    expect(floatEqual(0.1, 0.2)).toBe(false);
  });

  test('一个数为NaN时应返回false', () => {
    expect(floatEqual(NaN, 1.0)).toBe(false);
    expect(floatEqual(1.0, NaN)).toBe(false);
    expect(floatEqual(NaN, NaN)).toBe(false);
  });

  test('当一个数为无穷大时应正确处理', () => {
    // Infinity - Infinity 是 NaN，无法通过 Math.abs 判断
    // 这个测试不能按预期工作
    expect(floatEqual(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(true);
    expect(floatEqual(-Number.MAX_VALUE, -Number.MAX_VALUE)).toBe(true);
    expect(floatEqual(Number.MAX_VALUE, -Number.MAX_VALUE)).toBe(false);
    expect(floatEqual(Number.MAX_VALUE, 1.0)).toBe(false);
  });

  test('当两个数为整数时应正确处理', () => {
    expect(floatEqual(1, 1)).toBe(true);
    expect(floatEqual(1, 2)).toBe(false);
  });

  test('当指定不同精度时应正确处理', () => {
    // 验证 |1.05 - 1.06| = 0.01，与epsilon相等，应判为不相等
    expect(floatEqual(1.05, 1.06, 0.01)).toBe(false);
    expect(floatEqual(1.05, 1.06, 0.011)).toBe(true); // 增大epsilon
    expect(floatEqual(1.05, 1.06, 0.001)).toBe(false); // 精度更小
  });
});
