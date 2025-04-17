//Boilerplate
import React from 'react'
//Components
import CardsPage from '@/components/card/cardsPage'
//Locale
import { getLocale } from 'next-intl/server'

export default async function Page() {
  const locale = (await getLocale()) as 'it' | 'en'
  return <CardsPage collectionQuery="itinerari" displayAs="grid" locale={locale} />
}
