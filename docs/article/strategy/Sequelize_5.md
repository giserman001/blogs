---
title: Sequelize - 多表 CURD
date: 2019-02-11 12:42:39
categories: Sequelize
tags: Sequelize
---

## 一对一

```js
const UserModel = sequelize.define('user', {
  uuid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  }
})

const AccountModel = sequelize.define('account', {
  email: {
    type: Sequelize.CHAR(60),
    allowNull: false
  }
})

//  User的实例对象将拥有 getAccount、setAccount、createAccount 方法
UserModel.hasOne(AccountModel)

// Account的实例对象将拥有getUser、setUser、addUser 方法
AccountModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  targetKey: 'uuid'
})
```

<!-- more -->

### 增 - createAccount

```js
// 增
const user = await UserModel.create({ uuid: 666 })
const account = await user.createAccount({ email: '12306@qq.com' }) // 增

console.log(account.get({ plain: true }))
```

使用对应的的 `userId` 作为外键在 `accounts` 表里插入一条数据。

```js
mysql> select * from users;
+----+------+---------------------+---------------------+
| id | uuid | createdAt           | updatedAt           |
+----+------+---------------------+---------------------+
|  1 |  666 | 2019-01-11 05:23:05 | 2019-01-11 05:23:05 |
+----+------+---------------------+---------------------+
1 row in set (0.00 sec)

mysql> select * from accounts;
+----+--------------+---------------------+---------------------+--------+
| id | email        | createdAt           | updatedAt           | userId |
+----+--------------+---------------------+---------------------+--------+
|  1 | 12306@qq.com | 2019-01-11 05:23:05 | 2019-01-11 08:05:38 |      1 |
+----+--------------+---------------------+---------------------+--------+
1 row in set (0.00 sec)
```

### 改 - setAccount

```js
const user = await UserModel.findByPk(1)
const antherAccount = await AccountModel.create({ email: 'aaa' })
const account = await user.setAccount(antherAccount)
```

1. 插入一条 `account` 数据，此时外键 `userId` 是空的，还没有关联 `user`
2. 找出当前 `user` 所关联的 `account` 并将其 `userId` 置为 `NULL`（为了保证一对一关系）
3. 设置新的 `acount` 的外键 `userId` 为 `user` 的属性 `id`，生成关系

```js
mysql> select * from accounts;
+----+--------------+---------------------+---------------------+--------+
| id | email        | createdAt           | updatedAt           | userId |
+----+--------------+---------------------+---------------------+--------+
|  1 | 12306@qq.com | 2019-01-11 05:23:05 | 2019-01-11 08:11:59 |   NULL |
|  2 | aaa          | 2019-01-11 08:11:59 | 2019-01-11 08:11:59 |      1 |
+----+--------------+---------------------+---------------------+--------+
2 rows in set (0.00 sec)
```

### 软删 - setAccount(null)

```js
const user = await UserModel.findByPk(1)
const account = await user.setAccount(null)
```

这里的删除实际上只是“切断”关系，并不会真正的物理删除记录。
SQL 执行逻辑是：

1. 找出 `user` 所关联的 `account` 数据
2. 将其外键 `userId` 设置为 `NULL`，完成关系的“切断”

### 查 - getAccount

```js
const user = await UserModel.findByPk(1)
const account = await user.getAccount()
console.log(account.get({ plain: true }))
```

or

```js
const user = await UserModel.findByPk(1, {
  include: [AccountModel]
})
console.log(user.get({ plain: true }))
// { id: 1,
//   uuid: 666,
//   createdAt: 2019-01-11T05:23:05.000Z,
//   updatedAt: 2019-01-11T05:23:05.000Z,
//   account:
//    { id: 2,
//      email: 'aaa',
//      createdAt: 2019-01-11T08:11:59.000Z,
//      updatedAt: 2019-01-11T08:11:59.000Z,
//      userId: 1 } }
```

