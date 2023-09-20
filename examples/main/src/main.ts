import { createApp } from 'vue'
import App from './App.vue'
import { registerApplication } from '../../../src/index'

function $(el: string) {
  return document.querySelector(el)
}
registerApplication({
  name: 'vue',
  actionRule: '/vue',
  pageEntry: 'http://127.0.0.1:5174/',
  container: $('#mini-single-spa'),
  loadApp() {
    return Promise.resolve({
      bootstrap() {
        console.log('vue bootstrap')
      },
      mount() {
        console.log('vue mount')
      },
      unmount() {
        console.log('vue unmount')
      },
    })
  },
})
registerApplication({
  name: 'react',
  actionRule: '/react',
  loadApp() {
    return Promise.resolve({
      bootstrap() {
        console.log('react bootstrap')
      },
      mount() {
        console.log('react mount')
      },
      unmount() {
        console.log('react unmount')
      },
    })
  },
})

createApp(App).mount('#app')
