<template>
  <div class="busuanzi">
    <span id="busuanzi_container_site_pv">
      本站总访问量
      <span id="busuanzi_value_site_pv"></span>次
      <span class="post-meta-divider">|</span>
    </span>
    <span id="busuanzi_container_site_uv">
      本站访客数
      <span id="busuanzi_value_site_uv"></span>人
    </span>
  </div>
</template>
 
<script>
 
const busuanzi = require("busuanzi.pure.js")
 
export default {
  // // 监听,当路由发生变化的时候执行
  // watch: {
  //   $route(to, from) {
  //     if (to.path != from.path) {
  //       console.log('执行了吗？')
  //       busuanzi.fetch();
  //     }
  //   }
  // },
  mounted() {
    busuanzi.fetch()
  }
};
</script>