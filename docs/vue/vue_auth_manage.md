---
title: 'vue权限菜单及按钮权限'
des: '权限菜单在我们日程开发后台关系统是非常常见的, 包括菜单权限，按钮权限。这里我通过模拟后端（express）返回权限菜单，然后处理生成与前端路由匹配的菜单...'
date: '2019-03-01'
tags: 'vue,element-ui,express'
sidebar: false
---
# vue权限菜单及按钮权限

[[toc]]

### 1.服务端数据

Vue权限菜单需要根据后端返回的数据来实现
```js
[
  {pid:-1,name:'购物车',id:1,auth:'cart'},
  {pid:1,name:'购物车列表',id:4,auth:'cart-list'},
  {pid:4,name:'彩票',id:5,auth:'lottery'},
  {pid:4,name:'商品',id:6,auth:'product'},
  {pid:-1,name:'商店',id:2,auth:'shop'},
  {pid:-1,name:'个人中心',id:3,auth:'store'},
]
```

通过express返回权限列表
```js
const express = require('express');
const app = express();
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  // Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();});
app.get('/roleAuth', (req, res) => {
  res.json({
    menuList: [
        {pid:-1,name:'购物车',id:1,auth:'cart'},
        {pid:1,name:'购物车列表',id:4,auth:'cart-list'},
        {pid:4,name:'彩票',id:5,auth:'lottery'},
        {pid:4,name:'商品',id:6,auth:'product'},
        {pid:-1,name:'商店',id:2,auth:'shop'},
        {pid:-1,name:'个人中心',id:3,auth:'store'},
    ]
  });});
app.listen(3000);
```
### 2.静态菜单

使用element-ui构建静态菜单
```js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```
```js
<el-menu default-active="2" class="el-menu-vertical-demo">
    <el-submenu index="1">
        <template slot="title">导航一</template>
        <el-submenu index="1-1">
            <template slot="title">选项1-1</template>
            <el-menu-item index="1-1-1">选项1-1-1</el-menu-item>
            <el-menu-item index="1-1-2">选项1-1-2</el-menu-item>
        </el-submenu>
        <el-menu-item index="1-2">选项1-2</el-menu-item>
    </el-submenu>
    <el-menu-item index="2">
        导航二
    </el-menu-item>
    <el-menu-item index="3">
        导航三
    </el-menu-item>
    <el-menu-item index="4">
        导航四
    </el-menu-item></el-menu>
```

路由配置
```js
import Vue from 'vue'import Router from 'vue-router'import Home from './views/Home.vue'
Vue.use(Router)export const authRoutes = [ // 权限路由
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart'),
    children: [
      {
        path: 'cart-list',
        name: 'cart-list',
        component: () => import('@/views/CartList'),
        children: [
          {
            path: 'lottery',
            name: 'lottery',
            component: () => import('@/views/Lottery'),
          },
          {
            path: 'product',
            name: 'product',
            component: () => import('@/views/Product'),
          },
        ],
      },
    ],
  },];export default new Router({ // 默认导出 首页和404页面
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'*',
      component:{
        render:h=>h('h1',{},'Not Found')
      }
    }
  ]})
```
### 3.获取权限

根据后端返回的数据，格式化树结构，并提取用户权限
```js
// 默认设置没有获取过权限export default new Vuex.Store({
  state: {
    hasPermission:false
  },
  mutations: {
    setPermission(state){
      state.hasPermission = true
    }
  },})
```

在路由跳转前看下是否获取过权限，如果没有获取过，就获取权限存入vuex中
```js
router.beforeEach(async (to,from,next)=>{
  if(!store.state.hasPermission){
    // 获取最新路由列表
    let newRoutes = await store.dispatch('getRouteList'); 
    router.addRoutes(newRoutes); // 增加新路由
    next({...to,replace:true})
  }else{
    next(); // 获取过就不需要再次获取了
  }})
```
### 4.获取相关需要数据
```js
const getMenListAndAuth = (menuList)=>{
  let menu = [];
  let sourceMap = {};
  let auth = [];
  menuList.forEach(m => {
    m.children = []; // 增加孩子列表
    sourceMap[m.id] = m;
    auth.push(m.auth)
    if(m.pid === -1){
      menu.push(m); // 根节点
    }else{
      sourceMap[m.pid] && sourceMap[m.pid].children.push(m)
    }
  });
  return {menu,auth} // 获取菜单数据和权限数据
}
async getRouteList({dispatch,commit}){
    let auths = await axios.get('http://localhost:3000/roleAuth');
    let menuList = auths.data.menuList;
    let {menu,auth} = getMenListAndAuth(menuList);
}
```
### 5.找到需要添加的路由
```js
import {authRoutes} from './router'const getRoutes = auth => {
  const filter = (authRoutes)=>{
    return authRoutes.filter(route=>{
      // 包含权限
      if(auth.includes(route.name)){
        if(route.children){
          route.children = filter(route.children);
        }
        return true;
      }
    })
  }
  return filter(authRoutes);};

// 获取需要添加的路由列表
async getRouteList({ dispatch, commit }) {
    let auths = await axios.get("http://localhost:3000/roleAuth");
    let menuList = auths.data.menuList;
    let { menu, auth } = getMenListAndAuth(menuList);
    commit("setMenu", menu); // 将菜单数据保存起来
    commit("setPermission"); // 权限获取完毕
    // 通过auth查找需要添加的路由
    return getRoutes(auth);
}
```
### 6.递归渲染菜单

渲染Menu组件提取公共部分
```sh
<template>
 <div>
  <el-menu>
   <template v-for="menu in $store.state.menu">
    <el-submenu v-if="menu.children.length" :key="menu.auth" :index="menu.auth">
     <template slot="title">{{menu.name}}</template>
     <!-- 此处需要不停的递归 el-submenu  -->
    </el-submenu>
    <el-menu-item v-else :key="menu.auth" :index="menu.auth">{{menu.name}}</el-menu-item>
   </template>
  </el-menu>
 </div>
</template>
```

编写递归组件
```sh
<template>
    <el-submenu :index="menu.auth">
         <template slot="title">{{menu.name}}</template>
         <template v-for="(child,index) in menu.children">  
            <el-menu-item v-if="!child.children.length" :key="index"> 
               <router-link :to="{name:child.auth}"> {{child.name}}</router-link>
            </el-menu-item>
            <!-- 如果有儿子继续递归组件 -->
            <ResubMenu :menu="child" v-else :key="index"></ResubMenu>
         </template>
    </el-submenu>
</template>
<script>
export default {
    name:'ResubMenu',
    props:{
        menu:{}
    }}
</script>
```
### 7.权限按钮控制
```js
state: {
    hasPermission: false,
    menu: [], // 菜单权限
    btnPermission:{ // 按钮权限
        edit:false,
        add:true
    }},
```

查看当前按钮是否有权限
```sh
<el-button v-has="'edit'">编辑</el-button>
<el-button v-has="'add'">添加</el-button>
```

自定义指令的使用
```js
directives: {
  has: {
   inserted(el, bindings, vnode) {
     let value = bindings.value;
     // 在vuex中查看是否有按钮权限
     let flag = vnode.context.$store.state.btnPermission[value];
     // 如果没有全选则将按钮删除即可
     !flag && el.parentNode.removeChild(el);
   }
  }
 }
```