---
title: typescript学习笔记——函数、类、类与接口
date: 2020-04-16
isNoPage: false
des: 
tags: typescript
---

[[toc]]

## 函数

### 函数定义方式
```js
// 1.第一种
function add1(x: number, y: number) {
  return x + y
}
// 2.第二种
let add2: (x: number, y: number) => number
// 3.第三种
type add3 = (x: number, y: number) => number
// 4.第四种
interface add4 {
  (x: number, y: number): number
}
```

### 函数参数
参数（形参和实参）必须一一对应，当然也可以设置为：可选参数(?)
::: tip
可选参数必须位于必选参数之后
:::
```js
function add5(x: number, y?: number) {
  return y ? x + y : x
}
```
参数默认值
::: tip
必选参数之前默认参数如果没有值，必须穿undefiend占据位置，必选参数之后没有这个要求
:::
```js
function add6(x: number, y = 9, z: number, q = 7) {
  return x + y + z + q
}
console.log(add6(2, undefined, 4))
```

以上参数都是固定参数,那么动态参数呢？在es6里面使用关键字 ...rest表示  那么在typescript也是一样的
```js
function add7(x: number, ...rest: number[]) {
  return x + rest.reduce((pre, cur) => pre + cur)
}
console.log(add7(6,5,6,7,7))
```

### 函数重载
两个函数名称相同，但是参数个数或者类型不同那么就形成函数重载
**好处：不需要为了相似功能定义不同的函数名字，这样增强函数可读性**
```js
function add8(...rest:number[]): number
function add8(...rest:string[]): number
function add8(...rest:any[]): any {
  let first = rest[0]
  if(typeof first === 'string') {
    return rest.join('')
  }
  if(typeof first === 'number') {
    return rest.reduce((pre, cur) => pre + cur)
  }
}
console.log(add8(6,5,6,7,7))
console.log(add8('a', 'b', 'c', 'd'))
```
## 类

### 类的基本使用
```js
class Dog {
  constructor(name: string) {
    this.name = name
  }
  name?: string // 可设置可选,也可以这么写 name: string = 'dog
  run() {
    console.log('run')
    this.pri()
  }
  private pri() {
    console.log('我是私有成员')
  }
  protected pro() {}
  readonly legs: number = 4
  static food: string = 'boo'
}
// console.log(Dog.food)
let dog = new Dog('dog')
// console.log(Dog.prototype)
// console.log(dog)
// dog.pri() // error
// dog.run()
// dog.pro() // error
// console.log(dog.legs)
```
::: danger
在类成员方法都是原型上属性，而类成员属性却是实例上的属性<br/>
成员属性：必须有初始值，或者在构造函数里有赋值
:::

### 继承
在构造函数中必须对调用super()

```js
class Husky extends Dog {
  constructor(name: string, public color: string) {
    super(name)
    this.color = color
    this.pro() // 可以访问
    // console.log(this.legs)
  }
}
let husky = new Husky('dog', 'red')
// husky.pro() // error
// console.log(husky.legs)
// console.log(Husky.food)
```

### 类成员修饰符

1. public （可省略不写）默认情况下都是公有成员
2. private 只能在类的本身调用，不能被继承不能被实例调用, 构造函数加private那么这个类就不能实例化也不能继承
3. protected  只能在类或者子类中访问, 构造函数加protected那么这个类不能实例化只能被继承----相当于基类
4. readonly 只读属性（一定要初始化）类成员可以加修饰符，那么构造函数参数我们也是可以加修饰符 ---- 他的作用就是将参数变成实例的属性
5. static 只能通过类名调用，不能通过实例调用，但是可以被继承，子类类名也是可以调用

### 抽象类与多态
抽象类：不能实例化，只能被继承 用关键字abstract定义
```js
abstract class Person {
  constructor( public name: string) {
    this.name = name
  }
  eat() {
    console.log('吃')
  }
  abstract sleep(): void // 抽象方法（没有函数实体, 具体函数实体可在子类中同名实现）
}
// let liu = new Person() error
class Liy extends Person {
  constructor( public name: string, public color: string) {
    super(name)
  }
  sleep() {
    console.log('liy在睡觉')
  }
}
let liy = new Liy('liy', 'red')
// liy.eat() // 可调用
// liy.sleep()
```
### 多态
在抽象类中我们也可以利用abstract定义抽象方法（不在指定函数具体实现）<br/>
抽象类的好处：抽离事务的共性，有利于代码复用和扩展，另外抽象类也可以实现多态，在父类中定义抽象方法（没有函数实体），再多个子类中对这个方法有不同实现方法。

```js
class Bin extends Person {
  constructor( public name: string, public color: string) {
    super(name)
  }
  sleep() {
    console.log('bin 在睡觉')
  }
}
let bin = new Bin('bin', 'red')
// bin.sleep()
let persons: Person[] = [liy, bin] // 这里定义不是很懂
persons.forEach((i) => {
  i.sleep()
})
```

### this类型 ---- 实现链式调用
```js
class workFlow {
  step1() {
    return this
  }
  step2() {
    return this
  }
}
let workFlow1 = new workFlow()
// 实现链式调用
workFlow1.step1().step2
```

在继承的时候 this也可以表现多态 (子类型、父类型)

```js
class myFlow extends workFlow {
  next() {
    return this
  }
}
let me = new myFlow()
me.next().step1().next().step2()
```

## 接口和类的关系
接口可以约束类成员  但是只能约束公有成员，不能约束构造函数（使用关键字：implements）

```js
interface Human {
  name: string,
  eat(): void
}
class Asian implements Human {
  constructor(public name: string) {}
  eat() {
    console.log('eat')
  }
  sleep() {}
}
```
接口之间可以实现继承
```js
interface Man extends Human {
  run(): void
}
```

继承多个接口用逗号隔开
```js
interface Child {
  cry(): void
}
interface Boy extends Man, Child {}

let boy:Boy = {
  name: '',
  eat() {},
  run() {},
  cry() {}
}
```

接口可以继承接口，那么接口也可以继承类，只是把类成员抽象出来

```js
class Auto {
  state = 1
}
// 这个过程(接口继承类)抽离包含 公共成员，受保护成员，私有成员
interface AutoFace extends Auto {}
// 这个过程(类被接口约束)只包含公共成员  与上面过程恰好相反，但是有区别
class C implements AutoFace {
  state: number = 10
}
class Bus extends Auto implements AutoFace {}
```




