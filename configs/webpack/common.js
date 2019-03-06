// shared config (dev and prod)
const { resolve } = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const progressBarPlugin = require('progress-bar-webpack-plugin');


module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  context: resolve(__dirname, '../../'),
  module: {
    rules: [{
        test: /\.js$/,
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }, 'postcss-loader', ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new progressBarPlugin(),
    new StyleLintPlugin(),
  ],
  performance: {
    hints: false,
  },
};