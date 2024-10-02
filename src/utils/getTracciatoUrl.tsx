import { Tracciati } from '@/payload-types'

const isTracciato = (obj: any): obj is Tracciati => {
  return obj && typeof obj === 'object' && 'url' in obj
}

export const getTracciatoUrl = (
  tracciati: string | Tracciati | null | undefined,
): string | undefined => {
  let url: string

  if (typeof tracciati === 'string') {
    return tracciati
  } else if (isTracciato(tracciati) && tracciati.url) {
    return tracciati.url
  }
  return undefined
}
