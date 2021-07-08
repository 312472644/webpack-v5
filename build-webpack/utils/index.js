const path = require('path');

/** 获取当前项目的根目录绝对路径 */
const getAbsPath = (staticSrc = '../../') => {
  return path.join(__dirname, staticSrc);
};

module.exports = {
  getAbsPath
};