<template>
  <div class="waterfallBox">
    <vue-waterfall-easy :imgsArr="imgsArr">
      <div class="img-info" slot-scope="props">
        <p class="some-info">第{{ props.index + 1 }}张图片</p>
        <p class="some-info">{{ props.value.info }}</p>
      </div>
    </vue-waterfall-easy>
  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
export default {
  name: 'PictureLife',
  components: {
    vueWaterfallEasy,
  },
  data() {
    return {
      imgsArr: [
        {
          src: require('../../public/logo.jpg'),
          info: '一些图片描述文字1',
        },
        {
          src: require('../../public/logo.jpg'),
          info: '一些图片描述文字2',
        },
        {
          src: require('../../public/logo.jpg'),
          info: '一些图片描述文字3',
        },
        {
          src: require('../../public/logo.jpg'),
          info: '一些图片描述文字4',
        },
        {
          src: require('../../public/logo.jpg'),
          info: '一些图片描述文字1',
        },
        {
          src: require('../../public/logo.jpg'),
          info: '一些图片描述文字2',
        },
        {
          src: require('../../public/logo.jpg'),
          info: '一些图片描述文字3',
        },
        {
          src: require('../../public/logo.jpg'),
          info: '一些图片描述文字4',
        },
        {
          src: require('../../public/logo.jpg'),
          info: '一些图片描述文字1',
        },
        {
          src: require('../../public/logo.jpg'),
          info: '一些图片描述文字2',
        },
        {
          src: require('../../public/logo.jpg'),
          info: '一些图片描述文字3',
        },
        {
          src: require('../../public/logo.jpg'),
          info: '一些图片描述文字4',
        },
        {
          src: require('../../public/logo.jpg'),
          info: '一些图片描述文字1',
        },
        {
          src: require('../../public/logo.jpg'),
          info: '一些图片描述文字2',
        },
        {
          src: require('../../public/logo.jpg'),
          info: '一些图片描述文字3',
        },
        {
          src: require('../../public/logo.jpg'),
          info: '一些图片描述文字4',
        },
      ],
    }
  },
}
</script>

<style scoped lang="stylus">
.waterfallBox{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50px;
  left: 0;
}
.waterfallBox >>> .vue-waterfall-easy-container .vue-waterfall-easy-scroll{
  overflow-x: visible;
  overflow-y: visible;
}
</style>
