module.exports = {
  base: '/blogs/',
  title: 'blogs',
  description: 'Vuepress blog',
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: 'https://github.com/xxxxxxx/blog-demo',
    // 自定义仓库链接文字。
    repoLabel: 'My GitHub',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'FirstBlog', link: '/blog/FirstBlog.md' }
    ]
  }
}