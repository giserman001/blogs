---
title: 'Sequelize - quick start(快速开始)'
des: '在 `Node.js` 社区中，`sequelize` 是一个广泛使用的 `ORM` 框架，它支持 `MySQL`、`PostgreSQL`、`SQLite` 和 `MSSQL` 等多个数据源....'
date: '2019-02-11'
tags: 'sequelize'
sidebarDepth: 1
sidebar: false
---
[[toc]]
在 `Node.js` 社区中，`sequelize` 是一个广泛使用的 `ORM` 框架，它支持 `MySQL`、`PostgreSQL`、`SQLite` 和 `MSSQL` 等多个数据源。

> 有数据库基础或者使用过 `ORM` 操作数据库的经验会更容易上手哦，笔者这里用的以 `mysql` 为主

### 安装

```npm
npm i sequelize mysql2 --registry=https://registry.npm.taobao.org
```

记得提前启动 `mysql` 数据库，创建本例中使用的 `demo` 数据库

```js
mysql.server start // mac (windows net start mysql)

mysql -uroot -p

CREATE DATABASE IF NOT EXISTS demo;
```
<!--more-->

### 建立连接

`Sequelize` 将在初始化时设置连接池，所以如果从单个进程连接到数据库，你最好每个数据库只创建一个实例。 如果要从多个进程连接到数据库，则必须为每个进程创建一个实例，但每个实例应具有“最大连接池大小除以实例数”的最大连接池大小。
因此，如果您希望最大连接池大小为 90，并且有 3 个工作进程，则每个进程的实例应具有 30 的最大连接池大小。

```js
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql' | 'mariadb' | 'sqlite' | 'postgres' | 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // 仅 SQLite 适用
  storage: 'path/to/database.sqlite'
})

// 或者可以简单的使用一个连接 uri
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')
```

### 测试连接

您可以使用 `.authenticate()` 函数来测试连接。

```js
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
```

### model

`Sequelize` 使用 `define` 方法定义模型和表之间的映射。大白话就是 我们可以通过 `model` 去建立表, 添加字段约束等。

```js
const User = sequelize.define('user', {
  firstName: Sequelize.STRING
  lastName: {
    type: Sequelize.STRING
  }
})

// 通过 sync 可以链接模型到数据库中
// force: true 如果表已经存在，将会丢弃表
// force 效果： DROP TABLE IF EXISTS `User` => CREATE TABLE IF NOT EXISTS `USER`...
User.sync({ force: true }).then(function() {
  //...
})
```

上面的代码执行后我们可以发现 `demo` 数据库中创建了一个 `users` 的表

#### model 操作数据库

demo 就简单创建数据和查询数据吧

> `Sequelize` 使用 `Bluebird promise` 来控制异步控制流程。

- 链式写法

```js
User.sync({ force: true }).then(function() {
  User.create({
    firstName: 'John',
    lastName: 'Hancock'
  }).then(user => {
    console.log(user.firstName, user.lastName) // John Hancock
    User.findAll().then(users => {
      console.log('you find: ', users[0]['firstName'], users[0]['lastName']) // you find:  John Hancock
    })
  })
})
```

- `async/await` 写法

```js
User.sync({ force: true }).then(async () => {
  try {
    const user = await User.create({ firstName: 'John', lastName: 'Hancock' })
    const users = await User.findAll()
    console.log(user.firstName, user.lastName) // John Hancock
    console.log('you find: ', users[0]['firstName'], users[0]['lastName']) // you find:  John Hancock
  } catch (err) {
    console.log(err)
  }
})
```

### 完整 demo

```js
const Sequelize = require('sequelize')

/**
 * @params ('database', 'username', 'password', options)
 */
const sequelize = new Sequelize('demo', 'root', '123456', {
  host: 'localhost', // 连接的 host 地址
  dialect: 'mysql', // 连接到 mysql
  port: 3306, // 数据库服务器端口
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const User = sequelize.define('user', {
  firstName: Sequelize.STRING,
  lastName: {
    type: Sequelize.STRING
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully')
    User.sync({ force: true }).then(async () => {
      try {
        const user = await User.create({ firstName: 'John', lastName: 'Hancock' })
        const users = await User.findAll()
        console.log(user.firstName, user.lastName) // John Hancock
        console.log('you find: ', users[0]['firstName'], users[0]['lastName']) // you find:  John Hancock
      } catch (err) {
        console.log(err)
      }
    })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
```

- [sequelize - getting started](http://docs.sequelizejs.com/manual/installation/getting-started.html)
- [sequelize - 中文版入门](https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/getting-started.md)