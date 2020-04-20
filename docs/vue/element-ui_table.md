---
title: element-ui的表格二次封装
date: 2020-04-20
isNoPage: false
des: 在我们每次写后台管理系统时会出现大量的表格，每次都会写一些重复代码，那么我们就二次封装一下，减少我们的工作量
tags: vue,element-ui
---
# element-ui的表格二次封装
>在我们每次写后台管理系统时会出现大量的表格，每次都会写一些重复代码，那么我们就二次封装一下，减少我们的工作量

**直接上代码(html)**：
```html
<template>
  <div>
    <el-table
      id="XmTable"
      ref="XmTable"
      :key="index"
      v-loading="loading"
      :class="{ 'xm-table-border': bordered }"
      :border="border"
      :data="tableData"
      :max-height="mHeight"
      :stripe="stripe"
      :default-sort="defaultSort"
      :header-cell-class-name="headerCellClassName"
      :row-class-name="rowClassName"
      :cell-class-name="cellClassName"
      :cell-style="cellStyle"
      :span-method="spanMethod"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      @sort-change="handleSortChange"
      @row-click="handleRowClick"
      @cell-click="handleClickCell"
      @selection-change="handleSelectionChange"
    >
      <template v-for="column in columns.filter(item => !item.hidden)">
        <!----------------------- 多级表头 start  ----------------------->
        <template v-if="column.children && Array.isArray(column.children)">
          <el-table-column
            :key="column.key || column.prop"
            :label="column.label"
            :align="column.align || 'center'"
            :class-name="column.className || null"
          >
            <!-- 多级表头的一级表头 slot start -->
            <template
              slot="header"
              slot-scope="{ row }"
            >
              <div
                v-if="column.renderHeader"
                style="padding: 0;line-height: 23px"
                v-html="column.renderHeader(row)"
              />
              <template v-else>{{ column.label || column.prop }}</template>
            </template>
            <!-- 多级表头的一级表头 slot end -->

            <!-- 二级表头 children start  -->
            <template v-for="child in column.children">
              <!-- 特殊列 例如多选 -->
              <el-table-column
                v-if="child.type"
                :key="child.key || child.prop"
                :type="child.type"
                :label="child.label"
                :width="child.width"
                :min-width="child.minWidth || 100"
                :align="child.align || 'center'"
                :fixed="child.fixed"
                :class-name="child.className || null"
              />
              <!-- 默认列 -->
              <el-table-column
                v-else
                :key="child.key || child.prop"
                :prop="child.prop"
                :label="child.label"
                :width="child.width"
                :min-width="child.minWidth || 100"
                :align="child.align || 'center'"
                :sortable="child.sortable"
                :fixed="child.fixed"
                :class-name="child.className || null"
              >
                <!-- 表头 slot -->
                <!-- tips：element-ui 2.4.9 以上 版本才支持 slot="header" -->
                <template
                  slot="header"
                  slot-scope="{ row }"
                >
                  <slot
                    :name="`${child.prop || child.key}-header`"
                    :row="row"
                  >
                    <div
                      v-if="child.renderHeader"
                      style="padding: 0;line-height: 23px"
                      v-html="child.renderHeader()"
                    />
                    <template v-else>{{ child.label || child.prop }}</template>
                  </slot>
                </template>

                <!-- 默认列 slot -->
                <template slot-scope="{ row, $index }">
                  <slot
                    :name="child.prop || child.key"
                    :row="row"
                    :$index="$index"
                  >
                    <div
                      v-if="child.formatter"
                      style="padding: 0;line-height: 23px"
                      v-html="child.formatter(row[child.prop], row, index)"
                    />
                    <template v-else>{{ row[child.prop] }}</template>
                  </slot>
                </template>
              </el-table-column>
            </template>
            <!-- 二级表头 children end  -->
          </el-table-column>
        </template>
        <!----------------------- 二级表头 end ----------------------->

        <!----------------------- 一级 默认 slot ----------------------->
        <template v-else>
          <!-- 特殊列 例如多选 -->
          <el-table-column
            v-if="column.type"
            :key="column.key || column.prop"
            :type="column.type"
            :label="column.label"
            :width="column.width"
            :min-width="column.minWidth || 100"
            :align="column.align || 'center'"
            :fixed="column.fixed"
            :class-name="column.className || null"
          />
          <!-- 默认列 -->
          <el-table-column
            v-else
            :key="column.key || column.prop"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
            :min-width="column.minWidth || 100"
            :align="column.align || 'center'"
            :sortable="column.sortable"
            :fixed="column.fixed"
            :class-name="column.className || null"
          >
            <!--
              注意: 在组件中使用 <template slot="xxxx-header" slot-scope="scope" ></template>的时候
              slot-scope="scope" 不能删除，必须指明为作用域插槽, 否则会导致错误
              例如：当表格在进行前端排序（sortable: true）时，会出现slot重复渲染错误
            -->
            <!-- 表头 slot -->
            <template
              slot="header"
              slot-scope="{ row }"
            >
              <slot
                :name="`${column.prop || column.key}-header`"
                :row="row"
              >
                <div
                  v-if="column.renderHeader"
                  style="padding: 0;line-height: 23px"
                  v-html="column.renderHeader()"
                />
                <template v-else>{{ column.label || column.prop }}</template>
              </slot>
            </template>

            <!-- default slot -->
            <!-- 当增加一个 空白列时，，例如 [操作]: { label: '操作', key: 'handles' } 时
              如果不调用 slot-scope 会报如下错误
              Duplicate presence of slot "handles" found in the same render tree -
              this will likely cause render errors.
            -->
            <template slot-scope="{ row, $index }">
              <slot
                :name="column.prop || column.key"
                :row="row"
                :$index="$index"
              >
                <div
                  v-if="column.formatter"
                  style="padding: 0;line-height: 23px"
                  v-html="column.formatter(row[column.prop], row, index)"
                />
                <template v-else>{{ row[column.prop] }}</template>
              </slot>
            </template>
          </el-table-column>
        </template>
        <!----------------------- 一级 默认 end ----------------------->
      </template>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-if="hasShowPaging"
      class="xm-table-pagination"
      background
      :total="+total"
      :layout="pagerLayout"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :current-page="curPage"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      @prev-click="handlePageChange"
      @next-change="handlePageChange"
    />
  </div>
</template>
```
**js部分**：
```js
<script>
import { cloneDeep } from 'lodash'

/**
 * ref: http://codeio.dftoutiao.com/AIDOG/aidog
 * columns 参数说明
 * columns: [
    {
      key: [String, Number], // 唯一Key，可选，如果不传默认使用 prop 作为 key
      prop: String, // 字段名
      type: ['index', 'selection', ''], // col 类型，参照 element-ui 文档
      label: String, // 列的名称
      width: String, // 每列的宽度
      min-width: String, // 每列的最小宽度
      children: Array, // 二级表头
      align: ['left','center','right'], // 列文字对齐方式
      sortable: [true, false, 'custom'], // 排序，参照 element-ui 文档
      className: String, // 表头样式
      fixed: [true, 'left', 'right'] // 列是否固定在左侧或者右侧，true 表示固定在左侧
      hidden: Boolean, // 是否隐藏该列
      formatter: Function // 传入一个函数对数据进行格式化，常用于简单重复使用
      renderHeader: Function // 传入一个函数返回表头
    }
 * ]
 */
export default {
  name: 'XmTable',
  props: {
    columns: {
      type: Array,
      default() {
        return []
      }
    },

    dataSource: {
      type: Array,
      default() {
        return []
      }
    },

    loading: {
      type: Boolean,
      default: false
    },

    // 最外层的边框
    bordered: {
      type: Boolean,
      default: false
    },

    // 表格纵向边框
    border: {
      type: Boolean,
      default: false
    },

    // 斑马条纹
    stripe: {
      type: Boolean,
      default: true
    },

    /**
     * 是否显示分页
     * 为 always 时，将一直显示
     * 为 false 时，总是不显示
     * 为 true 时，只有页码大于1时才显示
     */
    pagination: {
      type: [Boolean, String],
      default: true,
      validator(value) {
        return ['always', true, false].indexOf(value) !== -1
      }
    },

    // 分页布局
    pagerLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },

    /**
     *  总条数
     *  TODO: 星火项目中出现有接口返回字符串，导致出现警告
     *  默认情况下 total 只能是数字类型
     */
    total: {
      type: [Number, String],
      default: 0
    },

    // 每页显示数量
    pageSize: {
      type: Number,
      default: 30
    },

    // 页码
    pageNum: {
      type: Number,
      default: 1
    },

    // 分页选择器的选项设置
    pageSizes: {
      type: Array,
      default() {
        return [20, 30, 50, 80, 100]
      }
    },

    // 初始排序
    defaultSort: {
      type: Object,
      default() {
        return {}
      }
    },

    // 是否开启选中高亮
    highlightRow: {
      type: Boolean,
      default: true
    },

    // 高亮选中样式
    highlightRowClassName: {
      type: String,
      default: 'xm-row-select'
    },

    // 表头类
    headerCellClassName: {
      type: String,
      default: 'xm-header-bg'
    },

    // 最大高度，不包含分页高度
    maxHeight: {
      type: Number,
      default: 0
    },

    // 分页后是否自动滚动到顶部
    autoScrollTop: {
      type: Boolean,
      default: true
    },

    // 单元格的 style 的回调方法
    cellStyle: {
      type: [Function, String],
      default() {
        return ''
      }
    },

    // 单元格的 className 的回调方法
    cellClassName: {
      type: [Function, String],
      default() {
        return ''
      }
    },

    // 合并行或列的计算方法
    spanMethod: {
      type: Function,
      default() {
        return {
          rowspan: 1,
          colspan: 1
        }
      }
    },

    /**
     *  显示汇总行
     *  固定在第一行
     *  TODO: 如果 column 设置了会出现样式错乱，慎用
     */
    showSummary: {
      type: Boolean,
      default: false
    },

    /**
     *  修改汇总行单元格
     *  { date: row => '<p>{{ row.date }}</p>' }
     */
    renderSummary: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    const { prop = '', order = '' } = this.defaultSort
    return {
      index: 0,
      curPage: 1,
      sortBy: prop,
      sortOrder: order,
      tableData: [], // 表格数据
      summaryData: {}, // 汇总数据
      tableSelectIndex: []
    }
  },
  computed: {
    // 兼容低版本
    hasShowPaging() {
      if (this.pagination === 'always') return true
      return this.pagination && this.total > this.pageSize
    },
    mHeight() {
      const { hasShowPaging, maxHeight } = this
      const height = hasShowPaging ? maxHeight : maxHeight + 46 // 46 为 pagination 的高度
      return this.maxHeight !== 0 ? height : 'auto'
    }
  },
  watch: {
    dataSource: {
      deep: true,
      immediate: true,
      handler(val) {
        this.generateData(val)
        // 清除选中行
        this.tableSelectIndex = []
        // 滚动到顶部
        this.autoScrollTop && this.moveToTop()
      }
    },
    pageNum(val) {
      this.curPage = val
    },
    columns() {
      this.index++ // TODO: 解决columns的顺序改变，视图不更新问题
    }
  },
  methods: {
    /**
     *  处理表格数据
     */
    generateData(val) {
      if (this.showSummary) {
        const dataSource = cloneDeep(val)
        this.summaryData = dataSource.shift() || {}
        this.tableData = dataSource
        this.$nextTick(() => {
          this.renderSummaries()
          // 父级页面或 tab 由隐藏切换为显示时, 汇总列 border-bottom 第一次不显示
          this.$refs.XmTable.doLayout()
        })
      } else {
        this.tableData = val
      }
    },

    /**
     *  返回表格汇总行数据
     */
    getSummaries({ columns }) {
      const sums = []
      const { summaryData } = this
      columns.forEach((item, index) => {
        sums[index] = summaryData[item.property] || '-'
      })
      return sums
    },

    /**
     *  汇总行 cell 修改 innerHTML
     */
    renderSummaries() {
      const summary = this.renderSummary
      const table = document.querySelector('#XmTable .el-table__footer-wrapper>table')
      for (const prop in summary) {
        if (summary.hasOwnProperty(prop)) {
          const formatter = summary[prop]
          if (typeof formatter === 'function') {
            const index = this.getIndexByProp(prop)
            table.rows[0].cells[index].innerHTML = formatter(this.summaryData)
          }
        }
      }
    },

    /**
     *  根据列字段
     *  获取该列在 columns 的 index
     */
    getIndexByProp(prop) {
      return this.columns.findIndex(item => item.prop === prop)
    },

    /**
     * 表格单元格击回调
     */
    handleClickCell(row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event)
    },

    /**
     * 表格行点击添加背景色
     */
    handleRowClick(row, column, cell, event) {
      this.$emit('row-click', row, column, cell, event)

      if (!this.highlightRow) return

      if (this.tableSelectIndex.includes(row.index)) {
        this.tableSelectIndex = this.tableSelectIndex.filter(item => item !== row.index)
      } else {
        this.tableSelectIndex.push(row.index)
      }
    },

    /**
     * 表格每行的ClassName
     */
    rowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex
      if (this.tableSelectIndex.includes(rowIndex)) {
        return this.highlightRowClassName
      }
    },

    /**
     * 改变页数
     */
    handlePageChange(page) {
      const { pageSize, sortBy, sortOrder } = this
      this.$emit('change', {
        pageNum: page,
        pageSize,
        sorter: { prop: sortBy, order: sortOrder }
      })
    },

    /**
     * 改变每页显示的条数
     */
    handleSizeChange(size) {
      const { sortBy, sortOrder } = this
      this.$emit('change', {
        pageNum: 1,
        pageSize: size,
        sorter: { prop: sortBy, order: sortOrder }
      })
    },

    /**
     * 排序
     * 如果设置了默认排序，该方法第一次会默认触发
     * Element Ui 新版本已修复
     */
    handleSortChange({ prop, order }) {
      this.sortBy = prop
      this.sortOrder = order
      this.$emit('change', {
        pageNum: 1,
        pageSize: this.pageSize,
        sorter: { prop, order }
      })
    },

    /**
     * 多选
     */
    handleSelectionChange(val) {
      this.$emit('selection-change', val)
    },

    /**
     * 返回页面顶部
     */
    moveToTop() {
      if (this.maxHeight) {
        if (this.$refs?.XmTable?.bodyWrapper) {
          this.$refs.XmTable.bodyWrapper.scrollTop = 0
        }
      } else {
        this.move(0)
      }
    },

    /**
     * 滚动到某个位置
     * 具体项目具体对待
     * 部分项目滚动区域可能不是 document.body
     */
    move(amount) {
      document.documentElement.scrollTop = amount
      document.body.parentNode.scrollTop = amount
      document.body.scrollTop = amount
    }
  }
}
</script>
```
**css部分**：
```css
<style lang="scss" scoped>
/* 部分表格样式在 styles 中 */
/deep/ {
  // 汇总行放在第一行
  .el-table {
    display: flex;
    flex-direction: column;
  }

  // 汇总行放在第一行
  .el-table__body-wrapper {
    order: 1;
  }

  // 解决列固定时，某些情况下，固定列和默认列对不齐的问题
  // 可能是 headerWrapper.offsetHeight 获取错误
  .el-table__header-wrapper {
    min-height: 49px;
  }

  // 单元格 采用 flex 布局，修改默认行高
  .el-table th,
  .el-table td {
    .cell {
      display: inline-flex !important;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      min-height: 32px;
      line-height: 18px;
    }
    &.is-right {
      .cell {
        justify-content: flex-end;
      }
    }
    &.is-center {
      .cell {
        justify-content: center;
      }
    }
  }

  // 覆盖表格样式
  .el-table th {
    padding: 8px 0;
    user-select: text;
    -webkit-user-select: text;

    &.is-sortable {
      padding: 7px 0;
    }

    .cell {
      color: #333;
    }

    // 解决自定义表头多了几像素问题
    // ele-ui v2.13 版本修复了表头样式
    div {
      display: flex;
    }
  }

  // 表格行选中样式
  .el-table__body tr.xm-row-select > td {
    border-color: #d0dcec;
    background-color: #d0dcec;
  }

  // 滚动条占行符背景
  .el-table__fixed-right-patch {
    background-color: #f5f7fa;
  }

  // 汇总行背景
  .el-table__footer-wrapper tbody td {
    border: 1px solid #ebeef5;
    background-color: #f5f7fa;
  }

  // 表头样式
  .el-table {
    th {
      &.gutter,
      &.xm-header-bg {
        background-color: #f5f7fa;
      }
    }

    .el-button--mini,
    .el-button--mini.is-round {
      padding: 6px 10px;
    }
  }
}

// 分页样式
.xm-table-pagination {
  padding: 18px 12px 0;
  text-align: right;
  background-color: #fff;
}

// 父元素的边框
.xm-table-border {
  border: 1px solid #dfe6ec;
  border-bottom: none;
}
</style>
```
