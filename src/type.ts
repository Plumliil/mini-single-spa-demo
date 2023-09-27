export interface AnyObject {
  [key: string]: any
}

export enum AppStatus {
  BEFORE_BOOTSTRAP = 'BEFORE_BOOTSTRAP',
  BOOTSTRAPPED = 'BOOTSTRAPPED',
  BEFORE_MOUNT = 'BEFORE_MOUNT',
  MOUNTED = 'MOUNTED',
  BEFORE_UNMOUNT = 'BEFORE_UNMOUNT',
  UNMOUNTED = 'UNMOUNTED',
  BOOTSTRAP_ERROR = 'BOOTSTRAP_ERROR',
  MOUNT_ERROR = 'MOUNT_ERROR',
  UNMOUNT_ERROR = 'UNMOUNT_ERROR',
}

/**
 * script css 的资源属性
 */
export interface Source {
  /**
   * 是否全局资源
   */
  isGlobal: boolean
  /**
   * 资源的 url
   */
  url?: string
  /**
   * 资源的内容，如果 url 有值，则忽略该属性
   */
  value: string
  /**
   * script 的类型
   */
  type?: string | null
}

export interface Application {
  // name: string
  // actionRule: Function | string
  // loadApp: () => Promise<any>
  // props: AnyObject | Function
  // status?: AppStatus
  // container?: HTMLElement
  // bootstrap?: (props: AnyObject) => Promise<any>
  // mount?: (props: AnyObject) => Promise<any>
  // unmount?: (props: AnyObject) => Promise<any>
  name: string
  actionRule: Function | string
  // activeRule: Function | string
  props?: Function | AnyObject
  container: Element 
  pageEntry?: string
  pageBody?: string
  /**
   * app 已经加载过的 url，用于去重
   */
  loadedURLs?: string[]
  status?: AppStatus
  bootstrap?: (options: AnyObject) => Promise<any>
  mount?: (options: AnyObject) => Promise<any>
  unmount?: (options: AnyObject) => Promise<any>
}
