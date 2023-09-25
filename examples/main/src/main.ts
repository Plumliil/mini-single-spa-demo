import { createApp } from 'vue'
import App from './App.vue'
import { registerApplication } from '../../../src/index'
import start from '../../../src/start'

function $(el: string) {
  return document.querySelector(el)
}
registerApplication({
  name: 'vue',
  actionRule: '/vue',
  pageEntry: 'http://127.0.0.1:4173/',
  container: $('#mini-single-spa'),
  loadedURLs: [],
})
registerApplication({
  name: 'react',
  actionRule: '/react',
  pageEntry: 'http://127.0.0.1:4175/',
  container: $('#mini-single-spa'),
  loadedURLs: [],
})

start()

createApp(App).mount('#app')
