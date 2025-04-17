import React from 'react'
import { ServiziCardWrapper } from '@/components/itinerari/servizioCardWrapper'

interface ServiziSectionProps {
  servizi: any
}

export default function ServiziSection({ servizi }: ServiziSectionProps) {
  if (!servizi || !Array.isArray(servizi) || servizi.length === 0) {
    return null
  }

  return (
    <div>
      <ServiziCardWrapper servizi={servizi} />
    </div>
  )
}
