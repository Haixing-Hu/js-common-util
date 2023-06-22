/*******************************************************************************
 *
 *    Copyright (c) 2017 - 2022
 *    Nanjing Smart Medical Investment Operation Service Co. Ltd.
 *    All rights reserved.
 *
 ******************************************************************************/
const resolve = require('path').resolve;
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');

/**
 * 所有环境下的公共配置。
 */
const commonConfig = {
  entry: resolve(__dirname, 'main.js'),
  output: {
    filename: 'common-util.min.js',
    library: {
      name: 'common-util',
      type: 'umd',
    },
    globalObject: 'this',
  },
  devtool: 'source-map',
  mode: 'production',
  stats: 'summary',
  target: ['web', 'es5'],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  externals: {
    'crypto-js': 'commonjs2 crypto-js',
    'dayjs': 'commonjs2 dayjs',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true,
            // pure_funcs: ['console.log'],
          },
        },
      }),
    ],
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        resolve(__dirname, 'main.js'),
        resolve(__dirname, 'src'),
      ],
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        babelrc: false,         // replace .babelrc with babel.config.json
        rootMode: 'upward',
      },
    }],
  },
};

/**
 * 模块分析配置。
 */
const analyzerConfig = {
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
};

module.exports = (process.env.USE_ANALYZER ? merge(commonConfig, analyzerConfig) : commonConfig);
