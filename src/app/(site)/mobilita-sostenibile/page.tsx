import { Metadata } from 'next'
import { loadDb } from '@/utils/db'
// ... existing imports ...

export async function generateMetadata(): Promise<Metadata> {
  const db = await loadDb()
  const mobilitaSostenibile = await db.findGlobal({
    slug: 'mobilita_sostenibile',
  })

  const metaImage = mobilitaSostenibile?.meta?.image
  const imageUrl = metaImage && typeof metaImage !== 'string' ? metaImage.url : undefined
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it'
  return {
    title: mobilitaSostenibile?.meta?.title ?? 'Mobilità Sostenibile | Morigerati',
    description: mobilitaSostenibile?.meta?.description || undefined,
    openGraph: {
      title: mobilitaSostenibile?.meta?.title ?? 'Mobilità Sostenibile | Morigerati',
      description: mobilitaSostenibile?.meta?.description || undefined,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      url: `${baseUrl}/mobilita-sostenibile`,
    },
    twitter: {
      card: 'summary_large_image',
      title: mobilitaSostenibile?.meta?.title ?? 'Mobilità Sostenibile | Morigerati',
      description: mobilitaSostenibile?.meta?.description || undefined,
      images: imageUrl ? [imageUrl] : undefined,
    },
    metadataBase: new URL(baseUrl),
  }
}

// ... rest of the page component 