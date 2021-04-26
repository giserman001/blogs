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
    nav: [
      {
        text: '文章',
        link: '/article'
      },
      {
        text: '友情链接',
        link: '/friendLink'
      },
      {
        text: '关于作者',
        link: '/aboutMe'
      },
      {
        text: '图说生活',
        link: '/pictureLife'
      },
      {
        text: '楼市LPR走势',
        link: '/houseLPR'
      }
      // {
      //   text: 'web开发记录',
      //   link: '/home'
      // },
      // {
      //   text: 'javascript',
      //   link: '/javascript/'
      // },
      // {
      //   text: '前端框架',
      //   items: [{
      //       text: 'vue',
      //       link: '/vue/'
      //     },
      //     {
      //       text: 'react',
      //       link: '/react/'
      //     },
      //     {
      //       text: '微信小程序',
      //       link: '/miniprogram/'
      //     }
      //   ]
      // },
      // {
      //   text: '知识库',
      //   items: [{
      //       text: '攻略',
      //       link: '/article/strategy/'
      //     },
      //     {
      //       text: '优质文章',
      //       link: '/article/qualityArticles/javascript/'
      //     }
      //   ]
      // }
    ],
    sidebar: {
      // '/vue/': [
      //   ['', 'element分页组件记录'],
      //   ['vue_search_form', 'element-ui二次封装form表单'],
      //   ['vue_ts', 'Vue + TS 开发应用'],
      //   ['vue_optimize', 'vue优化技巧'],
      //   ['vue_auth_manage', 'vue权限菜单及按钮权限'],
      //   ['vue_JWT', 'vue里JWT认证'],
      //   ['vue_render_jsx', 'vue里render函数之JSX应用'],
      //   ['vue_module_communicate', 'Vue组件间通信方式'],
      //   ['vue_router', 'Vue相同路由不同参数的不刷新问题']
      // ],
      // '/react/': [
      //   ['', '默认文档']
      // ],
      // '/miniprogram/': [
      //   ['', '小程序左滑删除'],
      //   ['wx_calendar', '小程序日历组件']
      // ],
      // '/javascript/': [
      //   ['', '数字翻滚封装'],
      //   ['card_overturn', 'css3卡片翻转'],
      //   ['js_skill_optimize', '灵活运用JS开发技巧'],
      //   ['html5_upload', 'HTML5上传下载']
      // ],
      // '/article/strategy/': [{
      //   title: '攻略',
      //   children: getFileNames('/article/strategy/')
      // }],
      '/article/strategy/': [
        ['', 'Sequelize - quick start(快速开始)'],
        ['Sequelize_2', 'Sequelize - model模型定义'],
        ['Sequelize_3', 'Sequelize - 使用 model 查询数据'],
        ['Sequelize_4', 'Sequelize - 单表 CURD'],
        ['Sequelize_5', 'Sequelize - 多表 CURD'],
        ['Sequelize_6', 'Sequelize - associations']
      ],
      '/typescript/': [
        ['ts_in_action1', 'typescript学习笔记——基本类型'],
        ['ts_in_action2', 'typescript学习笔记——枚举类型，接口（对象，函数）'],
        ['ts_in_action3', 'typescript学习笔记——函数、类、类与接口']
      ],
      '/css3/': [
        ['css_skill_border_bg', '边框与背景']
      ],
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
      // '/': [
      //   ['home', 'web开发记录']
      // ]
    },
    // 自定义属性----用于添加友情链接
    friendLinks: [{
      logo: 'https://removeif.github.io/images/avatar.jpg',
      webSiteName: '辣椒の酱',
      webSiteUrl: 'https://removeif.github.io',
      webSiteDes: '后端开发，技术分享'
    },{
      logo: 'https://www.515code.com/img/head.jpg',
      webSiteName: '515code-实验室',
      webSiteUrl: 'https://www.515code.com/',
      webSiteDes: '后端开发、机器学习等文章分享'
    },{
      logo: 'http://react.lllomh.com/favicon.ico',
      webSiteName: 'lllomh',
      webSiteUrl: 'http://react.lllomh.com',
      webSiteDes: '这是一个实时统计的前端2大主流框架在各个城市的职位数量,很有参考价值'
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
    }],
    LPRData: [
      {
        time: '2019-8-20',
        oneYear: 4.25,
        fiveYear: 4.85,
      },
      {
        time: '2019-9-20',
        oneYear: 4.20,
        fiveYear: 4.85,
      },
      {
        time: '2019-10-21',
        oneYear: 4.20,
        fiveYear: 4.85,
      },
      {
        time: '2019-11-20',
        oneYear: 4.15,
        fiveYear: 4.80,
      },
      {
        time: '2019-12-20',
        oneYear: 4.15,
        fiveYear: 4.80,
      },
      {
        time: '2020-1-20',
        oneYear: 4.15,
        fiveYear: 4.80,
      },
      {
        time: '2020-2-20',
        oneYear: 4.05,
        fiveYear: 4.75,
      },
      {
        time: '2020-3-20',
        oneYear: 4.05,
        fiveYear: 4.75,
      },
      {
        time: '2020-4-20',
        oneYear: 3.85,
        fiveYear: 4.65,
      },
      {
        time: '2020-5-20',
        oneYear: 3.85,
        fiveYear: 4.65,
      },
      {
        time: '2020-6-22',
        oneYear: 3.85,
        fiveYear: 4.65,
      },
      {
        time: '2020-7-20',
        oneYear: 3.85,
        fiveYear: 4.65,
      },
      {
        time: '2020-8-20',
        oneYear: 3.85,
        fiveYear: 4.65,
      },
      {
        time: '2020-9-21',
        oneYear: 3.85,
        fiveYear: 4.65,
      },
      {
        time: '2020-10-20',
        oneYear: 3.85,
        fiveYear: 4.65,
      },
    ],
  },
  markdown: {
    lineNumbers: true
  },
  plugins: ['@vuepress/back-to-top'],
  configureWebpack: (config, isServer) => {
    if (process.env.NODE_ENV === 'production') {
      // 将地址改为你的阿里云地址 
      // config.output.publicPath = 'https://lw68.top/blogs/'
      config.output.publicPath = 'https://cdn.jsdelivr.net/gh/giserman001/blogs@gh-pages/'
    }
  }
}