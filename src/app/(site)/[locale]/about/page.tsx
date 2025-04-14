//Boilerplate
import React from 'react'
import { Metadata } from 'next'
//DB
import { loadDb } from '@/utils/db'
import { type ChiSiamo as ChiSiamoType } from '@/payload-types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { fetchGlobalData } from '@/utils/dataFetching'
import { createMetadata } from '@/utils/metadataHelpers'
//Components
import ContentPageLayout from '@/components/pageLayout/ContentPageLayout'
import { RandomLetter } from '@/components/home/randomLetter'
import { Globals } from '@/db/globals'
//Locale
import { getLocale, getMessages } from 'next-intl/server'

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
    >
      {' '}
      <main className="max-w-screen-xl mx-auto relative py-8">
        <RandomLetter color="articoli" position={'right'} />
      </main>
    </ContentPageLayout>
  )
}
