import React from 'react'
import { Metadata } from 'next'
import { loadDb } from '@/utils/db'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import ContentPageLayout from '@/components/pageLayout/ContentPageLayout'
import { getLocale } from '@/utils/i18n'
import { createMetadata } from '@/modules/seo'

//

async function load() {
  const locale = await getLocale()
  const db = await loadDb()
  const chiSiamo = await db.findGlobal({
    slug: 'chi_siamo',
    locale,
  })
  return { chiSiamo, locale }
}

export default async function ChiSiamo() {
  const { chiSiamo } = await load()

  return (
    <ContentPageLayout
      coverImage={chiSiamo.copertina}
      richTextContent={chiSiamo.testo_chi_siamo as SerializedEditorState}
      galleryItems={chiSiamo.galleria}
    />
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const { chiSiamo, locale } = await load()
  return createMetadata({
    doc: chiSiamo,
    locale,
    // TODO - Load from translations
    title: locale === 'it' ? 'Chi Siamo' : 'About Us',
  })
}
