////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import rollupBuilder from '@qubit-ltd/rollup-builder';

export default rollupBuilder('CommonUtil', import.meta.url, {
  debug: true,
  babelPluginOptions: {
    babelHelpers: 'runtime',
    include: [
      'src/**',
      'node_modules/**/query-string*/**',
      'node_modules/**/filter-obj*/**',
      'node_modules/**/decode-uri-component*/**',
      'node_modules/**/split-on-first*/**',
    ],
    presets: [
      // The @babel/preset-env preset enables Babel to transpile ES6+ code
      // and the rollup requires that Babel keeps ES6 module syntax intact.
      ['@babel/preset-env', { modules: false }],
    ],
    targets: 'fully supports es5',
    plugins: [
      '@babel/plugin-transform-runtime',
    ],
  },
});
