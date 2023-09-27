import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import './index.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function render(options: any) {
  const { container } = options
  console.log('react container', container)

  ReactDOM.render(
    <App />,
    container
      ? document.querySelector('#microapp')
      : document.querySelector('#root')
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function bootstrap(props: any) {
  console.log(' react micro bootstrap ', props)
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function mount(options: any) {
  console.log(' react micro mount options', options)
  render(options)
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function unmount(options: any) {
  const { container } = options
  console.log(' react micro unmount ')
  ReactDOM.unmountComponentAtNode(
    container ? document.querySelector('#microapp') : document.querySelector('#root')
  )
}

if (window['__IS_SINGLE_SPA__']) {
  window[`mini-single-spa-react`] = {
    bootstrap,
    mount,
    unmount,
  }
} else {
  render({})
}
