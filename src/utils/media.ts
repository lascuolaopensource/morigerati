import type { Media } from '@/payload-types'

/**
 * Type representing null or undefined values
 */
type None = null | undefined

/**
 * Default fallback image to use when media is not available
 */
const DEFAULT_FALLBACK = '/placeholder-image.jpg'

/**
 * Extracts the URL from a Media object or string
 *
 * @param media - Media object, string URL, or null/undefined
 * @param fallbackUrl - Optional fallback URL if media is not available
 * @returns URL string or fallback URL or undefined
 */
export function getMediaUrl(
  media: string | Media | None,
  fallbackUrl?: string,
): string | undefined {
  // If media is a Media object with url property
  if (media && typeof media !== 'string' && 'url' in media) {
    return media.url || undefined
  }

  // If media is a direct string URL
  if (typeof media === 'string') {
    return media
  }

  // Return fallback if provided
  if (fallbackUrl) {
    return fallbackUrl
  }

  // Return undefined if no valid media and no fallback
  return undefined
}

/**
 * Determines if a media object is a video
 *
 * @param media - Media object to check
 * @returns True if the media is a video, false otherwise
 */
export function isVideo(media: Media | None): boolean {
  if (!media) return false
  return (typeof media !== 'string' && media.mimeType?.startsWith('video/')) || false
}

/**
 * Gets appropriate alt text for a media object
 *
 * @param media - Media object
 * @param fallback - Fallback alt text if not available in media
 * @returns Alt text string
 */
export function getMediaAlt(media: Media | None, fallback = 'Image'): string {
  if (!media || typeof media === 'string') return fallback
  return media.alt || fallback
}