```js
mysql> SELECT `user`.`id`, `user`.`uuid`, `user`.`createdAt`, `user`.`updatedAt`,
`account`.`id` AS `account.id`, `account`.`email` AS `account.email`, `account`.`createdAt` AS `account.createdAt`,
`account`.`updatedAt` AS `account.updatedAt`, `account`.`userId` AS `account.userId` FROM `users` AS `user`
LEFT OUTER JOIN `accounts` AS `account` ON `user`.`id` = `account`.`userId` WHERE `user`.`id` = 1;

+----+------+---------------------+---------------------+------------+---------------+---------------------+---------------------+----------------+
| id | uuid | createdAt           | updatedAt           | account.id | account.email | account.createdAt   | account.updatedAt   | account.userId |
+----+------+---------------------+---------------------+------------+---------------+---------------------+---------------------+----------------+
|  1 |  666 | 2019-01-11 05:23:05 | 2019-01-11 05:23:05 |          9 | aaa           | 2019-01-11 08:11:59 | 2019-01-11 08:11:59 |              1 |
+----+------+---------------------+---------------------+------------+---------------+---------------------+---------------------+----------------+
1 row in set (0.00 sec)
```

可以看到，我们对 2 个表进行了一个外联接，从而在取 `user` 的同时也获取到了 `account`。

## 一对多

```js
const UserModel = sequelize.define(
  'user',
  {
    uuid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true
    }
  },
  { timestamps: false }
)

const NoteModel = sequelize.define('note', {
  title: {
    type: Sequelize.CHAR(64),
    allowNull: false
  }
})

// User的实例对象将拥有getNotes、setNotes、addNote、createNote、removeNote、hasNote方法
UserModel.hasMany(NoteModel)

// Note的实例对象将拥有getUser、setUser、createUser方法
NoteModel.belongsTo(UserModel)
```

生成的 sql 语句：

```sql
CREATE TABLE IF NOT EXISTS `users` (
    `id` INTEGER NOT NULL auto_increment ,
    `uuid` INTEGER NOT NULL UNIQUE, PRIMARY KEY (`id`)
  ) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `notes` (
    `id` INTEGER NOT NULL auto_increment,
    `title` CHAR(64) NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    `userId` INTEGER,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE
    SET
        NULL ONUPDATE CASCADE
) ENGINE = InnoDB;
```

可以看到这种关系中，外键 `userId` 加在了多的一端（`notes` 表）。同时相关的模型也自动获得了一些方法。

### 增

#### createNote

```js
const user = await UserModel.create({ uuid: 1234 })
const note1 = await user.createNote({ title: 'aa' }) // 增

console.log(note1.get({ plain: true }))
```

SQL 执行逻辑：

> 使用 `user` 的主键 `id` 值作为外键直接在 `notes` 表里插入一条数据。

```js
INSERT INTO `notes` (`id`,`title`,`createdAt`,`updatedAt`,`userId`)
VALUES (DEFAULT,'aa','2019-01-12 05:32:50','2019-01-12 05:32:50',1);
```

#### addNote

```js
const user = await UserModel.create({ uuid: 1234 })
const note = await NoteModel.create({ title: 'bb' })
await user.addNote(note)
```

`SQL`:

```sql
INSERT INTO `users` (`id`,`uuid`) VALUES (DEFAULT,1234);
INSERT INTO `notes` (`id`,`title`,`createdAt`,`updatedAt`) VALUES (DEFAULT,'bb','2019-01-12 05:40:34','2019-01-12 05:40:34');
UPDATE `notes` SET `userId`=1,`updatedAt`='2019-01-12 05:40:34' WHERE `id` IN (1)
```

1. 插入一条 `note` 数据，此时该条数据的外键 `userId` 为空
2. 使用 `user` 的属性 `id` 值再更新该条 `note` 数据，设置好外键，完成关系建立

#### addNotes

```js
const user = await UserModel.create({ uuid: 1234 })
const note1 = await NoteModel.create({ title: 'aa' })
const note2 = await NoteModel.create({ title: 'bb' })

await user.addNotes([note1, note2])
```

### 改 - setNotes

```js
const user = await UserModel.create({ uuid: 1234 })
const note1 = await user.createNote({ title: 'aa' })
const note2 = await user.createNote({ title: 'bb' })

const note3 = await NoteModel.create({ title: 'cc' })
const note4 = await NoteModel.create({ title: 'dd' })

await user.setNotes([note3, note4])
```

1. 根据 `user` 的属性 id 查询所有相关的 `note` 数据
2. 将 `note1`、`note2` 的外键 `userId` 置为 `NULL`，切断关系
3. 将 `note3`、`note4` 的外键 `userId` 置为 `user` 的属性 `id`，完成关系建立

