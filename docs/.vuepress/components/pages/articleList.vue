<template>
  <div class="article-containter">
    <div class="leftArticle">
      <template v-for="item in 10">
        <el-card shadow="hover">
          鼠标悬浮时显示
        </el-card>
      </template>
    </div>
    <div class="rightTags">
      <h6>标签云</h6>
      <el-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        effect="dark">
        {{ item.label }}
      </el-tag>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { type: '', label: '标签一' },
        { type: 'success', label: '标签二' },
        { type: 'info', label: '标签三' },
        { type: 'danger', label: '标签四' },
        { type: 'warning', label: '标签五' }
      ]
    }
  }
}
</script>

<style>
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
  margin-top: 3.6rem;
}
.rightTags h6{
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.25;
} 

</style>