////////////////////////////////////////////////////////////////////////////////
//
//    Copyright (c) 2022 - 2023.
//    Haixing Hu, Qubit Co. Ltd.
//
//    All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import analyze from 'rollup-plugin-analyzer';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

function getConfigForFormat(format) {
  const config = {};
  switch (format) {
    case 'cjs':
      config.format = 'cjs';
      config.babelModules = 'cjs';
      break;
    case 'esm':
      config.format = 'esm';
      config.babelModules = false;
      break;
    default:
      throw new Error(`Unsupported library format: ${format}`);
  }
  config.minify = (process.env.NODE_ENV === 'production');
  config.filename = `common-util.${config.format}${config.minify ? '.min' : ''}.js`;
  config.plugins = [];
  if (config.minify) {
    // The @rollup/plugin-terser uses terser under the hood to minify the code.
    config.plugins.push(terser());
  }
  return config;
}

const makeExternalPredicate = (externalArr) => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return (id) => pattern.test(id);
};

function rollupOptions(format) {
  const config = getConfigForFormat(format);
  const result = {
    input: 'src/index.js',
    output: {
      name: 'CommonUtil',
      file: `dist/${config.filename}`,
      format: config.format,
      compact: config.minify,
      sourcemap: true,
      // exports: 'named',
      // preserveModules: true,
    },
    external: makeExternalPredicate([
      ...Object.keys(pkg.peerDependencies || {}),
    ]),
    plugins: [
      // The @rollup/plugin-alias enables us to use absolute import paths for
      // "src" (or any other path you want to configure).
      alias({
        entries: {
          src: fileURLToPath(new URL('src', import.meta.url)),
        },
      }),
      // The @rollup/plugin-node-resolve allows Rollup to resolve external
      // modules from node_modules:
      nodeResolve(),
      // The @rollup/plugin-commonjs plugin converts 3rd-party CommonJS modules
      // into ES6 code, so that they can be included in our Rollup bundle:
      commonjs({
        include: ['node_modules/**'],
      }),
      // The @rollup/plugin-babel enables Babel for code transpilation
      babel({
        babelHelpers: 'runtime',
        exclude: ['node_modules/**'],
      }),
      // The rollup-plugin-analyzer will print out some useful info about our
      // generated bundle upon successful builds.
      analyze({
        hideDeps: true,
        limit: 0,
        summaryOnly: true,
      }),
    ],
  };
  result.plugins.push(...config.plugins);
  return result;
}

export default [
  rollupOptions('cjs'),
  rollupOptions('esm'),
];
