---
tags: 工具
---

# Vuepress搭建静态博客全攻略

[[toc]]

## 为什么会写这篇文章
昨天看到 GitHub 发布了一个叫做 Actions 的新功能，我迫不及待地试用了一下，顺便给自己搭了一个博客，所以就把搭建博客的过程以及每一步踩过的坑梳理了出来，希望可以给后面用 Vuepress 搭建静态博客的同好们一些帮助～

## 本文适合哪些人阅读
如果你希望在两个小时之内搭建出来一个**带有评论系统和谷歌数据分析的静态博客，同时完成静态博客的自动构建和部署**，那么本文非常适合你阅读。每一步我都详细地记录了步骤，以及可能会踩到的坑，另外后续我还会加上「复制博客文章内容加上版本信息」、「全文检索」等功能，敬请期待～
好了，话不多说，让我们开始吧～

## Vuepress 搭建静态博客

可以参照 [Vuepress 的官方文档](https://vuepress.vuejs.org/zh/) 一步一步来就好了:blush:，我这里就简单说下步骤：

### 1. 安装 Vuepress
你可以全局安装：
```sh
# 可以使用 npm 来全局安装
npm i -g Vuepress

# 也可以使用 yarn 来全局安装
yarn global add Vuepress
```

也可以安装在你静态博客项目的开发依赖里面:
```sh
yarn add --dev Vuepress

# 或者
npm i -D Vuepress
```

### 2. 初始化博客项目
```sh
# 可以使用 npm 来初始化项目
npm init

# 也可以使用 yarn 来初始化项目
yarn init
```

然后在项目的根目录下新建一个 `docs` 文件夹，以后我们写的 `markdown` 文件都会放在 `docs` 文件夹下。

我们先随便初始化一个文件来看看效果：
```sh
echo '# Hello VuePress!' > docs/README.md
```
执行命令 `vuepress dev docs`

可以看到启动了一个页面：
![image](https://user-images.githubusercontent.com/16002911/69302580-11496e80-0c55-11ea-973b-539c0cd73c65.png)

为了后续运行方便，我们可以把这些命令写在项目的 `package.json` 文件里面的 `scripts`：
```json
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  },
 }
```
### 3. 进一步的配置
目前我们只写了一个 `markdown` 文档，所以只有一个页面，后续我们的博客会陆续加入很多内容，肯定需要做目录分级，配置导航栏，可以看[文档里的这部分](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E9%A6%96%E9%A1%B5)

### 4. 部署
静态博客搭好了，我们就可以把它部署到服务器上正式给别人访问了，你可以使用 GitHub Pages（GitHub 的静态页面托管服务 ）来托管自己的静态博客。
可以使用 [gh-pages](https://www.npmjs.com/package/gh-pages) 来将打包好的静态博客快速部署到 GitHub Pages 上。

同样的，我们可以将部署的命令加入到 `package.json` 文件里面的 `scripts`，现在，我们的 `scripts` 就是这样的：
```json
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs",
    "deploy": "npm run build && gh-pages -d docs/.vuepress/dist"
  },
 }
```

::: tip 其他第三方静态页面托管服务
也可以使用其他第三方静态页面托管服务（如 Netlify、Coding Pages、Gitlab Pages 等），[这篇文章](https://juejin.im/post/5b57dc9f6fb9a04fb136e91e)里面介绍了很多免费的静态页面托管服务。
:::

到这一步，你的博客已经可以顺利地运行、构建和部署了，直接执行 `npm run deploy` 就可以将您的博客部署到 GitHub Pages 上去，如果您还想让你的博客书写和使用的体验更好，可以接着往下看。

## GitHub Actions 自动构建/部署

大家有注意到 GitHub 悄悄上线了一个 Actions 功能吗？还不了解的同学可以看[这篇文章](https://zhuanlan.zhihu.com/p/77751445)，写的非常全面。

::: tip GitHub Actions 是什么
GitHub 官方号称 Actions 可以让你的**工作流自动化**：GitHub 监听某个事件（可能是某个分支的提交），然后触发你预定义的工作流，让大家在GitHub服务器上直接测试代码、部署代码。所以，我们可以利用这里特性来做 CI/CD，开发者只要写一下 workflow 脚本就可以了，不用费心思去想要用哪个第三方的 CI/CD 服务, :100:。
:::

actions 其实就是由一些脚本组成，所以它们是可以复用的，GitHub 做了一个[官方市场](https://github.com/marketplace?type=actions)，可以搜索到他人提交的 actions。另外，还有一个 [awesome actions](https://github.com/sdras/awesome-actions) 的仓库，也可以找到不少 action。这样一来，你甚至都不用自己写具体的脚本，直接引用别人的脚本就行啦。

话不多说，赶紧用起来！

### 写 workflow 脚本

首先我们需要到项目仓库的页面上进入 Actions 这个 tab, 选择 Node 环境进入脚本的编辑页面
![image](https://user-images.githubusercontent.com/16002911/69306766-9e93bf80-0c63-11ea-8ff8-3c51058cded0.png)
![image](https://user-images.githubusercontent.com/16002911/69306808-c2ef9c00-0c63-11ea-8c0e-37e385fb3f16.png)
 
这里我直接使用了 peaceiris 的 [`actions-gh-pages`](https://github.com/peaceiris/actions-gh-pages)，这个 `action` 可以帮你把打包好的静态文件部署到 `GitHub Pages` 上去。

最终我的 workflow 脚本如下：
![image](https://user-images.githubusercontent.com/16002911/69312573-52984900-0c6a-11ea-9d4c-92d477410d6e.png)
这里有我的[脚本源文件](https://github.com/fyz1994/notes/blob/master/.github/workflows/deploy.yml)，可以参考一下。

更详细的语法可以去看 [GitHub Actions 的官方文档](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows)

::: warning 注意
因为我用的 action 是第三方的，所以 action 可能会经常更改，如果你是过了一段时间才看到这篇文章，peaceiris 的 [`actions-gh-pages`](https://github.com/peaceiris/actions-gh-pages) 很可能已经发生了更新，所以脚本的内容建议直接参照它的官方文档来写。
:::

### 设置 workflow 的环境变量

上面的脚本里面第21行的环境变量是怎么回事呢？
![image](https://user-images.githubusercontent.com/16002911/69312974-482a7f00-0c6b-11ea-828c-8780aaafdf92.png)

因为我们需要 GitHub Actions 把构建成果发到 GitHub 仓库，因此需要 GitHub 密钥，相当于是给 GitHub actions 授权。

首先运行下面的命令生成一对密钥：
```sh
ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f gh-pages -N ""
# You will get 2 files:
#   gh-pages.pub (public key)
#   gh-pages     (private key)
```

然后：
1. 在博客项目的仓库的 Settings 栏下，找到 `Deploy keys`这一项，把你的公钥加进去，**注意勾选`Allow write access`**
2. 同样在博客项目的仓库的 Settings 栏下，找到 `Secrets`这一项，把你的私钥加进去
![image](https://user-images.githubusercontent.com/16002911/69307473-b4a27f80-0c65-11ea-908c-c8da810709fb.png)

### 注意事项

1. **把 `Vuepress` 作为你的开发依赖加入到项目的 `package.json` 文件里面进行管理**。（否则在 GitHub 的 docker 容器里打包的时候会找不到 `Vuepress` 这个命令）
2. **使用 npm 而不是 yarn 来管理依赖包**。（因为 npm 是 node 环境自带的包管理工具，无需额外安装，另外， peaceiris 的 [`actions-gh-pages`](https://github.com/peaceiris/actions-gh-pages) 也是使用 npm 作为包管理工具的）
3. **使用 `npm ci` 来安装依赖包，而不是 `npm install`**

::: tip npm ci 和 npm i 的区别
可以看 medium 上的[这篇文章](https://medium.com/better-programming/npm-ci-vs-npm-install-which-should-you-use-in-your-node-js-projects-51e07cb71e26) 了解一下。

简单来说就是：不像`npm install`，`npm ci`永远不会修改您的`package-lock.json`，它的使用依赖于 `package-lock.json`文件。所以如果使用npm ci，您将获得可靠的版本。通常这个命令会在 `Jenkins`或`GitLab CI`之类的持续集成工具中使用。
:::

好了，这样每次你的项目 `master` 分支一旦有新的提交，就会自动触发这个 workflow，就可以自动完成静态博客的构建和部署了～

也就是说，我们可以直接利用 GitHub 的 markdown 编辑器，直接新建一个文档进行协作，然后提交到 master 分支就行了，完全不用再次去做 git 提交以及本地的构建和部署，简直太方便了 :rocket:

## 添加评论系统

搭建博客的目的肯定是为了能和更多技术同好交流，所以评论系统是不可或缺的一个功能。

我们可以使用 [gitalk](https://github.com/gitalk/gitalk/blob/master/readme-cn.md) 这个开源的评论插件来做博客的评论系统，它是基于 GitHub Issue 来开发的，可以直接使用 GitHub 账号登录，这对程序员来说真的是相当友好了👬

### 注册 GitHub OAuth Application
首先要申请一个 GitHub OAuth Application。可以点击[这里](https://github.com/settings/applications/new)申请.

![image](https://user-images.githubusercontent.com/16002911/69323633-17a20f80-0c82-11ea-8797-f83bc5805d56.png)

::: warning 注意
Authorization callback URL 一定要填写当前使用插件页面的域名。
:::

注册成功后你会得到一个 Client ID 和 Client Secret，这两个数据我们下一步要用到。

### 创建评论组件

我们回到工程，在 docs/.vuepress 下新建一个文件夹 components，再在 components 文件夹下建一个 comment 文件夹，然后新建文件 comment.vue，并复制下面的代码。

```html
<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>
<script>
export default {
  name: 'comment',
  data() {
    return {};
  },
  mounted() {
    let body = document.querySelector('.gitalk-container');
    let script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js';
    body.appendChild(script);
    script.onload = () => {
      const commentConfig = {
        clientID: 'YOUR_CLINENT_ID',
        clientSecret: 'YOUR_CLINENT_SECRET',
        repo: '此仓库的名称',
        owner: '你的 GitHub 用户名，注意是用户名！！！',
        // 这里接受一个数组，可以添加多个管理员
        admin: ['你的 GitHub 用户名'],
        // id 用于当前页面的唯一标识，一般来讲 pathname 足够了，
       
        // 但是如果你的 pathname 超过 50 个字符，GitHub 将不会成功创建 issue，此情况可以考虑给每个页面生成 hash 值的方法.
        id: location.pathname,
        distractionFreeMode: false,
      };
      const gitalk = new Gitalk(commentConfig);
      gitalk.render('gitalk-container');
    };
  },
};
</script>
```

::: warning 注意
id 不能超过50个字符，否则后续评论组件初始化的时候会发生 `Error：validation failed` 的报错。

你可以使用较短的字符来作为 id，例如我自己是使用 `document.title.replace(/\s\|\s去冲浪鸭|《|》/g, "")` 来作为 id 的，即使用我的文章标题作为 id。
:::

### 配置组件

在工程根目录下新建一个文件夹 builds，并在里面新建三个文件，分别是 findMarkdown.js, addComponents.js 和 delComponents.js。

`findMarkdown.js` 文件读取你所有的 Markdown 文件的内容。
```js
// findMarkdown.js
const fs = require('fs')

function findMarkdown(dir, callback) {
  fs.readdir(dir, function (err, files) {
    if (err) throw err

    files.forEach((fileName) => {
      let innerDir = `${dir}/${fileName}`

      if (fileName.indexOf('.') !== 0) {
        fs.stat(innerDir, function (err, stat) {

          if (stat.isDirectory()) {
            findMarkdown(innerDir, callback)
          } else {
            // 跳过readme 文件，当然你也可以自行修改
            if (/\.md$/.test(fileName) && !/README/.test(fileName))
              callback(innerDir);
          }
        })
      }

    })
  })
}

module.exports = findMarkdown
```

`addMarkdown.js` 文件将 comment 组件注册到每个 Markdown 文件的最后。
```js
// addMarkdown.js
const fs = require('fs')
const findMarkdown = require('./findMarkdown')
const rootDir = './docs'

findMarkdown(rootDir, writeComponents)

function writeComponents(dir) {
  if (!/README/.test(dir)) {
    fs.appendFile(dir, `\n \n <comment-comment/> \n `, (err) => {
      if (err) throw err
      console.log(`add components to ${dir}`)
    })
  }
}
```

`delMarkdown.js` 文件在编译后执行，目的是将每个 Markdown 文件的 comment 组件移除，因为我们只想让 comment 组件打包到编译后的文件中，而非工程文件。
```js
// delMarkdown.js
const fs = require('fs')
const findMarkdown = require('./findMarkdown')
const rootDir = './docs'

findMarkdown(rootDir, delComponents)

function delComponents(dir) {
  fs.readFile(dir, 'utf-8', (err, content) => {
    if (err) throw err

    fs.writeFile(dir, content.replace(/\n \n <comment-comment\/> \n /g, ''), (err) => {
      if (err) throw err
      console.log(`del components from ${dir}`)
    })
  })
}
```

### 修改构建脚本

修改 build 的脚本：
```json
{
  "build": "node ./builds/addComponents.js && vuepress build docs && node ./builds/delComponents.js"
}
```

好了，这样你的博客就有一个评论系统了，效果如下：
![image](https://user-images.githubusercontent.com/16002911/69324557-a5322f00-0c83-11ea-9377-577741761252.png)

每次有人在一篇评论数为0的文章下面评论，就会自动以当前文章为标题，当前文章的网址为内容生成一条 GitHub Issue，评论就会被关联到这条 GitHub Issue 上。

## 配置全文搜索
待补充...

## 配置 Google Analytics 

博客搭建好了，也有人访问了，那我们要怎么统计用户的访问情况呢？可以使用谷歌出品的 Google Analytics （GA）。

Google Analytics （GA）是一个对用户活动进行追踪的工具，利用 GA 我们可以收集到博客当前有多少实时活跃用户，博客的总访问量，以及分析用户的一些访问行为，便于我们对博客网站做一些优化，而且它还是免费的！赶快用起来！

### 下载 google-analytics 插件
Vuepress 官方已经为我们准备好了 google-analytics 插件。
```sh
yarn add -D @vuepress/plugin-google-analytics
# OR npm install -D @vuepress/plugin-google-analytics
```
安装完在 config 配置文件里面配置一下 plugins 
```js
module.exports = {
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': '' // UA-00000000-0
      }
    ]
  ]
}
```
### 注册 GA，获取追踪 ID
上面那个 ga ID从哪里获取呢？别着急，我们需要到 Google Analytics 的官网上去注册一下我们的博客应用：
![image](https://user-images.githubusercontent.com/16002911/69326758-4cfd2c00-0c87-11ea-949b-db9d97897394.png)

进去后选择 web app:
![image](https://user-images.githubusercontent.com/16002911/69326797-64d4b000-0c87-11ea-9f68-c3631bb5b12e.png)
![image](https://user-images.githubusercontent.com/16002911/69326919-a1081080-0c87-11ea-8915-04acc70f04e0.png)

把获取到的跟踪ID 填到上面👆的`ga`这一项里面就好了。

## 给 Vuepress 博客做 SEO 优化
待补充...

## 复制文字时显示版权信息
这个等我研究完再加上去，可以参考这篇文章：https://slbyml.github.io/saves/blog.html#%E5%AF%B9%E5%A4%8D%E5%88%B6%E8%BF%9B%E8%A1%8C%E4%BF%AE%E6%94%B9

## 其他优秀案例

- https://www.chavesgu.com/
- https://slbyml.github.io/
