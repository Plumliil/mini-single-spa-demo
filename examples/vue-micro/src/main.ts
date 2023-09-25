import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

let router = null
let app: App<Element> | null = null

function render(options = {}) {
  const { container } = options
  app = createApp(App)
  app.mount(container ? container.querySelector('#app') : '#app')
}

export async function bootstrap() {
  console.log(' vue micro bootstrap ')
}
export async function mount(options: {} | undefined) {
  console.log(' vue micro mount ')
  render(options)
}
export async function unmount() {
  console.log(' vue micro unmount ')
  app.unmount()
}

if (window['__IS_SINGLE_SPA__']) {
  window[`mini-single-spa-vue`] = {
    bootstrap,
    mount,
    unmount,
  }
} else {
  render()
}
