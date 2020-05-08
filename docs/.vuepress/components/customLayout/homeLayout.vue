<template>
  <div class="homeBlog">
    <div
      class="star-box"
      :style="{
        top: 0 + 'px',
        left: 0 + 'px',
        transformOrigin: `${Math.random() * 100}% ${Math.random() * 50}% 0`,
        animation: `rotate ${40 * Math.random() + 40}s linear ${Math.random() * 20 -
          40}s infinite `,
      }"
      v-for="(item, index) of 200"
      :key="index"
    >
      <div
        class="star"
        :style="{
          top: height * 0.3 * Math.random() - 2 + 'px',
          left: width * Math.random() - 2 + 'px',
          transform: `translate3d(0,0,${Math.random() * 300}px) rotateY(${Math.random() *
            360}deg) rotateX(${Math.random() * -50}deg) scale(${Math.random() +
            0.2},${Math.random() + 0.2})`,
          boxShadow: `0 0 ${Math.random() * 150}px 1px rgba(245,234,178,${Math.random()})`,
        }"
      ></div>
    </div>
    <div class="title">
      请对这个这个星空许个愿吧!
    </div>
    <div class="box">
      <div class="head">
        <img :src="$withBase('/logo.jpg')" alt="logo" />
      </div>
      <p>为梦想而年轻，为年轻而坚定</p>
      <router-link class="enter" to="/article">去看看</router-link>
    </div>
    <div class="footer">
      <div class="copyRight">
        部分内容来源于网络,如有侵权,请留言或联系1522962872@qq.com;Copyright © 2019-present
        giserman001
      </div>
      <div class="websiteStatistics">
        <busuanzi />
      </div>
    </div>
  </div>
</template>

<script>
import busuanzi from '../busuanzi.vue';
export default {
  data() {
    return {
      height: 0,
      width: 0
    };
  },
  components: {
    busuanzi,
  },
  mounted() {
    this.height = window.innerHeight
    this.width = window.innerWidth
  }
};
</script>

<style scoped>
@-webkit-keyframes radar-data {
  to {
    -webkit-transform: scale(2.5);
    transform: scale(2.5);
    box-shadow: inset 0 0 0 1px hsla(0, 0%, 100%, 0);
  }
}
@keyframes radar-data {
  to {
    -webkit-transform: scale(2.5);
    transform: scale(2.5);
    box-shadow: inset 0 0 0 1px hsla(0, 0%, 100%, 0);
  }
}
/* --星空样式-- */
@keyframes rotate {
  0% {
    transform: rotateZ(-20deg) rotateX(-40deg) rotateY(0deg);
  }
  100% {
    transform: rotateZ(-20deg) rotateX(-40deg) rotateY(-360deg);
  }
}

@keyframes show {
  0% {
    bottom: 0;
    opacity: 0;
  }
  25% {
    color: yellow;
  }
  50% {
    color: blue;
  }
  75% {
    color: red;
  }
  100% {
    bottom: 220px;
    opacity: 1;
    font-size: 28px;
  }
}
.star-box {
  width: 100%;
  border-radius: 50%;
  position: absolute;
  height: 30%;
  perspective: 1000px;
  /*perspective-origin: 100px -200px;*/
  transform-style: preserve-3d;
}
.star {
  width: 2px;
  height: 2px;
  position: absolute;
  background: #f7f7b8;
  border-radius: 50%;
}
.title {
  position: fixed;
  opacity: 0;
  animation: show 1s ease-in-out 1s forwards;
  left: 50%;
  bottom: 0px;
  transform: translateX(-50%);
  color: #1b2947;
}
/* --星空样式-- */
.homeBlog {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  perspective: 1000px;
  background-image: linear-gradient(to bottom, #1b2947 0%, #e96f92 65%, #f7f7b6 100%);
  margin: 0 !important;
  box-sizing: border-box;
  overflow: hidden;
}
/* .homeBlog {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #159957;
  background-image: linear-gradient(120deg, #155799, #159957);
  margin: 0 !important;
  box-sizing: border-box;
} */
.homeBlog .box {
  position: absolute;
  width: 400px;
  max-width: 100%;
  text-align: center;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -65%);
  transform: translate(-50%, -65%);
}
.box > p {
  width: 100%;
  color: rgba(239, 239, 239, 1);
  padding: 20px 0 10px;
}
.enter {
  width: 200px;
  padding: 12px;
  line-height: 24px;
  display: inline-block;
  text-align: center;
  text-decoration: none !important;
  color: hsla(0, 0%, 100%, 0.7);
  background-color: hsla(0, 0%, 100%, 0.08);
  border-radius: 0.3rem;
  border: 1px solid hsla(0, 0%, 100%, 0.2);
  -webkit-transition: color 0.2s, background-color 0.2s, border-color 0.2s;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
}
.head {
  background-blend-mode: screen;
  width: 110px;
  height: 110px;
  display: inline-block;
  position: relative;
}
.head > img {
  width: 100%;
  border-radius: 50%;
  position: relative;
  z-index: 2;
  height: 100%;
}
.head:after,
.head:before {
  z-index: -1;
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 0 1px hsla(0, 0%, 100%, 0.1);
  border-radius: 50%;
  -webkit-animation: radar-data 4s linear infinite;
  animation: radar-data 4s linear infinite;
}
.head:before {
  -webkit-animation-delay: -2s;
  animation-delay: -2s;
}
.footer {
  position: absolute;
  width: 80%;
  bottom: 0;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  z-index: 3;
  font-size: 12px;
  text-align: center;
}
.websiteStatistics {
  margin: 6px 0;
}
</style>
