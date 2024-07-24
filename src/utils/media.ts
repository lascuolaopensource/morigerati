import { Media } from '@/payload-types'

type None = null | undefined

export function getMediaUrl(media: string | Media | None): string | None {
  if (typeof media !== 'string' && media) {
    return media.url
  }
}
