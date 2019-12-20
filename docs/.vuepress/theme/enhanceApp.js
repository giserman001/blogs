import Iconfont from '@theme/components/Iconfont.vue'

export default ({ Vue }) => {
  Vue.component('Iconfont', {
    functional: true,
    /* eslint-disable-next-line vue/require-render-return */
    render (h, { parent }) {
      // parent（#app） - 根实例组件 （判断根实例组件是否挂载，如果挂载了，全局定义Iconfont组件）
      if (parent._isMounted) {
        return h(Iconfont)
      } else {
        // 1. $once - 监听一个自定义事件，但是只触发一次
        // 2. 这里是监听一个生命周期函数-mounted
        // $forceUpdate - 迫使 Vue 实例重新渲染。
        //     ----注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。
        parent.$once('hook:mounted', () => {
          parent.$forceUpdate()
        })
      }
    },
  })
}
