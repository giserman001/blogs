---
title: Sequelize - associations
date: 2019-02-11 12:41:53
categories: Sequelize
tags: Sequelize
---

本部分描述了 Sequelize 中的各种关联类型。 Sequelize 中有四种类型的关联

- `BelongsTo`
- `HasOne`
- `HasMany`
- `BelongsToMany`

## 基本概念

### Source & Target

我们首先从一个基本概念开始，你将会在大多数关联中使用 `source` 和 `target` 模型。 假设您正试图在两个模型之间添加关联。 这里我们在 `users` 和 `articles` 之间添加一个 `hasOne` 关联。

```js
const UserModel = sequelize.define(
  'user',
  {
    name: Sequelize.STRING,
    age: Sequelize.INTEGER
  },
  { timestamps: false }
)

const ArticleModel = sequelize.define('article', {
  title: Sequelize.STRING,
  content: Sequelize.STRING
})

UserModel.hasOne(ArticleModel)
```

<!-- more -->

相当于：

```sql
CREATE TABLE IF NOT EXISTS `users` (
  `id` INTEGER NOT NULL auto_increment ,
  `name` VARCHAR(255), `age` INTEGER,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `articles` (
  `id` INTEGER NOT NULL auto_increment ,
  `title` VARCHAR(255),
  `content` VARCHAR(255),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `userId` INTEGER,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
  SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;
```

`UserModel`（函数被调用的模型）是 `source` 。 `ArticleModel` 模型（作为参数传递的模型）是 `target` 。

即 `articles` 表的 `userId` 依赖于 `users` 表的 `id`

此时删除 `users` 表（`source`）, 就会报错了 Cannot drop table 'users' referenced by a foreign key constraint 'articles_ibfk_1' on table 'articles'.

### 外键

当您在模型中创建关联时，会自动创建带约束的外键引用。 下面是设置：

```js
const TaskModel = sequelize.define('task', { title: Sequelize.STRING })
const UserModel = sequelize.define('user', { name: Sequelize.STRING }, { timestamps: false })

UserModel.hasMany(TaskModel) // 将会添加 userId 到 TaskModel
TaskModel.belongsTo(UserModel) // 也将会添加 userId 到 TaskModel
```

将生成以下 SQL：

```sql
CREATE TABLE IF NOT EXISTS `users` (
    `id` INTEGER NOT NULL auto_increment,
    `name` VARCHAR(255),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `tasks` (
    `id` INTEGER NOT NULL auto_increment,
    `title` VARCHAR(255),
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    `userId` INTEGER,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
    SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB;
```

`tasks` 和 `users` 模型之间的关系通过在 `tasks` 表上注入 userId 外键，并将其标记为对 `users` 表的引用。
默认情况下，如果引用的用户被删除，`userId` 将被设置为 `NULL`，如果更新了 `userId`，则更新 `userId`。 这些选项可以通过将 `onUpdate` 和 `onDelete` 选项传递给关联调用来覆盖。
验证选项是`RESTRICT`, `CASCADE`, `NO ACTION`, `SET DEFAULT`, `SET NULL`。

对于 `1:1` 和 `1:m` 关联，默认选项是 `SET NULL` 用于删除，`CASCADE` 用于更新。
对于 `n:m`，两者的默认值是 `CASCADE`。 这意味着，如果您从 `n:m` 关联的一侧删除或更新一行，则引用该行的连接表中的所有行也将被删除或更新。

#### 循环依赖 & 禁用约束

在表之间添加约束意味着当使用 `sequelize.sync` 时，表必须以特定顺序在数据库中创建表。
如果 `Task` 具有对 `User` 的引用，`users` 表必须在创建 `tasks` 表之前创建。
这有时会导致循环引用，那么 `sequelize` 将无法找到要同步的顺序。
想象一下文档和版本的场景。 一个文档可以有多个版本，并且为了方便起见，文档引用了它的当前版本。

```js
const Document = sequelize.define('document', { author: Sequelize.STRING }, { timestamps: false })
const Version = sequelize.define('version', { timestamp: Sequelize.DATE })

Document.hasMany(Version) // 这将 documentId 属性添加到 version
Document.belongsTo(Version, {
  as: 'Current',
  foreignKey: 'currentVersionId'
}) // 这将 currentVersionId 属性添加到 document
```

但是，上面的代码将导致以下错误: `Cyclic dependency found. documents is dependent of itself. Dependency chain: documents -> versions => documents.`

为了缓解这一点，我们可以向其中一个关联传递 `constraints: false：`

```js
Document.hasMany(Version)
Document.belongsTo(Version, {
  as: 'Current',
  foreignKey: 'currentVersionId',
  constraints: false
})
```

这将可以让我们正确地同步表：

