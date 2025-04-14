//Boilerplate
import React from 'react'
//Components
import CardsPage from '@/components/card/cardsPage'

export default async function Page() {
  return <CardsPage collectionQuery="luoghi" displayAs="grid" />
}
