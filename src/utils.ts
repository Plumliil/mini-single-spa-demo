export function isPromise(fn: any) {
  if (typeof fn === 'function' && typeof fn?.then === 'function') {
    return true
  } else {
    return false
  }
}
