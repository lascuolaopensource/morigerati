export interface ArrayField {
  type?: string
  value?: any[]
  [key: string]: any
}

export function isArrayEmpty(field: any): boolean {
  // Se il campo è null o undefined, è considerato vuoto
  if (field == null) {
    return true
  }

  // Se il campo è un array diretto, controlliamo se è vuoto
  if (Array.isArray(field)) {
    return field.length === 0
  }

  // Se è un oggetto, controlliamo le sue proprietà
  if (typeof field === 'object') {
    // Se ha una proprietà 'value' che è un array, controlliamo se è vuoto
    if (Array.isArray(field.value)) {
      return field.value.length === 0
    }

    // Se ha una proprietà 'children', controlliamo se è un array vuoto
    if (Array.isArray(field.children)) {
      return field.children.length === 0
    }

    // Per tutti gli altri oggetti, controlliamo ricorsivamente tutte le proprietà
    return Object.values(field).every(isArrayEmpty)
  }

  // Per qualsiasi altro tipo, consideriamo il campo non vuoto
  return false
}
