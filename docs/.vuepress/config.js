const fs = require('fs')
// 获取该文件夹下的所有文件名
const getFileNames = (parentFileName, pre) => {
  const results = []
  const files = fs.readdirSync(`./docs${parentFileName}`)
  files.forEach((val) => {
    if ('README.md'.includes(val)) {
      results.push((pre?`${pre}/`:''))
    } else {
      results.push((pre?`${pre}/${val}`:val))
    }
  })
  return results
}
module.exports = {
  base: '/blogs/',
  title: '细节决定成败',
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
        text: 'web开发记录',
        link: '/home'
      },
      {
        text: '前端框架',
        items: [{
            text: 'vue',
            link: '/vue/'
          },
          {
            text: 'react',
            link: '/react/'
          },
          {
            text: '微信小程序',
            link: '/miniprogram/'
          }
        ]
      },
      {
        text: '工具',
        link: '/tool/'
      },
      {
        text: '知识库',
        items: [{
            text: '攻略',
            link: '/article/strategy/'
          },
          {
            text: '优质文章',
            link: '/article/qualityArticles/javascript/'
          }
        ]
      }
    ],
    sidebar: {
      '/vue/': [
        ['', 'element分页组件记录'],
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
        ['', '小程序左滑删除']
      ],
      '/tool/': [
        ['', '数字翻滚封装'],
        ['vue_search_form', 'element-ui二次封装form表单'],
        ['card_overturn', 'css3卡片翻转']
      ],
      '/article/strategy/': [{
        title: '攻略',
        children: getFileNames('/article/strategy/')
      }],
      '/article/qualityArticles/': [{
          title: 'javascript',
          children: getFileNames('/article/qualityArticles/javascript/', 'javascript')
        },
        {
          title: 'node',
          children: getFileNames('/article/qualityArticles/node/', 'node')
        }
      ],
      '/': [
        ['home', 'web开发记录']
      ]
    }
  }
}