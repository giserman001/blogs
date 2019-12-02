// findMarkdown.js
const fs = require('fs')

function findMarkdown(dir, callback) {
  fs.readdir(dir, function (err, files) {
    if (err) throw err
    files.forEach((fileName) => {
      let innerDir = `${dir}/${fileName}`
      if (fileName.indexOf('.') !== 0) {
        fs.stat(innerDir, function (err, stat) {
          if (stat.isDirectory()) {
            findMarkdown(innerDir, callback)
          } else {
            // 跳过所有README.md文件，当然你也可以自行修改
            // if (/\.md$/.test(fileName) && !/README/.test(fileName)){
            //   callback(innerDir);
            // }
            // 只跳过docs根目录下README.md文件
            if (/\.md$/.test(fileName) && innerDir !== './docs/README.md'){
              callback(innerDir);
            }
          }
        })
      }
    })
  })
}

module.exports = findMarkdown