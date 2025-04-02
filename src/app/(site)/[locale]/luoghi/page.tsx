import React from 'react'
import CardsPage from '@/components/card/cardsPage'
import { Locale } from '@/utils/localization'

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params
  return <CardsPage collectionQuery="luoghi" displayAs="grid" locale={locale} />
}

export const dynamic = 'force-dynamic'
