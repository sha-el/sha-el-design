// production config
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { resolve } = require('path');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: {
    index: './src/index.ts',
  },
  output: {
    filename: 'index.js',
    path: resolve(process.cwd(), 'lib'),
    library: 'sha',
    publicPath: '/',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new CleanWebpackPlugin({}),
  ]
});
