const fs = require('fs')
// 获取该文件夹下的所有文件名
const getFileNames = (parentFileName) => {
  const results = []
  const files = fs.readdirSync(`./docs${parentFileName}`)
  files.forEach((val) => {
    if ('README.md'.includes(val)) {
      // results.push('')
    } else {
      results.push(val)
    }
  })
  return results
}

module.exports = {
  base: '/blogs/',
  title: 'blogs',
  description: 'Vuepress blog',
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: 'https://github.com/giserman001',
    // 自定义仓库链接文字。
    repoLabel: 'My GitHub',
    nav: [{
        text: 'Home',
        link: '/'
      },
      {
        text: 'test',
        link: '/test.md'
      }
    ]
  }
}