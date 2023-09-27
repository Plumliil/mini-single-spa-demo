import { Application, Source } from 'src/type'
import { createElement, removeNode } from './dom'
// URL正则
const urlReg = /^http(s)?:\/\//
function isCorrectURL(url = '') {
  return urlReg.test(url)
}
export async function parseHTMLandloadSources(app: Application) {
  return new Promise<void>(async (resolve, reject) => {
    // judge pageEntry url is valid or not
    const pageEntry = app.pageEntry
    if (!isCorrectURL(pageEntry)) {
      return reject(Error(`${pageEntry} is not a valid url`))
    }
    let html: any = ''
    try {
      html = await loadSourceText(pageEntry as string)
    } catch (error) {
      reject(error)
    }
    const domParser = new DOMParser()
    const doc = domParser.parseFromString(html, 'text/html')
    const { scripts, styles } = extractStyleAndScript(doc, app)
    app.pageBody = doc.body.innerHTML
    let isLoadStyleDone = false,
      isLoadScriptDone = false
    // loading styles and put into document
    Promise.all(loadStyle(styles, app))
      .then((data) => {
        isLoadStyleDone = true
        addStyles(data as string[])
        if (isLoadScriptDone && isLoadStyleDone) return resolve()
      })
      .catch((err) => reject(err))
    // loading scrippt and run themselves by window
    Promise.all(loadScript(scripts, app))
      .then((data) => {
        isLoadScriptDone = true
        executeScripts(data as string[])
        if (isLoadScriptDone && isLoadStyleDone) return resolve()
      })
      .catch((err) => reject(err))
  })
}

export const globalLoadedURLs: string[] = []

export function extractStyleAndScript(
  node: Document | Element,
  app: Application
) {
  let styles: Source[] = []
  let scripts: Source[] = []
  if (!node.children.length) return { styles, scripts }
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
      scripts.push(config)
    } else if (tagName === 'STYLE') {
      removeNode(child)
      styles.push({
        isGlobal,
        value: child.textContent || '',
      })
    } else if (tagName === 'LINK') {
      const href = child.getAttribute('href') || ''
      if (app.loadedURLs.includes(href) || globalLoadedURLs.includes(href)) {
        continue
      }
      if (child.getAttribute('rel') === 'stylesheet' && href) {
        styles.push({
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
      scripts = scripts.concat(result.scripts)
      styles = styles.concat(result.styles)
    }
  }
  return {
    scripts,
    styles,
  }
}
export async function loadSourceText(url: string, app?: Application) {
  let finalUrl = url
  if (app?.pageEntry) {
    finalUrl = app.pageEntry + url
  }
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = (res: any) => {
      resolve(res.target.response)
    }
    xhr.onerror = reject
    xhr.onabort = reject
    xhr.open('get', finalUrl)
    xhr.send()
  })
}

const head = document.head

function loadStyle(styles: Source[], app: Application) {
  if (!styles.length) {
    return []
  }
  return styles
    .map((item) => {
      if (item.isGlobal) {
        if (item.url) {
          const link = createElement('link', {
            rel: 'stylesheet',
            global: item.isGlobal,
            href: item.url,
          })
          head.appendChild(link)
        } else {
          const style = createElement('style', {
            textContent: item.value,
            global: item.isGlobal,
            type: 'text/css',
          })
          head.appendChild(style)
        }
        return
      }
      // if item is not global style then load source text and return
      if (item.url) return loadSourceText(item.url, app)
      return Promise.resolve(item.value)
    })
    .filter(Boolean)
}
function loadScript(scripts: Source[], app: Application) {
  if (!scripts.length) return []
  return scripts
    .map((item) => {
      const type = item.type || 'text/javascript'
      if (item.isGlobal) {
        const script = createElement('script', {
          global: item.isGlobal,
          type: type,
        })
        if (item.url) {
          script.setAttribute('src', item.url)
          head.appendChild(script)
        } else {
          script.textContent = item.value
          head.appendChild(script)
        }
        return
      }
      if (item.url) return loadSourceText(item.url, app)
      return Promise.resolve(item.value)
    })
    .filter(Boolean)
}
function addStyles(styles: string[] | HTMLStyleElement[]) {
  styles.forEach((item) => {
    if (typeof item === 'string') {
      const node = createElement('style', {
        type: 'text/css',
        textContext: item,
      })
      head.appendChild(node)
    } else {
      head.appendChild(item)
    }
  })
}
function executeScripts(scripts: string[]) {
  try {
    scripts.forEach((code) => {
      new Function('window', code).call(window, window)
    })
  } catch (error) {
    throw error
  }
}
