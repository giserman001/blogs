// findMarkdown.js
const fs = require('fs')
const whiteName = ['./docs/README.md', './docs/aboutMe.md', './docs/article.md', './docs/pictureLife.md']

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
            // if (/\.md$/.test(fileName) && innerDir !== './docs/README.md'){
            //   callback(innerDir);
            // }
            if (/\.md$/.test(fileName) && !getWhiteName(innerDir, whiteName)){
              callback(innerDir);
            }
          }
        })
      }
    })
  })
}

function getWhiteName(dir, whiteName) {
  let flag = false
  if(Object.prototype.toString.call(whiteName).slice(8, -1) === 'Array') {
    whiteName.forEach(item => {
      if(item === dir) {
        flag = true
      }
    })
  }
  return flag
}

module.exports = findMarkdown