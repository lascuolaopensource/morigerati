'use client'
import { Tracciati } from '@/payload-types'
import dynamic from 'next/dynamic'

interface TracksMapProps {
  tracciati: Tracciati[]
  initialPosition?: [number, number]
  initialZoom?: number
}

// Dynamically import the map component with no SSR
const TracksMapComponent = dynamic(() => import('./tracksMapComponent'), {
  ssr: false,
})

export const TracksMap: React.FC<TracksMapProps> = (props) => {
  return <TracksMapComponent {...props} />
}

export default TracksMap
