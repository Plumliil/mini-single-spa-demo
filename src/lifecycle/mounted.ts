import { AppStatus, Application } from '../type'
import { isPromise } from '../utils'

export default async function mountApp(app: Application) {
  let result = (app as any).mount(app.props)
  // app.container.innerHTML = app.pageBody
  if (!isPromise(result)) {
    result = Promise.resolve(result)
  }
  return result
    .then(() => {
      app.status = AppStatus.MOUNTED
    })
    .catch((err: Error) => {
      app.status = AppStatus.MOUNT_ERROR
      throw err
    })
}
