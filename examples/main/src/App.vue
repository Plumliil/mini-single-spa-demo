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
    <div id="mini-single-spa">
      <div id="app"></div>
    </div>
  </div>
</template>

<style scoped>
#root {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#mini-single-spa {
  width: 60%;
  height: 500px;
  border: 1px solid black;
}

button {
  margin: 20px 10px;
}
</style>
