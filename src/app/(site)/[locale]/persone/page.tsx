//Boilerplate
import React from 'react'
import { Metadata } from 'next'
//Locale
import { getLocale } from 'next-intl/server'
import { CollectionPage } from '@/components/pageLayout/collectionPage'
import { getCollectionMetadata } from '@/utils/getCollectionMetadata'

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as 'it' | 'en'
  return getCollectionMetadata('persone', locale)
}

export default async function Page() {
  return <CollectionPage collection="persone" />
}
