import { Metadata } from 'next'
import { loadDb } from '@/utils/db'
// ... existing imports ...

export async function generateMetadata(): Promise<Metadata> {
  const db = await loadDb()
  const chiSiamo = await db.findGlobal({
    slug: 'chi_siamo',
  })

  const metaImage = chiSiamo?.meta?.image
  const imageUrl = metaImage && typeof metaImage !== 'string' ? metaImage.url : undefined
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it'
  return {
    title: chiSiamo?.meta?.title ?? 'Chi Siamo | Morigerati',
    description: chiSiamo?.meta?.description || undefined,
    openGraph: {
      title: chiSiamo?.meta?.title ?? 'Chi Siamo | Morigerati',
      description: chiSiamo?.meta?.description || undefined,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      url: `${baseUrl}/chi-siamo`,
    },
    twitter: {
      card: 'summary_large_image',
      title: chiSiamo?.meta?.title ?? 'Chi Siamo | Morigerati',
      description: chiSiamo?.meta?.description || undefined,
      images: imageUrl ? [imageUrl] : undefined,
    },
    metadataBase: new URL(baseUrl),
  }
}

// ... rest of the page component 