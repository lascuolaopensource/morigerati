import { Media } from '@/payload-types'

export function getMedia(media: Media | undefined | null | string): Media | undefined {
  if (typeof media === 'string') throw new Error('Unexpected: Media is a string')
  if (!media) return undefined
  return media
}
