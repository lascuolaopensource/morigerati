import { Metadata } from 'next'
import type { Media } from '@/payload-types'
import { getMediaUrl } from './media'

// Type for objects with basic meta properties
export interface WithMeta {
  meta?: {
    title?: string | null
    description?: string | null
    image?: string | Media | null
  }
  [key: string]: any
}

/**
 * Creates standardized metadata for any page
 *
 * @param data - Object containing meta properties
 * @param options - Configuration options for metadata
 * @returns Next.js Metadata object
 */
export function createMetadata(
  data: WithMeta,
  options: {
    baseUrl?: string
    defaultTitle?: string
    pagePath?: string
    titleField?: string // For collection items that have a custom title field like 'nome' or 'titolo'
    locale?: string // Add locale parameter
  },
): Metadata {
  const {
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it',
    defaultTitle = 'Morigerati',
    pagePath = '',
    titleField,
    locale = 'it',
  } = options

  // Get title from meta, or from the specified field, or use default
  const pageTitle = data?.meta?.title || (titleField && data?.[titleField]) || defaultTitle

  // Full title with site name if not already included
  const fullTitle = pageTitle.includes('Morigerati') ? pageTitle : `${pageTitle} | Morigerati`

  const description = data?.meta?.description || undefined

  // Get image URL safely using the utility function
  const metaImage = data?.meta?.image
  const imageUrl = metaImage ? getMediaUrl(metaImage) : undefined

  // Create the full URL for the page - with locale support
  const url = pagePath ? `${baseUrl}/${locale}/${pagePath}` : baseUrl

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    metadataBase: new URL(baseUrl),
  }
}
