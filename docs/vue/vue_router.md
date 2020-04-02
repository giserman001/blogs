---
title: '针对Vue相同路由不同参数的不刷新问题的解决方案'
des: '在我们使用vue和vue-router开发spa应用时，我们会遇到这样问题：跳转同一个页面只是参数不一样，但是此时页面不刷新，vue会认为这是同一个页面，所以不刷新。 但是现实中却有这样需求。:cry: 页面完全结构一样  只是页面数据不一样而已。为此有如下解决方案...'
date: '2019-08-01'
tags: 'vue,vue-router'
sidebar: false
---
### 针对Vue相同路由不同参数的不刷新问题的解决方案

::: tip 概要
在我们使用vue和vue-router开发spa应用时，我们会遇到这样问题：跳转同一个页面只是参数不一样，但是此时页面不刷新，vue会认为这是同一个页面，所以不刷新。 但是现实中却有这样需求。:cry: 页面完全结构一样  只是页面数据不一样而已。为此有如下解决方案：
:::

#### 问题
当页面跳转时，组件本身并没有发生改变：

```js
// 路由映射关系'/form/:type'
// 当前页面路由/form/shop1
this.$router.push({ name: 'form', params: { type: 'shop2' })
```
> 这时我们进行路由跳转后会发现组件并没有刷新，在前一个路由组件的数据都保留了下来，这并不是我们想要的效果。
>对于简单的数据更新，我们可以直接监听路由参数并重新获取路由的初始化数据即可，但是对于有很多子组件需要初始化或者reset的情况，我们还是有必要重新执行组件的生命周期。


#### 解决方案一（监听$route）

::: tip 方案一
为相同路由页面的跳转进行中间路由替换，在router上注册beforeEach全局守卫进行拦截，跳转到一个中间路由（例如empty），再从中间过渡路由跳转至要去的路由。
:::

```js
// 组件内监听路由跳转
watch: {
  '$route': {
    handler: 'resetData',
    immediate: true
  }
}
// 初始化页面所有数据
methods: {
  resetData() {
    // coding...
  }
}

```



#### 解决方案二（跳转中间空路由）

::: tip 方案二
为相同路由页面的跳转进行中间路由替换，在router上注册beforeEach全局守卫进行拦截，跳转到一个中间路由（例如empty），再从中间过渡路由跳转至要去的路由。
:::

```js
// 全局导航守卫
router.beforeEach((to, from, next) => {
 if (to.name === from.name && to.params.type !== from.params.type) {
  next({ name: 'empty', query: { toPath: to.fullPath } })
 } else {
  next()
 }
})
// 中间过渡路由
let toPath = this.$route.query.toPath
if (this.toPath) {
 this.$router.push({ path: this.toPath })
}
```

#### 解决方案三（v-if的使用）

::: tip 方案三
使用v-if重新渲染当前页面组件
:::

```js
// html部分
<div>
 <router-view v-if="showRouterView"/>
</div>
// script部分
export default {
 data () {
  return {
   isRouterAlive: true
  }
 },
 methods: {
  reload () {
   this.showRouterView = false
   this.$nextTick(() => (this.showRouterView = true))
  }
 }
}
```

> 这样把方法注册到跟组件上，对于想刷新的组件直接调用reload方法即可。(this.$parent.......)

#### 解决方案四（key的使用）

::: tip 方案四
使用vue文档组件绑定的key值来进行强制刷新.
vue文档说明了当你需要
- 完整地触发组件的生命周期钩子
- 触发过渡
的时候可以利用更新组件绑定的key值来完成[更详细的说明](https://cn.vuejs.org/v2/api/#key)
:::

这样直接为组件绑定与路由参数关联的值即可

```html
<router-view :key="$route.fullpath"></router-view>
```