export function removeNode(node: Node) {
  node.parentNode?.removeChild(node)
}
