import React from 'react'
import { Metadata } from 'next'
import { Articoli, type Testi as TestiType } from '@/payload-types'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { fetchGlobalData, fetchCollectionData } from '@/utils/dataFetching'
import { createMetadata } from '@/utils/metadataHelpers'
import { RichText } from '@payloadcms/richtext-lexical/react'
import ArticlesList from '@/components/articoli/ArticlesList'
import { Locale, isValidLocale } from '@/utils/localization'
import { notFound } from 'next/navigation'
import { Globals } from '@/db/globals'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface LocaleParams {
  locale: string
}

interface ArticoliPageProps {
  params: Promise<LocaleParams>
}

/**
 * Fetch global page texts
 */
async function fetchPageTexts(locale: Locale): Promise<TestiType> {
  return await fetchGlobalData<TestiType>(Globals.Testi, locale)
}

/**
 * Fetch articles collection
 */
async function fetchArticles(locale: Locale): Promise<Articoli[]> {
  const articlesData = await fetchCollectionData<Articoli>('articoli', {
    sort: '-createdAt', // Sort by newest first
    locale: locale,
  })
  return articlesData.docs
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({ params }: ArticoliPageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) {
    notFound()
  }

  const testi = await fetchPageTexts(locale)
  return createMetadata(
    { meta: { title: testi.articoli.title, description: null, image: null } },
    { defaultTitle: locale === 'en' ? 'Articles' : 'Articoli', pagePath: 'articoli' },
  )
}

/**
 * Articles page component with a clean list layout
 */
const TuttiArticoliPage = async ({ params }: ArticoliPageProps) => {
  const { locale } = await params
  if (!isValidLocale(locale)) {
    notFound()
  }

  const testi = await fetchPageTexts(locale)
  const articoli = await fetchArticles(locale)

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
      <ArticlesList articles={articoli} locale={locale} />
    </main>
  )
}

export default TuttiArticoliPage
