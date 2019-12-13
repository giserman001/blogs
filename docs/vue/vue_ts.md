使用vue-cli3创建项目，增加TypeScript
```js
 (*) Babel
 (*) TypeScript
 ( ) Progressive Web App (PWA) Support
 (*) Router
 (*) Vuex
 (*) CSS Pre-processors
 (*) Linter / Formatter
```
>使用less和tslint即可

这里你会看到和普通生成js的项目有些不同


1. shims-tsx.d.ts，允许你以.tsx结尾的文件，在Vue项目中编写jsx代码
2. shims-vue.d.ts TypeScript识别.vue 文件
### 一.更新ts路由文件
```js
import Vue from 'vue';
import Router from 'vue-router';
import Todo from './views/Todo.vue';
Vue.use(Router);export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'todo',
      component: Todo, // 访问/ 的时候显示todo组件
    },
    {
      path: '/list', 
      name: 'list', // 访问/list时显示 列表组件
      component: () => import(/* webpackChunkName: "List" */ './views/List.vue'),
    },
  ],});
```
### 二.在components下新增Todo.vue
```sh
<template>
  <div>
    <ul>
      <li v-for="(item,index) in lists" :key="index">
        <span v-if="currentIndex !== index">{{item.text}}</span>
        <input type="text" v-else />
      </li>
    </ul>
  </div>
  </template>
  <script lang="ts">
  // Component来注册组件
  import { Component, Vue } from "vue-property-decorator";
@Component
export default class Todo extends Vue {
  public currentIndex = -1;
  public lists = [ // 声明数据列表
    {
      text: "睡觉 呼呼~~~",
      complete: false
    },
    {
      text: "玩游戏 呼呼~~~",
      complete: false
    }
  ];}
</script>
```
### 三.JSX编写todo-item组件
#### 属性传递(@Prop)
```js
import { Component, Prop, Vue } from 'vue-property-decorator';
interface Item {
  text: string;
  complete: boolean;
}
@Component
export default class TodoItem extends Vue {
  // 属性校验
  @Prop(Object) public item!: Item; // 循环的每一项
  @Prop(Number) public index!: number; // 当前循环的索引
  @Prop(Number) public currentIndex!: number; // 默认哪一项是当前编辑状态
  public render() { // 组件需要拥有render方法
    return <div>
      {this.index !== this.currentIndex ? <span>{this.item.text}</span> : <input />}
    </div>;
  }
}
```
```sh
// 在Todo中引入TodoItem组件
<li v-for="(item,index) in lists" :key="index">
    <TodoItem :item="item" :index="index" :currentIndex="currentIndex"></TodoItem></li>
```
### 四.引入elementUI
```js
// 在main.js中引入elementUI
import ElementUI from 'element-ui';import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
```
### 五.使用elementUI
```js
public editingContent = ''; // 编辑的值
  public handleChange(value: string) {
    this.editingContent = value;
  }
  protected render() {
    return <li>
      {this.index === this.currentIndex ?
        <div>
          <el-input value={this.editingContent} size='small' on-input={this.handleChange} style={{ width: '200px' }}></el-input>
          <el-button type='primary' size='small'  icon='el-icon-check'></el-button>
          <el-button type='danger' size='small' icon='el-icon-close'></el-button>
        </div>
        : <div>
          <span class='content'>{this.item.text}</span>
          <el-button type='default' size='small' icon='el-icon-edit'></el-button>
        </div>
      }
    </li >;
  } 
```
### 六.组件间通信(@Emit)
#### 实现编辑功能
```sh
<TodoItem
  v-for="(item,index) in lists"
  :key="index"
  :item="item"
  :index="index"
  :currentIndex="currentIndex"
  @edit="edit" // 像子组件传递edit事件>
</TodoItem>
  public edit(index: number) {
    this.currentIndex = index;}
```

子组件触发父组件的方法
```js
public edit() {
    this.$emit('edit', this.index);}<el-button type='primary' size='small' icon='el-icon-edit' on-click={this.edit}></el-button>
```

可以使用装饰器
```js
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
@Emit('edit') // 如果发射的事件名和方法名相同，则可以省略
public edit() {
  return this.index; // 返回的结果或作为向上传递的内容
}
```
#### 实现保存功能
```sh
<TodoItem
   v-for="(item,index) in lists"
  :key="index"
  :item="item"
  :index="index"
  :currentIndex="currentIndex"
  @edit="edit"
  @save="save"
  @close="close"></TodoItem>
```

将save方法传递给子组件
```js
public save({index,content}:{index:number,content:string}){
    this.lists[index].text = content;
    this.close();
}
public close() {
  this.currentIndex = -1;
}
```

子组件调用save方法
```js
@Emit()
public save() {
  return {
    index: this.index,
    content: this.editingContent
  }
}
<el-button type='primary' on-click={this.save} size='small' icon='el-icon-check'></el-button>
```
### 七.数据的监控(@Watch)

这里我们可以监控索引的变化
```js
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
@Watch('currentIndex')
public changeIndex() { // 索引变化讲内容赋予给当前编辑的内容
    this.editingContent = this.item.text;
}
```
### 八.将数据迁移至vuex
```js
import Vue from 'vue';import Vuex from 'vuex';
Vue.use(Vuex);export default new Vuex.Store({
  state: {
    list: [
      {
        text: '睡觉 呼呼~~~',
        complete: false,
      },
      {
        text: '玩游戏 呼呼~~~',
        complete: false,
      },
    ],
  },
  mutations: {
    updateList(state, { index, content }) {
      state.lists[index].text = content;
    }
  },});
```
#### 安装vuex-class
```js
npm i vuex-class
```
```js
import { State, Mutation } from "vuex-class";
@State("lists") public lists!: Item[];
@Mutation("updateList")
public updateList!: (obj: IChangeItem) => void;public save(item: IChangeItem) {
    this.updateList(item); // 通过mutation更新状态
    this.close();
}
```