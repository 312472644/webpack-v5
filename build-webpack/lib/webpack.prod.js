const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const prodConfig = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        include: /src/,
        exclude: /node_modules/,
        terserOptions: {
          format: {
            comments: false,
          },
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          nameCache: {
            caches: true
          }
        },
        extractComments: false
      })
    ],
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'all',
          minChunks: 2
        }
      },
    },
  }
};

module.exports = merge(baseConfig, prodConfig);