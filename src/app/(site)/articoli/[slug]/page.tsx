import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import BackButton from '@/components/uiElements/backButton'
import { notFound } from 'next/navigation'
import { Media, Articoli } from '@/payload-types'
import { Metadata } from 'next'

import datePharser from '@/utils/formatDate'
import Copertina from '@/components/uiElements/copertina'
import TagsList from '@/components/articoli/tagsList'
import Galleria from '@/components/galleria/galleria'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const db = await loadDb()
  const articoli = await db.find({
    collection: 'articoli',
    depth: 2,
  })

  const articoloData = articoli.docs.find((a) => a.id === slug)

  if (!articoloData) {
    notFound()
    return {
      title: 'Articolo non trovato | Morigerati',
    }
  }

  const metaImage = articoloData?.meta?.image
  const imageUrl = metaImage && typeof metaImage !== 'string' ? metaImage.url : undefined
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it'
  return {
    title: `${articoloData.titolo} | Morigerati`,
    description: articoloData.meta?.description,
    openGraph: {
      title: articoloData?.meta?.title ?? articoloData.titolo ?? 'Morigerati',
      description: articoloData?.meta?.description || undefined,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      url: `${baseUrl}/articoli/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: articoloData?.meta?.title ?? articoloData.titolo ?? 'Morigerati',
      description: articoloData?.meta?.description || undefined,
      images: imageUrl ? [imageUrl] : undefined,
    },
    metadataBase: new URL(baseUrl),
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Articolo({ params }: { params: { slug: string } }) {
  const { slug } = params
  const db = await loadDb()
  const articoli = await db.find({
    collection: 'articoli',
    depth: 2,
  })

  const articoloData = articoli.docs.find((a) => a.id === slug)

  if (!articoloData) {
    notFound()
  }

  return (
    <div className="bg-white pb-10">
      <div className="max-w-screen-xl mx-auto">
        {articoloData.copertina && (
          <Copertina copertina={articoloData.copertina as Media | undefined} />
        )}
        <div className="p-4 sm:px-36">
          <BackButton />
          <div className="pt-4"></div>
          {articoloData.titolo ? (
            <h1 className="text-4xl font-bold mb-4">{articoloData.titolo}</h1>
          ) : (
            <p></p>
          )}
          <TagsList tags={articoloData.tags?.map((tagObj) => tagObj.tag) ?? []} />
          <p className="font-bold">{datePharser(articoloData.data_pubblicazione, '', true)}</p>

          <RichText data={articoloData.testo as SerializedEditorState} className="prose prose-lg" />
        </div>
        <div className="pt-4 sm:px-36">
          <Galleria items={articoloData.galleria as Media[] | undefined} />
        </div>
      </div>
    </div>
  )
}
