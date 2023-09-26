import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

let router = null
let app: any = null

function render(options: any) {
  const container: Element | null = options.container
  console.log('vue micro container', container,container.querySelector('#app'))
  app = createApp(App)
  // app.mount('#app')
  app.mount(container ? container.querySelector('#app') : '#app')
}

export async function bootstrap(props: any) {
  console.log(' vue micro bootstrap ', props)
}
export async function mount(options: any) {
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