```js
mysql> select * from notes;
+----+-------+---------------------+---------------------+--------+
| id | title | createdAt           | updatedAt           | userId |
+----+-------+---------------------+---------------------+--------+
|  1 | aa    | 2019-01-12 05:53:11 | 2019-01-12 05:53:11 |   NULL |
|  2 | bb    | 2019-01-12 05:53:11 | 2019-01-12 05:53:11 |   NULL |
|  3 | cc    | 2019-01-12 05:53:11 | 2019-01-12 05:53:11 |      1 |
|  4 | dd    | 2019-01-12 05:53:11 | 2019-01-12 05:53:11 |      1 |
+----+-------+---------------------+---------------------+--------+
4 rows in set (0.00 sec)
```

### 软删

#### removeNote

```js
const user = await UserModel.create({ uuid: 1234 })
const note1 = await user.createNote({ title: 'aa' })
const note2 = await user.createNote({ title: 'bb' })

await user.removeNote(note1)
```

```js
mysql> select * from notes;
+----+-------+---------------------+---------------------+--------+
| id | title | createdAt           | updatedAt           | userId |
+----+-------+---------------------+---------------------+--------+
|  1 | aa    | 2019-01-12 06:05:40 | 2019-01-12 06:05:40 |   NULL |
|  2 | bb    | 2019-01-12 06:05:40 | 2019-01-12 06:05:40 |      1 |
+----+-------+---------------------+---------------------+--------+
2 rows in set (0.00 sec)
```

#### setNotes([])

```js
const user = await UserModel.create({ uuid: 1234 })
const note1 = await user.createNote({ title: 'aa' })
const note2 = await user.createNote({ title: 'bb' })
await user.setNotes([])
```

### 查

#### getNotes

```js
const user = await UserModel.create({ uuid: 1234 })
const note1 = await user.createNote({ title: 'aa' })
const note2 = await user.createNote({ title: 'bb' })

const notes = await user.getNotes({
  where: {
    title: { $like: '%a%' }
  }
})
notes.map(note => console.log(note.title))
```

#### findAll

> 场景 1： 查询所有满足条件的 `note`，同时获取 `note` 属于哪个 `user`。

```js
const notes = await NoteModel.findAll({
  include: UserModel, // or [UserModel, ...]
  where: {
    title: { $like: '%a%' }
  }
})

notes.map(note => {
  console.log(note.get({ plain: true }))
})

// result

// { id: 1,
//   title: 'aa',
//   createdAt: 2019-01-12T06:12:33.000Z,
//   updatedAt: 2019-01-12T06:12:33.000Z,
//   userId: 1,
//   user: { id: 1, uuid: 1234 } }
```

> 场景 2 查询所有满足条件的 `note`，同时获取 `note` 属于哪个`user`。

```js
const user = await UserModel.create({ uuid: 1234 })
const note1 = await user.createNote({ title: 'aa' })
const note2 = await user.createNote({ title: 'bb' })

const users = await UserModel.findAll({
  include: [NoteModel], // or [UserModel, ...]
  where: { uuid: 1234 }
})
users.map(note => {
  console.log(note.get({ plain: true }))
})

// result
// { id: 1,
//   uuid: 1234,
//   notes:
//    [ { id: 1,
//        title: 'aa',
//        createdAt: 2019-01-12T06:17:39.000Z,
//        updatedAt: 2019-01-12T06:17:39.000Z,
//        userId: 1 },
//      { id: 2,
//        title: 'bb',
//        createdAt: 2019-01-12T06:17:39.000Z,
//        updatedAt: 2019-01-12T06:17:39.000Z,
//        userId: 1 } ] }
```

```js
// 查询创建时间在今天之前的所有user，同时获取他们note的标题中含有关键字css的所有note
const users = await UserModel.findAll({
  include: [
    {
      model: NoteModel,
      where: {
        title: { $like: '%aa%' }
      }
    }
  ],
  where: { uuid: 1234 }
})
```

## 多对多

```js
const NoteModel = sequelize.define('note', {
  title: {
    type: Sequelize.CHAR(64),
    allowNull: false
  }
})

const TagModel = sequelize.define('tag', {
  name: Sequelize.CHAR(64)
})

const TaggingModel = sequelize.define('tagging', {
  type: Sequelize.INTEGER
})

// Note的实例拥有getTags、setTags、addTag、addTags、createTag、removeTag、hasTag方法
NoteModel.belongsToMany(TagModel, {
  through: TaggingModel
})

// Tag的实例拥有getNotes、setNotes、addNote、addNotes、createNote、removeNote、hasNote方法
TagModel.belongsToMany(NoteModel, {
  through: TaggingModel
})
```

`tagging` 表连接两个表：

