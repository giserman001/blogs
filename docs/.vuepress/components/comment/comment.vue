<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>
<script>
export default {
  name: "comment",
  data() {
    return {};
  },
  mounted() {
    let body = document.querySelector(".gitalk-container");
    let script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js";
    body.appendChild(script);
    script.onload = () => {
      const commentConfig = {
        clientID: "7a511ce4457c367b5ff8",
        clientSecret: "fa2aa39c932e1e507831fb48c0a9f47e84e12ebd",
        repo: "blogs",
        owner: "giserman001",
        // 这里接受一个数组，可以添加多个管理员
        admin: ["giserman001"],
        // id 用于当前页面的唯一标识，一般来讲 pathname 足够了，
        // 但是如果你的 pathname 超过 50 个字符，GitHub 将不会成功创建 issue，此情况可以考虑给每个页面生成 hash 值的方法.
        // id: location.pathname,
        id: document.title.replace(/\s\|\s细节决定成败|《|》/g, ""),
        distractionFreeMode: false
      };
      const gitalk = new Gitalk(commentConfig);
      gitalk.render("gitalk-container");
    };
  }
};
</script>
<style>
@import url("https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css");
</style>