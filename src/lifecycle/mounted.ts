import { AppStatus, Application } from 'src/type'
import { isPromise } from 'src/utils'

export default async function mountApp(app: Application) {
  let result = (app as any).mount(app.props)
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
