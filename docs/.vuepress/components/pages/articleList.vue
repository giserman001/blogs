<template>
  <div class="article-containter">
    <div class="rightTags">
      <div class="info">
        <h6>标签云</h6>
        <el-tag
          v-for="item in tags"
          :key="item"
          @click="handleChangeTag(item)">
          {{ item }}
        </el-tag>
      </div>
    </div>
    <div class="leftArticle">
      <template v-for="(item, index) in arts">
        <el-card shadow="hover" class="cardArticle" :key="index">
          <a :href="`/blogs${item.regularPath}`" class="tits">{{item.title}}</a>
          <el-divider></el-divider>
          <div class="art" v-if="item.frontmatter.des">
            {{item.frontmatter.des}}
            <a :href="`/blogs${item.regularPath}`"><el-button size="mini" type="success">阅读全文</el-button></a> 
          </div>
          <div class="types">
            <span><i class="el-icon-date"></i> {{item.frontmatter.date}}</span>
            <span><i class="el-icon-collection-tag"></i> {{item.frontmatter.tags}}</span>
          </div>
        </el-card>
      </template>
    </div>
  </div>
</template>

<script>
import { randomColor } from '../../utils'
export default {
  data() {
    return {
      arts: []
    }
  },
  mounted() {
    this.getArts('') // 全部
  },
  computed: {
    tags() {
      let tag = this.$site.pages.map(item => {
        return item.frontmatter && item.frontmatter.tags || ""
      })
      let tagsArr = [...new Set(tag.join(",").split(",").filter(i => i !== ""))]
      tagsArr.unshift('全部')
      return tagsArr
    }
  },
  methods: {
    colorChange() {
      return randomColor()
    },
    handleChangeTag(tag) {
      if (tag === '全部') {
        this.getArts('')
      } else {
        this.getArts(tag)
      }
    },
    getArts(tag) {
      let arr = []
      // 过滤isNoPage
      arr = this.$site.pages.filter(item => {
        return !item.frontmatter || !item.frontmatter.isNoPage
      })
      // 过滤tag
      arr = arr.filter(item => {
        return item.frontmatter.tags && item.frontmatter.tags.indexOf(tag) >= 0
      })
      // 按照时间排序
      arr.sort((a, b) => {
        return new Date(a.frontmatter.date).getTime() > new Date(b.frontmatter.date).getTime() ? -1 : 1
      })
      this.arts = arr
    }
  }
}
</script>

<style>
.article-containter{
  position: relative;
}
.leftArticle{
  margin-right: 325px;
  margin-top: 3.6rem;
  box-shadow: 0 0 6px #efefef;
  overflow: hidden;
}
.rightTags{
  position: -webkit-sticky;
  position: sticky;
  top: 4.5rem;
  width: 310px;
  float: right;
}
.rightTags h6{
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.25;
} 
.rightTags .info{
  box-shadow: 0 0 6px #efefef;
  border-radius: 3px;
  overflow: hidden;
  margin: 0 10px 10px;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
}
.leftArticle .el-card{
  margin-bottom: 10px;
  cursor: pointer;
}
.leftArticle .el-card:last-child{
  margin-bottom: 0;
}
.cardArticle.el-card.is-always-shadow, .cardArticle.el-card.is-hover-shadow:focus, .cardArticle.el-card.is-hover-shadow:hover {
  background-color: #deeafb;
}
.leftArticle .el-divider--horizontal{
  margin: 15px 0;
  width: auto;
}
.leftArticle .tits{
  display: inline-block;
  font-weight: 500;
  color: #1e90ff;
  text-decoration: none;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tits:hover{text-decoration:underline;}
.leftArticle .types{
  margin-top: 10px;
  font-size: 14px;
}
.rightTags .el-tag{
  margin: 4px;
  cursor: pointer;
}
@media screen and (max-width: 720px) {
  .rightTags{
    display: none;
  }
  .leftArticle{
    margin-right: 0;
  }
}
</style>