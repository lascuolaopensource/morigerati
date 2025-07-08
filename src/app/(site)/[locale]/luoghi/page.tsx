import { CollectionPage } from '#/components/pageLayout/collectionPage'
import { createCollectionsPagesMetadata } from '#/seo'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return createCollectionsPagesMetadata('luoghi')
}

export default function Page() {
  return <CollectionPage collection="luoghi" />
}
