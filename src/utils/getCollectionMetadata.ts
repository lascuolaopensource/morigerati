import { Metadata } from 'next'
import { createMetadata } from './metadataHelpers'
import { fetchGlobalData } from './dataFetching'
import { Globals } from '@/db/globals'
import { type Testi as TestiType } from '@/payload-types'

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
