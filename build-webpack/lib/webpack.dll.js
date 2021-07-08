/** 业务代码分离 */
const path = require('path');
const { getAbsPath } = require('../utils/index.js');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    library: [
      'react',
      'react-dom'
    ]
  },
  output: {
    filename: '[name].dll.js',
    path: path.join(getAbsPath(), 'build/library'),
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(getAbsPath(), 'build/library/[name].json')
    })
  ]
};