import { loadApps } from './application/apps'

let isStart = false
export default function start() {
  if (!isStart) {
    loadApps()
    try {
      loadApps()
    } catch (error) {
      throw error
    }
  }
}
