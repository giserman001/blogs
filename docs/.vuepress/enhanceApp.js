import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import copy from "./common/copy";
// 暂时没有用到这个组件,以后可能会用到，暂时不删除（图片预览组件）
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  Vue.use(Element)
  Vue.use(preview)
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
  // Vue.mixin({
  //   mounted() {
  //     import('vue-waterfall-easy').then(function (m) {
  //       Vue.use(m.default)
  //     })
  //   },
  // })
};
