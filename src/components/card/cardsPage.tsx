//Boilerplate
import React from 'react'
//Locale
import { getLocale } from 'next-intl/server'
//DB
import { Globals } from '@/db/globals'
import { type Testi as TestiType } from '@/payload-types'
//Utils
import { fetchGlobalData, fetchCollectionData } from '@/utils/dataFetching'
import { createMetadata } from '@/utils/metadataHelpers'
//Components
import ArchivePageLayout from '@/components/pageLayout/ArchivePageLayout'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Metadata } from 'next'

// Force dynamic rendering and disable cache to ensure fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface CardsPageProps {
  collectionQuery: 'luoghi' | 'persone' | 'itinerari' | 'residenze'
  displayAs?: 'row' | 'grid'
  locale?: 'it' | 'en'
  generateSeoMetadata?: boolean
}

// Helper function to get metadata for a collection
export async function getCollectionMetadata(
  collectionQuery: 'luoghi' | 'persone' | 'itinerari' | 'residenze',
  locale: 'it' | 'en',
): Promise<Metadata> {
  const testi = await fetchGlobalData<TestiType>(Globals.Testi, locale)

  // Get collection-specific data from global texts
  const collectionData = testi[collectionQuery]

  // Create default collection titles based on locale
  const defaultTitles = {
    it: {
      luoghi: 'Luoghi',
      persone: 'Persone',
      itinerari: 'Itinerari',
      residenze: 'Residenze Artistiche',
    },
    en: {
      luoghi: 'Places',
      persone: 'People',
      itinerari: 'Itineraries',
      residenze: 'Artist Residencies',
    },
  }

  return createMetadata(collectionData, {
    pagePath: collectionQuery,
    titleField: 'title',
    defaultTitle: defaultTitles[locale][collectionQuery],
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://transluighiecomuseo.it',
    locale,
  })
}

const CardsPage: React.FC<CardsPageProps> = async ({ collectionQuery, displayAs = 'grid' }) => {
  const locale = (await getLocale()) as 'it' | 'en'
  // Fetch the global texts with the specified locale
  const testi = await fetchGlobalData<TestiType>(Globals.Testi, locale)

  // Fetch items from the specified collection with the specified locale
  const result = await fetchCollectionData(collectionQuery, { sort: 'nome', depth: 2, locale })

  const title = testi[collectionQuery].title || ''

  return (
    <ArchivePageLayout
      title={title}
      introContent={testi[collectionQuery].testo as SerializedEditorState}
      cardGridOptions={{
        items: result.docs,
        category: collectionQuery,
        singleRow: displayAs === 'row',
      }}
      colorTheme={collectionQuery}
    />
  )
}

export default CardsPage
