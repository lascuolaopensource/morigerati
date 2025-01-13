import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import { Metadata } from 'next'
import { RandomPixel } from '@/components/uiElements/pixels'
import StringToHTML from '@/components/serializer/stringToHTML'
import Copertina from '@/components/uiElements/copertina'
import { type Media } from '@/payload-types'
import Galleria from '@/components/galleria/galleria'

export async function generateMetadata(): Promise<Metadata> {
  const db = await loadDb()
  const about = await db.findGlobal({
    slug: 'chi_siamo',
  })

  const metaImage = about?.meta?.image
  const imageUrl = metaImage && typeof metaImage !== 'string' ? metaImage.url : undefined
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it'
  return {
    title: about?.meta?.title ?? 'About | Morigerati',
    description: about?.meta?.description || undefined,
    openGraph: {
      title: about?.meta?.title ?? 'About | Morigerati',
      description: about?.meta?.description || undefined,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      url: `${baseUrl}/about`,
    },
    twitter: {
      card: 'summary_large_image',
      title: about?.meta?.title ?? 'About | Morigerati',
      description: about?.meta?.description || undefined,
      images: imageUrl ? [imageUrl] : undefined,
    },
    metadataBase: new URL(baseUrl),
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

const About = async () => {
  const db = await loadDb()
  const about = await db.findGlobal({
    slug: 'chi_siamo',
  })
  return (
    <main className="max-w-screen-xl mx-auto pb-4">
      {about.copertina && <Copertina copertina={about.copertina as Media | undefined} />}
      <div className="relative  p-3 pt-5 max-w-screen-xl mx-auto">
        <RandomPixel />
        <StringToHTML htmlString={about.testo_html ?? ''} />
      </div>
      <div className="p-4">
        <Galleria items={about.galleria as Media[] | undefined} />
      </div>
    </main>
  )
}

export default About
