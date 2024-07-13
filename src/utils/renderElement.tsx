import React from 'react'

export interface RootNode {
  children: Array<{
    children: Array<TextNode>
    type: string
    tag?: string
  }>
}

interface TextNode {
  text: string
  detail?: number
  format?: number
  mode?: string
  style?: string
  version?: number
}

function renderTextNode(node: TextNode, tag?: string) {
  switch (tag) {
    case 'h1':
      return <h1 className="font-bold text-3xl pt-4 pb-1 leading-2">{node.text}</h1>
    case 'h2':
      return <h2 className="font-normal text-2xl pt-4 leading-2">{node.text}</h2>
    case 'h3':
      return <h3>{node.text}</h3>
    case 'p':
    default:
      return <p className="font-normal text-sm pb-2 leading-4">{node.text}</p>
  }
}

export default function renderElement(rootNodes: RootNode[]) {
  return rootNodes.map((rootNode, index) => (
    <React.Fragment key={index}>
      {rootNode.children.map((child, childIndex) => (
        <React.Fragment key={childIndex}>
          {child.children.map((element, elementIndex) => (
            <React.Fragment key={elementIndex}>{renderTextNode(element, child.tag)}</React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </React.Fragment>
  ))
}
