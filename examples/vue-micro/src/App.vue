<script setup lang="ts">
const toHome = () => {
  history.pushState(null, '', '/')
}
</script>

<template>
  <div class="vue-micro">
    <h1>VUE MICRO</h1>
  </div>
  <button @click="toHome">to /</button>
</template>

<style scoped>
.vue-micro {
  display: flex;

}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
