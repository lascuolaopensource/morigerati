import { Metadata } from 'next'
import { loadDb } from '@/utils/db'
import StringToHTML from '@/components/serializer/stringToHTML'
import { RandomPixel } from '@/components/uiElements/pixels'
import Copertina from '@/components/uiElements/copertina'
import { type Media } from '@/payload-types'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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

export default async function ChiSiamo() {
  const db = await loadDb()
  const chiSiamo = await db.findGlobal({
    slug: 'chi_siamo',
  })

  return (
    <main className="max-w-screen-xl mx-auto pb-4">
      {chiSiamo.copertina && <Copertina copertina={chiSiamo.copertina as Media | undefined} />}
      <div className="relative p-3 pt-5 max-w-screen-xl mx-auto">
        <RandomPixel />
        <StringToHTML htmlString={chiSiamo.testo_html ?? ''} />
      </div>
    </main>
  )
} 