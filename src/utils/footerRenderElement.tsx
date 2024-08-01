import React from 'react'

interface TextNode {
  text: string
  type: string
  [key: string]: any
  format: number
}

interface ContentNode {
  children: TextNode[] | ContentNode[]
  type: string
  tag?: string
  [key: string]: any
}

interface RootNode {
  children: ContentNode[]
  type: string
  [key: string]: any
}

function renderTextNode(node: TextNode | string): string {
  return typeof node === 'string' ? node : node.text
}

function renderContentNode(node: ContentNode): React.ReactNode {
  const text = node.children
    .map((child) => (typeof child === 'string' ? child : renderTextNode(child as TextNode)))
    .join('')

  switch (node.format) {
    case 0:
      return <p className="font-normal text-xl  leading-2">{text}</p>
    case 1:
      return <p className="font-bold text-xl  leading-2">{text}</p>
    default:
      return <span>{text}</span>
  }
}

export default function renderContent(jsonContent: any): React.ReactNode | null {
  const content = jsonContent?.testo?.root || jsonContent?.root || jsonContent

  if (
    !content ||
    !content.children ||
    !Array.isArray(content.children) ||
    content.children.length === 0
  ) {
    return null
  }

  const renderedContent = content.children
    .map((node: ContentNode, index: number) => (
      <React.Fragment key={index}>{renderContentNode(node)}</React.Fragment>
    ))
    .filter(Boolean)

  return renderedContent.length > 0 ? renderedContent : null
}
