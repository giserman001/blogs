---
title: Sequelize - 使用 model 查询数据
date: 2019-02-11 12:41:27
categories: Sequelize
tags: Sequelize
sidebarDepth: 1
---
[[toc]]
`Sequelize` 中有两种查询：使用 `Model`（模型）中的方法查询和使用 `sequelize.query()` 进行基于 SQL 语句的原始查询。

<!-- more -->

下面是事先创建好的数据：

```bash
mysql> select * from users;
+----+----------+------+------+-------+
| id | name     | age  | sex  | score |
+----+----------+------+------+-------+
|  1 | guodada0 |   15 |    0 |    60 |
|  2 | guodada1 |   16 |    1 |    80 |
|  3 | guodada2 |   17 |    0 |    55 |
|  4 | guodada3 |   18 |    1 |    87 |
|  5 | guodada4 |   19 |    0 |    73 |
|  6 | guodada5 |   20 |    1 |    22 |
+----+----------+------+------+-------+
6 rows in set (0.00 sec)
```

定义的 model

```js
const UserModel = sequelize.define(
  'user',
  {
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
    sex: Sequelize.INTEGER,
    score: Sequelize.INTEGER
  },
  { timestamps: false }
)
```

### 查询多项 (findAll)

```js
const result = await UserModel.findAll() // result 将是所有 UserModel 实例的数组

// the same as
const result = await UserModel.all()

//...
```

#### 限制字段

查询时，如果只需要查询模型的部分属性，可以在通过在查询选项中指定 `attributes` 实现。该选项是一个数组参数，在数组中指定要查询的属性即可，这些要查询的属性就表示要在数据库查询的字段：

```js
Model.findAll({
  attributes: ['foo', 'bar']
})
```

#### 字段重命名

查询属性（字段）可以通过传入一个嵌套数据进行重命名：

```js
Model.findAll({
  attributes: ['foo', ['bar', 'baz']]
})

// SELECT foo, bar AS baz ...
```

demo

```js
const results = await UserModel.findAll({
  attributes: [['name', 'username'], 'age', 'score']
})

// [{"username":"guodada0","age":15,"score":60},{"username":"guodada1","age":16,"score":80} ...]
ctx.body = results

// 访问查询结果 通过 instance.get('xxx')
console.log(results[0]['username'], results[0].get('username')) // undefind, 'guodada0'
```

#### 指定筛选条件 (where)

在模型的 `find/finAll` 或 `updates/destroys` 操作中，可以指定一个 `where` 选项以指定筛选条件，

`where` 是一个包含属性/值对对象，sequelize 会根据此对象生产查询语句的筛选条件。

```js
const results = await UserModel.findAll({
  where: {
    age: 18,
    name: 'guodada3'
  }
}) //  SELECT * FROM `users` AS `user` WHERE `user`.`age` = 18 AND `user`.`name` = 'guodada3';

await UserModel.destroy({
  where: { name: 'guodada3' }
}) // DELETE FROM `users` WHERE name = 'guodada3'

// ...
```

##### 复合过滤 / OR / NOT 查询

```js
$and: {a: 5}           // AND (a = 5)
$or: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
$gt: 6,                // > 6
$gte: 6,               // >= 6
$lt: 10,               // < 10
$lte: 10,              // <= 10
$ne: 20,               // != 20
$not: true,            // IS NOT TRUE
$between: [6, 10],     // BETWEEN 6 AND 10
$notBetween: [11, 15], // NOT BETWEEN 11 AND 15
$in: [1, 2],           // IN [1, 2]
$notIn: [1, 2],        // NOT IN [1, 2]
$like: '%hat',         // LIKE '%hat'
$notLike: '%hat'       // NOT LIKE '%hat'
$iLike: '%hat'         // ILIKE '%hat' (case insensitive) (PG only)
$notILike: '%hat'      // NOT ILIKE '%hat'  (PG only)
$like: { $any: ['cat', 'hat']}
                       // LIKE ANY ARRAY['cat', 'hat'] - also works for iLike and notLike
$overlap: [1, 2]       // && [1, 2] (PG array overlap operator)
$contains: [1, 2]      // @> [1, 2] (PG array contains operator)
$contained: [1, 2]     // <@ [1, 2] (PG array contained by operator)
$any: [2,3]            // ANY ARRAY[2, 3]::INTEGER (PG only)

$col: 'user.organization_id' // = "user"."organization_id", with dialect specific column identifiers, PG in this example
```

