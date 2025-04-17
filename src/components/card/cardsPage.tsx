import React from 'react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { fetchGlobalData, fetchCollectionData } from '@/utils/dataFetching'
import ArchivePageLayout from '@/components/pageLayout/ArchivePageLayout'
import { type Testi as TestiType } from '@/payload-types'
import { getLocale } from 'next-intl/server'
import { Globals } from '@/db/globals'

// Force dynamic rendering and disable cache to ensure fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface CardsPageProps {
  collectionQuery: 'luoghi' | 'persone' | 'itinerari' | 'residenze'
  displayAs?: 'row' | 'grid'
  locale?: 'it' | 'en'
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
