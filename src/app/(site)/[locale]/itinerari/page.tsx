import { Metadata } from 'next'
//Components
import { getCollectionMetadata } from '@/components/card/cardsPage'
//Locale
import { getLocale } from 'next-intl/server'
import { CollectionPage } from '@/components/pageLayout/collectionPage'

//

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as 'it' | 'en'
  return getCollectionMetadata('itinerari', locale)
}

export default async function Page() {
  return <CollectionPage collection="itinerari" />
}