```sql
CREATE TABLE IF NOT EXISTS `documents` (
    `id` INTEGER NOT NULL auto_increment,
    `author` VARCHAR(255),
    `currentVersionId` INTEGER,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `versions` (
    `id` INTEGER NOT NULL auto_increment,
    `timestamp` DATETIME,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    `documentId` INTEGER,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE
    SET
        NULL ON UPDATE CASCADE
) ENGINE = InnoDB;
```

#### 无限制地执行外键引用

有时您可能想引用另一个表，而不添加任何约束或关联。 在这种情况下，您可以手动将参考属性添加到您的模式定义中，并标记它们之间的关系。

```js
const Trainer = sequelize.define('trainer', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING
})

// Series 将有一个 trainerId = Trainer.id 外参考键
// 之后我们调用 Trainer.hasMany(series)
const Series = sequelize.define('series', {
  title: Sequelize.STRING,
  subTitle: Sequelize.STRING,
  description: Sequelize.TEXT,
  // 用 `Trainer` 设置外键关系（hasMany）
  trainerId: {
    type: Sequelize.INTEGER,
    references: {
      model: Trainer,
      key: 'id'
    }
  }
})

// Video 将有 seriesId = Series.id 外参考键
// 之后我们调用 Series.hasOne(Video)
const Video = sequelize.define('video', {
  title: Sequelize.STRING,
  sequence: Sequelize.INTEGER,
  description: Sequelize.TEXT,
  // 用 `Series` 设置关系(hasOne)
  seriesId: {
    type: Sequelize.INTEGER,
    references: {
      model: Series, // 既可以是表示表名的字符串，也可以是 Sequelize 模型
      key: 'id'
    }
  }
})

Series.hasOne(Video)
Trainer.hasMany(Series)
```

## 一对一关联

一对一关联是通过单个外键连接的两个模型之间的关联。

### BelongsTo

`BelongsTo` 关联是在 `source model` 上存在一对一关系的外键的关联。

一个简单的例子是 `Player` 通过 `player` 的外键作为 `Team` 的一部分。

```js
const Player = sequelize.define('player', {}, { timestamps: false })
const Team = sequelize.define('team', {}, { timestamps: false })

Player.belongsTo(Team) // 将向 Player 添加一个 teamId 属性以保存 Team 的主键值
```

```sql
CREATE TABLE IF NOT EXISTS `teams` (
    `id` INTEGER NOT NULL auto_increment,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `players` (
    `id` INTEGER NOT NULL auto_increment,
    `teamId` INTEGER,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`teamId`) REFERENCES `teams` (`id`) ON DELETE
    SET
        NULL ON UPDATE CASCADE
) ENGINE = InnoDB;
```

#### 外键/目标键

默认情况下，将从目标模型名称和目标主键名称生成 `belongsTo` 关系的外键。

默认的样式是 `camelCase`（小驼峰），但是如果源模型配置为 `underscored: true`（下划线） ，那么将使用字段 `snake_case` 创建 `foreignKey`。

```js
const User = sequelize.define('user', {}, { timestamps: false, underscored: true })
const Company = sequelize.define('company', {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true
  }
})

User.belongsTo(Company) // 将用字段 company_uuid 添加 companyUuid 到 user
```

在已定义 `as` 的情况下，将使用它代替目标模型名称。

```js
const User = sequelize.define('user', {}, { timestamps: false })
const UserRole = sequelize.define('userRole', {}, { timestamps: false })

User.belongsTo(UserRole, { as: 'role' }) // 将 role 添加到 user 而不是 userRole
```

生成的 `users` 表

```sql
CREATE TABLE IF NOT EXISTS `users` (
    `id` INTEGER NOT NULL auto_increment,
    `roleId` INTEGER,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`roleId`) REFERENCES `userRoles` (`id`) ON DELETE
    SET
        NULL ON UPDATE CASCADE
) ENGINE = InnoDB;
```

在所有情况下，默认外键可以用 `foreignKey` 选项覆盖。 当使用外键选项时，`Sequelize` 将按原样使用：

```js
const User = sequelize.define('user', {}, { timestamps: false })
const Company = sequelize.define('company', {}, { timestamps: false })

User.belongsTo(Company, { foreignKey: 'fk_company' })
```

目标键

```js
User.belongsTo(Company, { foreignKey: 'fk_companyname', targetKey: 'id' })
```

效果：

```js
const User = sequelize.define(
  'user',
  {
    fk_companyname: {
      references: {
        model: Company,
        key: 'id'
      }
    }
  },
  { timestamps: false }
)
```

### HasOne

`HasOne` 关联是在 `target model` 上存在一对一关系的外键的关联。

