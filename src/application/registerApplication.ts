import { AppStatus, Application } from 'src/type'
import { apps } from './apps'
/**
 * 注册应用 改变应用状态
 * @param app 待应用
 */
export default function registerApplication(app: Application) {
  if (typeof app?.actionRule === 'string') {
    const path = app.actionRule
    app.actionRule = (location = window.location) => location.pathname === path
  }
  app.pageBody = ''
  app.loadedURLs = []
  app.status = AppStatus.BEFORE_BOOTSTRAP
  apps.push(app)
}
