import React from 'react'

interface GenericNode {
  children?: GenericNode[]
  type?: string
  tag?: string
  text?: string
  [key: string]: any
}

function renderTextNode(node: GenericNode) {
  const text = node.text || ''
  switch (node.type) {
    case 'heading':
      switch (node.tag) {
        case 'h1':
          return <h1 className="font-bold text-3xl pt-4 pb-1 leading-2">{text}</h1>
        case 'h2':
          return <h2 className="font-bold text-xl pt-4 pb-2 leading-5">{text}</h2>
        case 'h3':
          return <h3 className="font-semibold text-lg pt-3 pb-1 leading-6">{text}</h3>
        default:
          return <h4 className="font-medium text-base pt-2 pb-1 leading-6">{text}</h4>
      }
    case 'paragraph':
      return <p className="font-normal text-sm pb-2 leading-4">{text}</p>
    default:
      return <span>{text}</span>
  }
}

function renderNode(node: GenericNode): React.ReactNode {
  if (node.children && node.children.length > 0) {
    return renderTextNode({
      ...node,
      text: node.children.map((child) => child.text).join(''),
    })
  }
  return null
}

export default function renderContent(jsonContent: any): React.ReactNode {
  const content = jsonContent.testo?.root?.children || []
  return content.map((node: GenericNode, index: number) => (
    <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
  ))
}
