// isRichTextEmpty.ts

export interface RichTextNode {
  type?: string
  text?: string
  children?: RichTextNode[]
  [key: string]: any
}

export function isRichTextEmpty(content: any): boolean {
  // Se il contenuto è null, undefined, o una stringa vuota, è considerato vuoto
  if (content == null || (typeof content === 'string' && content.trim() === '')) {
    return true
  }

  // Se è un oggetto, controlliamo le sue proprietà
  if (typeof content === 'object') {
    // Se ha una proprietà 'text', controlliamo se è vuota
    if ('text' in content) {
      return content.text.trim() === ''
    }

    // Se ha una proprietà 'children', controlliamo ricorsivamente tutti i figli
    if (Array.isArray(content.children)) {
      return content.children.every(isRichTextEmpty)
    }

    // Se ha una proprietà 'root', controlliamo il suo contenuto
    if (content.root) {
      return isRichTextEmpty(content.root)
    }

    // Per tutti gli altri oggetti, controlliamo ricorsivamente tutte le proprietà
    return Object.values(content).every(isRichTextEmpty)
  }

  // Per qualsiasi altro tipo, consideriamo il contenuto non vuoto
  return false
}
