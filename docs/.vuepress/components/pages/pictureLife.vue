<template>
  <div class="waterfallBox">
    <div class="waterfall">
      <div class="waterfallItem" v-for="(item, index) in imgsArr" :key="index" @click="clickFn(item)">
        <img :src="item.src" alt="图文生活" class="waterfall-img">
        <div class="info-txt">{{item.info}}</div>
      </div>
    </div>
    <div class="show-div" v-if="sigleInfo.src" @click.stop="close">
      <img :src="sigleInfo.src">
      <div class="show-introduce">{{sigleInfo.info}}</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'PictureLife',
  data() {
    return {
      containerId: 'test',
      imgsArr: [
        {
          src: require('../../public/lifeImg/1.jpg'),
          info: '童年的时光真好，看着女儿健康快乐成长，心里真的很开心。。。',
        },
        {
          src: require('../../public/lifeImg/2.jpg'),
          info: '宝贝女儿和漂亮妈妈臭美瞬间, 哈哈哈哈',
        },
        {
          src: require('../../public/lifeImg/3.jpg'),
          info: '毕业多年，12206寝室三杰再聚首，祝各位兄弟前程似锦。',
        },
        {
          src: require('../../public/lifeImg/4.jpg'),
          info: '女儿俏皮瞬间',
        },
        {
          src: require('../../public/lifeImg/5.jpg'),
          info: '一家三口野生动物一日游，跑了一天累死了。。。。',
        },
        {
          src: require('../../public/lifeImg/6.jpg'),
          info: '都感冒了，你还是那么调皮的玩耍。。。。',
        },
        {
          src: require('../../public/lifeImg/7.jpg'),
          info: '看着是不是很眼馋，大家知道这是什么吗？ 哈哈哈',
        },
        {
          src: require('../../public/lifeImg/8.jpg'),
          info: '虽然已经离开老东家，但依旧祝福金棕榈长虹发展。',
        },
        {
          src: require('../../public/lifeImg/9.jpg'),
          info: '女儿生日，带她去拍了艺术照，她很喜欢，很开心。女儿照片基本不需要设计师ps,反而爸爸妈妈的照片需要ps操刀一番。。。',
        },
        {
          src: require('../../public/lifeImg/10.jpg'),
          info: '再见24号，再见黑曼巴',
        },
        {
          src: require('../../public/lifeImg/11.jpg'),
          info: '一家人去泡汤，宝贝女儿在里面玩疯了。。。',
        },
        {
          src: require('../../public/lifeImg/12.jpg'),
          info: '女儿在幼儿园的生活',
        },
        {
          src: require('../../public/lifeImg/13.jpg'),
          info: '跟朋友去看上海车展，豪车如云，希望以后我也可以提一台豪车。。。',
        }
      ],
      sigleInfo: {}
    }
  },
  methods: {
    clickFn(item) {
      this.sigleInfo = {
          ...item
        }
    },
    close(e) {
      if(e.target.tagName.toLowerCase() !== 'img') {
        this.sigleInfo = {}
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@keyframes show-card {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
img {
  vertical-align: middle;
  border-style: none;
}
.waterfall{
  column-width: 200px;
  column-count: auto;
  column-gap: 20px;
}
.waterfallItem{
  animation: show-card 0.4s;
  height: auto;
  box-sizing: border-box;
  position relative
  margin-bottom 20px
  cursor pointer
}
.info-txt{
  position absolute
  bottom 0
  left 0
  width 100%
  z-index 1
  height: auto;
  padding: 6px;
  background-color: rgba(255, 255, 255, 0.85);
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  display none
  box-sizing: border-box;
}
.waterfallItem:hover .info-txt{
  display block
}
.waterfall-img{
  height:auto;
  width:100%;
}
.show-div {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background-color: rgba(0,0,0,.8);
  text-align: center;
  padding: 30px;
  color: #fff;
  z-index 100
  box-sizing: border-box;
}
.show-div > img {
  border-radius: 4px;
  max-width: 90%;
  max-height 80%
}
.show-introduce {
  margin: 20px auto;
  font-size: 1.4rem;
  max-width: 800px;
  text-align: center;
}
@media screen and (max-width: 750px) {
  .waterfallItem .info-txt{
    display block
    text-align center
  }
}
</style>
