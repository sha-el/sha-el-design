// production config
const merge = require('webpack-merge');
const webpack = require('webpack');
const { resolve } = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: {
    index: './src/index.tsx',
  },
  output: {
    filename: 'js/[name].[hash].min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyJSPlugin({
        parallel: true,
      }),
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/, // eslint-disable-line
      /en/
    ),
  ]
});