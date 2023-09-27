import { AppStatus, Application } from '../type'
import { isPromise } from '../utils'

export default async function unmountApp(app: Application) {
  app.status = AppStatus.BEFORE_UNMOUNT
  let result = (app as any).unmount({
    props: app.props,
    container: app.container,
  })
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
