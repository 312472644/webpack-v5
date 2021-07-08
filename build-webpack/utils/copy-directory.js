const fs = require('fs');
const stat = fs.stat;
const _symbol = Symbol();

const copyDirectory = {
  copy: {},
  exists: {}
};

copyDirectory.copy[_symbol] = function (src, dst) {
  //读取目录
  fs.readdir(src, function (err, paths) {
    if (err) {
      throw err;
    }
    paths.forEach(function (path) {
      const _src = src + '/' + path;
      const _dst = dst + '/' + path;
      let readable;
      let writable;
      stat(_src, function (err, st) {
        if (err) {
          throw err;
        }

        if (st.isFile()) {
          readable = fs.createReadStream(_src);//创建读取流
          writable = fs.createWriteStream(_dst);//创建写入流
          readable.pipe(writable);
        } else if (st.isDirectory()) {
          copyDirectory.exists[_symbol](_src, _dst, copyDirectory.copy[_symbol]);
        }
      });
    });
  });
}

copyDirectory.exists[_symbol] = function (src, dst, callback) {
  //测试某个路径下文件是否存在
  fs.exists(dst, function (exists) {
    if (exists) {//不存在
      callback(src, dst);
    } else {//存在
      fs.mkdir(dst, function () {//创建目录
        callback(src, dst)
      })
    }
  })
}

/**
 * 复制文件夹到目标文件夹
 *
 * @param {*} sourcePath 源文件夹地址
 * @param {*} targetPath 目标文件地址
 */
copyDirectory.copyFile = function (sourcePath, targetPath) {
  copyDirectory.exists[_symbol](sourcePath, targetPath, copyDirectory.copy[_symbol])
}

module.exports = {
  copyDirectory: copyDirectory.copyFile
};