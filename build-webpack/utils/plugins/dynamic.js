const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { copyDirectory } = require('../copy-directory.js')

/** 在HtmlWebpackPlugin生成后，动态插入脚本 */
class DynamicPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.compilation.tap('DynamicPlugin', (compilation) => {
      const options = this.options;
      if (!options.length) {
        throw new Error('param must is a array');
      }
      compiler.hooks.afterEmit.tapAsync('out-put', (compilation, callback) => {
        const rootPath = process.cwd();
        const targetPath = path.join(rootPath, 'build');
        const sourcePath = path.join(rootPath, 'dist');
        copyDirectory(targetPath, sourcePath);
        callback(null, compilation);
      });
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
        let resultHtml = htmlPluginData.html;
        options.forEach((item) => {
          resultHtml += `<script src=${item}></script>`
        })
        htmlPluginData.html = resultHtml;
        callback(null, htmlPluginData);
      })
    });
  }
}

module.exports = DynamicPlugin;