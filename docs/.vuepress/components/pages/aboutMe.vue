<template>
  <div class="aboutMe">
    <div class="logoBox">
      <el-avatar style="vertical-align:middle;" size="large" :src="require('../../public/logo.jpg')"></el-avatar>
      <span style="margin-left:10px;">为梦想而年轻，为年轻而坚定</span>
    </div>
    <el-divider content-position="left">博客简述</el-divider>
    <div class="blogSum">
      <div>本博客使用的技术为 vuepress + markdown + element-ui + qiniu(cdn)</div>
      <div>源码地址为 <a href="https://github.com/giserman001/blogs">github</a>，仅供参考，纯属爱好，不做商业用途！</div>
    </div>
    <el-divider content-position="left">关于我</el-divider>
    <ul class="detailMe">
      <li>姓名：刘亚 ( 网名: giserman001 )</li>
      <li>学历专业：本科 地理信息系统(gis)</li>
      <li>联系方式： 
        <span class="blue"><i class="el-icon-message"></i> <a style="color:blue;" href="mailto:18156831296@163.com">18156831296@163.com</a></span>
          & 
        <span class="blue">
          <svg viewBox="64 64 896 896" focusable="false" data-icon="qq" width="1em" height="100%" fill="currentColor" aria-hidden="true"><path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z"></path></svg>
          1522962872</span>
      </li>
      <li>坐标：上海</li>
      <li>其他博客地址：暂无</li>
      <li>
        技能
        <ul>
          <li>HTML、CSS、Javascript：能熟练开发符合 W3C 标准的页面！
            <el-rate
              style="display:inline-block;"
              v-model="value1"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </li>
          <li>熟悉微信小程序原生开发以及taro开发
            <el-rate
              style="display:inline-block;"
              v-model="value1"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </li>
          <li>react vue 框架：熟练掌握使用！
            <el-rate
              style="display:inline-block;"
              v-model="value2"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </li>
          <li>熟悉百度echarts、百度地图api、微信js-sdk等常用库使用
            <el-rate
              style="display:inline-block;"
              v-model="value2"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </li>
          <li>es6：日常开发必备，以及掌握基本面向对象编程实现！！
            <el-rate
              style="display:inline-block;"
              v-model="value3"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </li>
          <li>webpack: 可以对脚手架进行针对性的打包配置！
            <el-rate
              style="display:inline-block;"
              v-model="value4"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </li>
          <li>node mysql：针对需求可以做到简单的数据库设计、接口的开发与设计！
            <el-rate
              style="display:inline-block;"
              v-model="value5"
              disabled
              show-score
              text-color="#fadb14"
              score-template="{value}">
            </el-rate>
          </li>
        </ul>
      </li>
      <li>
        其他
        <ul>
          <li>常用开发工具： vscode、git</li>
          <li>熟悉的 UI 工具： antd、element-ui、mint-ui、vant等</li>
          <li>es6：日常开发必备，以及掌握基本面向对象编程实现！</li>
          <li>良好的代码习惯： 略微代码洁癖、注释规范</li>
        </ul>
      </li>
      <li>
        个人
        <ul>
          <li>偶尔玩玩游戏、看看书</li>
          <li>欢迎交流！</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 3,
      value2: 3,
      value3: 2,
      value4: 2.5,
      value5: 1.5
    }
  }
}
</script>

<style scoped>
.aboutMe{
  font-size: 14px;
}
.logoBox{
  font-size: 18px;
  font-weight: 700;
  vertical-align: middle;
}
.el-divider__text{
  color: #67c23a;
  font-size: 16px;
  font-weight: 700;
}
.blogSum > div{
  margin: 30px 0;
}
.detailMe{
  list-style: circle;
}
.blue{
  color: blue;
}
.detailMe li{
  margin: 10px 0;
}
</style>