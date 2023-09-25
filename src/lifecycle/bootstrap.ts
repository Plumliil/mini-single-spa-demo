import { AppStatus, Application } from '../type'
import { isPromise } from '../utils'
import { parseHTMLandloadSources } from '../utils/parseHTMLandloadSources'

declare const window: any

export default async function bootstrapApp(app: Application) {
  try {
    parseHTMLandloadSources(app)
  } catch (error) {
    throw error
  }
  // 对应用的生命周期进行挂载
  // const { bootstrap, mount, unmount } = await app.loadApp()
  const { bootstrap, mount, unmount } = await getLifeCycleFuncs(app.name)
  checkFun('bootstrap', bootstrap)
  checkFun('mount', mount)
  checkFun('unmount', unmount)
  app.bootstrap = bootstrap
  app.mount = mount
  app.unmount = unmount
  // 初始化应用属性
  const props = getProps(app?.props)
  app.props = props
  // 执行bootstrap函数 做某些操作
  let result = (app as any).bootstrap({
    props: app.props,
    container: app.container,
  })
  if (!isPromise(result)) {
    result = Promise.resolve(result)
  }
  // 抛出执行结果并且改变状态
  return result
    .then(() => {
      app.status = AppStatus.BOOTSTRAPPED
    })
    .catch((err: Error) => {
      app.status = AppStatus.BOOTSTRAP_ERROR
      throw err
    })
}

function checkFun(name: string, fn: any) {
  if (typeof fn !== 'function') {
    throw new Error(`${name} is not a function`)
  }
}

function getProps(props: any) {
  if (typeof props === 'function') {
    return props()
  } else if (typeof props === 'object') {
    return props
  } else {
    return {}
  }
}

async function getLifeCycleFuncs(name: string) {
  const result = window[`mini-single-spa-${name}`]
  if (typeof result === 'function') {
    return result()
  }

  if (typeof result === 'object') {
    return result
  }

  throw Error(
    `The micro app must inject the lifecycle("bootstrap" "mount" "unmount") into window['mini-single-spa-${name}']`
  )
}
