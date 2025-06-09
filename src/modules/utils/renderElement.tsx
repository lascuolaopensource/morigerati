import React from 'react'

interface TextNode {
  text: string
  type: string
  [key: string]: any
}

interface ContentNode {
  children?: (TextNode | ContentNode | string)[]
  type: string
  tag?: string
  [key: string]: any
}

interface RootNode {
  children?: ContentNode[]
  type: string
  [key: string]: any
}

function renderTextNode(node: TextNode | string): string {
  return typeof node === 'string' ? node : node.text || ''
}

function renderContentNode(node: ContentNode): React.ReactNode {
  if (!node.children || !Array.isArray(node.children)) {
    return null
  }

  const text = node.children
    .map((child) => {
      if (typeof child === 'string') return child
      if ('text' in child) return renderTextNode(child as TextNode)
      return ''
    })
    .join('')

  switch (node.type) {
    case 'paragraph':
      return <p className="font-normal text-sm pb-2 leading-5">{text}</p>
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
  try {
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
  } catch (error) {
    console.error('Error in renderContent:', error)
    return null
  }
}