```js
const User = sequelize.define('user', {}, { timestamps: false })
const Project = sequelize.define('project', {}, { timestamps: false })

// 单向关联
Project.hasOne(User)

// the same as
const User = sequelize.define(
  'user',
  {
    projectId: {
      references: {
        model: Project,
        key: 'id'
      }
    }
  },
  { timestamps: false }
)
```

```js
// 你也可以定义外键，例如 如果您已经有一个现有的数据库并且想要处理它：
Project.hasOne(User, { foreignKey: 'initiator_id' })

// 因为Sequelize将使用模型的名称（define的第一个参数）作为访问器方法，
// 还可以将特殊选项传递给hasOne：
Project.hasOne(User, { as: 'Initiator' })

// 或者让我们来定义一些自己的参考
const Person = sequelize.define('person', {})
Person.hasOne(Person, { as: 'Father' }) // 这会将属性 FatherId 添加到 Person

// also possible:
Person.hasOne(Person, { as: 'Father', foreignKey: 'DadId' }) // 这将把属性 DadId 添加到 Person

// 在这两种情况下，你都可以：
Person.setFather
Person.getFather

// 如果你需要联结表两次，你可以联结同一张表
Team.hasOne(Game, { as: 'HomeTeam', foreignKey: 'homeTeamId' })
Team.hasOne(Game, { as: 'AwayTeam', foreignKey: 'awayTeamId' })

Game.belongsTo(Team)
```

即使它被称为 `hasOne` 关联，对于大多数 1：1 关系，您通常需要 `BelongsTo` 关联，因为 `BelongsTo` 将会在 `hasOne` 将添加到目标的源上添加 `foreignKey`。

#### 源键

源关键是源模型中的属性，它的目标模型指向外键属性。 默认情况下，hasOne 关系的源键将是源模型的主要属性。 要使用自定义属性，请使用 `sourceKey` 选项。

```js
const User = sequelize.define('user', {})
const Company = sequelize.define('company', {})

// 将 companyName 属性添加到 User
// 使用 Company 的 name 属性作为源属性
Company.hasOne(User, { foreignKey: 'companyName', sourceKey: 'name' })
```

### HasOne 和 BelongsTo 之间的区别

在 Sequelize `1：1` 关系中可以使用 `HasOne` 和 `BelongsTo` 进行设置。 它们适用于不同的场景。 让我们用一个例子来研究这个差异。

假设我们有两个表可以链接 `Player` 和 `Team` 。 让我们定义他们的模型。

```js
const Player = sequelize.define('player', {}, { timestamps: false })
const Team = sequelize.define('team', {}, { timestamps: false })
```

当我们连接 `Sequelize` 中的两个模型时，我们可以将它们称为一对 `source` 和 `target` 模型。像这样

将 **Player** 作为 **source** 而 **Team** 作为 **target**

```js
Player.belongsTo(Team)
//或
Player.hasOne(Team)
```

将 **Team** 作为 **source** 而 **Player** 作为 **target**

```js
Team.belongsTo(Player)
//Or
Team.hasOne(Player)
```

`HasOne` 和 `BelongsTo` 将关联键插入到不同的模型中。 `HasOne` 在 `target` 模型中插入关联键，而 `BelongsTo` 将关联键插入到 `source` 模型中。

下是一个示例，说明了 `BelongsTo` 和 `HasOne` 的用法。

```js
const Player = sequelize.define('player', {}, { timestamps: false })
const Team = sequelize.define('team', {}, { timestamps: false })
const Coach = sequelize.define('coach', {}, { timestamps: false })

Player.belongsTo(Team) // `teamId` 将被添加到 Player / Source 模型中
Coach.hasOne(Team) // `coachId` 将被添加到 Team / Target 模型中

// the same as
const Player = sequelize.define('player', {
  teamId: {
    references: {
      model: Team,
      key: 'id'
    }
  }
})

const Team = sequelize.define('team', {
  coachId: {
    references: {
      model: Coach,
      key: 'id'
    }
  }
})
```

假设我们的 `Player` 模型有关于其团队的信息为 `teamId` 列。
关于每个团队的 `Coach` 的信息作为 `coachId` 列存储在 `Team` 模型中。
这两种情况都需要不同种类的 1：1 关系，因为外键关系每次出现在不同的模型上。

- 当关于关联的信息存在于 `source` 模型中时，我们可以使用 `belongsTo`。 在这种情况下，`Player` 适用于`belongsTo`，因为它具有 `teamId` 列。
- 当关于关联的信息存在于 `target` 模型中时，我们可以使用 `hasOne`。 在这种情况下， `Coach` 适用于 `hasOne` ，因为 `Team` 模型将其 `Coach` 的信息存储为 `coachId` 字段。

## 一对多关联 (hasMany)

