---
title: Sequelize - 单表 CURD
date: 2019-02-11 12:42:16
categories: Sequelize
tags: Sequelize
sidebarDepth: 1
---

[[toc]]

### Create

#### create - 创建保存新实例

```js
create(values, [options]) -> Promise.<Instance>
```

构建一个新的模型实例，并进行保存。与 `build()`方法不同的是，此方法除创建新实例外，还会将其保存到对应数据库表中。

```js
// 直接操作db
const user = await UserModel.create({
  name: 'guodada',
  age: 23,
  sex: 1,
  score: 99
})
```
<!-- more -->

| 名称                         | 类型          | 说明                                        |
| ---------------------------- | ------------- | ------------------------------------------- |
| values                       | `Object`      | 无                                          |
| [options]                    | `Object`      | 无                                          |
| [options.raw=false]          | `Boolean`     | 设置为true时，值会忽略字段和虚拟设置器      |
| [options.isNewRecord=true]   | `Boolean`     | 无                                          |
| [options.fields]             | `Array`       | 如果设置后，只有列表中区别的列才会进行保存  |
| [options.include]            | `Array`       | 用于构建prefetched/included模型，参见 set   |
| [options.onDuplicate]        | `String`      | 无                                          |
| [options.transaction]        | `Transaction` | 在事务中执行查询                            |
| [options.logging=false]      | `Function`    | 一个用于打印查询时所执行sql的函数           |
| [options.searchPath=DEFAULT] | `String`      | 指定schema的 search_path (仅 Postgres)      |
| [options.benchmark=false]    | `Boolean`     | 当打印SQL日志时同时输出查询执行时间（毫秒） |

#### build - 创建新实例

```js
build(values, [options]) -> Instance
```

```js
// build后对象只存在于内存中，调用save后才操作db
const user = UserModel.build({
  name: 'guodada',
  age: 23,
  sex: 1,
  score: 99
})
const result = await user.save()
console.log(user.get({ plain: true }))
```

| 名称                       | 类型    | 说明                                        |
| -------------------------- | ------- | ------------------------------------------- |
| values                     | Object  | 无                                          |
| [options]                  | Object  | 无                                          |
| [options.raw=false]        | Boolean | 设置为true时，值会忽略字段和虚拟设置器      |
| [options.isNewRecord=true] | Boolean | 无                                          |
| [options.include]          | Array   | 用于构建`prefetched/included`模型，参见 set |

### Update

#### update - 更新记录

> update(values, options) -> Promise.<Array.<affectedCount, affectedRows>>

更新所匹配的多个实例。promise 回调中会返回一个包含一个或两个元素的数组，第一个元素始终表示受影响的行数，
第二个元素表示实际影响的行（仅 Postgreoptions.returning 为 true 时受支持）


```js
await UserModel.update({ name: 'guoxiaoxiao', age: 18 }, { where: { id: 1 } })
```

| 名称                            | 类型          | 说明                                     |
| ------------------------------- | ------------- | ---------------------------------------- |
| values                          | `Object`      | 无                                       |
| options                         | `Object`      | 无                                       |
| options.where                   | `Object`      | 筛选条件                                 |
| [options.fields]                | `Array`       | 要更新字段，默认为全部                   |
| [options.validate=true]         | `Boolean`     | 更新每条记录前进行验证                   |
| [options.hooks=true]            | `Boolean`     | 在执行更新前/后创建钩子                  |
| [options.individualHooks=false] | `Boolean`     | 在执行更新前/后为每个实例创建钩子        |
| [options.sideEffects=true]      | `Boolean`     | 是否更新任何虚拟设置                     |
| [options.returning=false]       | `Boolean`     | 返回受影响的行 (仅适用于 postgres)       |
| [options.limit]                 | `Number`      | 要更新的行数 (仅适用于 mysql 和 mariadb) |
| [options.transaction]           | `Transaction` | 在事务中执行查询                         |
| [options.silent=false]          | `Boolean`     | 如果为true，updatedAt字段将不会更新      |


### Read