- `$like`: 模糊查询 `%锅` 以 `锅` 结尾的。 `%锅%` 包含 `锅` 的
- `$in: [10, 11]` - 值为 10 或 11

##### demo

```js
// SELECT * FROM `users` AS `user` WHERE `user`.`age` > 18 AND `user`.`name` LIKE '%5';
const results = await UserModel.findAll({
  where: {
    age: { $gt: 18 },
    name: { $like: '%5' }
  }
})

// SELECT * FROM `users` AS `user` WHERE (`user`.`age` < 1000 OR `user`.`age` IS NULL) AND `user`.`name` LIKE '%5';
const results = await UserModel.findAll({
  where: {
    age: {
      $in: [15, 20],
      $or: { $lt: 1000, $eq: null }
    },
    name: { $like: '%5' }
  }
})
```

#### 分页与限制返回结果数

查询进，我们可以使用 `limit` 限制返回结果条数，并可以通过 `offset` 来设置查询偏移（跳过）量，通过这两个属性我们可以实现分页查询的功能：

```js
// 获取 10 条数据（实例）
UserModel.findAll({ limit: 10 })

// 跳过 8 条数据（实例）
UserModel.findAll({ offset: 8 })

// 跳过 5 条数据并获取其后的 5 条数据（实例）
UserModel.findAll({ offset: 5, limit: 5 })
```

#### 排序

`order` 选项用于查询结果的排序数据。排序时应该传入一个包含属性-排序方向的元组/数组，以保证正确的转义：

```js
const result = await UserModel.findAll({
  order: sequelize.literal('name DESC') // 降序
})

// demo2
const result = await UserModel.findAll({
  order: [sequelize.literal('score DESC'), sequelize.literal('name DESC')]
})

// 按 max(age) DESC 排序
[sequelize.fn('max', sequelize.col('age')), 'DESC'],

// 按相关联的User 模型的 name 属性排序
[ArticleModel, 'name', 'DESC']

// ...
```

### 查询单项

```js
// find
const result = await UserModel.find({
  where: { id: 1 }
})
console.log(result.name, result.get('name')) // guodada0 guodada0

// findOne
const result = await UserModel.findOne({
  where: { id: 1 }
})
console.log(result.name, result.get('name')) // guodada0 guodada0

// findById
const result = await UserModel.findById(1)
console.log(result.name, result.get('name')) // guodada0 guodada0

// findByPk
const result = await UserModel.findByPk(1)

//...
```

### 查找并创建 (findOrCreate)

`findOrCreate` 可用于检测一个不确定是否存在的元素，如果存在则返回记录，不存在时会使用提供的默认值新建记录。

```js
UserModel.findOrCreate({
  where: { name: 'guodada' },
  defaults: {
    age: 23,
    sex: 1,
    score: 99
  }
}).spread((user, created) => {
  console.log(user.get('name')) // guodada
  console.log(created) // 是否创建
})

// INSERT INTO `users` (`id`,`name`,`age`,`sex`,`score`)
// VALUES (DEFAULT,'guodada',23,1,99);
```

### 分页查询 (findAndCountAll)

`findAndCountAll` - 结合了 `findAll` 和 `count`

处理程序成功将始终接收具有两个属性的对象：

- `count` - 一个整数，总数记录匹配 `where` 语句和关联的其它过滤器
- `rows` - 一个数组对象，记录在 `limit` 和 `offset` 范围内匹配 `where` 语句和关联的其它过滤器

```js
const result = await UserModel.findAndCountAll({
  where: {
    age: {
      $gte: 18 // 大于等于18
    }
  },
  offset: 1, // 偏移量，可以理解为当前页数
  limit: 15 // 可以理解为 pageSize , 一页有多少数据
})

// count 记录数 | row 记录
console.log(result.count, result.rows[0].get())

// SELECT * FROM `users` AS `user` WHERE `user`.`age` >= 18 LIMIT 1, 15;
```

#### 支持 include

它支持 `include`。 只有标记为 `required` 的 `include` 将被添加到计数部分：

假设你想找 `User` 中 发布过 `article` 的记录

```js
const UserModel = sequelize.define(
  'user',
  {
    name: Sequelize.STRING,
    age: Sequelize.INTEGER,
    sex: Sequelize.INTEGER,
    score: Sequelize.INTEGER
  },
  { timestamps: false }
)

const ArticleModel = sequelize.define('article', {
  title: Sequelize.STRING,
  content: Sequelize.STRING
})

UserModel.hasMany(ArticleModel) // 关联模型
ArticleModel.belongsTo(UserModel, {
  constraints: false
})

const result = await UserModel.findAndCountAll({
  include: [{ model: ArticleModel, required: true }],
  offset: 1,
  limit: 5
})

console.log(result.count) // 3
```

