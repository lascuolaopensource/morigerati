//Boilerplate
import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
//Db
import { Articoli, type Testi as TestiType } from '@/payload-types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Globals } from '@/db/globals'
import { loadDb } from '@/utils/db'
//Utils
import { fetchGlobalData, fetchCollectionData } from '@/utils/dataFetching'
//Components
import ArticlesList from '@/components/articoli/ArticlesList'
import { RichText } from '@payloadcms/richtext-lexical/react'
//Locale
import { getLocale } from 'next-intl/server'

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
