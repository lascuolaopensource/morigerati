import { Metadata } from 'next'
import { getLocale } from 'next-intl/server'

interface GenerateMetadataParams {
  title: string
  description?: string
  imageUrl?: string
  collection: string
  slug: string
  baseUrl?: string
}

export async function generateMetadataForPage({
  title,
  description,
  imageUrl,
  collection,
  slug,
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it',
}: GenerateMetadataParams): Promise<Metadata> {
  const locale = (await getLocale()) as 'it' | 'en'

  return {
    title: `${title} | Morigerati`,
    description,
    openGraph: {
      title: title,
      description,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      url: `${baseUrl}/${locale}/${collection}/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    metadataBase: new URL(baseUrl),
  }
}
