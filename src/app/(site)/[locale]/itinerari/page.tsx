import { Metadata } from 'next'
import { CollectionPage } from '@/components/pageLayout/collectionPage'
import { createCollectionsPagesMetadata } from '@/modules/seo/createCollectionsPagesMetadata'

//

export async function generateMetadata(): Promise<Metadata> {
  return createCollectionsPagesMetadata('itinerari')
}

export default async function Page() {
  return <CollectionPage collection="itinerari" />
}
