---
title: typescript学习笔记——枚举类型，接口（对象，函数）
date: 2020-04-14
isNoPage: false
des: 
tags: typescript
---

# typescript学习笔记(day2)

>这次主要学习 <font color=red>枚举类型, 接口(对象类型接口), 接口(函数类型接口)</font>

[[toc]]

## 枚举

### 枚举定义
定义：一组有名字的常量集合， 列如手机通讯录

1. **数字枚举---默认枚举成员值从0开始依次递增**

```js
enum Role {
  Reporter,
  Developer,
  Maintainter,
  Owner,
  Guest
}
console.log(Role.Reporter) // 0
```
我们可以自定义初始值,<font>那么后面的值依次递增，前面的还是从0开始递增</font>
```js
enum Role1 {
  Reporter,
  Developer,
  Maintainter = 6,
  Owner,
  Guest
}
console.log(Role1.Reporter) // 0
console.log(Role1.Developer) // 1
console.log(Role1.Maintainter) // 6
console.log(Role1.Owner) // 7
console.log(Role1.Guest) // 8
```
那么枚举到底是什么东西呢，我们可以控制打印(console.log(Role1))看一下：
可以看出他是一个反向映射的结果
```js
{
  0: "Reporter"
  1: "Developer"
  6: "Maintainter"
  7: "Owner"
  8: "Guest"
  Reporter: 0
  Developer: 1
  Maintainter: 6
  Owner: 7
  Guest: 8
  __proto__: Object
}
```

2. **字符串枚举**
```js
enum Msassage {
  Success = '恭喜，成功',
  Fail = '你失败了'
}
```
我们也打印看一下：(不能反向映射)
```js
{
  Success: "恭喜，成功"
  Fail: "你失败了"
  __proto__: Object
}
```
3. **异构枚举----数字和字符串混用 --- 不建议使用**

```js
enum Answer {
  N,
  Y = 'yes'
}
```

### 枚举成员
枚举成员分类为const enum/compute enum (常量、计算)
```js
enum Char {
  // const
  a,
  b = Char.a,
  c = 1 + 3,
  // compute (编译时不计算，只在运行时计算)
  d = Math.random(),
  e = '1111'.length,
  // 在compute枚举后面的新增成员必须有初始化表达式,列如下面：
  // u  // error
}
```
::: tip
枚举成员是只读类型，不能进行修改
```js
Char.a = 9 // error
```
:::


### 常量枚举

::: tip
常量枚举在编译期间就会被移除，有可能就会问那这个常量枚举有啥作用呢？
当我们不需要对象，只需要对象值得时候我们就可以使用常量枚举，这样做可以减少编译后的代码。
:::
```js
const enum Mouth {
  Jan,
  Feb,
  Mar
}
let month = [Mouth.Jan, Mouth.Feb, Mouth.Mar]
```


### 枚举类型
在某些情况下 枚举和枚举成员都可以做一种类型存在
```js
enum E {a, b}
enum F {a = 1, b = 2}
enum G {a = 'aaaa', b = 'bbbb'}
// 可以把number类型赋值给枚举
let e: E = 9999
// 取值也可以超出枚举定义时的值
let f: F = 9999
// e === f // error 枚举之间不可以比较
```

### 枚举成员类型

```js
let e1: E.a
let e2: E.b
// e1 === e2 // error 不可比较
let e3: E.a
// e1 === e3 // error
// 注意：取值只能是预定义的值（自身），不能自定义值 (字符串)
let g1: G = G.b
let g2: G.b = G.b
```


## 对象类型接口
> 我们可以用来约束对象，函数，类的结构和类型，代码协作的契约，我们不可改变。

```js
interface List {
  readonly id: number, // readonly 表示该属性只读，无法修改
  name: string,
  age?: number // ? 可有可无
}
// 两种方式都可以
// interface Result {
//   data: Array<List>
// }
interface Result {
  data: List[]
}
function render(result: Result) {
  result.data.forEach((val) => {
    console.log(val.name, val.id)
    if(val.age){
      console.log(val.age)
    }
  })
}
let result = {
  data: [{
    id: 1,
    name: 'a',
    // 只要传入的数据结构和类型满足必要条件，那么ts就不会报错（这里sex字段在接口定义时并没有），但是有一种特殊情况,传入字面量时，那么就会做严格类型检查
    sex: 'male'
  },{
    id: 2,
    name: 'b',
    age: 22
  }]
}
render(result)
// 下面这种方式就会报错，那么如何防止错误呢？有三种办法
// render({
//   data: [{
//     id: 1,
//     name: 'a',
//     sex: 'male' // error
//   },{
//     id: 2,
//     name: 'b'
//   }]
// })
```
- 就是上面的办法，定义一个变量（result）接收
- 类型断言1
```js
render({
  data: [{
    id: 1,
    name: 'a',
    sex: 'male'
  },{
    id: 2,
    name: 'b'
  }]
} as Result)
```
- 类型断言2
```js
render(<Result>{
  data: [{
    id: 1,
    name: 'a',
    sex: 'male'
  },{
    id: 2,
    name: 'b'
  }]
})
```
**当我们不明确接口有哪些类型的时候，我们可以用索引签名解决问题**
- 利用字符串索引签名
```js
interface List1 {
  id: number,
  name: string,
  [x: string]: any // 字符串索引签名
}
```

### 字符串索引签名
```js
interface List1 {
  [x: string]: number
}
```
### 数字索引签名
```js
// 相当于声明了字符串类型的数组
interface StringArray {
  [index: number]: string
}
let charts: StringArray = ['A', 'B']
```
可以同时写两种索引(<font color=red>数字索引签名返回值类型一定要是字符串签名返回值类型的子类型或者相同类型</font>)
```js
interface StringArray1 {
  [index: number]: number
  [x: string]: number
}
interface StringArray2 {
  [index: number]: any
  [x: string]: number
}
```

## 函数类型接口

### 定义
在这之前我们可以用一个变量定义函数类型
```js
let adds: (a: number, b: number) => number
```
同样我们可以用接口定义一个函数类型
```js
interface Adds {
  (a: number, b: number): number
}
```
这两种方式定义是等价的


### 类型别名定义函数
类型别名：用来给一个类型起个新名字
关键字 type
```js
type Add = (a: number, b: number) => number
let goBack: Add = (a, b) => a + b
```

### 函数混合类型的接口
```js
interface Lib {
  (): void,
  version: string,
  do(): void
}
function getLib() {
  // 注意这里需要用类型断言
  let lib: Lib = (() => {}) as Lib
  // let lib: Lib = <Lib>(() => {})
  lib.version = '1.1'
  lib.do = () => {}
  return lib
}

let lib1 = getLib()
lib1()
lib1.do()

let lib2 = getLib()
lib2()
lib2.do()
```