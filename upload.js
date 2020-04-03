const path = require('path')
const qiniu = require('qiniu')
const fs = require('fs')

// 鉴权对象mac
var accessKey = 'rEnOGO6rPzWLgP6uSwncdt4wM2kYdbqqQ6dbjfWk'
var secretKey = '_Qw5SM320n320QiFJEhzEVN_og-oSJJZk8lLbND7'
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

var config = new qiniu.conf.Config()
// 空间对应的机房 --- 华东
config.zone = qiniu.zone.Zone_z0
// 上传是否使用cdn加速
config.useCdnDomain = true

var formUploader = new qiniu.form_up.FormUploader(config)
var putExtra = new qiniu.form_up.PutExtra()

// 执行
displayFile('./docs/.vuepress/dist')


function upload(key, localFile) {
  //这里base-html是存储空间名
  var Bucket = 'vuepress-blogs'
  var options = {
    scope: Bucket
  }
  // let key = null
  var putPolicy = new qiniu.rs.PutPolicy(options)
  var uploadToken = putPolicy.uploadToken(mac)
  formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
      if (respErr) {
        throw respErr
      }
      if (respInfo.statusCode == 200) {
        console.log(respBody)
      } else {
        console.log(respInfo.statusCode)
        console.log(respBody)
        if (respBody.error) {
          console.log(respBody.error)
        }
      }
  });
}

//遍历文件夹
function displayFile(param) {
  fs.stat(param, function (err, stats) {
    //如果是目录的话，遍历目录下的文件信息
    if (stats.isDirectory()) {
        fs.readdir(param, function (err, file) {
          file.forEach((e) => {
            //遍历之后递归调用查看文件函数
            //遍历目录得到的文件名称是不含路径的，需要将前面的绝对路径拼接
            var absolutePath = path.join(param, e);
            //var absolutePath = path.resolve(path.join(param, e));
            displayFile(absolutePath)
          })
        })
    } else {
      var localFile = path.resolve(__dirname, param)
      var key = 'vuepress-blogs/' + param.replace(/\\/g, '/').split('dist/')[1]
      upload(key, localFile)
    }
  })
}