一对多关联将一个来源与多个目标连接起来。 而多个目标接到同一个特定的源。

```js
const User = sequelize.define('user', {}, { timestamps: false })
const Project = sequelize.define('project', {}, { timestamps: false })

// 好。 现在，事情变得更加复杂（对用户来说并不真实可见）。
// 首先我们来定义一个 hasMany 关联
Project.hasMany(User, { as: 'Workers' })
```

这会将 `projectId` 属性添加到 `User`。 根据您强调的设置，表中的列将被称为 `projectId` 或 `project_id`。 `Project` 的实例将获得访问器 `getWorkers` 和 `setWorkers`。

有时您可能需要在不同的列上关联记录，您可以使用 `sourceKey` 选项：

```js
const City = sequelize.define('city', { countryCode: Sequelize.STRING })
const Country = sequelize.define('country', { isoCode: Sequelize.STRING })

// 在这里，我们可以根据国家代码连接国家和城市
Country.hasMany(City, { foreignKey: 'countryCode', sourceKey: 'isoCode' })
City.belongsTo(Country, { foreignKey: 'countryCode', targetKey: 'isoCode' })
```

到目前为止，我们解决了单向关联。 但我们想要更多！ 让我们通过在下一节中创建一个多对多的关联来定义它。

## 多对多关联 (BelongsToMany)

多对多关联用于将源与多个目标相连接。 此外，目标也可以连接到多个源。

```js
Project.belongsToMany(User, { through: 'UserProject' })
User.belongsToMany(Project, { through: 'UserProject' })
```

这将创建一个名为 `UserProject` 的新模型，具有等效的外键 `projectId` 和 `userId`。 属性是否为 `camelcase` 取决于由表（在这种情况下为 `User` 和 `Project`）连接的两个模型。

```sql
CREATE TABLE IF NOT EXISTS `UserProject` (
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    `projectId` INTEGER,
    `userId` INTEGER,
    PRIMARY KEY (`projectId`, `userId`),
    FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;
```

定义 `through` 为 `required`。 `Sequelize` 以前会尝试自动生成名称，但并不总是导致最合乎逻辑的设置。

这将添加方法 `getUsers`,`setUsers`, `addUser`, `addUsers` 到 `Project`, 还有 `getProjects`, `setProjects`, `addProject`, 和 `addProjects` 到 `User`.

有时，您可能需要在关联中使用它们时重命名模型。 让我们通过使用别名（`as`）选项将 `users` 定义为 `workers` 而 `projects` 定义为 `t asks`。 我们还将手动定义要使用的外键：

```js
User.belongsToMany(Project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId' })
Project.belongsToMany(User, { as: 'Workers', through: 'worker_tasks', foreignKey: 'projectId' })
```

- `foreignKey` 将允许你在 `through` 关系中设置 `source model` 键。
- `otherKey` 将允许你在 `through` 关系中设置 `target model` 键。

```js
User.belongsToMany(Project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId', otherKey: 'projectId' })
```

当然你也可以使用 `belongsToMany` 定义自我引用：

```js
Person.belongsToMany(Person, { as: 'Children', through: 'PersonChildren' })
// 这将创建存储对象的 ID 的表 PersonChildren。
```

如果您想要连接表中的其他属性，则可以在定义关联之前为连接表定义一个模型，然后再说明它应该使用该模型进行连接，而不是创建一个新的关联：

```js
const User = sequelize.define('user', {})
const Project = sequelize.define('project', {})
const UserProjects = sequelize.define('userProjects', {
  status: DataTypes.STRING
})

User.belongsToMany(Project, { through: UserProjects })
Project.belongsToMany(User, { through: UserProjects })
```

要向 `user` 添加一个新 `project` 并设置其状态，您可以将额外的 `options.through` 传递给 `setter`，其中包含连接表的属性

```js
user.addProject(project, { through: { status: 'started' } })
```

默认情况下，上面的代码会将 `projectId` 和 `userId` 添加到 `UserProjects` 表中， 删除任何先前定义的主键属性 - 表将由两个表的键的组合唯一标识，并且没有其他主键列。 要在 `UserProjects` 模型上强添加一个主键，您可以手动添加它。

```js
const UserProjects = sequelize.define('userProjects', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: DataTypes.STRING
})
```

使用多对多你可以基于 `through` 关系查询并选择特定属性。 例如通过 `through` 使用 `findAll`

```js
User.findAll({
  include: [
    {
      model: Project,
      through: {
        attributes: ['createdAt', 'startedAt', 'finishedAt'],
        where: { completed: true }
      }
    }
  ]
})
```

## 参考

- [模型（表）之间的关系/关联](https://itbilu.com/nodejs/npm/41qaV3czb.html#associations-naming)
- [Associations - 关联](https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/associations.md)