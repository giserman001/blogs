const program = require('commander') // 解析命令行参数
const inquirer = require('inquirer') // 命令行交互
const fs = require('fs')
const path = require('path')
const chalk = require('chalk') // console.log color
/**
 *对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
  return fmt
}
/**
 * date 日期对象
 * str string
 */
const getTime = (date, str) => date.format(str)
// console.log(getTime(new Date(), 'yyyy-MM-dd'))



// 读取目录文件
const fileList = fs.readdirSync('./docs') // 读取文件目录，里面还包含了文件
// 找出文件夹，过滤 .vuepress 文件
const folderList = fileList.filter(filename => {
  const filePath = path.resolve(__dirname, `./docs/${filename}`)
  // console.log(filePath, 'filePath')
  return filename !== 'images' && filename !== '.vuepress' && fs.statSync(filePath).isDirectory()
})
folderList.unshift('null')

let tags = ["node", "javascript", "sequelize", "vuepress", "css", "git", "mysql", "egg.js", "vue", "es6", "HTML5", "css3", "小程序", "react", "element-ui", "前端", "express", "vue-router", "typescript"]
let tagsGroup = []
tags.forEach((item, index) => {
  if(index !== 0) {
    tagsGroup.push({
      name: item
    })
  } else {
    tagsGroup.push({
      name: item,
      checked: true
    })
  }
})

program
  .command('page')
  .alias('p')
  .description('脚本命令')
  .option('-a, --name [moduleName]', '模块名称')
  .action(async option => {
    const result = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: '请输入文章标题',
        validate: function(input) {
          return !input ? '标题不能为空' : true
        }
      },
      {
        type: 'input',
        name: 'des',
        message: '文章简短描述',
        default: ''
      },
      {
        type: 'checkbox',
        name: 'tags',
        message: '请选择文章类别(多选)',
        choices: tagsGroup
      },
      {
        type: 'confirm',
        name: 'isNoPage',
        message: '是否是页面？',
        default: false
      },
      {
        type: 'input',
        name: 'filename',
        message: '请输入文件名',
        validate: function(input) {
          return !input ? '文件名不能为空' : true
        }
      },
      {
        type: 'list',
        name: 'directory',
        message: '请选择文件所在目录',
        choices: folderList
      }
    ])
    // 创建文件
    const { title, tags, filename, isNoPage, des, directory } = result
    // 创建前缀内容
    let prefix = '---\n' + `title: ${title}\n` + `date: ${getTime(new Date(), 'yyyy-MM-dd')}\n` + `isNoPage: ${isNoPage}\n` + `des: ${des}\n` + `tags: ${tags}\n` + '---\n'
    let mid = ''
    if(directory === 'null') {
      const res = await inquirer.prompt({
        type: 'confirm',
        name: 'isNewDirectory',
        message: '是否创建新目录？',
        default: true
      })
      if(res.isNewDirectory) {
        const re = await inquirer.prompt({
          type: 'input',
          name: 'sub',
          message: '请输入文件夹名字',
          validate: function(input) {
            return !input ? '文件夹名字不能为空' : true
          }
        })
        // 创建一个空文件夹
        fs.mkdirSync(`./docs/${re.sub}`)
        mid = `${re.sub}/`
      } else {
        prefix = '---\n' + `isNoPage: ${isNoPage}\n` + `sidebar: ${false}\n` + `editLink: ${false}\n` + `pageClass: ${directory}\n` + '---\n'
      }
    } else {
      mid = `${directory}/`
    }
    const filePath = path.resolve(__dirname, `./docs/${mid}${filename}.md`)
    // 内容写入文件
    fs.writeFileSync(filePath, prefix)
    console.log(chalk.green('create page success: '), filePath)
  })
  program.parse(process.argv)