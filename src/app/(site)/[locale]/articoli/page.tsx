//Boilerplate
import React from 'react'
import { Metadata } from 'next'

//Db
import { type Testi as TestiType } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Globals } from '@/db/globals'
import { loadDb } from '@/utils/db'
//Utils
import { fetchGlobalData } from '@/utils/dataFetching'
import { createMetadata } from '@/utils/metadataHelpers'
//Components
import ArticlesList from '@/components/articoli/ArticlesList'
import { RichText } from '@payloadcms/richtext-lexical/react'
//Locale
import { getLocale } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as 'en' | 'it'
  const testi = await fetchGlobalData<TestiType>(Globals.Testi, locale)

  return createMetadata(testi.articoli, {
    pagePath: 'articoli',
    defaultTitle: locale === 'it' ? 'Articoli' : 'Articles',
    titleField: 'title', // Using the title field from testi.articoli if available
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it',
    locale,
  })
}

export default async function ArticoliPage() {
  const db = await loadDb()
  const locale = (await getLocale()) as 'en' | 'it'
  const articoli = await db.find({
    collection: 'articoli',
    locale: locale,
    sort: '-createdAt',
  })
  const testi = await fetchGlobalData<TestiType>(Globals.Testi, locale)

  return (
    <main className="max-w-screen-xl mx-auto pb-16 px-4 md:px-6">
      {/* Page Header */}
      <div className="text-center py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{testi.articoli.title}</h1>
        <div className="max-w-2xl mx-auto">
          <RichText
            data={testi.articoli.testo as SerializedEditorState}
            className="prose prose-sm md:prose-base mx-auto"
          />
        </div>
      </div>

      {/* Articles List */}
      <ArticlesList articles={articoli.docs} />
    </main>
  )
}
