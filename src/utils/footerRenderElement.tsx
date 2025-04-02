import React from 'react'

type ContentNode = {
  [key: string]: any
  children?: ContentNode[]
  text?: string
  format?: number
}

function renderNode(node: ContentNode): React.ReactNode {
  if (!node) {
    console.log('renderNode received null or undefined node')
    return null
  }

  if (typeof node.text === 'string') {
    return node.format === 1 ? (
      <div>
        {' '}
        <strong className="text-xs">{node.text}</strong>
        <br></br>{' '}
      </div>
    ) : (
      <div className="text-xs">
        {node.text}
        <br></br>{' '}
      </div>
    )
  }

  if (Array.isArray(node.children)) {
    return node.children.map((child, index) => (
      <React.Fragment key={index}>{renderNode(child)}</React.Fragment>
    ))
  }

  return null
}

export function renderFooterContent(content: any): React.ReactNode {
  if (!content || typeof content !== 'object') {
    console.log('renderFooterContent received invalid content:', content)
    return null
  }

  console.log('renderFooterContent received content with keys:', Object.keys(content))

  const root = content.root || content

  return <div>{renderNode(root)}</div>
}
