import React from 'react'
import CardsPage from '@/components/card/cardsPage'

export default function Page() {
  return <CardsPage collectionQuery="itinerari" cardTitlePosition="top" />
}

export const dynamic = 'force-dynamic'
