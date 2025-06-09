import React from 'react'
import DynamicMappa from '@/components/mappa/mapLoader'
import { LatLngTuple } from 'leaflet'
import { cn } from '@/modules/utils/utils'

interface Props {
  position: LatLngTuple
  className?: string
}

export default function LuogoMap({ position, className }: Props) {
  const classes = cn('h-[500px] flex items-center justify-center', className)
  return (
    <div className={classes}>
      <DynamicMappa initialPosition={position} initialZoom={15} showPositionPin={true} />
    </div>
  )
}
