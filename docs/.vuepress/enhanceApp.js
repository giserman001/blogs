import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import copy from "./common/copy";
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts');
// 引入折线图
require('echarts/lib/chart/line');
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/grid')


export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  Vue.use(Element)
  //vue全局注入echarts
  Vue.prototype.$echarts = echarts
  setTimeout(() => {
    try {
      document &&
        (() => {
          //对document的判断是防止编译的时候报错
          copy();
        })();
    } catch (e) {
      console.error(e.message);
    }
  }, 500);
};
