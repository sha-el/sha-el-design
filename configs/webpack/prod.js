// production config
const CleanWebpackPlugin = require('clean-webpack-plugin');
const progressBarPlugin = require('progress-bar-webpack-plugin');
const { resolve } = require('path');
const glob = require('glob');

const entryArray = glob.sync('./src/**/*.ts').concat(glob.sync('./src/**/*.tsx'));

const entryObject = entryArray.reduce((acc, item) => {
  const name = item.replace('./src', '').replace(/\.tsx?$/gm, '');
  acc[name] = item;
  return acc;
}, {});

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  context: resolve(__dirname, '../../'),
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: ['ts-loader'],
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
  mode: 'production',
  entry: entryObject,
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
  output: {
    filename: '[name].js',
    path: resolve(process.cwd(), 'lib'),
    library: 'sha-el-design',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new progressBarPlugin(),
  ]
}
