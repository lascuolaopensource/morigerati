import React from 'react'
import { Metadata } from 'next'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { loadDb } from '@/utils/db'
import ContentPageLayout from '@/components/pageLayout/ContentPageLayout'
import { getLocale } from '@/modules/i18n'
import { createMetadata } from '@/modules/seo'

//

async function load() {
  const locale = await getLocale()
  const db = await loadDb()
  const mobilita = await db.findGlobal({
    slug: 'mobilita_sostenibile',
    locale,
  })
  return { mobilita, locale }
}

export default async function Mobilita() {
  const { mobilita } = await load()

  return (
    <ContentPageLayout
      coverImage={mobilita.copertina}
      richTextContent={mobilita.testo as SerializedEditorState}
      galleryItems={mobilita.galleria}
    />
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const { mobilita, locale } = await load()

  return createMetadata({
    doc: mobilita,
    // TODO - Load from translations
    title: locale === 'it' ? 'Mobilità Sostenibile' : 'Sustainable Mobility',
    locale,
  })
}
