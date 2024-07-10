interface TextNode {
  text: string
  type: string
  version: number
  detail?: number
  format?: number
  mode?: string
  style?: string
}

export interface RootNode {
  children: Array<{
    children: Array<TextNode>
    direction: string | null
    format: string
    indent: number
    type: string
    version: number
    textFormat?: number
    tag?: string
  }>
}

export async function renderElement(element: TextNode, tag: string | undefined) {
  switch (tag) {
    case 'h1':
      return <h1 className="font-normal text-3xl pt-4 pb-1 leading-4">{element.text}</h1>
    case 'h2':
      return <h2 className="font-normal text-2xl pt-4  leading-2">{element.text}</h2>
    case 'h3':
      return <h3>{element.text}</h3>
    case 'p':
    default:
      return <p className="font-normal text-sm  pb-2 leading-4">{element.text}</p>
  }
}
