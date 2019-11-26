> 场景：利用element-ui开发后台管理系统时,列表页面头部一般都有一个搜索的form,基本上每个列表页面都有，为了降低代码的重复率，那我们可以封装一个search-form组件

### search-form组件

在components 中新建一个Form文件夹，在新建一个searchForm 组件用来放代码
```
<template>
  <el-form
    :inline="true"
    :model="value"
    label-position="right"
    :label-width="formConfig.labelWidth"
    size="small"
  >
    <slot name="formItem" />
    <el-form-item
      v-for="(item, ind) in formConfig.formItemList"
      :key="ind + ' '"
      :label="`${item.label} ${isColonFn(item)}`"
      :prop="item.prop"
    >
      <el-input
        v-if="item.type=='input'"
        v-model="value[item.prop]"
        :disabled="item.disabled"
        :placeholder="item.placeholder"
      ></el-input>
      <el-select
        v-else-if="item.type=='select'"
        v-model="value[item.prop]"
        :disabled="item.disabled"
        :placeholder="item.placeholder"
      >
        <el-option
          v-for="(optItem, index) in item.optList"
          :key="index"
          :label="optItem.label"
          :value="optItem.value"
        ></el-option>
      </el-select>
      <el-radio-group
        v-model="value[item.prop]"
        v-else-if="item.type=='radio'"
        :disabled="item.disabled"
      >
        <el-radio
          v-for="(radio, lis) in item.radiotList"
          :label="radio.value"
          :key="lis"
        >{{radio.name}}</el-radio>
      </el-radio-group>
      <el-cascader
        v-model="value[item.prop]"
        v-else-if="item.type=='cascader'"
        :options="item.options"
        @change="item.handleChange"
      ></el-cascader>
      <el-time-picker
        v-else-if="item.type=='timePicker'"
        :arrow-control="item.arrowControl"
        v-model="value[item.prop]"
        :picker-options="item.pickerOptions"
        :placeholder="item.placeholder"
      ></el-time-picker>
      <el-date-picker
        :value-format="item.dateFormate"
        v-else
        :clearable="false"
        v-model="value[item.prop]"
        :type="item.type"
        :disabled="item.disabled"
        :placeholder="item.label"
      ></el-date-picker>
    </el-form-item>
    <el-form-item v-for="(item, index) in formConfig.operate" :key="index">
      <el-button
        size="small"
        :type="item.type"
        :icon="item.icon"
        @click="item.handleClick"
      >{{item.name}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    formConfig: {
      type: Object,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 设置默认值
    setDefaultValue() {
      const formData = { ...this.value };
      this.formConfig.formItemList.forEach(({ key, value }) => {
        if (formData[key] === undefined || formData[key] === null) {
          formData[key] = value;
        }
      });
      this.$emit("input", formData);
    },
    isColonFn(item) {
      let colon = ""
      if (item.label) {
        if (item.isColon) {
          colon = ""
        } else {
          colon = ":"
        }
      } else {
        colon = ""
      }
      return colon
    }
  },
  mounted() {
    this.setDefaultValue();
  }
};
</script>
<style>
</style>
```
组件中调用
```
<searchForm :formConfig="formConfig" :value="form"></searchForm>
```
data里定义
```
form: {
  time: "2019-10-31" // 默认值设置
},
formConfig: {
  formItemList: [
    {
      type: "date",
      prop: "time",
      dateFormate: "yyyy-MM-dd",
      label: "统计时间",
      placeholder: "选择时间"
    }
  ],
  operate: [
    {
      icon: "el-icon-search",
      type: "primary",
      name: "查询",
      handleClick: this.search // 回调函数 在调用组件里定义
    }
  ]
}
```
> 主要是利用数据去渲染需要的表单