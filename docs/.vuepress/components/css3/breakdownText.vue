<template>
  <div class="breakdown">
    <div class="text" data-text="PROGRAMMER">
      PROGRAMMER
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.breakdown {
  /* 设置整体的背景颜色 */
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  margin-top: 20px;
}
.text {
  color: white;
  /* 你可以使用自己想要的字体，我这里使用的是默认的非衬线体 */
  font-family: sans-serif;
  font-size: 100px;
  /* 要把这个关联文字层设置成相对定位，伪元素的绝对定位才会正确叠加到一起 */
  position: relative;
  margin: 0 auto;
}
.text::before {
  content: attr(data-text);
  background: black;
  position: absolute;
  text-shadow: 2px 0 red;
  left: -2px;
  clip-path: inset(0 0 0 0);
  z-index: 2;
  animation: ani2 2s linear infinite alternate-reverse;
}
.text::after {
  content: attr(data-text);
  background: black;
  position: absolute;
  text-shadow: -2px 0 blue;
  left: 2px;
  clip-path: inset(0 0 0 0);
  z-index: 1;
  animation: ani1 2s linear infinite alternate-reverse;
}
@keyframes ani1 {
  0% {
    clip-path: inset(0 0 0 0);
  }
  5% {
    clip-path: inset(68px 0 32px 0);
  }
  10% {
    clip-path: inset(23px 0 67px 0);
  }
  15% {
    clip-path: inset(40px 0 90px 0);
  }
  20% {
    clip-path: inset(55px 0 30px 0);
  }
  25% {
    clip-path: inset(20px 0 72px 0);
  }
  30% {
    clip-path: inset(44px 0 40px 0);
  }
  35% {
    clip-path: inset(76px 0 22px 0);
  }
  40% {
    clip-path: inset(30px 0 62px 0);
  }
  45% {
    clip-path: inset(10px 0 72px 0);
  }
  50% {
    clip-path: inset(54px 0 32px 0);
  }
  55% {
    clip-path: inset(43px 0 32px 0);
  }
  60% {
    clip-path: inset(48px 0 72px 0);
  }
  65% {
    clip-path: inset(18px 0 82px 0);
  }
  70% {
    clip-path: inset(68px 0 40px 0);
  }
  75% {
    clip-path: inset(65px 0 32px 0);
  }
  80% {
    clip-path: inset(29px 0 76px 0);
  }
  85% {
    clip-path: inset(68px 0 32px 0);
  }
  90% {
    clip-path: inset(72px 0 32px 0);
  }
  95% {
    clip-path: inset(43px 0 62px 0);
  }
  100% {
    clip-path: inset(5px 0 87px 0);
  }
}
@keyframes ani2 {
  0% {
    clip-path: inset(0 0 0 0);
  }
  5% {
    clip-path: inset(64px 0 32px 0);
  }
  10% {
    clip-path: inset(23px 0 67px 0);
  }
  15% {
    clip-path: inset(40px 0 90px 0);
  }
  20% {
    clip-path: inset(55px 0 30px 0);
  }
  25% {
    clip-path: inset(20px 0 72px 0);
  }
  30% {
    clip-path: inset(44px 0 40px 0);
  }
  35% {
    clip-path: inset(76px 0 22px 0);
  }
  40% {
    clip-path: inset(30px 0 62px 0);
  }
  45% {
    clip-path: inset(10px 0 72px 0);
  }
  50% {
    clip-path: inset(14px 0 42px 0);
  }
  55% {
    clip-path: inset(43px 0 32px 0);
  }
  60% {
    clip-path: inset(48px 0 72px 0);
  }
  65% {
    clip-path: inset(18px 0 82px 0);
  }
  70% {
    clip-path: inset(68px 0 40px 0);
  }
  75% {
    clip-path: inset(75px 0 32px 0);
  }
  80% {
    clip-path: inset(29px 0 76px 0);
  }
  85% {
    clip-path: inset(68px 0 32px 0);
  }
  90% {
    clip-path: inset(24px 0 32px 0);
  }
  95% {
    clip-path: inset(43px 0 62px 0);
  }
  100% {
    clip-path: inset(5px 0 87px 0);
  }
}
</style>
