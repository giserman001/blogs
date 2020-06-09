---
title: typescript学习笔记
date: 2020-04-13
isNoPage: false
des: 随着前端日益发展，typescript在前端领域是越来越突出，弱类型的语言总是让我们又爱又恨，typescript弥补了javascript的一些缺点...
tags: typescript
sidebarDepth: 0
---

# typescript学习笔记(day1)

> 随着前端日益发展，typescript地位在前端领域是越来越突出，弱类型的语言总是让我们又爱又恨，typescript弥补了javascript的一些缺点。

[[toc]]



### 原始类型

```js
let bool: boolean = false
let num: number = 1
let str: string = 'abc'
// 类型之间不可互相赋值
// str = 1  // error
```

### 数组(两种声明方式)
```js
let arr1: number[] = [1, 2, 3, 4]
let arr2: Array<number> = [1, 2, 3, 4]
// 联合类型 可以使数组里面元素类型多样化
let arr3: Array<number | string> = [1, 2, 3, '4']
const arr: (string | number | boolean)[] = [1, '2', true];
// 以上例子都是存储的基础类型数据，对象类型也是可以的
// type alias 类型别名
type People = { name: string, age: number, sex: string };
const peopleArr: People[] = [{ name: 'Tom', age: 23, sex: 'men' }];
```

### 元组类型
::: warning 
元组可以理解为一个长度，每一项元素类型都确定的数组,
一一对应关系，不能多不能少,跟数组有差别
:::

```js
let tuple: [number, string] = [1, 'abc']
//只能添加声明过的类型（这里只能添加number或者string）
// tuple.push(false) // error
```
::: warning 
元组越界问题（总结：可以添加数据，但是不可越界访问）
:::
```js
// 可以往元组里添加元素
tuple.push('11')
tuple.push(11)
// console.log(tuple[2]) // error 越界访问不可以
```


### 函数
这里函数返回类型可以不写，这是利用ts类型自动推断功能
```js
let add = (x: number, y: number) => x +y
let add = (x: number, y: number): number => x +y
```
函数类型(<font color=red>没有具体实现函数，只是定义一个函数类型(参数类型+返回值类型)</font>)

```js
let compute: (x: number, y: number) => number
```
具体实现函数体（这里就不需要定义参数类型和返回值类型）
```js
compute = (a, b) => a + b
```


### 对象
此时只是简单定义他是object类型，并没有定义对象里面属性的类型
```js
let obj: object = {x: 1, y: 2}
obj.x = 5 // error
```
具体定义：
```js
let obj: {x: number, y: number} = {x: 1, y: 2}
obj.x = 9
```


### symbol

```js
let s1: symbol = Symbol()
let s2 = Symbol()
console.log(s1 === s2) // false
```


### undefined  null
<font color=red>不能赋值其他类型，只能赋值它本身</font>
```js
let un: undefined = undefined
let nu: null = null
```

::: tip
那么其他变量可以赋值undefined null吗？
:::
```js
//(官方文档：undefined和null是任何类型的子类型.
//因此是可以赋值给其他变量,但是默认处于严格模式不可以赋值，我们可以修改tsconfig.json里面的strictNullChecks： false就可以)
let num11:number = 1
num11 = undefined // 不报错
num11 = null // 不报错
// 如果不想修改tsconfig.json, 又想兼容呢？我们改怎么去写？我们可以使用联合类型
let num22:number | undefined | null = 1
num22 = undefined
num22 = null
```


### void

javascript中void是一个操作符 让任何表达式返回undefined
```js
let i = void 2; // i === undefined
```
typescript中如果方法没有返回值，那么此方法的返回值类型就是void类型<br/>
<font color=red>void类型是any类型的子类型，是null和undefined类型的父类型</font>

```js
void 0
let noReturn = (): void => {}
let noReturn1 = () => {}
```

### any
::: tip
默认不声明类型他就是any类型，他可以赋值给任何类型
:::
```js
let x
x = 1
x = []
x = 'abc'
x = () => {}
```

### never

表示永远不会有返回值的类型
```js
let erro = () => {
  throw new Error('error')
}
let endless = ():never => {
  while(true){}
}
```

### 小记
关于void 和 never两种类型博主还是不是很理解，有知道小伙伴可以在评论区发表自己的看法，大家一起学习一起进步


