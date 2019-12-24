---
title: Sequelize - model definition
date: 2019-02-11 12:41:03
categories: Sequelize
tags: Sequelize
sidebarDepth: 1
---
[[toc]]
### Model definition - 模型定义

`Sequelize` 使用 `define` 方法定义模型和表之间的映射，`Sequelize` 将默认添加 `createdAt` 和 `updatedAt` 属性。因此，您将能够知道数据库条目何时进入数据库以及最后一次更新时。
`model` 定义格式为 `sequelize.define('name', {attributes}, {configuration})：`

```js
const User = sequelize.define('user')
User.sync({ force: true })
```

上式代码在数据库中的执行命令为：

```sql
DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INTEGER NOT NULL auto_increment ,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
 ) ENGINE=InnoDB;
```
<!--more-->

#### base demo

```js
const Bar = sequelize.define('bar', {})

const Foo = sequelize.define('foo', {
  id: {
    type: Sequelize.INTEGER,
    field: 'fooId', // 存入数据库中的字段，model 中还是使用 id => foo.id
    autoIncrement: true, // 是否自增
    primaryKey: true // 是否为主键
  },

  age: {
    type: Sequelize.INTEGER,
    defaultValue: 18, // 默认值
    allowNull: true, // 是否为空
    unique: true, // 是否唯一
    onUpdate: 'NO ACTION', // 当被引用的键更新时的操作 String - 可选值是：['CASCADE', 'RESTRICT', 'SET DEFAULT', 'SET NULL', 'NO ACTION']
    onDelete: 'NO ACTION', // 当被引用的键删除时的操作 String - 同上
    // 验证器
    validate: {
      isNumeric: true, // 只允许数字
      max: 100,
      min: 1,
      // 自定义验证
      isEven(value) {
        if (parseInt(value) % 2 != 0) {
          throw new Error('Only even values are allowed!')
          // 我们也在模型的上下文中，所以如果它存在的话,
          // this.otherField会得到otherField的值。
        }
      }
    },

    // getters 为列自定义一个访问器 使用this.getDataValue(String)时调用的值
    get() {
      const age = this.getDataValue('age')
      // 可以对该列进行操作...
      return age
    },

    // setters 为列自定义一个设置器 使用this.setDataValue(String, Value)时调用的值
    set(value) {
      const newValue = value + 3
      this.setDataValue('age', newValue)
    }
  },

  uId: {
    type: Sequelize.INTEGER,
    references: {
      model: Bar, // 这是引用另一个模型
      key: 'id' // 引用的字段（注意是在数据中存在的字段名）比如引用 foos 表要引用 fooId 而不是 id
    }
  }
})

Bar.sync().then(() => {
  Foo.sync({ force: true }).then(async () => {
    try {
      const foo = await Foo.create({ age: 21 }) // 触发 setters
      const foos = await Foo.findAll() // 触发 getters
    } catch (err) {
      console.log(err)
    }
  })
})
```

上式代码在数据库中的执行命令为：

```sql
CREATE TABLE IF NOT EXISTS `bars` (
  `id` INTEGER NOT NULL auto_increment ,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `foos`;

CREATE TABLE IF NOT EXISTS `foos` (
  `fooId` INTEGER auto_increment ,
  `age` INTEGER DEFAULT 18 UNIQUE,
  `uId` INTEGER,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`fooId`),
  FOREIGN KEY (`uId`) REFERENCES `bars` (`id`)
) ENGINE=InnoDB;

INSERT INTO `foos` (`fooId`,`age`,`createdAt`,`updatedAt`) VALUES 
(DEFAULT,24,'2019-01-03 07:34:12','2019-01-03 07:34:12');

SELECT `fooId` AS `id`, `age`, `uId`, `createdAt`, `updatedAt` FROM `foos` AS `foo`;
```

### Attributes

