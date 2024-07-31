import React from 'react'

interface TextNode {
  text: string
  type: string
  [key: string]: any
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

  switch (node.type) {
    case 'paragraph':
      return <p className="font-normal text-sm pb-2 leading-6">{text}</p>
    case 'heading':
      switch (node.tag) {
        case 'h1':
          return <h1 className="font-bold text-3xl pt-4 pb-2 leading-tight">{text}</h1>
        case 'h2':
          return <h2 className="font-semibold text-2xl pt-3 pb-1 leading-tight">{text}</h2>
        case 'h3':
          return <h3 className="font-medium text-xl pt-2 pb-1 leading-snug">{text}</h3>
        default:
          return <h4 className="font-medium text-lg pt-2 pb-1 leading-snug">{text}</h4>
      }
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
    console.warn('No valid content found:', jsonContent)
    return null
  }

  const renderedContent = content.children
    .map((node: ContentNode, index: number) => (
      <React.Fragment key={index}>{renderContentNode(node)}</React.Fragment>
    ))
    .filter(Boolean) // Rimuove eventuali elementi null o undefined

  return renderedContent.length > 0 ? renderedContent : null
}
