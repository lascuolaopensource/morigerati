import { Suspense } from 'react'
import { Tracciati as TracciatiType, Luoghi } from '@/payload-types'
import TracksMap from '@/components/mappa/tracksMap'
import { Locale } from '@/utils/localization'

import { loadDb } from '@/utils/db'

interface HomeTracksSectionProps {
  title?: string
  text_html?: string
  tracciati: TracciatiType[]
  locale?: Locale
}

// Loading translations
const loadingText = {
  it: 'Caricamento mappa...',
  en: 'Loading map...',
}

async function getLuoghiFromItinerari(tracciati: TracciatiType[], locale: Locale = 'it') {
  const db = await loadDb()

  // First, let's get all itinerari since the relationship might be in either direction
  const itinerari = await db.find({
    collection: 'itinerari',
    depth: 2,
    locale,
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
async function TracksMapSection({
  tracciati,
  locale = 'it',
}: {
  tracciati: TracciatiType[]
  locale?: Locale
}) {
  if (!tracciati || tracciati.length === 0) return null

  return <TracksMap tracciati={tracciati} />
}

export const HomeTracksSection = ({
  title,
  text_html,
  tracciati,
  locale = 'it',
}: HomeTracksSectionProps) => {
  if (!tracciati || tracciati.length === 0) return null

  return (
    <div className="py-8">
      {title && <h2 className="text-2xl text-center mb-4">{title}</h2>}
      {text_html && (
        <div className="text-center mb-4">
          {/* <RichText htmlString={text_html} classs="prose-custom" /> */}
        </div>
      )}
      <Suspense fallback={<div>{loadingText[locale]}</div>}>
        <TracksMapSection tracciati={tracciati} locale={locale} />
      </Suspense>
    </div>
  )
}

export default HomeTracksSection
