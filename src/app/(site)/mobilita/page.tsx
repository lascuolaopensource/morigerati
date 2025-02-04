import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'

import { RandomPixel } from '@/components/uiElements/pixels'
import Copertina from '@/components/uiElements/copertina'
import { type Media } from '@/payload-types'
import Galleria from '@/components/galleria/galleria'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata() {
  const db = await loadDb()
  const mobilita = await db.findGlobal({
    slug: 'mobilita_sostenibile',
  })

  const metaImage = mobilita?.meta?.image
  const imageUrl = metaImage && typeof metaImage !== 'string' ? metaImage.url : undefined
  const baseUrl = 'https://transluighiecomuseo.it'

  return {
    title: mobilita?.meta?.title,
    description: mobilita.meta?.description,
    openGraph: {
      title: mobilita?.meta?.title,
      description: mobilita?.meta?.description || undefined,
      images: imageUrl ?? undefined,
      url: 'https://transluighiecomuseo.it/mobilita',
    },
    twitter: {
      card: 'summary_large_image',
      title: mobilita?.meta?.title,
      description: mobilita?.meta?.description || undefined,
      images: imageUrl ? [imageUrl] : undefined,
    },
    metadataBase: new URL(baseUrl),
  }
}

const Mobilita = async () => {
  const db = await loadDb()
  const mobilita = await db.findGlobal({
    slug: 'mobilita_sostenibile',
  })

  return (
    <main className="max-w-screen-xl mx-auto pb-4">
      {mobilita.copertina && <Copertina copertina={mobilita.copertina as Media | undefined} />}
      <div className="relative p-3 pt-5 max-w-screen-xl mx-auto">
        <RandomPixel />
        <RichText data={mobilita.testo as SerializedEditorState} className="prose prose-lg" />
      </div>
      <div className="p-4">
        <Galleria items={mobilita.galleria as Media[] | undefined} />
      </div>
    </main>
  )
}

export default Mobilita