```js
const User = sequelize.define('user', {
  column: {
    type: xxx,             // DataType或字符串，表示列的数据类型 【见下文】
    allowNull: true,       // 是否设置 NOT NULL（非空）约束
    defaultValue: xxx      // 默认值
    unique: false,         // 设置为true时，会为列添加唯一约束
    primaryKey: false,     // 指定是否是主键
    field: xxx,            // String - 设置在数据库中的字段名。设置后会，Sequelize会将属性名映射到数据库中的不同名称
    autoIncrement: false,  // 是否自增
    references: {          // 引用对象
      model: xxx,          // 如果列引用到另一个表，可以通过这个属性设置模型或字符串。
      key: 'id'            // 该列表示到表外键列的引用
    }, 
    onUpdate: 'NO ACTION', // 当被引用的键更新时的操作 String - 可选值是：['CASCADE', 'RESTRICT', 'SET DEFAULT', 'SET NULL', 'NO ACTION']
    onDelete: 'NO ACTION', // 当被引用的键删除时的操作，可选值同上
    get(){},               // 为列自定义一个访问器 使用this.getDataValue(String)时调用的值 【见下文】
    set(value){},          // 为列自定义一个设置器 使用this.setDataValue(String, Value)时调用的值 【见下文】
    validate: {}           // 模型每次保存时调用的验证对象。可是validator.js中的验证函数(参见 DAOValidator)、或自定义的验证函数 【见下文】
  }
})
```

### Attributes - DataTypes

