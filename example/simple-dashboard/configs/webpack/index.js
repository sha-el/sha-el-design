/* eslint-disable */

const { resolve } = require('path');
// const {
//     CheckerPlugin
// } = require('awesome-typescript-loader');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const CONTEXT = resolve(__dirname, '../../src/');

module.exports = {
  resolve: {
    extensions: ['.mjs', '.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': resolve(CONTEXT),
      '@components': resolve(CONTEXT, 'app/components'),
      '@components/*': resolve(CONTEXT, 'app/components/*'),
    },
  },
  context: CONTEXT,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['swc-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin(),
    // new CheckerPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        API_URL: JSON.stringify(process.env.API_URL || 'http://localhost:3001'),
        AUTH_URL: JSON.stringify(process.env.AUTH_URL || 'http://localhost:4000'),
        APP_NAME: JSON.stringify(process.env.APP_NAME || 'Baton'),
        APP_ID: JSON.stringify(process.env.APP_ID || '5ee60302002801430059676f'),
      },
    }),
  ],
  performance: {
    hints: false,
  },
};
