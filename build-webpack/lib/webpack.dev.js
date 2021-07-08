const path = require('path');
const webpack = require('webpack');
const { getAbsPath } = require('../utils/index');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.join(getAbsPath(), './dist'),
    hot: true,
    port: 6000,
    hotOnly: false,
    https: true,
  },
  devtool: 'source-map'
};

module.exports = merge(baseConfig, devConfig);