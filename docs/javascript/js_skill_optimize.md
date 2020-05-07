---
title: '【转】灵活运用JS开发技巧'
des: '灵活运用这些技巧，会给你带来开发效率的提升...'
date: '2019-12-03'
tags: 'javascript'
sidebar: false
---
# 【转】灵活运用JS开发技巧

### 生成随机 ID
```js
const RandomId = len =>
  Math.random()
    .toString(36)
    .substr(3, len)
const id = RandomId(10)
// id => gkkshs67e3
```

### 操作 URL 查询参数
```js
const params = new URLSearchParams(location.search.replace(/\?/gi, '')) // location.search = "?name=young&sex=male"
params.has('young') // true
params.get('sex') // "male"
```

### 格式化金钱
```js
const ThousandNum = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const money = ThousandNum(20190214)
// money => "20,190,214"
```

### 生成随机 HEX 色值
```js
const RandomColor = () =>
  '#' +
  Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, '0')
const color = RandomColor()
// color => "#f03665"
```

### 取整
```js
const num1 = ~~1.69
const num2 = 1.69 | 0
const num3 = 1.69 >> 0
// num1 num2 num3 => 1 1 1
```
::: warning 注意
这个方法比较少见、维护性较差、了解即可，建议还是用下面的
:::
```js
Math.ceil(0.4) // 1 向上取整
Math.floor(0.6) // 0 向下取整
```



### 判断奇偶
```js
const OddEven = num => (!!(num & 1) ? 'odd' : 'even')
const num = OddEven(2)
// num => "even"
```

### 取最小最大值
```js
const arr = [0, 1, 2]
const min = Math.min(...arr)
const max = Math.max(...arr)
// min max => 0 2
```

### 生成范围随机数
```js
const RandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const num = RandomNum(1, 10)
```

### 判断数据类型

> 可判断类型：undefined、null、string、number、boolean、array、object、symbol、date、regexp、function、asyncfunction、arguments、set、map、weakset、weakmap
```js
function DataType(tgt, type) {
  const dataType = Object.prototype.toString
    .call(tgt)
    .replace(/\[object /g, '')
    .replace(/\]/g, '')
    .toLowerCase()
  return type ? dataType === type : dataType
}
DataType('young') // "string"
DataType(20190214) // "number"
DataType(true) // "boolean"
DataType([], 'array') // true
DataType({}, 'array') // false
```

### 是否为空对象
```js
const obj = {}
const flag = DataType(obj, 'object') && !Object.keys(obj).length
// flag => true
```

### switch/case 使用区间
```js
const age = 26
switch (true) {
  case isNaN(age):
    console.log('not a number')
    break
  case age < 18:
    console.log('under age')
    break
  case age >= 18:
    console.log('adult')
    break
  default:
    console.log('please set your age')
    break
}
```

### 混淆数组
```js
const arr = [0, 1, 2, 3, 4, 5].slice().sort(() => Math.random() - 0.5)
// arr => [3, 4, 0, 5, 1, 2]
```

### 过滤空值

> 空值：undefined、null、””、0、false、NaN
```js
const arr = [undefined, null, '', 0, false, NaN, 1, 2].filter(Boolean)
// arr => [1, 2]
```

### 生成随机 ID
```js
const RandomId = len =>
  Math.random()
    .toString(36)
    .substr(3, len)
const id = RandomId(10)
// id => gkkshs67e3
```

### 检测非空参数
```js
function IsRequired() {
  throw new Error('param is required')
}
function Func(name = IsRequired()) {
  console.log('I Love ' + name)
}
Func() // "param is required"
Func('You') // "I Love You"
```

### 格式化日期
```js
/**
 * @param  {date} date 要格式化的时间
 * @param  {stirng} str 连接字符串
 * @return {date}
 */
export function formatDate(date, str = '-') {
  // const arr = new Date(date).toLocaleDateString().match(/\d+/g)
  const time = new Date(date)
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()
  const arr = [year, month, day]
  return arr.map(e => String(e).padStart(2, 0)).join(str)
}
```
### 获取距离今天，d天的时间
```js
/**
 * @param  {number} d 间隔天数
 * @param  {stirng} str 连接字符串
 * @return {date}
 */
export function subtractDate(d = 0, str = '-') {
  const date = +new Date() - d * 24 * 3600 * 1000
  return formatDate(date, str)
}
```

### 类型判断
```js
/**
 * @param  {any}  任意类型
 * @return {stirng} 返回类型字符串
 */
export function typeCheck(param) {
  return Object.prototype.toString.call(param).slice(8, -1)
}
```

### 类型日期是否为周末
```js
/**
 * @param  {string|number}  日期格式 如20190101
 * @return {boolean}
 */
export function dateIsWeekend(date) {
  const d = String(date).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
  const day = new Date(d).getDay()
  return day === 6 || day === 0
}
```
### 判断一个时间是否在某个区段中
```js
/**
 * @param  {string} beginTime 
 * @param  {string} endTime
 * @return {boolean}
 */
export function isRangeTime(beginTime, endTime) {
  var strb = beginTime.split(':')
  if (strb.length != 2) {
    return false
  }
  var stre = endTime.split(':')
  if (stre.length != 2) {
    return false
  }
  var b = new Date()
  var e = new Date()
  var n = new Date()
  b.setHours(strb[0])
  b.setMinutes(strb[1])
  e.setHours(stre[0])
  e.setMinutes(stre[1])
  if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
    return true
  }
  return false
}
```
### 保留N位小数(四舍五入)，从此告别toFixed(n)
```js
/**
 * @param  {string} num 需要处理的数字
 * @param  {string} n 需要保留的位数
 */
const f=(num,n)=>Math.round(num*10**n)/10**n
f(12.466, 2) // 12.47
```