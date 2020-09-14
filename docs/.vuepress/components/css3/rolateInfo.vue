<template>
  <div class="wrapper">
    <div class="own">
      <div class="banner">
        <a href="javascript:;">博</a>
        <span>这是我的个人博客</span>
      </div>
    </div>
    <div class="own">
      <div class="banner1 mt20">
        <a href="javascript:;">博</a>
        <span>这是我的个人博客</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.wrapper {
  text-align: center;
  padding: 100px 0;
  position: relative;
}
.mt20 {
  margin-top: 20px;
}
.own{
  position: relative;
  height: 150px;
}
/* 第一种 */
.banner {
  width: 234px;
  height: 34px;
  border-radius: 34px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.banner a {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  border: 2px solid lightblue;
  position: absolute;
  left: 0px;
  top: 0px;
  background: lightgreen;
  color: #fff;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  z-index: 2;
}
.banner a:hover + span {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
  opacity: 1;
}
.banner span {
  display: inline-block;
  width: auto;
  padding: 0 20px;
  height: 34px;
  line-height: 34px;
  background: lightblue;
  border-radius: 34px;
  text-align: center;
  position: absolute;
  left: 0;
  color: #fff;
  text-indent: 25px;
  opacity: 0;
  transform-origin: 8% center;
  -webkit-transform-origin: 8% center;
  transition: all 1s;
  -webkit-transition: all 1s;
}
/* 第二种 */
.banner1 {
  width: 234px;
  height: 34px;
  border-radius: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.banner1 a {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  border: 2px solid lightblue;
  position: absolute;
  left: 0px;
  top: 0px;
  background: lightgreen;
  color: #fff;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  z-index: 2;
}
.banner1 a:hover + span {
  transform: translateX(40px);
  -webkit-transform: translateX(40px);
  opacity: 1;
}
.banner1 span {
  display: inline-block;
  width: auto;
  padding: 0 20px;
  height: 30px;
  line-height: 30px;
  background: lightblue;
  border-radius: 30px;
  text-align: center;
  color: #fff;
  position: absolute;
  top: 2px;
  left: 0;
  opacity: 0;
  transition: all 1s;
  -webkit-transition: all 1s;
  transform: translateX(80px);
  -webkit-transform: translateX(80px);
}
</style>
