<template>
  <div id="money" :class="{ 'active': isClick, 'animate': true }" @click="clickMe">
    <span></span>
    <em class="close" @click.stop="closed"></em>
    <div class="shadow"></div>
    <ul>
      <li>
        <span>支付宝扫一扫、领红包</span>
        <img :src="$withBase('/images/zf-s.jpg')" />
      </li>
      <li>
        <span>支持一杯coffee</span>
        <img :src="$withBase('/images/wx.jpg')" />
      </li>
      <li>
        <span>赏下百两黄金：</span>
        <img :src="$withBase('/images/zf.jpg')" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isClick: false
    }
  },
  methods: {
    clickMe() {
      this.isClick = true
    },
    closed() {
      this.isClick = false
    }
  }
}
</script>

<style scoped>
@keyframes ball {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-200px);
  }
}
#money {
  animation: ball 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) infinite alternate;
  position: fixed;
  right: 0;
  bottom: 0;
}

#money > span {
  cursor: pointer;
  display: inline-block;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: 3px solid #cd1b31;
  background: url(https://slbblog.oss-cn-beijing.aliyuncs.com/nolook.svg);
  background-size: cover;
  animation: rotate 1.5s infinite alternate;
}
#money.active > span {
  animation: none !important;
  display: none !important;
}
#money.animate > span {
  position: relative;
}
em {
  font-style: italic;
}
#money ul {
  display: none;
}
#money.active ul {
  display: block !important;
  overflow: hidden;
}
#money.active li {
  width: 32.2%;
  text-align: center;
  list-style: none;
  float: left;
  margin-right: 10px;
}
#money.active li span {
  display: block;
  font-size: 13px;
}
#money.active img {
  width: 150px;
  border-radius: 10px;
}
#money.active > em {
  width: 30px;
  height: 30px;
  right: 15px;
  top: 8px;
  cursor: pointer;
  position: absolute;
  display: inline-block;
}
#money.active {
  box-shadow: 0 -3px 13px 0 #f1f1f1;
  z-index: 1000;
  bottom: 0 !important;
  width: 100%;
  background: #fff;
  animation: none !important;
}
#money.active > em:before {
  content: "";
  position: absolute;
  background: #aaa;
  height: 16px;
  width: 1.5px;
  top: 2px;
  right: 9px;
  border-radius: 1px;
}
#money.active > em:after {
  content: "";
  position: absolute;
  background: #aaa;
  height: 16px;
  width: 1.5px;
  top: 2px;
  right: 9px;
  border-radius: 1px;
}
#money.active > em:before {
  transform: rotate(45deg);
}
#money.active > em:after {
  transform: rotate(-45deg);
}
@media screen and (max-width: 720px) {
  #money > span {
    width: 38px;
    height: 38px;
  }
}
@media screen and (max-width: 720px) {
  .active li {
    width: 100% !important;
  }
}
@media screen and (max-width: 720px) {
  .active li img {
    width: auto;
  }
}
@media screen and (max-width: 720px) {
  .active {
    z-index: 1000;
    overflow-y: auto;
    height: 100%;
  }
}
</style>