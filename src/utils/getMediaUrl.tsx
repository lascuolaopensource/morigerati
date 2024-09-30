import { Media } from '@/payload-types'
import loremPic from '@/public/loremPic.png'

const isMedia = (obj: any): obj is Media => {
  return obj && typeof obj === 'object' && 'url' in obj
}

export const getMediaURL = (
  media: string | Media | null | undefined,
  defaultURL: string = loremPic.src,
): string => {
  if (typeof media === 'string') {
    return media
  }
  if (isMedia(media) && media.url) {
    return media.url
  }
  return defaultURL
}
