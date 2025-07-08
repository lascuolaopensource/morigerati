import { Suspense } from 'react'
import { Tracciati as TracciatiType } from '@/payload-types'
import type { Luoghi } from '@/payload-types'
import TracksMap from '@/modules/components/mappa/tracksMap'

import { loadDb } from '@/modules/utils/db'

interface HomeTracksSectionProps {
  title?: string

  tracciati: TracciatiType[]
}

// Loading translations
const loadingText = {
  it: 'Caricamento mappa...',
  en: 'Loading map...',
}

async function getLuoghiFromItinerari(tracciati: TracciatiType[]) {
  const db = await loadDb()

  // First, let's get all itinerari since the relationship might be in either direction
  const itinerari = await db.find({
    collection: 'itinerari',
    depth: 2,
  })

  // Filter itinerari that have one of our tracciati
  const relevantItinerari = itinerari.docs.filter((itinerario) => {
    const tracciato = itinerario.tracciato_gpx
    if (!tracciato) return false
    const tracciato_id = typeof tracciato === 'string' ? tracciato : tracciato.id
    return tracciati.some((t) => t.id === tracciato_id)
  })

  // Get all luoghi from the itinerari
  const luoghi = relevantItinerari.flatMap((itinerario) => {
    return (
      itinerario.luoghi
        ?.map((luogo) => {
          return typeof luogo === 'string' ? null : luogo
        })
        .filter((l): l is Luoghi => {
          const isValid = l !== null && l.posizione !== null

          return isValid
        }) ?? []
    )
  })

  return luoghi
}

// Server component that fetches data
async function TracksMapSection({ tracciati }: { tracciati: TracciatiType[] }) {
  if (!tracciati || tracciati.length === 0) return null

  return <TracksMap tracciati={tracciati} />
}

export const HomeTracksSection = ({ tracciati }: HomeTracksSectionProps) => {
  if (!tracciati || tracciati.length === 0) return null

  return (
    <Suspense>
      <TracksMapSection tracciati={tracciati} />
    </Suspense>
  )
}
