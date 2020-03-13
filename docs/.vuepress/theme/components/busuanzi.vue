<template>
  <div class="busuanzi">
    <span id="busuanzi_container_site_pv" style="display:none">
      本站总访问量
      <span id="busuanzi_value_site_pv"></span>次
      <span class="post-meta-divider">|</span>
    </span>
    <span id="busuanzi_container_site_uv" style="display:none">
      本站访客数
      <span id="busuanzi_value_site_uv"></span>人
    </span>
  </div>
</template>
 
<script>
 
const busuanzi = require("busuanzi.pure.js");
 
export default {
  // 监听,当路由发生变化的时候执行
  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        script.fetch();
      }
    }
  }
};
</script>