'use client'
import { Suspense } from 'react'
import { Tracciati as TracciatiType } from '@/payload-types'
import TracksMap from '@/components/mappa/tracksMap'
import StringToHTML from '@/components/serializer/stringToHTML'

interface HomeTracksSectionProps {
  title?: string
  text_html?: string
  tracciati: TracciatiType[]
}

function TracksMapSection({ tracciati }: { tracciati: TracciatiType[] }) {
  if (!tracciati || tracciati.length === 0) return null
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