```js
mysql> show columns from taggings;
+-----------+----------+------+-----+---------+-------+
| Field     | Type     | Null | Key | Default | Extra |
+-----------+----------+------+-----+---------+-------+
| type      | int(11)  | YES  |     | NULL    |       |
| createdAt | datetime | NO   |     | NULL    |       |
| updatedAt | datetime | NO   |     | NULL    |       |
| noteId    | int(11)  | NO   | PRI | NULL    |       |
| tagId     | int(11)  | NO   | PRI | NULL    |       |
+-----------+----------+------+-----+---------+-------+
5 rows in set (0.00 sec)
```

### 增

#### createTag

```js
const note = await NoteModel.create({ title: 'aa' })
await note.createTag({ name: 'react.js' }, { through: { type: 0 } })
```

SQL:

```sql
INSERT INTO `notes`
  (`id`,`title`,`createdAt`,`updatedAt`) VALUES (DEFAULT,'aa','2019-01-12 06:38:09','2019-01-12 06:38:09');

INSERT INTO `tags`
  (`id`,`name`,`createdAt`,`updatedAt`) VALUES (DEFAULT,'react.js','2019-01-12 06:38:09','2019-01-12 06:38:09');

INSERT INTO `taggings`
  (`type`,`createdAt`,`updatedAt`,`noteId`,`tagId`) VALUES (0,'2019-01-12 06:51:10','2019-01-12 06:51:10',1,1);
```

1. 在 `notes` 表插入记录
2. 在 `tags` 表中插入记录
3. 使用对应的值设置外键 `tagId` 和 `noteId` 以及关系模型本身需要的属性（`type: 0`）在关系表 tagging 中插入记录

```js
mysql> select * from notes;
+----+-------+---------------------+---------------------+
| id | title | createdAt           | updatedAt           |
+----+-------+---------------------+---------------------+
|  1 | aa    | 2019-01-12 06:51:10 | 2019-01-12 06:51:10 |
+----+-------+---------------------+---------------------+
1 row in set (0.00 sec)

mysql> select * from taggings;
+------+---------------------+---------------------+--------+-------+
| type | createdAt           | updatedAt           | noteId | tagId |
+------+---------------------+---------------------+--------+-------+
|    0 | 2019-01-12 06:51:10 | 2019-01-12 06:51:10 |      1 |     1 |
+------+---------------------+---------------------+--------+-------+
1 row in set (0.00 sec)

mysql> select * from tags;
+----+----------+---------------------+---------------------+
| id | name     | createdAt           | updatedAt           |
+----+----------+---------------------+---------------------+
|  1 | react.js | 2019-01-12 06:55:00 | 2019-01-12 06:55:00 |
+----+----------+---------------------+---------------------+
1 row in set (0.00 sec)
```

#### addTag

```js
const note = await NoteModel.create({ title: 'aa' })
const tag = await TagModel.create({ name: 'react.js' })
await note.addTag(tag, { through: { type: 1 } })
```

#### addTags

```js
const note = await NoteModel.create({ title: 'aa' })
const tag1 = await TagModel.create({ name: 'react.js' })
const tag2 = await TagModel.create({ name: 'vue.js' })
await note.addTags([tag1, tag2], { through: { type: 1 } })
```

### 改 - setTags

```js
const note = await NoteModel.create({ title: 'aa' })
const tag1 = await TagModel.create({ name: 'react.js' })
const tag2 = await TagModel.create({ name: 'vue.js' })

await note.addTags([tag1, tag2], { through: { type: 1 } })

const tag3 = await TagModel.create({ name: 'angular.js' })
const tag4 = await TagModel.create({ name: 'ant-desgin' })

await note.setTags([tag3, tag4], { through: { type: 2 } })
```

```js
mysql> select * from taggings;
+------+---------------------+---------------------+--------+-------+
| type | createdAt           | updatedAt           | noteId | tagId |
+------+---------------------+---------------------+--------+-------+
|    2 | 2019-01-12 07:02:52 | 2019-01-12 07:02:52 |      1 |     3 |
|    2 | 2019-01-12 07:02:52 | 2019-01-12 07:02:52 |      1 |     4 |
+------+---------------------+---------------------+--------+-------+
2 rows in set (0.00 sec)

mysql> select * from tags;
+----+------------+---------------------+---------------------+
| id | name       | createdAt           | updatedAt           |
+----+------------+---------------------+---------------------+
|  1 | react.js   | 2019-01-12 07:02:51 | 2019-01-12 07:02:51 |
|  2 | vue.js     | 2019-01-12 07:02:51 | 2019-01-12 07:02:51 |
|  3 | angular.js | 2019-01-12 07:02:52 | 2019-01-12 07:02:52 |
|  4 | ant-desgin | 2019-01-12 07:02:52 | 2019-01-12 07:02:52 |
+----+------------+---------------------+---------------------+
4 rows in set (0.00 sec)
```

