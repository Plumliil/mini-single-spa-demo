import { AppStatus, Application } from '../type'
import { isPromise } from '../utils'

export default async function mountApp(app: Application) {
  let result = (app as any).mount({
    props: app.props,
    container: app.container,
  })
  console.log(app);
  
  app.container.innerHTML = app.pageBody as any
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
