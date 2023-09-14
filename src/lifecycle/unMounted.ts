import { AppStatus, Application } from 'src/type'
import { isPromise } from 'src/utils'

export default async function unmountApp(app: Application) {
  let result = (app as any).unmount(app.props)
  if (!isPromise(result)) {
    result = Promise.resolve(result)
  }
  return result
    .then(() => {
      app.status = AppStatus.UNMOUNTED
    })
    .catch((err: Error) => {
      app.status = AppStatus.UNMOUNT_ERROR
      throw err
    })
}
