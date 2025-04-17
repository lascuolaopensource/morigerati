import React from 'react'
import CardGrid from '@/components/card/cardsGrid'

interface RelatedItinerariesProps {
  itinerari: any[]
  messageTitle: string
}

export default function RelatedItineraries({ itinerari, messageTitle }: RelatedItinerariesProps) {
  if (!itinerari || itinerari.length === 0) {
    return null
  }

  return (
    <div className="mt-12 mb-16">
      <h2 className="text-2xl font-semibold mb-6 text-center">{messageTitle}</h2>
      <div className="bg-luogoColor/5 p-6 rounded-lg">
        <CardGrid items={itinerari} category="itinerari" />
      </div>
    </div>
  )
}
