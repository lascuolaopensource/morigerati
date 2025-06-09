import { Metadata } from 'next'
import { createMetadata } from './createMetadata'
import { getLocale } from '@/modules/i18n'
import { MainCollections } from '@/modules/types'
// import { loadDb } from '@/utils/db'

//

export async function createCollectionsPagesMetadata(
  collection: MainCollections,
): Promise<Metadata> {
  const locale = await getLocale()

  // Get collection-specific data from global texts
  // const testi = await db.findGlobal({ slug: 'testi', locale })
  // const db = await loadDb()
  // const collectionData = testi[collectionQuery]

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

  return createMetadata({
    title: defaultTitles[locale][collection],
    pathname: collection,
    locale,
  })
}
