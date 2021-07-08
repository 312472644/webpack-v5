const path = require('path');
const glob = require('glob');
const { getAbsPath } = require('../utils/index');

const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DynamicPlugin = require('../utils/plugins/dynamic');

/** 获取src路径 */
const PATHS = {
  src: path.join(getAbsPath(), './src')
}

/** 设置多页面打包入口 */
const setMPA = () => {
  const entry = {};
  const entryList = glob.sync(path.join(`${PATHS.src}/**/*`), { nodir: true });
  entryList.map((item) => {
    if (item.endsWith('.jsx')) {
      const pathList = item.split('/');
      if (pathList.length) {
        const pageName = pathList[pathList.length - 2];
        entry[pageName] = `./src/${pageName}/index.jsx`;
      }
    }
  });
  return entry;
};


module.exports = {
  entry: setMPA(),
  output: {
    path: path.join(getAbsPath(), './dist'),
    filename: '[name]/[name]_[chunkhash:8].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: /src/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }, 'eslint-loader']
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer', {
                    overrideBrowserslist: [
                      'ie >= 8',
                      'Firefox >= 3.5',
                      'chrome  >= 35',
                      'opera >= 11.5',
                    ]
                  }]
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|icon)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 81920,
            fallback: {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name]_[contenthash].[ext]',
              }
            }
          }
        }]
      },
      {
        test: /\.ttf$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'fonts',
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'hello webpack',
      template: path.resolve(getAbsPath(), 'public/index.html'),
      favicon: path.resolve(getAbsPath(), 'public/favicon.ico'),
      filename: 'index.html',
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/[name]_[chunkhash:8].css'
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
    }),
    new DynamicPlugin([
      './library/library.dll.js'
    ]),
  ],
  resolve: {
    alias: {
      '@assets': path.join(getAbsPath(), 'src/assets')
    },
    extensions: ['.jsx', '.js'],
  },

};