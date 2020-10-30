---
title: 边框与背景
showListTit: 你需要知道css使用技巧 
date: 2020-10-30
isNoPage: false
des: 
tags: css
---
## 半透明边框

:::tip 背景知识
**background-clip**
默认情况下，背景的颜色会延伸至边框下层，这意味着我们设置的透明边框效果会被覆盖掉，在css3中，我们可以通过设置background-clip:padding-box来改变背景的默认行为，达到我们想要的效果。
:::
```vue
<template>
  <main>
    <input id="pb" type="checkbox" checked/>
    <label for="pb">padding-box(默认)</label>
    <div class="txt">A paragraph of filler text. La la la de dah de dah de dah de la.</div>
  </main>
</template>

<script>
export default {}
</script>
<style scoped>
main{
  text-align: left;
  padding: 60px 80px 80px;
  background: #b4a078;
}
div.txt{
  padding: 12px;
  margin: 20px auto;
  background: white;
  border: 10px solid hsla(0, 0%, 100%, .5);
}
label{
  color: #f4f0ea;
}
input[id="pb"]:checked ~ div{
  background-clip: padding-box;
}
</style>
```
<css3-cssTranslucentBorder />

## 多重边框
