//Boilerplate
import React from 'react'
import { Metadata } from 'next'
//Components
import CardsPage, { getCollectionMetadata } from '@/components/card/cardsPage'
//Locale
import { getLocale } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as 'it' | 'en'
  return getCollectionMetadata('itinerari', locale)
}

export default async function Page() {
  const locale = (await getLocale()) as 'it' | 'en'
  return <CardsPage collectionQuery="itinerari" displayAs="grid" locale={locale} />
}
