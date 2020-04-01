<template>
  <div class="blogroll">
    <div class="title"><i class="el-icon-user-solid"></i> 技术大佬</div>
    <div class="blogrollList">
      <template v-for="(item, index) in $themeConfig.friendLinks">
        <el-card class="blogrollItem" :style="{'background-color': randomColor()}" shadow="hover" :key="index" @click.native="skipTo(item)">
          <div class="blogrollBox">
            <el-avatar size="large" :src="item.logo ? item.logo : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
            <div class="friend-name">{{item.webSiteName}}</div>
            <div class="tags">{{item.webSiteDes}}</div>
          </div>
        </el-card>
      </template>
    </div>
    <div class="title"><i class="el-icon-info"></i> 申请友链须知</div>
    <div class="blogrollInfo">
      <ul>
        <li>原则上只和技术类博客交换，但不包括含有和色情、暴力、政治敏感的网站。</li>
        <li>不和剽窃、侵权、无诚信的网站交换，优先和具有原创作品的网站交换。</li>
        <li>申请请提供：站点名称、站点链接、站点描述、<span style="font-weight:700;">logo或头像</span>（<span class="red">不要设置防盗链</span>）。</li>
        <li>排名根据博客质量以及个人喜好加权排序，更新信息后请留言告知。</li>
        <li>会定期清理很久很久不更新的、不符合要求的友链，不再另行通知。</li>
        <li>本站不存储友链图片，如果友链图片换了无法更新。图片裂了的会替换成默认图，需要更换的请留言告知。</li>
        <li>本站不存储友链图片，如果友链图片换了无法更新。图片裂了的会替换成默认图，需要更换的请留言告知。</li>
        <li><span class="red">申请友链前请先添加本站信息，同时Github上互相follow和star一下，互相学习，共同进步。</span></li>
        <li>本站友链信息如下：</li>
      </ul>
      <div class="websiteMsg">
        <p>网站图标：<a href="https://giserman001.github.io/blogs/logo.jpg">https://giserman001.github.io/blogs/logo.jpg</a></p>
        <p>网站名称：清风拂林</p>
        <p>网站地址：<a href="https://giserman001.github.io/blogs/">https://giserman001.github.io/blogs/</a></p>
        <p>网站简介：前端开发，技术分享</p>
        <p>Github地址：<a href="https://github.com/giserman001/blogs">点击右上角GitHub去star一下</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 随机颜色
    randomColor() {
      return `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')}`
    },
    skipTo(item) {
      window && window.open(item.webSiteUrl)
    }
  }
}
</script>

<style>
.title{
  color: #1BC3FB;
  font-size: 20px;
}
.red{
  color: red;
}
.blogrollList{
  width: 100%;
  overflow: hidden;
  padding: 10px 0px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
.blogrollItem{
  margin-right: 20px;
  margin-bottom: 20px;
  width: calc(100%/3 - 15.33px);
}
.blogrollItem:nth-child(3n) {
  margin-right: 0
}
.blogrollBox{
  color: #fff;
  text-align: center;
}
.friend-name{
  font-weight: 900;
  margin: 8px 0;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.blogrollBox .tags{
  font-size: 14px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.blogrollItem.el-card {
  border-radius: 12px;
  cursor: pointer;
}

.blogrollItem.el-card.is-always-shadow, .blogrollItem.el-card.is-hover-shadow:focus, .blogrollItem.el-card.is-hover-shadow:hover {
  -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  box-shadow: 0 2px 18px 0 rgba(0,0,0,.6)
}
.blogrollInfo{
  font-size: 15px;
}
.blogrollInfo li{
  margin: 5px 0;
}
.websiteMsg{
  box-sizing: border-box;
  padding-left: 17px;
}
.websiteMsg p{
  margin: 5px 0;
}
@media screen and (max-width: 720px) {
  .blogrollBox .tags{
    font-size: 12px;
  }
  .blogrollItem .el-card__body{
    padding: 20px 5px;
  }
  .friend-name{
    font-size: 14px;
  }
}
</style>