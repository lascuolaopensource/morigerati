import React from 'react'
import CardsPage from '@/components/card/cardsPage'

export default function Page() {
  return <CardsPage collectionQuery="stakeholders" />
}

export const dynamic = 'force-dynamic'