`result.row`:

```json
{
  "count": 3,
  "rows": [
    {
      "id": 1,
      "name": "guodada0",
      "age": 15,
      "sex": 0,
      "score": 60,
      "article": {
        "id": 1,
        "title": "title1",
        "content": "aaa",
        "userId": 1,
        "createdAt": "2019-01-07T08:51:13.000Z",
        "updatedAt": "2019-01-07T08:51:13.000Z"
      }
    }
    //...
  ]
}
```

因为 `ArticleModel` 的 `include` 有 `required` 设置，这将导致内部连接，并且只有具有 `ArticleModel` 的用户将被计数。
如果我们从 `include` 中删除 `required`，那么有和没有 `ArticleModel` 的用户都将被计数。
在 `include` 中添加一个 `where` 语句会自动使它成为 required：

```js
const result = await UserModel.findAndCountAll({
  include: [{ model: ArticleModel }]
})

console.log(result.count) // 7

const result = await UserModel.findAndCountAll({
  include: [{ model: ArticleModel, where: { userId: 2 } }]
})

console.log(result.count) // 2
```

### 聚合查询

#### SQL 中的分组查询

[mysql-聚合函数](https://gershonv.github.io/2018/12/31/mysql-聚合函数/)

`SQL` 查询中，通 `GROUP BY` 语名实现分组查询。GROUP BY 子句要和聚合函数配合使用才能完成分组查询，在 `SELECT` 查询的字段中，如果没有使用聚合函数就必须出现在 ORDER BY 子句中。分组查询后，查询结果为一个或多个列分组后的结果集。

```js
SELECT 列名, 聚合函数(列名)
FROM 表名
WHERE 列名 operator value
GROUP BY 列名
[HAVING 条件表达式] [WITH ROLLUP]
```

在以上语句中：

- 聚合函数 - 分组查询通常要与聚合函数一起使用，聚合函数包括：
  - `COUNT()`-用于统计记录条数
  - `SUM()`-用于计算字段的值的总和
  - `AVG()`-用于计算字段的值的平均值
  - `MAX`-用于查找查询字段的最大值
  - `MIX`-用于查找查询字段的最小值
- `GROUP BY` 子名-用于指定分组的字段
- `HAVING` 子名-用于过滤分组结果，符合条件表达式的结果将会被显示
- `WITH ROLLUP` 子名-用于指定追加一条记录，用于汇总前面的数据

#### sum(field, [options])

`Sequelize` 提供了聚合函数，可以直接对模型进行聚合查询：

- `aggregate(field, aggregateFunction, [options])`-通过指定的聚合函数进行查询
- `sum(field, [options])`-求和
- `count(options: Object)`-统计查询结果数
- `max(field, [options])`-查询最大值
- `min(field, [options])`-查询最小值

以上这些聚合函数中，可以通过 `options.attributes`、`options.attributes` 属性指定分组相关字段，并可以通过 `options.having` 指定过滤条件，但没有直接指定 `WITH ROLLUP` 子句的参数。

使用`.sum()`查询订单数量大于 1 的用户订单额：

```js
const result = await OrderModel.sum('price', {
  attributes: ['name', [sequelize.fn('COUNT', sequelize.col('price')), 'sum']],
  group: 'name',
  plain: false, // 执行的查询类型，sequelize会根据这个类型对返回结果格式化。
  having: {
    $and: [sequelize.literal('COUNT(name) > 1')]
  }
})

// SELECT `name`, SUM(`price`) AS `sum` FROM `orders` AS `order` GROUP BY `name` HAVING (COUNT(name) > 1);

// [ { name: 'guo', sum: '44' }, { name: 'guo2', sum: '22' } ]
```

- [plain](https://itbilu.com/nodejs/npm/VkYIaRPz-.html#api-instance-fn):执行的查询类型，`sequelize` 会根据这个类型对返回结果格式化
- [sequelize.literal](https://itbilu.com/nodejs/npm/N1pPjUdMf.html#multi): 创建一个字面量对象，该值不会转义

除直接使用聚合函数外，也可以在 `findAll()`等方法中，指定聚合查询相关参数实现聚合查询。
查询时，同样可以通过通过 `options.attributes`、`options.attributes` 属性指定分组相关字段，并可以通过 options.having 指定过滤条件。与直接使用聚合函数查询不一样，通过参数构建聚合查询时，
要以数组或对象形式设置 `options.attributes` 参数中的聚合字段，并需要通过 `sequelize.fn()`方法传入聚合函数。

```js
const result = await OrderModel.findAll({
  attributes: ['name', [sequelize.fn('SUM', sequelize.col('price')), 'sum']],
  group: 'name',
  having: {
    $and: [sequelize.literal('COUNT(name) > 1')]
  },
  raw: true // row 对查询结果进行格式化， false 返回 instance
})
```

`sequelize.fn()` - 函数调用

```js
sequelize.fn(fn, args) -> Sequelize.fn
```

创建于一个相当于数据库函数的对象。该函数可用于搜索查询的 `where` 和 `order` 部分，以及做为列定义的默认值。如果想在列中引用你定义的函数，就要使用 `sequelize.col`，这样列就能正确的解析，而不是解析为字符串。
如，将 `username` 字段值解析为大写形式：

```js
instance.updateAttributes({
  username: self.sequelize.fn('upper', self.sequelize.col('username'))
})
```

`sequelize.col()` - 列对象

创建一个相当于数据库列的对象。这个方法经常结合 sequelize.fn 使用，它可以保证将列名正确的传递给该方法，而不是经过转义。

#### count(options: Object)

```js
const result = await OrderModel.count({
  where: { price: 24 }
})
```

#### max/min

```js
const result = await OrderModel.max('price', {
  where: {
    price: { $lt: 23 }
  }
})
```

### 原始查询

[原始查询](https://itbilu.com/nodejs/npm/VJIR1CjMb.html#raw-query)

有时会使用原始查询或执行已准备好的 SQL 语句，这时可以用 `Sequlize` 提供的工具函数 `sequelize.query` 来实现。

```js
const result = await sequelize.query('SELECT * FROM users', { model: UserModel })
```

#### 查询参数替换

原始查询中有两种替换查询参数的方法，以:开头的参数的形式替换或以不命名以?替换。在选项对象中传递参数：

- 如果传递一个数组，? 会按数组的顺序被依次替换
- 巢传递一个对象，:key 将会用对象的键替换。如果对象中未找到指定键，则会引发异常（反之亦然）

```js
sequelize
  .query('SELECT * FROM projects WHERE status = ?', { replacements: ['active'], type: sequelize.QueryTypes.SELECT })
  .then(function(projects) {
    console.log(projects)
  })

sequelize
  .query('SELECT * FROM projects WHERE status = :status ', {
    replacements: { status: 'active' },
    type: sequelize.QueryTypes.SELECT
  })
  .then(function(projects) {
    console.log(projects)
  })
```

#### 参数绑定

参数绑定类似于参数替换。尤其是参数替换会在发送到数据库前被 sequelize 转义和替换，而参数绑定会被发送到 SQL 查询文本外。

只有 `SQLite` 和 `PostgreSQL` 支持参数绑定，其它类型数据库都会将其插入到 `SQL` 查询，并以相同的方式进行参数替换。参数绑定可以使用$1、$2……或\$key 的形式：

- 如果传入的是数组，\$1 会绑定到数组听第 1 个参数 (bind[0])
- 如果传入一个对象，$key 会绑定到 `object['key']`。每个 key 必须以非数字的字符开始。$1 不是个有效的 key，尽管 object['1'] 是存在的。
- 在使用\$$时，不会被转义而是将$做为一个字面量使用。

传入的数组或对象必须包含所有绑定值，否则 `Sequelize` 会抛出异常。这同样适用于数据库可能会忽略绑定参数的情况下。

数据库可能会做进一步限制，绑定参数不能使用数据库关键字，也不能是表或列名，它在引用文本或数据时也可能被忽略。在 PostgreSQL 中，如果不能从上下文\$1::varchar 中推断类型，那么也需要进行类型转换

```js
sequelize
  .query('SELECT *, "text with literal $$1 and literal $$status" as t FROM projects WHERE status = $1', {
    bind: ['active'],
    type: sequelize.QueryTypes.SELECT
  })
  .then(function(projects) {
    console.log(projects)
  })

sequelize
  .query('SELECT *, "text with literal $$1 and literal $$status" as t FROM projects WHERE status = $status', {
    bind: { status: 'active' },
    type: sequelize.QueryTypes.SELECT
  })
  .then(function(projects) {
    console.log(projects)
  })
```