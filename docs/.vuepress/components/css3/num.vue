<template>
  <div class="wrapperBox">
    <div class="wrapper">
      <div class="round">
        <span>东邪</span>
        <span>西毒</span>
        <span>南乞</span>
        <span>北丐</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.wrapperBox {
  height: 300px;
  width: 100%;
  position: relative;
}
.wrapper {
  width: 100px;
  height: 100px;
  background: lightblue;
  border-radius: 50%;
  border: 2px solid lightgreen;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.wrapper:after {
  content: '你猜';
  display: inline-block;
  width: 100px;
  height: 100px;
  line-height: 100px;
  border-radius: 50%;
  text-align: center;
  color: #fff;
  font-size: 24px;
}
.wrapper:hover .round {
  transform: scale(1);
  -webkit-transform: scale(1);
  opacity: 1;
  animation: rotating 6s 1.2s linear infinite alternate;
  -webkit-animation: rotating 6s 1.2s linear infinite alternate;
}
@-webkit-keyframes rotating {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(180deg);
  }
}
@keyframes rotating {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(180deg);
  }
}
.round {
  width: 240px;
  height: 240px;
  border: 2px solid lightgreen;
  border-radius: 50%;
  position: absolute;
  top: -70px;
  left: -70px;
  transition: all 1s;
  -webkit-transition: all 1s;
  transform: scale(0.35);
  -webkit-transform: scale(0.35);
  opacity: 0;
}
.round span {
  width: 40px;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  border-radius: 50%;
  background: lightblue;
  border: 2px solid lightgreen;
  color: #fff;
  text-align: center;
  position: absolute;
}
.round span:nth-child(1) {
  right: -22px;
  top: 50%;
  margin-top: -22px;
}
.round span:nth-child(2) {
  left: -22px;
  top: 50%;
  margin-top: -22px;
}
.round span:nth-child(3) {
  left: 50%;
  bottom: -22px;
  margin-left: -22px;
}
.round span:nth-child(4) {
  left: 50%;
  top: -22px;
  margin-left: -22px;
}
</style>
