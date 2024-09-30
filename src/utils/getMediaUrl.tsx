import { Media } from '@/payload-types'

const isMedia = (obj: any): obj is Media => {
  return obj && typeof obj === 'object' && 'url' in obj
}

export const getMediaURL = (
  media: string | Media | null | undefined,
  defaultURL: string = '/path/to/default/image.jpg',
): string => {
  if (typeof media === 'string') {
    return media
  }
  if (isMedia(media) && media.url) {
    return media.url
  }
  return defaultURL
}
