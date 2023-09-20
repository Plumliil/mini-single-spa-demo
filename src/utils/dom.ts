import { AnyObject } from 'src/type'

export function removeNode(node: Node) {
  node.parentNode?.removeChild(node)
}

export function createElement(tag: string, attrs?: AnyObject) {
  const node = document.createElement(tag)
  attrs &&
    Object.keys(attrs).forEach((key) => {
      node.setAttribute(key, attrs[key])
    })
  return node
}
