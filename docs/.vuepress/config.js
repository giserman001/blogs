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
  title: '清风拂林',
  lastUpdated: true,
  description: 'Vuepress blog',
  // head: [
  //   ['link', { rel: "shortcut icon", href: "/assets/favicons/favicon.ico"}]
  // ],
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
        text: 'javascript',
        link: '/javascript/'
      },
      {
        text: '友情链接',
        link: '/friendLink'
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
        text: '知识库',
        items: [{
            text: '攻略',
            link: '/article/strategy/'
          },
          // {
          //   text: '优质文章',
          //   link: '/article/qualityArticles/javascript/'
          // }
        ]
      }
    ],
    sidebar: {
      '/vue/': [
        ['', 'element分页组件记录'],
        ['vue_search_form', 'element-ui二次封装form表单'],
        ['vue_ts', 'Vue + TS 开发应用'],
        ['vue_optimize', 'vue优化技巧'],
        ['vue_auth_manage', 'vue权限菜单及按钮权限'],
        ['vue_JWT', 'vue里JWT认证'],
        ['vue_render_jsx', 'vue里render函数之JSX应用'],
        ['vue_module_communicate', 'Vue组件间通信方式'],
        ['vue_router', 'Vue相同路由不同参数的不刷新问题']
      ],
      '/react/': [
        ['', '默认文档']
      ],
      '/miniprogram/': [
        ['', '小程序左滑删除'],
        ['wx_calendar', '小程序日历组件']
      ],
      '/javascript/': [
        ['', '数字翻滚封装'],
        ['card_overturn', 'css3卡片翻转'],
        ['js_skill_optimize', '灵活运用JS开发技巧'],
        ['html5_upload', 'HTML5上传下载']
      ],
      '/article/strategy/': [{
        title: '攻略',
        children: getFileNames('/article/strategy/')
      }],
      // 暂时去掉优质文章模块
      // '/article/qualityArticles/': [{
      //     title: 'javascript',
      //     children: getFileNames('/article/qualityArticles/javascript/', 'javascript')
      //   },
      //   {
      //     title: 'node',
      //     children: getFileNames('/article/qualityArticles/node/', 'node')
      //   }
      // ],
      '/': [
        ['home', 'web开发记录']
      ]
    },
    // 自定义属性----用于添加友情链接
    friendLinks: [{
      logo: 'https://giserman001.github.io/blogs/logo.jpg',
      webSiteName: '清风拂林',
      webSiteUrl: 'https://giserman001.github.io/blogs/',
      webSiteDes: '前端开发,技术分享'
    },{
      logo: 'https://giserman001.github.io/blogs/logo.jpg',
      webSiteName: '清风拂林',
      webSiteUrl: 'https://giserman001.github.io/blogs/',
      webSiteDes: '前端开发,技术分享'
    },{
      logo: 'https://giserman001.github.io/blogs/logo.jpg',
      webSiteName: '清风拂林',
      webSiteUrl: 'https://giserman001.github.io/blogs/',
      webSiteDes: '前端开发,技术分享'
    },{
      logo: 'https://giserman001.github.io/blogs/logo.jpg',
      webSiteName: '清风拂林',
      webSiteUrl: 'https://giserman001.github.io/blogs/',
      webSiteDes: '前端开发,技术分享'
    },{
      logo: 'https://giserman001.github.io/blogs/logo.jpg',
      webSiteName: '清风拂林',
      webSiteUrl: 'https://giserman001.github.io/blogs/',
      webSiteDes: '前端开发,技术分享'
    }]
  },
  markdown: {
    lineNumbers: true
  },
  plugins: ['@vuepress/back-to-top']
}