import { Media } from '@/payload-types'

export function getMedia(media: Media | undefined | null | string): Media | undefined {
  if (typeof media === 'string') throw new Error('Unexpected: Media is a string')
  if (!media) return undefined
  return media
}

export function getMediaArray(media: (string | Media)[] | null | undefined): Media[] {
  if (!media) return []
  return media.map(getMedia).filter((v) => v !== undefined)
}