### 删

#### removeTag

```js
const note = await NoteModel.create({ title: 'aa' })
const tag1 = await TagModel.create({ name: 'react.js' })
const tag2 = await TagModel.create({ name: 'vue.js' })

await note.addTags([tag1, tag2], { through: { type: 1 } })

await note.removeTag(tag2)

// DELETE FROM `taggings` WHERE `noteId` = 1 AND `tagId` IN (2)
```

--> 软删:

```js
mysql> select * from tags;
+----+----------+---------------------+---------------------+
| id | name     | createdAt           | updatedAt           |
+----+----------+---------------------+---------------------+
|  1 | react.js | 2019-01-12 07:06:18 | 2019-01-12 07:06:18 |
|  2 | vue.js   | 2019-01-12 07:06:18 | 2019-01-12 07:06:18 |
+----+----------+---------------------+---------------------+
2 rows in set (0.00 sec)

mysql> select * from taggings;
+------+---------------------+---------------------+--------+-------+
| type | createdAt           | updatedAt           | noteId | tagId |
+------+---------------------+---------------------+--------+-------+
|    1 | 2019-01-12 07:06:18 | 2019-01-12 07:06:18 |      1 |     1 |
+------+---------------------+---------------------+--------+-------+
1 row in set (0.00 sec)
```

#### setTags([])

```js
const note = await NoteModel.create({ title: 'aa' })
const tag1 = await TagModel.create({ name: 'react.js' })
const tag2 = await TagModel.create({ name: 'vue.js' })

await note.addTags([tag1, tag2], { through: { type: 1 } })

await note.setTags([])
```

### 查

#### getTags

```js
const note = await NoteModel.create({ title: 'aa' })
const tag1 = await TagModel.create({ name: 'react.js' })
const tag2 = await TagModel.create({ name: 'vue.js' })

await note.addTags([tag1, tag2], { through: { type: 1 } })

const notes = await note.getTags({
  // 这里可以对tags进行where
})
notes.map(d => {
  console.log(d.get({ plain: true }))
})

// { id: 1,
//   name: 'react.js',
//   createdAt: 2019-01-12T07:11:26.000Z,
//   updatedAt: 2019-01-12T07:11:26.000Z,
//   tagging:
//    { type: 1,
//      createdAt: 2019-01-12T07:11:26.000Z,
//      updatedAt: 2019-01-12T07:11:26.000Z,
//      noteId: 1,
//      tagId: 1 } }
// { id: 2,
//   name: 'vue.js',
//   createdAt: 2019-01-12T07:11:26.000Z,
//   updatedAt: 2019-01-12T07:11:26.000Z,
//   tagging:
//    { type: 1,
//      createdAt: 2019-01-12T07:11:26.000Z,
//      updatedAt: 2019-01-12T07:11:26.000Z,
//      noteId: 1,
//      tagId: 2 } }
```

可以看到这种查询，就是执行一个 `inner join`。

#### findAll

```js
const note = await NoteModel.create({ title: 'aa' })
const tag1 = await TagModel.create({ name: 'react.js' })
const tag2 = await TagModel.create({ name: 'vue.js' })

await note.addTags([tag1, tag2], { through: { type: 1 } })

const notes = await NoteModel.findAll({
  include: TagModel
})

notes.map(d => {
  console.log(d.get({ plain: true }))
})

// { id: 1,
//   title: 'aa',
//   createdAt: 2019-01-12T07:14:43.000Z,
//   updatedAt: 2019-01-12T07:14:43.000Z,
//   tags:
//    [ { id: 1,
//        name: 'react.js',
//        createdAt: 2019-01-12T07:14:43.000Z,
//        updatedAt: 2019-01-12T07:14:43.000Z,
//        tagging: [Object] },
//      { id: 2,
//        name: 'vue.js',
//        createdAt: 2019-01-12T07:14:43.000Z,
//        updatedAt: 2019-01-12T07:14:43.000Z,
//        tagging: [Object] } ] }
```