<template>
  <main>
    <input id="pb" type="checkbox" checked/>
    <label for="pb">padding-box(默认)</label>
    <div class="txt">A paragraph of filler text. La la la de dah de dah de dah de la.</div>
  </main>
</template>

<script>
export default {}
</script>
<style scoped>
main{
  text-align: left;
  padding: 60px 80px 80px;
  background: #b4a078;
}
div.txt{
  padding: 12px;
  margin: 20px auto;
  background: white;
  border: 10px solid hsla(0, 0%, 100%, .5);
  /* border: 10px solid rgba(255,255,255,.5); */
  /* border: 10px solid rgba(0,0,0,.5); */
}
label{
  color: #f4f0ea;
}
input[id="pb"]:checked ~ div{
  background-clip: padding-box;
}
</style>
