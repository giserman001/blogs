const path = require('path');
const qiniu = require('qiniu');
const fs = require('fs');
const mime = require('mime');
const chalk = require('chalk') // console.log color

// 鉴权对象mac
var accessKey = 'rEnOGO6rPzWLgP6uSwncdt4wM2kYdbqqQ6dbjfWk';
var secretKey = '_Qw5SM320n320QiFJEhzEVN_og-oSJJZk8lLbND7';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var Bucket = 'vuepress-blogs'; // 空间名字
var prefix = 'blogs/'; // 文件前缀
var delArr = []; // 需要删除的文件列表

var config = new qiniu.conf.Config();
// 空间对应的机房 --- 华东
config.zone = qiniu.zone.Zone_z0;
// 上传是否使用cdn加速
config.useCdnDomain = true;

var formUploader = new qiniu.form_up.FormUploader(config);

// 资源管理相关的操作首先要构建BucketManager对象
const bucketManager = new qiniu.rs.BucketManager(mac, config);

// 执行
getQiniuList().then(res => {
  if(res.length) {
    del(res).then(() => {
      console.log(chalk.green('七牛云静态资源已删除'))
      console.log(chalk.green('文件上传开始....'))
      displayFile('./docs/.vuepress/dist/assets');
      displayFile('./docs/.vuepress/dist/images');
    })
  } else {
    console.log(chalk.green('七牛云空间上没有静态资源'))
    console.log(chalk.green('文件上传开始....'))
    displayFile('./docs/.vuepress/dist/assets');
    displayFile('./docs/.vuepress/dist/images');
  }
  
});

function upload(key, localFile, mimeType) {
  var options = {
    scope: Bucket
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken = putPolicy.uploadToken(mac);
  var putExtra = new qiniu.form_up.PutExtra('', {}, mimeType);
  formUploader.putFile(uploadToken, key, localFile, putExtra, function(
    respErr,
    respBody,
    respInfo
  ) {
    if (respErr) {
      throw respErr;
    }
    if (respInfo.statusCode == 200) {
      console.log(respBody);
    } else {
      console.log(respInfo.statusCode);
      console.log(respBody);
      if (respBody.error) {
        console.log(respBody.error);
      }
    }
  });
}

//遍历文件夹
function displayFile(param) {
  fs.stat(param, function(err, stats) {
    //如果是目录的话，遍历目录下的文件信息
    if (stats.isDirectory()) {
      fs.readdir(param, function(err, file) {
        file.forEach(e => {
          //遍历之后递归调用查看文件函数
          //遍历目录得到的文件名称是不含路径的，需要将前面的绝对路径拼接
          var absolutePath = path.join(param, e);
          //var absolutePath = path.resolve(path.join(param, e));
          displayFile(absolutePath);
        });
      });
    } else {
      var localFile = path.resolve(__dirname, param);
      var key = prefix + '' + param.replace(/\\/g, '/').split('dist/')[1];
      // console.log(localFile, 'localFile')
      // console.log(key, 'key')
      var mimeType = mime.getType(key.split('.')[2]);
      upload(key, localFile, mimeType)
    }
  });
}

/*
  上传文件之前先删除七牛服务器所有静态资源
*/

// 获取指定前缀的文件列表
async function getQiniuList() {
  var options = {
    limit: 10,
    prefix: prefix
  };
  return new Promise(function(resolve, reject) {
    async function getList(marker = false) {
      if (marker) {
        options = {
          limit: 10,
          prefix: prefix,
          marker
        };
      }
      bucketManager.listPrefix(Bucket, options, function(err, respBody, respInfo) {
        if (err) {
          throw err;
        }
        if (respInfo.statusCode == 200) {
          //如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
          //指定options里面的marker为这个值
          var nextMarker = respBody.marker;
          var items = respBody.items;
          items.forEach(function(item) {
            delArr.push(qiniu.rs.deleteOp(Bucket, item.key));
          });
          if (nextMarker) {
            // 递归
            getList(nextMarker);
          } else {
            resolve(delArr);
          }
        } else {
          console.log(respInfo.statusCode, respBody);
        }
      });
    }
    getList();
  });
}

// 删除七牛服务器所有静态资源
function del(deleteOperations) {
  return new Promise(function(resolve, reject) {
    bucketManager.batch(deleteOperations, function(err, respBody, respInfo) {
      if (err) {
        throw err;
      } else {
        if (parseInt(respInfo.statusCode / 100) == 2) {
          respBody.forEach(function(item, index) {
            if (item.code == 200) {
              console.log('删除成功' + '第' + (parseInt(index) + 1) + '个文件');
            } else {
              console.log('删除失败'.error);
              console.log(item.code + '\t' + item.data.error.error);
            }
          });
          resolve(true)
        } else {
          console.log(respInfo.deleteusCode);
          console.log(respBody)
        }
      }
    });
  })
}
