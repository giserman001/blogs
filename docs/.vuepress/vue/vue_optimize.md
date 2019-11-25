## vue优化技巧

* vue预渲染解决首页白屏和SEO (npm i prerender-spa-plugin)

    ```
    npm install prerender-spa-plugin
    ```
    缺陷数据不够动态，可以使用ssr服务端渲染

    ```
    const PrerenderSPAPlugin = require('prerender-spa-plugin');
    const path = require('path');
    module.exports = {
        configureWebpack: {
            plugins: [
                new PrerenderSPAPlugin({
                    staticDir: path.join(__dirname, 'dist'),
                    routes: [ '/', '/about',],
                })
            ]
        }
      }
    ```

* 骨架屏加载 （npm i vue-skeleton-webpack-plugin）单页骨架屏   多页骨架屏（带路由）

    配置webpack插件 vue-skeleton-webpack-plugin
    单页骨架屏幕
    ```
    import Vue from 'vue';
    import Skeleton from './Skeleton.vue';
    export default new Vue({
        components: {
            Skeleton:Skeleton
        },
        template: `
            <Skeleton></Skeleton>
        `});// 骨架屏
    plugins: [
        new SkeletonWebpackPlugin({
            webpackConfig: {
                entry: {
                    app: resolve('./src/entry-skeleton.js')
                }
            }
        })]
    ```
    带路由（多页）的骨架屏，编写skeleton.js文件

    ```
    import Vue from 'vue';
    import Skeleton1 from './Skeleton1';
    import Skeleton2 from './Skeleton2';
    export default new Vue({
        components: {
            Skeleton1,
            Skeleton2
        },
        template: `
            <div>
                <skeleton1 id="skeleton1" style="display:none"/>
                <skeleton2 id="skeleton2" style="display:none"/>
            </div>
        `});
    ```

    ```
    new SkeletonWebpackPlugin({
        webpackConfig: {
            entry: {
                app: path.join(__dirname, './src/skeleton.js'),
            },
        },
        router: {
            mode: 'history',
            routes: [
                {
                    path: '/',
                    skeletonId: 'skeleton1'
                },
                {
                    path: '/about',
                    skeletonId: 'skeleton2'
                },
            ]
        },
        minimize: true,
        quiet: true,
    })
    ```
    >优化白屏效果

* 服务端渲染（ssr）nuxt.js

* webpack优化
    1. 使用cdn 配合 externals配置

    1. 使用多线程打包happypack   

    1. 提取公共模块splitsChunks

    1. sourceMap配置

    >配合使用webpack-bundle-analyzer分析打包后文件大小

* data属性之定义响应式数据

* spa页面使用keep-alive缓存组件

* 拆分组件 组件渲染是具体到组件的，如果组件拆分够细，那么数据变动，页面渲染也就具体到某一个组件

* v-if 具有阻断功能  尽量使用v-if 简单的显示隐藏就使用v-show

* key保持唯一性  尽量不要使用 索引做

* 海量数据展示时，不需要响应，那么就使用Object.freeze去冻结，不去添加响应式 Object.defineProperty

* 路由懒加载和异步加载

* 尽量使用runtime运行时   （即.vue文件形式（webpack打包时进行编译）   而不是在vue实列里面写template模板(代码运行时进行编译，此时消耗性能)）

* .数据持久化
    1. 页面刷新重新请求接口
    1. 存入本地localstroage sessionstroage
    >（使用插件：npm i vue-persist）

