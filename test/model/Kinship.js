/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2020
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/

/**
 * 此枚举表示参保者与投保人之间的关系。
 *
 * @author 胡海星
 */
const Kinship = {
  SELF: {
    name: '本人',
    value: 'SELF',
  },
  PARENT: {
    name: '父母',
    value: 'PARENT',
  },
  CHILD: {
    name: '子女',
    value: 'CHILD',
  },
  SPOUSE: {
    name: '配偶',
    value: 'SPOUSE',
  },
  OTHER: {
    name: '其他',
    value: 'OTHER',
  },
};

export default Kinship;
