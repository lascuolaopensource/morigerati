import React from 'react'
import { Metadata } from 'next'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { loadDb } from '#/utils/db'
import { createMetadata } from '#/seo'
import ArticlesList from './_partials/ArticlesList'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getLocale } from '#/i18n'

//

async function load() {
  const locale = await getLocale()
  const db = await loadDb()
  const testi = await db.findGlobal({ slug: 'testi' })
  return { locale, testi: testi.articoli, db }
}

export default async function ArticoliPage() {
  const { locale, testi, db } = await load()
  const articoli = await db.find({
    collection: 'articoli',
    locale,
    sort: '-createdAt',
  })

  return (
    <main className="max-w-screen-xl mx-auto pb-16 px-4 md:px-6">
      {/* Page Header */}
      <div className="text-center py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{testi.title}</h1>
        <div className="max-w-2xl mx-auto">
          <RichText
            data={testi.testo as SerializedEditorState}
            className="prose prose-sm md:prose-base mx-auto"
          />
        </div>
      </div>

      {/* Articles List */}
      <ArticlesList articles={articoli.docs} />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const { locale, testi } = await load()

  return createMetadata({
    pathname: 'articoli',
    title: testi.title,
    locale,
  })
}
