<template>
  <div class="wrapper">
    <input class="search" type="text" placeholder="搜索..." />
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.wrapper {
  text-align: center;
  padding: 100px 0;
}
.search {
  width: 80px;
  height: 40px;
  border-radius: 40px;
  border: 2px solid lightblue;
  outline: none;
  text-indent: 12px;
  color: #666;
  font-size: 16px;
  padding: 0;
  -webkit-transition: width 0.5s;
  transition: width 0.5s;
}
.search:focus {
  width: 200px;
}
</style>
