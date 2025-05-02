//Boilerplate
import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
//DB
import { loadDb } from '@/utils/db'
import type { Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
//Components
import BackButton from '@/components/uiElements/backButton'
import Copertina from '@/components/uiElements/copertina'
import TagsList from '@/components/articoli/tagsList'
import Galleria from '@/components/galleria/galleria'
//Utils
import formatDate from '@/utils/formatDate'
import { createMetadata } from '@/utils/metadataHelpers'

//Locale
import { getLocale, getMessages } from 'next-intl/server'

interface ArticleParams {
  slug: string
}

interface PageProps {
  params: Promise<ArticleParams>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const locale = (await getLocale()) as 'it' | 'en'

  const db = await loadDb()
  const articoloData = await db.find({
    collection: 'articoli',
    locale: locale,
    where: { slug: { equals: slug } },
    depth: 2,
  })

  if (!articoloData.docs.length) {
    notFound()
    return {
      title:
        locale === 'it' ? 'Articolo non trovato | Morigerati' : 'Article not found | Morigerati',
    }
  }

  const articolo = articoloData.docs[0]

  return createMetadata(articolo, {
    pagePath: `articoli/${slug}`,
    titleField: 'titolo',
    defaultTitle: locale === 'it' ? 'Articolo' : 'Article',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it',
    locale,
  })
}

export default async function Articolo({ params }: PageProps) {
  const { slug } = await params
  const locale = (await getLocale()) as 'it' | 'en'
  const messages = await getMessages()

  const db = await loadDb()

  const articoloData = await db.find({
    collection: 'articoli',
    locale: locale,
    where: { slug: { equals: slug } },
    depth: 2,
  })

  const articolo = articoloData.docs[0]

  if (!articolo) {
    notFound()
  }

  return (
    <div className="bg-white pb-10">
      <div className="max-w-screen-xl mx-auto">
        {articolo.copertina && <Copertina copertina={articolo.copertina as Media} />}
        <div className="p-4 sm:px-36">
          <div className="flex justify-between items-center mb-4">
            <BackButton message={messages.backButton.articles} redirect="/articoli" />
          </div>
          <div className="pt-4"></div>
          {articolo.titolo ? (
            <h1 className="text-4xl font-bold mb-4">{articolo.titolo}</h1>
          ) : (
            <p></p>
          )}
          <TagsList tags={Array.isArray(articolo.tags) ? articolo.tags : []} locale={locale} />
          <p className="font-bold">
            {formatDate(articolo.data_pubblicazione, locale, true, locale)}
          </p>

          <RichText data={articolo.testo as SerializedEditorState} className="prose prose-lg" />
        </div>
        <div className="pt-4 sm:px-36">
          <Galleria items={articolo.galleria as Media[]} />
        </div>
      </div>
    </div>
  )
}