以下是 Sequelize 支持的一些数据类型。 有关完整和更新的列表, 参阅 [DataTypes](http://docs.sequelizejs.com/variable/index.html#static-variable-DataTypes).

```js
Sequelize.STRING                      // VARCHAR(255)
Sequelize.STRING(1234)                // VARCHAR(1234)
Sequelize.STRING.BINARY               // VARCHAR BINARY
Sequelize.TEXT                        // TEXT
Sequelize.TEXT('tiny')                // TINYTEXT

Sequelize.INTEGER                     // INTEGER
Sequelize.BIGINT                      // BIGINT
Sequelize.BIGINT(11)                  // BIGINT(11)

Sequelize.FLOAT                       // FLOAT
Sequelize.FLOAT(11)                   // FLOAT(11)
Sequelize.FLOAT(11, 12)               // FLOAT(11,12)

Sequelize.REAL                        // REAL         仅限于PostgreSQL.
Sequelize.REAL(11)                    // REAL(11)     仅限于PostgreSQL.
Sequelize.REAL(11, 12)                // REAL(11,12)  仅限于PostgreSQL.

Sequelize.DOUBLE                      // DOUBLE
Sequelize.DOUBLE(11)                  // DOUBLE(11)
Sequelize.DOUBLE(11, 12)              // DOUBLE(11,12)

Sequelize.DECIMAL                     // DECIMAL
Sequelize.DECIMAL(10, 2)              // DECIMAL(10,2)

Sequelize.DATE                        // DATETIME 针对 mysql / sqlite, TIMESTAMP WITH TIME ZONE 针对 postgres
Sequelize.DATE(6)                     // DATETIME(6) 针对 mysql 5.6.4+. 小数秒支持多达6位精度
Sequelize.DATEONLY                    // DATE 不带时间.
Sequelize.BOOLEAN                     // TINYINT(1)

Sequelize.ENUM('value 1', 'value 2')  // 一个允许具有 “value 1” 和 “value 2” 的 ENUM
Sequelize.ARRAY(Sequelize.TEXT)       // 定义一个数组。 仅限于 PostgreSQL。
Sequelize.ARRAY(Sequelize.ENUM)       // 定义一个 ENUM 数组. 仅限于 PostgreSQL。

Sequelize.JSON                        // JSON 列. 仅限于 PostgreSQL, SQLite and MySQL.
Sequelize.JSONB                       // JSONB 列. 仅限于 PostgreSQL .

Sequelize.BLOB                        // BLOB (PostgreSQL 二进制)
Sequelize.BLOB('tiny')                // TINYBLOB (PostgreSQL 二进制. 其他参数是 medium 和 long)

Sequelize.UUID                        // PostgreSQL 和 SQLite 的 UUID 数据类型, CHAR(36) BINARY 针对于 MySQL (使用默认值: Sequelize.UUIDV1 或 Sequelize.UUIDV4 来让 sequelize 自动生成 ID)

Sequelize.CIDR                        // PostgreSQL 的 CIDR 数据类型
Sequelize.INET                        // PostgreSQL 的 INET 数据类型
Sequelize.MACADDR                     // PostgreSQL 的 MACADDR

Sequelize.RANGE(Sequelize.INTEGER)    // 定义 int4range 范围. 仅限于 PostgreSQL.
Sequelize.RANGE(Sequelize.BIGINT)     // 定义 int8range 范围. 仅限于 PostgreSQL.
Sequelize.RANGE(Sequelize.DATE)       // 定义 tstzrange 范围. 仅限于 PostgreSQL.
Sequelize.RANGE(Sequelize.DATEONLY)   // 定义 daterange 范围. 仅限于 PostgreSQL.
Sequelize.RANGE(Sequelize.DECIMAL)    // 定义 numrange 范围. 仅限于 PostgreSQL.

Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE)) // 定义 tstzrange 范围的数组. 仅限于 PostgreSQL.

Sequelize.GEOMETRY                    // 空间列.  仅限于 PostgreSQL (具有 PostGIS) 或 MySQL.
Sequelize.GEOMETRY('POINT')           // 具有几何类型的空间列.  仅限于 PostgreSQL (具有 PostGIS) 或 MySQL.
Sequelize.GEOMETRY('POINT', 4326)     // 具有几何类型和SRID的空间列.  仅限于 PostgreSQL (具有 PostGIS) 或 MySQL.
```

### Attributes - getters/setters


可以在模型上定义'对象属性' `getter` 和 `setter` 函数，这些可以用于映射到数据库字段的“保护”属性，也可以用于定义“伪”属性。

`Getters` 和 `Setters` 可以通过两种方式定义（您可以混合使用这两种方式）：

- 作为属性定义的一部分
- 作为模型参数的一部分

> 注意: 如果在两个地方定义了 `getter` 或 `setter`，那么在相关属性定义中找到的函数始终是优先的。

#### 定义为属性定义的一部分

```js
const Employee = sequelize.define('employee', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      const title = this.getDataValue('title')
      // 'this' 允许你访问实例的属性
      return this.getDataValue('name') + ' (' + title + ')'
    }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue('title', val.toUpperCase())
    }
  }
})

Employee.sync({ force: true }).then(() => {
  Employee.create({ name: 'John Doe', title: 'senior engineer' }).then(employee => {
    console.log(employee.get('name')) // John Doe (SENIOR ENGINEER)
    console.log(employee.get('title')) // SENIOR ENGINEER
  })
})
```

#### 定义为模型参数的一部分

以下是在模型参数中定义 `getter` 和 `setter` 的示例。
`fullName getter`，是一个说明如何在模型上定义伪属性的例子 - 这些属性实际上不是数据库模式的一部分。 事实上，伪属性可以通过两种方式定义：使用模型 `getter`，或者使用虚拟数据类型的列。 虚拟数据类型可以有验证，而虚拟属性的 `getter` 则不能。

请注意，`fullName getter` 函数中引用的 `this.firstname` 和 `this.lastname` 将触发对相应 `getter` 函数的调用。 如果你不想那样使用`getDataValue()`方法来访问原始值（见下文）。

```js
const Foo = sequelize.define(
  'foo',
  {
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING
  },
  {
    getterMethods: {
      fullName() {
        return this.firstname + ' ' + this.lastname
      }
    },

    setterMethods: {
      fullName(value) {
        const names = value.split(' ')
        this.setDataValue('firstname', names.slice(0, -1).join(' '))
        this.setDataValue('lastname', names.slice(-1).join(' '))
      }
    }
  }
)

Foo.sync({ force: true }).then(async () => {
  try {
    await Foo.create({ firstname: 'guo', lastname: 'dada' })
    const Foos = await Foo.findAll()
    console.log(Foos[0]['fullName']) // guo dada
  } catch (err) {
    console.log(err)
  }
})
```

### Attributes - Validations

模型验证，允许您为模型的每个属性指定格式/内容/继承验证。

验证会自动运行在 `create` ， `update` 和 `save` 上。 你也可以调用 `validate()` 手动验证一个实例。

验证由 [validator.js](https://github.com/chriso/validator.js) 实现。

```js
const ValidateMe = sequelize.define('foo', {
  foo: {
    type: Sequelize.STRING,
    validate: {
      is: ["^[a-z]+$",'i'],     // 只允许字母
      is: /^[a-z]+$/i,          // 与上一个示例相同,使用了真正的正则表达式
      not: ["[a-z]",'i'],       // 不允许字母
      isEmail: true,            // 检查邮件格式 (foo@bar.com)
      isUrl: true,              // 检查连接格式 (http://foo.com)
      isIP: true,               // 检查 IPv4 (129.89.23.1) 或 IPv6 格式
      isIPv4: true,             // 检查 IPv4 (129.89.23.1) 格式
      isIPv6: true,             // 检查 IPv6 格式
      isAlpha: true,            // 只允许字母
      isAlphanumeric: true,     // 只允许使用字母数字
      isNumeric: true,          // 只允许数字
      isInt: true,              // 检查是否为有效整数
      isFloat: true,            // 检查是否为有效浮点数
      isDecimal: true,          // 检查是否为任意数字
      isLowercase: true,        // 检查是否为小写
      isUppercase: true,        // 检查是否为大写
      notNull: true,            // 不允许为空
      isNull: true,             // 只允许为空
      notEmpty: true,           // 不允许空字符串
      equals: 'specific value', // 只允许一个特定值
      contains: 'foo',          // 检查是否包含特定的子字符串
      notIn: [['foo', 'bar']],  // 检查是否值不是其中之一
      isIn: [['foo', 'bar']],   // 检查是否值是其中之一
      notContains: 'bar',       // 不允许包含特定的子字符串
      len: [2,10],              // 只允许长度在2到10之间的值
      isUUID: 4,                // 只允许uuids
      isDate: true,             // 只允许日期字符串
      isAfter: "2011-11-05",    // 只允许在特定日期之后的日期字符串
      isBefore: "2011-11-05",   // 只允许在特定日期之前的日期字符串
      max: 23,                  // 只允许值 <= 23
      min: 23,                  // 只允许值 >= 23
      isCreditCard: true,       // 检查有效的信用卡号码

      // 也可以自定义验证:
      isEven(value) {
        if (parseInt(value) % 2 != 0) {
          throw new Error('Only even values are allowed!')
          // 我们也在模型的上下文中，所以如果它存在的话, 
          // this.otherField会得到otherField的值。
        }
      }
    }
  }
})
```

请注意，如果需要将多个参数传递给内置的验证函数，则要传递的参数必须位于数组中。 但是，如果要传递单个数组参数，例如isIn的可接受字符串数组，则将被解释为多个字符串参数，而不是一个数组参数。 要解决这个问题，传递一个单一长度的参数数组，比如`[['one'，'two']]`。

要使用自定义错误消息而不是 `validator.js` 提供的错误消息，请使用对象而不是纯值或参数数组，例如不需要参数的验证器可以被给定自定义消息:

```js
isInt: {
  msg: "Must be an integer number of pennies"
}
```

或者如果还需要传递参数，请添加一个 `args` 属性：

```js
isIn: {
  args: [['en', 'zh']],
  msg: "Must be English or Chinese"
}
```

当使用自定义验证器函数时，错误消息将是抛出的 `Error` 对象所持有的任何消息。

有关内置验证方法的更多详细信息，请参阅[the validator.js project](https://github.com/chriso/validator.js) 。

#### 验证器 与 allowNull

如果模型的特定字段设置为允许null（使用 `allowNull：true` ），并且该值已设置为 `null` ，则其验证器不会运行。

这意味着，您可以有一个字符串字段，该字段验证其长度至少为5个字符，但也允许为 `null`。

你可以通过设置 `notNull` 验证器来自定义 `allowNull` 错误消息, 像这样

```js
const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter your name'
      }
    }
  }
})
```

#### 模型验证

验证器也可以在特定字段验证器之后用来定义检查模型。例如，你可以确保纬度和经度都不设置，或者两者都设置，如果设置了一个而另一个未设置则验证失败。

模型验证器方法与模型对象的上下文一起调用，如果它们抛出错误，则认为失败，否则通过。 这与自定义字段特定的验证器一样。

所收集的任何错误消息都将与验证结果对象一起放在字段验证错误中，这个错误使用在 `validate` 参数对象中以失败的验证方法的键来命名。即便在任何一个时刻，每个模型验证方法只能有一个错误消息，它会在数组中显示为单个字符串错误，以最大化与字段错误的一致性。

一个例子:

```js
const Pub = Sequelize.define('pub', {
  name: { type: Sequelize.STRING },
  address: { type: Sequelize.STRING },
  latitude: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: { min: -90, max: 90 }
  },
  longitude: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    validate: { min: -180, max: 180 }
  },
}, {
  validate: {
    bothCoordsOrNone() {
      if ((this.latitude === null) !== (this.longitude === null)) {
        throw new Error('Require either both latitude and longitude or neither')
      }
    }
  }
})
```

在这种简单情况下，如果给定纬度或经度，而不是同时包含两者，则验证失败。 如果我们尝试构建一个超范围的纬度和经度，那么 `raging_bullock_arms.validate()` 可能会返回

```js
{
  'latitude': ['Invalid number: latitude'],
  'bothCoordsOrNone': ['Require either both latitude and longitude or neither']
}
```

### configuration

你还可以修改 `Sequelize` 处理列名称的方式：

```js
const Bar = sequelize.define(
  'bar',
  {
    /* bla */
  },
  {
    // 不添加时间戳属性 (updatedAt, createdAt)
    timestamps: false,

    // 不删除数据库条目，但将新添加的属性deletedAt设置为当前日期（删除完成时）。
    // paranoid 只有在启用时间戳时才能工作
    paranoid: true,

    // 将自动设置所有属性的字段选项为下划线命名方式。
    // 不会覆盖已经定义的字段选项
    underscored: true,

    // 禁用修改表名; 默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数。 如果你不想这样，请设置以下内容
    freezeTableName: true,

    // 定义表的名称
    tableName: 'my_very_custom_table_name',

    // 启用乐观锁定。 启用时，sequelize将向模型添加版本计数属性，
    // 并在保存过时的实例时引发OptimisticLockingError错误。
    // 设置为true或具有要用于启用的属性名称的字符串。
    version: true
  }
)
```

如果你希望 `sequelize` 处理时间戳，但只想要其中一部分，或者希望您的时间戳被称为别的东西，则可以单独覆盖每个列：

```js
const Foo = sequelize.define(
  'foo',
  {
    /* bla */
  },
  {
    // 不要忘记启用时间戳！
    timestamps: true,

    // 我不想要 createdAt
    createdAt: false,

    // 我想 updateAt 实际上被称为 updateTimestamp
    updatedAt: 'updateTimestamp',

    // 并且希望 deletedAt 被称为 destroyTime（请记住启用paranoid以使其工作）
    deletedAt: 'destroyTime',
    paranoid: true
  }
)
```

您也可以更改数据库引擎，例如 变更到到 `MyISAM`, 默认值是 `InnoDB`。

```js
const Person = sequelize.define('person', { /* attributes */ }, {
  engine: 'MYISAM'
})

// 或全局的
const sequelize = new Sequelize(db, user, pw, {
  define: { engine: 'MYISAM' }
})
```

最后，您可以为 `MySQL` 和 `PG` 中的表指定注释

```js
const Person = sequelize.define('person', { /* attributes */ }, {
  comment: "I'm a table comment!"
})
```

### 数据库同步


当开始一个新的项目时，你还不会有一个数据库结构，并且使用 `Sequelize` 你也不需要它。 只需指定您的模型结构，并让库完成其余操作。 目前支持的是创建和删除表：

```js
// 创建表:
Project.sync()
Task.sync()

// 强制创建!
Project.sync({force: true}) // 这将先丢弃表，然后重新创建它

// 删除表:
Project.drop()
Task.drop()

// 事件处理:
Project.[sync|drop]().then(() => {
  // 好吧...一切都很好！
}).catch(error => {
  // oooh，你输入了错误的数据库凭据？
})
```

因为同步和删除所有的表可能要写很多行，你也可以让 `Sequelize` 来为做这些：

```js
// 同步所有尚未在数据库中的模型
sequelize.sync()

// 强制同步所有模型
sequelize.sync({force: true})

// 删除所有表
sequelize.drop()

// 广播处理:
sequelize.[sync|drop]().then(() => {
  // woot woot
}).catch(error => {
  // whooops
})
```

因为 `.sync({ force: true })` 是具有破坏性的操作，可以使用 `match` 参数作为附加的安全检查。

`match` 参数可以通知 `Sequelize`，以便在同步之前匹配正则表达式与数据库名称 - 在测试中使用 `force：true` 但不使用实时代码的情况下的安全检查。

```js
// 只有当数据库名称以'_test'结尾时，才会运行.sync（）
sequelize.sync({ force: true, match: /_test$/ });
```

### sequelize.import

您还可以使用 `import` 方法将模型定义存储在单个文件中。 返回的对象与导入文件的功能中定义的完全相同。

例如 `models/author.js`:

```js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('author', {
    username: DataTypes.STRING(50)
  })
}
```

`app.js`

```js
const AuthorModel = sequelize.import('./models/author.js')

AuthorModel.sync({ force: true }).then(async () => {
  try {
    const author = AuthorModel.findById(1)
    console.log(author)
  } catch (err) {
    console.log(err)
  }
})
```

#### 同时导入多个 model

再建立多一个 model `models/article.js`

```js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('article', {
    title: DataTypes.STRING(50),
    content: DataTypes.STRING,
    from: {
      type: DataTypes.INTEGER,
      references: {
        model: 'authors',
        key: 'id'
      }
    }
  })
}
```

`app.js`:

```js
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const MODELS_PATH = path.join(__dirname, 'models')

fs.readdirSync(MODELS_PATH).forEach(file => {
  sequelize.import(path.join(MODELS_PATH, file))
})

sequelize.sync().then(() => {
  const { author: AuthorModel, article } = sequelize.models
  AuthorModel.create({ username: 'guodada' }).then(author => {
    console.log(author.username) // guodada
  })
})
```

### 扩展模型

`Sequelize` 模型是ES6类。 您可以轻松添加自定义实例或类级别的方法。

```js
const User = sequelize.define('user', { firstname: Sequelize.STRING })

// 添加一个类级别的方法
User.classLevelMethod = function() {
  return 'foo'
}

// 添加实例级别方法
User.prototype.instanceLevelMethod = function() {
  return 'bar'
}
```

当然，您还可以访问实例的数据并生成虚拟的 getter:

```js
const User = sequelize.define('user', { firstname: Sequelize.STRING, lastname: Sequelize.STRING })

User.prototype.getFullname = function() {
  return [this.firstname, this.lastname].join(' ')
}

// 例子:
User.build({ firstname: 'foo', lastname: 'bar' }).getFullname() // 'foo bar'
```

### 索引

`Sequelize` 支持在 `Model.sync()` 或 `sequelize.sync` 中创建的模型定义中添加索引。

```js
sequelize.define(
  'user',
  {},
  {
    indexes: [
      // 在 email 上创建一个唯一索引
      {
        unique: true,
        fields: ['email']
      },

      // 在使用 jsonb_path_ops 的 operator 数据上创建一个 gin 索引
      {
        fields: ['data'],
        using: 'gin',
        operator: 'jsonb_path_ops'
      },

      // 默认的索引名将是 [table]_[fields]
      // 创建多列局部索引
      {
        name: 'public_by_author',
        fields: ['author', 'status'],
        where: {
          status: 'public'
        }
      },

      // 具有有序字段的BTREE索引
      {
        name: 'title_index',
        method: 'BTREE',
        fields: ['author', { attribute: 'title', collate: 'en_US', order: 'DESC', length: 5 }]
      }
    ]
  }
)
```

### 相关

- [models-definition](http://docs.sequelizejs.com/manual/tutorial/models-definition.html)
- [models-definition 中文版](https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/models-definition.md)