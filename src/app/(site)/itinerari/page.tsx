import React from 'react'
import CardsPage from '@/components/card/cardsPage'

export default function Page() {
  return <CardsPage collectionQuery="itinerari" displayAs="grid" />
}

export const dynamic = 'force-dynamic'
