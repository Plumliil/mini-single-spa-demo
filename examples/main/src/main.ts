import { createApp } from 'vue'
import App from './App.vue'
import { registerApplication } from '../../../src/index'
import start from '../../../src/start'

function $(el: string) {
  return document.querySelector(el)
}

createApp(App).mount('#mainapp')

console.log("$('#mini-single-spa')", $('#mini-single-spa'))

registerApplication({
  name: 'vue',
  actionRule: '/vue',
  pageEntry: 'http://127.0.0.1:4173/',
  container: $('#mini-single-spa') as Element,
})
registerApplication({
  name: 'react',
  actionRule: '/react',
  pageEntry: 'http://127.0.0.1:4174/',
  container: $('#mini-single-spa') as Element,
})

start()


