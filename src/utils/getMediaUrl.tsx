import { Media } from '@/payload-types'
import loremPic from '@/public/loremPic.png'

const isMedia = (obj: any): obj is Media => {
  return obj && typeof obj === 'object' && 'url' in obj
}

export const getMediaURL = (
  media: string | Media | null | undefined,
  defaultURL: string = loremPic.src,
): string => {
  let url: string

  if (typeof media === 'string') {
    url = media
  } else if (isMedia(media) && media.url) {
    url = media.url
  } else {
    url = defaultURL
  }
  if (!url.startsWith('/')) {
    url = loremPic.src
  }

  return url
}
