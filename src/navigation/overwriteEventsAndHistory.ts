import { loadApps } from '../application/apps'

const originPushState = window.history.pushState
const originReplaceState = window.history.replaceState

export default function overwriteEventAndHistory() {
  window.history.pushState = function (
    data: any,
    unused: string,
    url?: string | URL | null | undefined
  ): void {
    const result = originPushState.call(this, data, unused, url)
    loadApps('pushState')
    return result
  }
  window.history.replaceState = function (
    data: any,
    unused: string,
    url?: string | URL | null | undefined
  ) {
    const result = originReplaceState.call(this, data, unused, url)
    loadApps('replaceState')
    return result
  }
  window.addEventListener('popstate', () => {
    console.log('popstate')
  })
  window.addEventListener('hashChange', () => {
    console.log('hashChange')
  })
}
