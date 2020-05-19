<template>
  <div class="loadingBox">
    <div class="loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loadingBox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}
.loading {
  width: 120px;
  height: 120px;
  position: relative;
}
.loading div {
  background: blue;
  width: 40%;
  height: 40%;
  border-radius: 50%;
  position: absolute;
  animation: loading 2s ease infinite;
}
.loading :first-child {
  background: #c299fc;
}
.loading :nth-child(2) {
  background: #ffd739;
  animation-delay: -0.5s;
}
.loading :nth-child(3) {
  background: #9852f9;
  animation-delay: -1s;
}
.loading :last-child {
  background: #6807f9;
  animation-delay: -1.5s;
}
@keyframes loading {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(150%, 0) scale(1.05);
  }
  50% {
    transform: translate(150%, 150%) scale(0.95);
  }
  75% {
    transform: translate(0, 150%) scale(1);
  }
}
</style>
