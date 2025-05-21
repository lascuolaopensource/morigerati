//Boilerplate
import React from 'react'
import { Metadata } from 'next'

//DB
import { loadDb } from '@/utils/db'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

//Components
import ContentPageLayout from '@/components/pageLayout/ContentPageLayout'
import { RandomLetter } from '@/components/home/randomLetter'
//Locale
import { getLocale } from 'next-intl/server'
import { createMetadata } from '@/utils/metadataHelpers'

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as 'it' | 'en'
  const db = await loadDb()
  const chiSiamo = await db.findGlobal({
    slug: 'chi_siamo',
    locale,
  })

  // The SEO plugin in Payload should already populate meta.title, meta.description, meta.image
  return createMetadata(chiSiamo, {
    pagePath: `${locale === 'it' ? 'chi-siamo' : 'about'}`,
    titleField: 'chi_siamo', // Fallback if meta.title is not available
    defaultTitle: locale === 'it' ? 'Chi Siamo' : 'About Us',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it',
    locale,
  })
}

export default async function ChiSiamo() {
  const locale = (await getLocale()) as 'it' | 'en'
  const db = await loadDb()
  const chiSiamo = await db.findGlobal({
    slug: 'chi_siamo',
    locale,
  })

  return (
    <ContentPageLayout
      coverImage={chiSiamo.copertina}
      richTextContent={chiSiamo.testo_chi_siamo as SerializedEditorState}
      galleryItems={chiSiamo.galleria}
    />
  )
}
