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
    sidebarDepth: 1,
    logo: './logo.jpg',
    repo: 'giserman001/blogs',
    editLinks: true,
    docsDir: 'docs',
    smoothScroll: true,
    nav: [{
      text: 'web开发',
      link: '/home'
    },
    {
      text: '前端框架',
      items: [
        { text: 'vue', link: '/vue/' },
        { text: 'react', link: '/react/' },
        { text: '微信小程序', link: '/miniprogram/' }
      ]
    }],
    sidebar: {
      '/vue/': [
        ['', 'web开发总结'],
        ['vue_ts', 'Vue + TS 开发应用'],
        ['vue_optimize', 'vue优化技巧'],
        ['vue_auth_manage', 'vue权限菜单及按钮权限'],
        ['vue_JWT', 'vue里JWT认证'],
        ['vue_render_jsx', 'vue里render函数之JSX应用'],
        ['vue_module_communicate', 'Vue组件间通信方式']
      ],
      '/react/': [
        ['', '默认文档'],
        ['test', 'test标题']
      ],
      '/miniprogram/': [
        ['', '微信小程序']
      ],
      '/': [
        ['home', 'web开发']
      ]
      // demo
      // '/knowledge/javascript/': [
      //   {
      //     title: 'javascript',
      //     children: getFileNames('/knowledge/javascript/')
      //   }
      // ]
    }
  }
}