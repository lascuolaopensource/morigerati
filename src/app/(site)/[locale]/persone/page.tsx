//Boilerplate
import React from 'react'
import { Metadata } from 'next'
//Locale
import { getLocale } from 'next-intl/server'
import { CollectionPage } from '#/components/pageLayout/collectionPage'
import { createCollectionsPagesMetadata } from '#/seo'

//

export async function generateMetadata(): Promise<Metadata> {
  return createCollectionsPagesMetadata('persone')
}

export default async function Page() {
  return <CollectionPage collection="persone" />
}
