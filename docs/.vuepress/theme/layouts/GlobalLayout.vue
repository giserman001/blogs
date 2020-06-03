<template>
  <div class="globalLayout">
    <component :is="layout" />
    <playTour />
  </div>
</template>

<script>
import Vue from 'vue'
import { setGlobalInfo } from '@app/util'
import playTour from '../components/playTour'
export default {
  name: 'GlobalLayout',
  components: {
    playTour
  },
  computed: {
    layout () {
      const layout = this.getLayout()
      setGlobalInfo('layout', layout)
      return Vue.component(layout)
    }
  },
  methods: {
    getLayout () {
      if (this.$page.path) {
        const layout = this.$page.frontmatter.layout
        if (layout && (this.$vuepress.getLayoutAsyncComponent(layout)
          || this.$vuepress.getVueComponent(layout))) {
          return layout
        }
        return 'Layout'
      }
      return 'NotFound'
    }
  }
}
</script>
<style lang="stylus">
.globalLayout
  width 100%
  height 100%
</style>