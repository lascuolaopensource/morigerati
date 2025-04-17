import React from 'react'
import DynamicMappa from '@/components/mappa/mapLoader'
import { LatLngTuple } from 'leaflet'

interface LuogoMapProps {
  position: LatLngTuple
}

export default function LuogoMap({ position }: LuogoMapProps) {
  return (
    <div className="h-[500px] flex items-center justify-center">
      <DynamicMappa initialPosition={position} initialZoom={14} showPositionPin={true} />
    </div>
  )
} 