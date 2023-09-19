import { Application, Source } from 'src/type'
import { removeNode } from './dom'

// URL正则
const urlReg = /^http(s)?:\/\//
function isCorrectURL(url = '') {
  return urlReg.test(url)
}
export async function parseHTMLandloadSources(app: Application) {
  return new Promise<void>(async (resolve, reject) => {
    // judge pageEntry url is valid or not
    const pageEntry = app.pageEntry
    console.log('pageEntry', pageEntry)
    if (!isCorrectURL(pageEntry)) {
      return reject(Error(`${pageEntry} is not a valid url`))
    }
    let html: any = ''
    try {
      html = await loadSourceText(pageEntry)
    } catch (error) {
      reject(error)
    }
    const domParser = new DOMParser()
    const doc = domParser.parseFromString(html, 'text/html')
    const { script, style } = extractStyleAndScript(doc, app)
    console.log({ script, style })
    loadScript(script)
  })
}

export const globalLoadedURLs: string[] = []

export function extractStyleAndScript(
  node: Document | Element,
  app: Application
) {
  let style: Source[] = []
  let script: Source[] = []
  if (!node.children.length) return { style, script }
  for (const child of Array.from(node.children)) {
    const isGlobal = Boolean(child.getAttribute('global'))
    const tagName = child.tagName
    if (tagName === 'SCRIPT') {
      removeNode(child)
      const src = child.getAttribute('src') || ''
      // determine whether the source is in the loading url
      if (app.loadedURLs.includes(src) || globalLoadedURLs.includes(src)) {
        continue
      }
      // source props
      const config: Source = {
        isGlobal,
        type: child.getAttribute('type'),
        value: child.textContent || '',
      }
      if (src) {
        config.url = src
        if (isGlobal) {
          globalLoadedURLs.push(src)
        } else {
          app.loadedURLs.push(src)
        }
      }
      script.push(config)
    } else if (tagName === 'STYLE') {
      removeNode(child)
      style.push({
        isGlobal,
        value: child.textContent || '',
      })
    } else if (tagName === 'LINK') {
      const href = child.getAttribute('href') || ''
      if (app.loadedURLs.includes(href) || globalLoadedURLs.includes(href)) {
        continue
      }
      if (child.getAttribute('rel') === 'stylesheet' && href) {
        style.push({
          url: href,
          isGlobal,
          value: '',
        })
        if (isGlobal) {
          globalLoadedURLs.push(href)
        } else {
          app.loadedURLs.push(href)
        }
      }
    } else {
      const result = extractStyleAndScript(child, app)
      script = script.concat(result.script)
      style = style.concat(result.style)
    }
  }
  return {
    script,
    style,
  }
}

export async function loadSourceText(url: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = (res: any) => {
      resolve(res.target.response)
    }
    xhr.onerror = (err) => {
      reject(err)
    }
    xhr.onabort = (err) => {
      reject(err)
    }
    xhr.open('get', url)
    xhr.send()
  })
}

const head = document.head

function loadStyle(styles: Source[]) {}
function loadScript(script: Source[]) {
  // loadSourceText
  console.log('loadScript script', script)
}
