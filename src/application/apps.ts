import bootstrapApp from '../lifecycle/bootstrap'
import mountApp from '../lifecycle/mounted'
import unmountApp from '../lifecycle/unMounted'
import { AppStatus, Application } from '../type'

export let apps: Application[] = []

export async function loadApps() {
  // 对已注册的应用 进行初始化 将其状态转化为BOOTSRTAP
  const toBootstrapApp = getAppByStatus(AppStatus.BEFORE_BOOTSTRAP)
  // 异步执行
  await Promise.all(toBootstrapApp.map(bootstrapApp))
  // 卸载应用 activeRule返回false且应用当前状态为mount 则对该应用进行卸载
  // 是当前路由且状态为MOUNTED不做任何操作
  // 否则进行卸载
  const toUnMountApp = getAppByStatus(AppStatus.MOUNTED)

  await Promise.all(toUnMountApp.map(unmountApp))
  const toMountApp = [
    ...getAppByStatus(AppStatus.UNMOUNTED),
    ...getAppByStatus(AppStatus.BOOTSTRAPPED),
  ]

  await Promise.all(toMountApp.map(mountApp))
  console.log('app', apps)
}

function getAppByStatus(status: AppStatus) {
  const result: Application[] = []
  apps.forEach((app) => {
    // 启动或者挂载
    // 当当前路由满足路由规则条件且传入状态等于当前app状态
    if (isActive(app) && app.status === status) {
      // 待挂载
      switch (app.status) {
        case AppStatus.BEFORE_BOOTSTRAP: // 初始化
        case AppStatus.BOOTSTRAPPED: // 启动
        case AppStatus.UNMOUNTED: // 卸载
          result.push(app)
          break
      }
      // 如果已经处于 mount 状态并且 activeRule() 返回值为 true， result 返回空 不作任何处理。
    }
    // 卸载
    // isActive(app)为false 不是当前路由且 状态为MOUNTED
    else if (app.status === AppStatus.MOUNTED && status === AppStatus.MOUNTED) {
      result.push(app)
    }
  })
  return result
}

function isActive(app: Application) {
  return typeof app.actionRule === 'function' && app.actionRule(window.location)
}
