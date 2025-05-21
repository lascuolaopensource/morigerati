//Boilerplate
import React from 'react'
import { Metadata } from 'next'
//DB
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { loadDb } from '@/utils/db'
//Components
import ContentPageLayout from '@/components/pageLayout/ContentPageLayout'
//Locale
import { getLocale } from 'next-intl/server'
import { RandomLetter } from '@/components/home/randomLetter'
//Metadata
import { createMetadata } from '@/utils/metadataHelpers'

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as 'it' | 'en'
  const db = await loadDb()
  const mobilita = await db.findGlobal({
    slug: 'mobilita_sostenibile',
    locale: locale,
  })

  return createMetadata(mobilita, {
    pagePath: 'mobilita',
    titleField: 'mobilita_sostenibile',
    defaultTitle: locale === 'it' ? 'Mobilità Sostenibile' : 'Sustainable Mobility',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it',
    locale,
  })
}

const Mobilita = async () => {
  const locale = (await getLocale()) as 'it' | 'en'
  const db = await loadDb()
  const mobilita = await db.findGlobal({
    slug: 'mobilita_sostenibile',
    locale: locale,
  })

  return (
    <ContentPageLayout
      coverImage={mobilita.copertina}
      richTextContent={mobilita.testo as SerializedEditorState}
      galleryItems={mobilita.galleria}
    />
  )
}

export default Mobilita
