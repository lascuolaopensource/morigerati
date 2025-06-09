//Boilerplate
import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
//DB
import { loadDb } from '@/modules/utils/db'
import type { Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
//Components
import BackButton from '@/components/uiElements/backButton'
import Copertina from '@/components/uiElements/copertina'
import TagsList from '@/components/articoli/tagsList'
import Galleria from '@/components/galleria/galleria'
//Utils
import formatDate from '@/modules/utils/formatDate'
import { createMetadata } from '@/modules/seo'

//Locale
import { getMessages } from 'next-intl/server'
import { getLocale } from '@/modules/i18n'

//

interface PageProps {
  params: Promise<{ slug: string }>
}

async function load(pageProps: PageProps) {
  const { slug } = await pageProps.params
  const locale = await getLocale()
  const db = await loadDb()
  const { docs } = await db.find({
    collection: 'articoli',
    locale,
    where: { slug: { equals: slug } },
  })
  return { locale, articolo: docs.at(0) }
}

export default async function Articolo(pageProps: PageProps) {
  const { articolo, locale } = await load(pageProps)
  if (!articolo) notFound()
  const messages = await getMessages()

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

export async function generateMetadata(pageProps: PageProps): Promise<Metadata> {
  const { articolo, locale } = await load(pageProps)
  if (!articolo) notFound()

  return createMetadata({
    pathname: `articoli/${articolo.slug}`,
    title: articolo.titolo,
    locale,
  })
}
