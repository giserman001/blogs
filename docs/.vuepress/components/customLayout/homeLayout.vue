<template>
  <div class="homeBlog">
    <div class="box">
      <div class="head">
        <img :src="$withBase('/logo.jpg')" alt="logo">
      </div>
      <p>为梦想而年轻，为年轻而坚定</p>
      <!-- <a class="enter" href="/blogs/article.html">去看看</a> -->
      <router-link class="enter" to="/article">去看看</router-link>
    </div>
    <div class="footer">
      <div class="copyRight">部分内容来源于网络,如有侵权,请留言或联系1522962872@qq.com;Copyright © 2019-present giserman001</div>
      <div class="websiteStatistics">
        <busuanzi />
      </div>
    </div>
  </div>
</template>

<script>
import busuanzi from '../busuanzi.vue'
export default {
  components: {
    busuanzi
  }
}
</script>

<style scoped>
@-webkit-keyframes radar-data {
  to {
    -webkit-transform: scale(2.5);
    transform: scale(2.5);
    box-shadow: inset 0 0 0 1px hsla(0,0%,100%,0)
  }
}
@keyframes radar-data {
  to {
    -webkit-transform: scale(2.5);
    transform: scale(2.5);
    box-shadow: inset 0 0 0 1px hsla(0,0%,100%,0)
  }
}
.homeBlog{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #159957;
  background-image: linear-gradient(120deg,#155799,#159957);
  margin: 0!important;
  box-sizing: border-box;
}
.homeBlog .box{
  position: absolute;
  width: 400px;
  max-width: 100%;
  text-align: center;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%,-65%);
  transform: translate(-50%,-65%);
}
.box>p{
  width: 100%;
  color: rgba(239,239,239,1);
  padding: 20px 0 10px;
}
.enter{
  width: 200px;
  padding: 12px;
  line-height: 24px;
  display: inline-block;
  text-align: center;
  text-decoration: none!important;
  color: hsla(0,0%,100%,.7);
  background-color: hsla(0,0%,100%,.08);
  border-radius: .3rem;
  border: 1px solid hsla(0,0%,100%,.2);
  -webkit-transition: color .2s,background-color .2s,border-color .2s;
  transition: color .2s,background-color .2s,border-color .2s;
}
.head{
  background-blend-mode: screen;
  width: 110px;
  height: 110px;
  display: inline-block;
  position: relative;
}
.head>img {
  width: 100%;
  border-radius: 50%;
  position: relative;
  z-index: 2;
  height: 100%;
}
.head:after, .head:before {
  z-index: -1;
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 0 1px hsla(0,0%,100%,.1);
  border-radius: 50%;
  -webkit-animation: radar-data 4s linear infinite;
  animation: radar-data 4s linear infinite;
}
.head:before {
  -webkit-animation-delay: -2s;
  animation-delay: -2s;
}
.footer{
  position: absolute;
  width: 80%;
  bottom: 0;
  left: 50%;
  -webkit-transform: translate(-50%,0);
  transform: translate(-50%,0);
  z-index: 3;
  font-size: 12px;
  text-align: center;
}
.websiteStatistics{
  margin: 6px 0;
}
</style>