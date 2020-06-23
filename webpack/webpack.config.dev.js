const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const autoprefixer = require('autoprefixer');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js'
  },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    public: 'localhost:3000',
    inline: true,
    // hot: true,
    // useLocalIp: true
    // disableHostCheck: true
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, '../src'),
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, '../src'),
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader?sourceMap=true',

          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['ie >= 8', 'last 4 version'],
                  overrideBrowserslist: ['last 2 versions'],
                })
              ],
              sourceMap: true
            }
          },

          'sass-loader'
        ],
      },
    ]
  }
});
