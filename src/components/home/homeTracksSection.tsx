import { Suspense } from 'react'
import { Tracciati as TracciatiType, Luoghi } from '@/payload-types'
import TracksMap from '@/components/mappa/tracksMap'
import StringToHTML from '@/components/serializer/stringToHTML'
import { loadDb } from '@/utils/db'

interface HomeTracksSectionProps {
  title?: string
  text_html?: string
  tracciati: TracciatiType[]
}

async function getLuoghiFromItinerari(tracciati: TracciatiType[]) {
  const db = await loadDb()
  console.log(
    'Searching for itinerari with tracciati IDs:',
    tracciati.map((t) => t.id),
  )

  // First, let's get all itinerari since the relationship might be in either direction
  const itinerari = await db.find({
    collection: 'itinerari',
    depth: 2,
  })

  console.log(
    'Found all itinerari:',
    itinerari.docs.map((i) => ({
      id: i.id,
      nome: i.nome,
      tracciato_gpx: i.tracciato_gpx,
      luoghi: i.luoghi,
    })),
  )

  // Filter itinerari that have one of our tracciati
  const relevantItinerari = itinerari.docs.filter((itinerario) => {
    const tracciato = itinerario.tracciato_gpx
    if (!tracciato) return false
    const tracciato_id = typeof tracciato === 'string' ? tracciato : tracciato.id
    return tracciati.some((t) => t.id === tracciato_id)
  })

  console.log(
    'Filtered itinerari:',
    relevantItinerari.map((i) => ({
      id: i.id,
      nome: i.nome,
      luoghi: i.luoghi,
    })),
  )

  // Get all luoghi from the itinerari
  const luoghi = relevantItinerari.flatMap((itinerario) => {
    console.log(`Processing itinerario "${itinerario.nome}":`, {
      luoghi: itinerario.luoghi,
      isArray: Array.isArray(itinerario.luoghi),
      length: itinerario.luoghi?.length,
    })

    return (
      itinerario.luoghi
        ?.map((luogo) => {
          console.log('Processing luogo:', luogo, typeof luogo)
          return typeof luogo === 'string' ? null : luogo
        })
        .filter((l): l is Luoghi => {
          const isValid = l !== null && l.posizione !== null
          console.log('Luogo valid?', isValid, l?.nome, l?.posizione)
          return isValid
        }) ?? []
    )
  })

  console.log(
    'Final luoghi list:',
    luoghi.map((l) => ({
      id: l.id,
      nome: l.nome,
      posizione: l.posizione,
    })),
  )
  return luoghi
}

// Server component that fetches data
async function TracksMapSection({ tracciati }: { tracciati: TracciatiType[] }) {
  if (!tracciati || tracciati.length === 0) return null

  const luoghi = await getLuoghiFromItinerari(tracciati)
  console.log('Luoghi to be passed to map:', luoghi)

  return <TracksMap tracciati={tracciati} />
}

export const HomeTracksSection = ({ title, text_html, tracciati }: HomeTracksSectionProps) => {
  if (!tracciati || tracciati.length === 0) return null

  return (
    <div className="py-8">
      {title && <h2 className="text-2xl text-center mb-4">{title}</h2>}
      {text_html && (
        <div className="text-center mb-4">
          <StringToHTML htmlString={text_html} classs="prose-custom" />
        </div>
      )}
      <Suspense fallback={<div>Caricamento mappa...</div>}>
        <TracksMapSection tracciati={tracciati} />
      </Suspense>
    </div>
  )
}

export default HomeTracksSection