详见 [Sequelize - 使用 model 查询数据](https://gershonv.github.io/2019/01/03/sequelize-query/)

### Delete

#### destroy - 删除记录

```js
destroy(options) -> Promise.<Integer>
```

删除多个实例，或设置 `deletedAt` 的时间戳为当前时间（当启用 `paranoid` 时）

执行成功后返回被删除的行数

```js
const deleteRowsCount = await UserModel.destroy({
  where: { id: 2 }
})
console.log(deleteRowsCount) // 执行成功后返回被删除的行数
```

| 名称                            | 类型          | 说明                                                                    |
| ------------------------------- | ------------- | ----------------------------------------------------------------------- |
| options                         | Object        |
| [options.where]                 | `Object`      | 筛选条件                                                                |
| [options.hooks=true]            | `Boolean`     | 在执行前/后创建钩子                                                     |
| [options.individualHooks=false] | `Boolean`     | 在执行前/后为每个实例创建钩子                                           |
| [options.limit]                 | `Number`      | 要删除的行数                                                            |
| [options.force=false]           | `Boolean`     | 删除而不是设置 deletedAt 为当前时间戳 (仅启用 paranoid 时适用)          |
| [options.truncate=false]        | `Boolean`     | 设置为true时，会使用TRUNCATE代替DELETE FROM，这时会忽略where和limit选项 |
| [options.cascade=false]         | `Boolean`     | 仅适用于连接查询时的TRUNCATE操作，截断所有外键匹配的表                  |
| [options.transaction]           | `Transaction` | 在事务中执行查询                                                        |

### findOrCreate - 查找或创建

```js
findOrCreate(options) -> Promise.<Instance, created>
```

查找一行记录，如果不存在则创建实例并保存到数据库中

在这个方法中，如果options对象中没有传入事务，那么会在内部自动创建一个新的事务，以防止在创建完成之前有新匹配查询进入。

```js
// findOrCreate 返回一个包含已找到或创建的对象的数组，找到或创建的对象和一个布尔值
UserModel.findOrCreate({
  defaults: { name: 'guoxiaoxiao' },
  where: { name: 'guoxiaoxiao' }
}).spread((user, created) => {
  console.log(user.name, created)
})

// 在上面的例子中，".spread" 将数组分成2部分，并将它们作为参数传递给回调函数，在这种情况下将它们视为 "user" 和 "created" 。
// 所以“user”将是返回数组的索引0的对象，并且 "created" 将等于 "true"。）

```
| 名称                  | 类型          | 说明                   |
| --------------------- | ------------- | ---------------------- |
| options               | `Object`      | 无                     |
| options.where         | `Object`      | 查询属性               |
| [options.defaults]    | `Object`      | 用于创建新实例的默认值 |
| [options.transaction] | `Transaction` | 在事务中执行查询       |

### findCreateFind - 查找或创建

```js
findCreateFind(options) -> Promise.<Instance, created>
```

效率更高的 `findOrCreate`，不会在事务中执行。首先会尝试进行查询，如果为空则尝试创建，如果是唯一约束则尝试再次查找。

| 名称                  | 类型          | 说明                   |
| --------------------- | ------------- | ---------------------- |
| options               | `Object`      | 无                     |
| options.where         | `Object`      | 查询属性               |
| [options.defaults]    | `Object`      | 用于创建新实例的默认值 |
| [options.transaction] | `Transaction` | 在事务中执行查询       |

ps: `findOrInitialize`  - 查找或初始化: 查找一行记录，如果不存在则创建（不保存）实例

### insertOrUpdate - 更新或创建

```js
upsert(values, [options]) -> Promise.<created>
```

创建或更新一行。如果匹配到主键或唯一约束键时会进行更新。

```js
const isCreate = await TaskModel.insertOrUpdate({ title: '11', content: 'adfadf' })
// isCreate true 创建成功 false 修改成功~
```

| 名称                                          | 类型          | 说明                      |
| --------------------------------------------- | ------------- | ------------------------- |
| values                                        | `Object`      | 无                        |
| [options]                                     | `Object`      | 无                        |
| [options.validate=true]                       | `Boolean`     | 插入前进行验证            |
| [options.fields=Object.keys(this.attributes)] | `Array`       | 要插入/更新字段。默认全部 |
| [options.transaction]                         | `Transaction` | 在事务中执行查询          |

### bulkCreate - 创建多条记录

```js
bulkCreate(records, [options]) -> Promise.<Array.<Instance>>
```

批量创建并保存多个实例。

处理成功后，会在回调函数中返回一个包含多个实例的数组。

```js
 const users = await UserModel.bulkCreate([
  { name: 'guo', age: 22, sex: 1 },
  { name: 'guo2', age: 12, sex: 0 },
  { name: 'guo3', age: 32, sex: 1 }
])
```

| 名称                             | 类型          | 说明                                                      |
| -------------------------------- | ------------- | --------------------------------------------------------- |
| records                          | `Array`       | 要创建实例的对象（键/值 对）列表                          |
| [options]                        | `Object`      | 无                                                        |
| [options.fields]                 | `Array`       | 要插入的字段。默认全部                                    |
| [options.validate=true]          | `Boolean`     | 插入每条记录前进行验证                                    |
| [options.hooks=true]             | `Boolean`     | 在执行前/后创建钩子                                       |
| [options.individualHooks=false]  | `Boolean`     | 在执行前/后为每个实例创建钩子                             |
| [options.ignoreDuplicates=false] | `Boolean`     | 忽略重复主键（Postgres不支持）                            |
| [options.updateOnDuplicate]      | `Array`       | 如果行键已存在是否更新（mysql & mariadb支持）. 默认为更新 |
| [options.transaction]            | `Transaction` | 在事务中执行查询                                          |