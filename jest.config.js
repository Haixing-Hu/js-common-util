////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  verbose: true,
  testMatch: ['**/test/**/*.test.js'],
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  moduleFileExtensions: ['js'],
  transform: {
    '\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/@qubit-ltd/clone',
    '/node_modules/@qubit-ltd/logging',
    '/node_modules/@qubit-ltd/naming-style',
    '/node_modules/@qubit-ltd/typeinfo',
    '/node_modules/@qubit-ltd/type-detect',
    '/node_modules/deep-equal',
    '/node_modules/json-beautify',
    // DO NOT ignore /node_modules/query-string. It should be transpiled.
  ],
  setupFilesAfterEnv: [
    'jest-extended/all',
  ],
  collectCoverage: true,
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/src/deep-equal.js',
    '!**/src/index.js',
  ],
};
