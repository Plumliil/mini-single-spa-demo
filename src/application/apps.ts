import { AppStatus, Application } from 'src/type'

export let apps: Application[] = []

export function loadApps(str: string) {
  const toBootstrapApp = getAppByStatus(AppStatus.BEFORE_BOOTSTRAP)
  const toUnMountApp = getAppByStatus(AppStatus.MOUNTED)
  console.log('loadApps', { toBootstrapApp, toUnMountApp })
}

function getAppByStatus(status: AppStatus) {
  const result: Application[] = []
  apps.forEach((app) => {
    // 启动或者挂载
    if (isActive(app) && app.status === status) {
      switch (app.status) {
        case AppStatus.BEFORE_BOOTSTRAP:
        case AppStatus.BOOTSTRAPPED:
        case AppStatus.UNMOUNTED:
          result.push(app)
          break
      }
    }
    // 卸载
    else if (app.status === AppStatus.MOUNTED && status === AppStatus.MOUNTED) {
      result.push(app)
    }
  })
  return result
}

function isActive(app: Application) {
  return typeof app.actionRule === 'function' && app.actionRule(window.location)
}
