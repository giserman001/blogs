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
  lastUpdated: true,
  description: 'Vuepress blog',
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: 'giserman001/blogs',
    editLinks: true,
    docsDir: 'docs',
    smoothScroll: true,//页面滚动
    nav: [{
        text: 'Home',
        link: '/home'
      },
      {
        text: 'test',
        link: '/test.md'
      }
    ]
  }
}