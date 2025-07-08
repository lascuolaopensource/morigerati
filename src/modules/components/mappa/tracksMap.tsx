'use client'
import type { Tracciati } from '@/payload-types'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'

interface TracksMapProps {
  tracciati: Tracciati[]
  initialPosition?: [number, number]
  initialZoom?: number
}

// Importa il componente della mappa dinamicamente, evitando SSR
// che è una delle principali cause dei problemi di inizializzazione multipla
const TracksMapComponent = dynamic(() => import('./tracksMapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full rounded-lg border-2 border-gray-800 overflow-hidden">
      <div className="h-[350px] md:h-[400px] w-full z-0 flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Caricamento mappa...</p>
      </div>
    </div>
  ),
})

const TracksMap: React.FC<TracksMapProps> = ({ tracciati, initialPosition, initialZoom }) => {
  // Usa un ID univoco per ogni istanza della mappa
  // Quando la key cambia, React ricreerà completamente il componente
  const [mapKey, setMapKey] = useState<string>(() => `map-${Date.now()}`)

  // Nel caso servisse forzare un ricreazione della mappa
  const resetMap = () => {
    setMapKey(`map-${Date.now()}`)
  }

  // Se il componente è visibile
  const [isVisible, setIsVisible] = useState(true)

  // Se ci sono errori nel caricamento, prova a ripristinare la mappa
  useEffect(() => {
    // Se rileviamo che Leaflet sta causando errori nella console,
    // possiamo tentare un fix automatico
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('Map container is already initialized')) {
        setIsVisible(false)
        setTimeout(() => {
          setMapKey(`map-${Date.now()}`)
          setIsVisible(true)
        }, 50)
      }
    }

    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])

  if (!isVisible) {
    return (
      <div className=" rounded-lg border-2 border-gray-800 overflow-hidden">
        <div className="h-[350px] md:h-[400px] z-0 flex items-center justify-center bg-gray-100">
          <p className="text-gray-500">Ricaricamento mappa...</p>
        </div>
      </div>
    )
  }

  return (
    <TracksMapComponent
      key={mapKey}
      tracciati={tracciati}
      initialPosition={initialPosition}
      initialZoom={initialZoom}
    />
  )
}

export default TracksMap
