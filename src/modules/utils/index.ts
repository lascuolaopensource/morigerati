import { Media, Post } from '@/payload-types'

export function getMedia<T extends Media | Post['media']>(
  media: T | undefined | null | string,
): T | undefined {
  if (typeof media === 'string') throw new Error('Unexpected: Media is a string')
  if (!media) return undefined
  return media
}

export function getMediaArray(media: (string | Media)[] | null | undefined): Media[] {
  if (!media) return []
  return media.map(getMedia).filter((v) => v !== undefined)
}
