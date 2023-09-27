<script setup lang="ts">

const changeRoute = (route: string) => {
  window.history.pushState(null, '', route)
}

</script>

<template>
  <div id="root">
    <h1>Mini Single Spa Demo</h1>
    <h1>MAIN</h1>
    <div>
      <button @click="changeRoute('/')">/</button>
      <button @click="changeRoute('/vue')">/vue</button>
      <button @click="changeRoute('/react')">/react</button>
    </div>
    <hr style="width: 80%;" />
    <h1>MICRO</h1>
    <div id="mini-single-spa"></div>
  </div>
  <div id="microapp"></div>
</template>

<style scoped>
#root {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#microapp{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
button {
  margin: 20px 10px;
}
</style>
