(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{238:function(t,a,s){"use strict";s.r(a);var e=s(0),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#create"}},[t._v("Create")])]),s("li",[s("a",{attrs:{href:"#update"}},[t._v("Update")])]),s("li",[s("a",{attrs:{href:"#read"}},[t._v("Read")])]),s("li",[s("a",{attrs:{href:"#delete"}},[t._v("Delete")])]),s("li",[s("a",{attrs:{href:"#findorcreate-查找或创建"}},[t._v("findOrCreate - 查找或创建")])]),s("li",[s("a",{attrs:{href:"#findcreatefind-查找或创建"}},[t._v("findCreateFind - 查找或创建")])]),s("li",[s("a",{attrs:{href:"#insertorupdate-更新或创建"}},[t._v("insertOrUpdate - 更新或创建")])]),s("li",[s("a",{attrs:{href:"#bulkcreate-创建多条记录"}},[t._v("bulkCreate - 创建多条记录")])])])]),s("p"),t._v(" "),s("h3",{attrs:{id:"create"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#create"}},[t._v("#")]),t._v(" Create")]),t._v(" "),s("h4",{attrs:{id:"create-创建保存新实例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#create-创建保存新实例"}},[t._v("#")]),t._v(" create - 创建保存新实例")]),t._v(" "),s("blockquote",[s("p",[t._v("create(values, [options]) -> Promise."),s("Instance")],1)]),t._v(" "),s("p",[t._v("构建一个新的模型实例，并进行保存。与 "),s("code",[t._v("build()")]),t._v("方法不同的是，此方法除创建新实例外，还会将其保存到对应数据库表中。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 直接操作db")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" user "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" UserModel"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("create")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'guodada'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  age"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("23")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  sex"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  score"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("99")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("名称")]),t._v(" "),s("th",[t._v("类型")]),t._v(" "),s("th",[t._v("说明")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("values")]),t._v(" "),s("td",[s("code",[t._v("Object")])]),t._v(" "),s("td",[t._v("无")])]),t._v(" "),s("tr",[s("td",[t._v("[options]")]),t._v(" "),s("td",[s("code",[t._v("Object")])]),t._v(" "),s("td",[t._v("无")])]),t._v(" "),s("tr",[s("td",[t._v("[options.raw=false]")]),t._v(" "),s("td",[s("code",[t._v("Boolean")])]),t._v(" "),s("td",[t._v("设置为true时，值会忽略字段和虚拟设置器")])]),t._v(" "),s("tr",[s("td",[t._v("[options.isNewRecord=true]")]),t._v(" "),s("td",[s("code",[t._v("Boolean")])]),t._v(" "),s("td",[t._v("无")])]),t._v(" "),s("tr",[s("td",[t._v("[options.fields]")]),t._v(" "),s("td",[s("code",[t._v("Array")])]),t._v(" "),s("td",[t._v("如果设置后，只有列表中区别的列才会进行保存")])]),t._v(" "),s("tr",[s("td",[t._v("[options.include]")]),t._v(" "),s("td",[s("code",[t._v("Array")])]),t._v(" "),s("td",[t._v("用于构建prefetched/included模型，参见 set")])]),t._v(" "),s("tr",[s("td",[t._v("[options.onDuplicate]")]),t._v(" "),s("td",[s("code",[t._v("String")])]),t._v(" "),s("td",[t._v("无")])]),t._v(" "),s("tr",[s("td",[t._v("[options.transaction]")]),t._v(" "),s("td",[s("code",[t._v("Transaction")])]),t._v(" "),s("td",[t._v("在事务中执行查询")])]),t._v(" "),s("tr",[s("td",[t._v("[options.logging=false]")]),t._v(" "),s("td",[s("code",[t._v("Function")])]),t._v(" "),s("td",[t._v("一个用于打印查询时所执行sql的函数")])]),t._v(" "),s("tr",[s("td",[t._v("[options.searchPath=DEFAULT]")]),t._v(" "),s("td",[s("code",[t._v("String")])]),t._v(" "),s("td",[t._v("指定schema的 search_path (仅 Postgres)")])]),t._v(" "),s("tr",[s("td",[t._v("[options.benchmark=false]")]),t._v(" "),s("td",[s("code",[t._v("Boolean")])]),t._v(" "),s("td",[t._v("当打印SQL日志时同时输出查询执行时间（毫秒）")])])])]),t._v(" "),s("h4",{attrs:{id:"build-创建新实例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#build-创建新实例"}},[t._v("#")]),t._v(" build - 创建新实例")]),t._v(" "),s("blockquote",[s("p",[t._v("build(values, [options]) -> Instance")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// build后对象只存在于内存中，调用save后才操作db")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" user "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" UserModel"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("build")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'guodada'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  age"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("23")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  sex"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  score"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("99")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" result "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("save")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" plain"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" \n")])])]),s("table",[s("thead",[s("tr",[s("th",[t._v("名称")]),t._v(" "),s("th",[t._v("类型")]),t._v(" "),s("th",[t._v("说明")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("values")]),t._v(" "),s("td",[t._v("Object")]),t._v(" "),s("td",[t._v("无")])]),t._v(" "),s("tr",[s("td",[t._v("[options]")]),t._v(" "),s("td",[t._v("Object")]),t._v(" "),s("td",[t._v("无")])]),t._v(" "),s("tr",[s("td",[t._v("[options.raw=false]")]),t._v(" "),s("td",[t._v("Boolean")]),t._v(" "),s("td",[t._v("设置为true时，值会忽略字段和虚拟设置器")])]),t._v(" "),s("tr",[s("td",[t._v("[options.isNewRecord=true]")]),t._v(" "),s("td",[t._v("Boolean")]),t._v(" "),s("td",[t._v("无")])]),t._v(" "),s("tr",[s("td",[t._v("[options.include]")]),t._v(" "),s("td",[t._v("Array")]),t._v(" "),s("td",[t._v("用于构建"),s("code",[t._v("prefetched/included")]),t._v("模型，参见 set")])])])]),t._v(" "),s("h3",{attrs:{id:"update"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#update"}},[t._v("#")]),t._v(" Update")]),t._v(" "),s("h4",{attrs:{id:"update-更新记录"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#update-更新记录"}},[t._v("#")]),t._v(" update - 更新记录")]),t._v(" "),s("blockquote",[s("p",[t._v("update(values, options) -> Promise.<Array.<affectedCount, affectedRows>>")])]),t._v(" "),s("p",[t._v("更新所匹配的多个实例。promise 回调中会返回一个包含一个或两个元素的数组，第一个元素始终表示受影响的行数，\n第二个元素表示实际影响的行（仅 Postgreoptions.returning 为 true 时受支持）")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" UserModel"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("update")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'guoxiaoxiao'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" age"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("18")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" where"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("table",[s("thead",[s("tr",[s("th",[t._v("名称")]),t._v(" "),s("th",[t._v("类型")]),t._v(" "),s("th",[t._v("说明")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("values")]),t._v(" "),s("td",[s("code",[t._v("Object")])]),t._v(" "),s("td",[t._v("无")])]),t._v(" "),s("tr",[s("td",[t._v("options")]),t._v(" "),s("td",[s("code",[t._v("Object")])]),t._v(" "),s("td",[t._v("无")])]),t._v(" "),s("tr",[s("td",[t._v("options.where")]),t._v(" "),s("td",[s("code",[t._v("Object")])]),t._v(" "),s("td",[t._v("筛选条件")])]),t._v(" "),s("tr",[s("td",[t._v("[options.fields]")]),t._v(" "),s("td",[s("code",[t._v("Array")])]),t._v(" "),s("td",[t._v("要更新字段，默认为全部")])]),t._v(" "),s("tr",[s("td",[t._v("[options.validate=true]")]),t._v(" "),s("td",[s("code",[t._v("Boolean")])]),t._v(" "),s("td",[t._v("更新每条记录前进行验证")])]),t._v(" "),s("tr",[s("td",[t._v("[options.hooks=true]")]),t._v(" "),s("td",[s("code",[t._v("Boolean")])]),t._v(" "),s("td",[t._v("在执行更新前/后创建钩子")])]),t._v(" "),s("tr",[s("td",[t._v("[options.individualHooks=false]")]),t._v(" "),s("td",[s("code",[t._v("Boolean")])]),t._v(" "),s("td",[t._v("在执行更新前/后为每个实例创建钩子")])]),t._v(" "),s("tr",[s("td",[t._v("[options.sideEffects=true]")]),t._v(" "),s("td",[s("code",[t._v("Boolean")])]),t._v(" "),s("td",[t._v("是否更新任何虚拟设置")])]),t._v(" "),s("tr",[s("td",[t._v("[options.returning=false]")]),t._v(" "),s("td",[s("code",[t._v("Boolean")])]),t._v(" "),s("td",[t._v("返回受影响的行 (仅适用于 postgres)")])]),t._v(" "),s("tr",[s("td",[t._v("[options.limit]")]),t._v(" "),s("td",[s("code",[t._v("Number")])]),t._v(" "),s("td",[t._v("要更新的行数 (仅适用于 mysql 和 mariadb)")])]),t._v(" "),s("tr",[s("td",[t._v("[options.transaction]")]),t._v(" "),s("td",[s("code",[t._v("Transaction")])]),t._v(" "),s("td",[t._v("在事务中执行查询")])]),t._v(" "),s("tr",[s("td",[t._v("[options.silent=false]")]),t._v(" "),s("td",[s("code",[t._v("Boolean")])]),t._v(" "),s("td",[t._v("如果为true，updatedAt字段将不会更新")])])])]),t._v(" "),s("h3",{attrs:{id:"read"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#read"}},[t._v("#")]),t._v(" Read")]),t._v(" "),s("p",[t._v("详见 "),s("a",{attrs:{href:"https://gershonv.github.io/2019/01/03/sequelize-query/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Sequelize - 使用 model 查询数据"),s("OutboundLink")],1)]),t._v(" "),s("h3",{attrs:{id:"delete"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#delete"}},[t._v("#")]),t._v(" Delete")]),t._v(" "),s("h4",{attrs:{id:"destroy-删除记录"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#destroy-删除记录"}},[t._v("#")]),t._v(" destroy - 删除记录")]),t._v(" "),s("blockquote",[s("p",[t._v("destroy(options) -> Promise."),s("Integer")],1)]),t._v(" "),s("p",[t._v("删除多个实例，或设置 "),s("code",[t._v("deletedAt")]),t._v(" 的时间戳为当前时间（当启用 "),s("code",[t._v("paranoid")]),t._v(" 时）")]),t._v(" "),s("p",[t._v("执行成功后返回被删除的行数")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" deleteRowsCount "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" UserModel"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("destroy")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  where"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("deleteRowsCount"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 执行成功后返回被删除的行数")]),t._v("\n")])])]),s("table",[s("thead",[s("tr",[s("th",[t._v("名称")]),t._v(" "),s("th",[t._v("类型")]),t._v(" "),s("th",[t._v("说明")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("options")]),t._v(" "),s("td",[t._v("Object")]),t._v(" "),s("td")]),t._v(" "),s("tr",[s("td",[t._v("[options.where]")]),t._v(" "),s("td",[s("code",[t._v("Object")])]),t._v(" "),s("td",[t._v("筛选条件")])]),t._v(" "),s("tr",[s("td",[t._v("[options.hooks=true]")]),t._v(" "),s("td",[s("code",[t._v("Boolean")])]),t._v(" "),s("td",[t._v("在执行前/后创建钩子")])]),t._v(" "),s("tr",[s("td",[t._v("[options.individualHooks=false]")]),t._v(" "),s("td",[s("code",[t._v("Boolean")])]),t._v(" "),s("td",[t._v("在执行前/后为每个实例创建钩子")])]),t._v(" "),s("tr",[s("td",[t._v("[options.limit]")]),t._v(" "),s("td",[s("code",[t._v("Number")])]),t._v(" "),s("td",[t._v("要删除的行数")])]),t._v(" "),s("tr",[s("td",[t._v("[options.force=false]")]),t._v(" "),s("td",[s("code",[t._v("Boolean")])]),t._v(" "),s("td",[t._v("删除而不是设置 deletedAt 为当前时间戳 (仅启用 paranoid 时适用)")])]),t._v(" "),s("tr",[s("td",[t._v("[options.truncate=false]")]),t._v(" "),s("td",[s("code",[t._v("Boolean")])]),t._v(" "),s("td",[t._v("设置为true时，会使用TRUNCATE代替DELETE FROM，这时会忽略where和limit选项")])]),t._v(" "),s("tr",[s("td",[t._v("[options.cascade=false]")]),t._v(" "),s("td",[s("code",[t._v("Boolean")])]),t._v(" "),s("td",[t._v("仅适用于连接查询时的TRUNCATE操作，截断所有外键匹配的表")])]),t._v(" "),s("tr",[s("td",[t._v("[options.transaction]")]),t._v(" "),s("td",[s("code",[t._v("Transaction")])]),t._v(" "),s("td",[t._v("在事务中执行查询")])])])]),t._v(" "),s("h3",{attrs:{id:"findorcreate-查找或创建"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#findorcreate-查找或创建"}},[t._v("#")]),t._v(" findOrCreate - 查找或创建")]),t._v(" "),s("blockquote",[s("p",[t._v("findOrCreate(options) -> Promise.<Instance, created>")])]),t._v(" "),s("p",[t._v("查找一行记录，如果不存在则创建实例并保存到数据库中")]),t._v(" "),s("p",[t._v("在这个方法中，如果options对象中没有传入事务，那么会在内部自动创建一个新的事务，以防止在创建完成之前有新匹配查询进入。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// findOrCreate 返回一个包含已找到或创建的对象的数组，找到或创建的对象和一个布尔值")]),t._v("\nUserModel"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("findOrCreate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  defaults"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'guoxiaoxiao'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  where"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'guoxiaoxiao'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("spread")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" created")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" created"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// 在上面的例子中，".spread" 将数组分成2部分，并将它们作为参数传递给回调函数，在这种情况下将它们视为 "user" 和 "created" 。')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// 所以“user”将是返回数组的索引0的对象，并且 "created" 将等于 "true"。）')]),t._v("\n\n")])])]),s("table",[s("thead",[s("tr",[s("th",[t._v("名称")]),t._v(" "),s("th",[t._v("类型")]),t._v(" "),s("th",[t._v("说明")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("options")]),t._v(" "),s("td",[s("code",[t._v("Object")])]),t._v(" "),s("td",[t._v("无")])]),t._v(" "),s("tr",[s("td",[t._v("options.where")]),t._v(" "),s("td",[s("code",[t._v("Object")])]),t._v(" "),s("td",[t._v("查询属性")])]),t._v(" "),s("tr",[s("td",[t._v("[options.defaults]")]),t._v(" "),s("td",[s("code",[t._v("Object")])]),t._v(" "),s("td",[t._v("用于创建新实例的默认值")])]),t._v(" "),s("tr",[s("td",[t._v("[options.transaction]")]),t._v(" "),s("td",[s("code",[t._v("Transaction")])]),t._v(" "),s("td",[t._v("在事务中执行查询")])])])]),t._v(" "),s("h3",{attrs:{id:"findcreatefind-查找或创建"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#findcreatefind-查找或创建"}},[t._v("#")]),t._v(" findCreateFind - 查找或创建")]),t._v(" "),s("blockquote",[s("p",[t._v("findCreateFind(options) -> Promise.<Instance, created>")])]),t._v(" "),s("p",[t._v("效率更高的 "),s("code",[t._v("findOrCreate")]),t._v("，不会在事务中执行。首先会尝试进行查询，如果为空则尝试创建，如果是唯一约束则尝试再次查找。")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("名称")]),t._v(" "),s("th",[t._v("类型")]),t._v(" "),s("th",[t._v("说明")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("options")]),t._v(" "),s("td",[s("code",[t._v("Object")])]),t._v(" "),s("td",[t._v("无")])]),t._v(" "),s("tr",[s("td",[t._v("options.where")]),t._v(" "),s("td",[s("code",[t._v("Object")])]),t._v(" "),s("td",[t._v("查询属性")])]),t._v(" "),s("tr",[s("td",[t._v("[options.defaults]")]),t._v(" "),s("td",[s("code",[t._v("Object")])]),t._v(" "),s("td",[t._v("用于创建新实例的默认值")])]),t._v(" "),s("tr",[s("td",[t._v("[options.transaction]")]),t._v(" "),s("td",[s("code",[t._v("Transaction")])]),t._v(" "),s("td",[t._v("在事务中执行查询")])])])]),t._v(" "),s("p",[t._v("ps: "),s("code",[t._v("findOrInitialize")]),t._v("  - 查找或初始化: 查找一行记录，如果不存在则创建（不保存）实例")]),t._v(" "),s("h3",{attrs:{id:"insertorupdate-更新或创建"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#insertorupdate-更新或创建"}},[t._v("#")]),t._v(" insertOrUpdate - 更新或创建")]),t._v(" "),s("blockquote",[s("p",[t._v("upsert(values, [options]) -> Promise."),s("created")],1)]),t._v(" "),s("p",[t._v("创建或更新一行。如果匹配到主键或唯一约束键时会进行更新。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" isCreate "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" TaskModel"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("insertOrUpdate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" title"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'11'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" content"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'adfadf'")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// isCreate true 创建成功 false 修改成功~")]),t._v("\n")])])]),s("table",[s("thead",[s("tr",[s("th",[t._v("名称")]),t._v(" "),s("th",[t._v("类型")]),t._v(" "),s("th",[t._v("说明")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("values")]),t._v(" "),s("td",[s("code",[t._v("Object")])]),t._v(" "),s("td",[t._v("无")])]),t._v(" "),s("tr",[s("td",[t._v("[options]")]),t._v(" "),s("td",[s("code",[t._v("Object")])]),t._v(" "),s("td",[t._v("无")])]),t._v(" "),s("tr",[s("td",[t._v("[options.validate=true]")]),t._v(" "),s("td",[s("code",[t._v("Boolean")])]),t._v(" "),s("td",[t._v("插入前进行验证")])]),t._v(" "),s("tr",[s("td",[t._v("[options.fields=Object.keys(this.attributes)]")]),t._v(" "),s("td",[s("code",[t._v("Array")])]),t._v(" "),s("td",[t._v("要插入/更新字段。默认全部")])]),t._v(" "),s("tr",[s("td",[t._v("[options.transaction]")]),t._v(" "),s("td",[s("code",[t._v("Transaction")])]),t._v(" "),s("td",[t._v("在事务中执行查询")])])])]),t._v(" "),s("h3",{attrs:{id:"bulkcreate-创建多条记录"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bulkcreate-创建多条记录"}},[t._v("#")]),t._v(" bulkCreate - 创建多条记录")]),t._v(" "),s("blockquote",[s("p",[t._v("bulkCreate(records, [options]) -> Promise.<Array."),s("Instance",[t._v(">")])],1)]),t._v(" "),s("p",[t._v("批量创建并保存多个实例。")]),t._v(" "),s("p",[t._v("处理成功后，会在回调函数中返回一个包含多个实例的数组。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" users "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" UserModel"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("bulkCreate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'guo'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" age"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("22")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" sex"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'guo2'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" age"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("12")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" sex"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'guo3'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" age"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("32")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" sex"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("table",[s("thead",[s("tr",[s("th",[t._v("名称")]),t._v(" "),s("th",[t._v("类型")]),t._v(" "),s("th",[t._v("说明")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("records")]),t._v(" "),s("td",[s("code",[t._v("Array")])]),t._v(" "),s("td",[t._v("要创建实例的对象（键/值 对）列表")])]),t._v(" "),s("tr",[s("td",[t._v("[options]")]),t._v(" "),s("td",[s("code",[t._v("Object")])]),t._v(" "),s("td",[t._v("无")])]),t._v(" "),s("tr",[s("td",[t._v("[options.fields]")]),t._v(" "),s("td",[s("code",[t._v("Array")])]),t._v(" "),s("td",[t._v("要插入的字段。默认全部")])]),t._v(" "),s("tr",[s("td",[t._v("[options.validate=true]")]),t._v(" "),s("td",[s("code",[t._v("Boolean")])]),t._v(" "),s("td",[t._v("插入每条记录前进行验证")])]),t._v(" "),s("tr",[s("td",[t._v("[options.hooks=true]")]),t._v(" "),s("td",[s("code",[t._v("Boolean")])]),t._v(" "),s("td",[t._v("在执行前/后创建钩子")])]),t._v(" "),s("tr",[s("td",[t._v("[options.individualHooks=false]")]),t._v(" "),s("td",[s("code",[t._v("Boolean")])]),t._v(" "),s("td",[t._v("在执行前/后为每个实例创建钩子")])]),t._v(" "),s("tr",[s("td",[t._v("[options.ignoreDuplicates=false]")]),t._v(" "),s("td",[s("code",[t._v("Boolean")])]),t._v(" "),s("td",[t._v("忽略重复主键（Postgres不支持）")])]),t._v(" "),s("tr",[s("td",[t._v("[options.updateOnDuplicate]")]),t._v(" "),s("td",[s("code",[t._v("Array")])]),t._v(" "),s("td",[t._v("如果行键已存在是否更新（mysql & mariadb支持）. 默认为更新")])]),t._v(" "),s("tr",[s("td",[t._v("[options.transaction]")]),t._v(" "),s("td",[s("code",[t._v("Transaction")])]),t._v(" "),s("td",[t._v("在事务中执行查询")])])])]),t._v(" "),s("comment-comment")],1)}),[],!1,null,null,null);a.default=n.exports}}]);