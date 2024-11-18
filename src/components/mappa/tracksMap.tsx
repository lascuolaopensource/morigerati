'use client'
import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-gpx'
import { Tracciati } from '@/payload-types'
import { getTracciatoUrl } from '@/utils/getTracciatoUrl'

interface TracksMapProps {
  tracciati: Tracciati[]
  initialPosition?: [number, number]
  initialZoom?: number
}

const defaults = {
  position: [40.139949, 15.555182] as [number, number],
  zoom: 13,
}

// Array of distinct colors for tracks
const trackColors = [
  '#FF5733', // Rosso-arancio
  '#33FF57', // Verde lime
  '#3357FF', // Blu
  '#FF33F6', // Rosa
  '#33FFF6', // Ciano
  '#F6FF33', // Giallo
  '#9933FF', // Viola
  '#FF8333', // Arancione
  '#33FF99', // Verde acqua
  '#FF3333', // Rosso
]

export const TracksMap: React.FC<TracksMapProps> = ({
  tracciati,
  initialPosition = defaults.position,
  initialZoom = defaults.zoom,
}) => {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && mapContainerRef.current && !mapRef.current) {
      // Create map
      mapRef.current = L.map(mapContainerRef.current).setView(initialPosition, initialZoom)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current)

      // Add all tracks to the map
      tracciati.forEach((tracciato, index) => {
        const gpxUrl = getTracciatoUrl(tracciato)
        if (gpxUrl) {
          const color = trackColors[index % trackColors.length]
          new L.GPX(gpxUrl, {
            async: true,
            marker_options: {
              startIconUrl: '', // Remove start icon
              endIconUrl: '', // Remove end icon
              wptIconUrls: '', // Remove waypoint icons
            },
            polyline_options: {
              color: color,
              weight: 3,
              opacity: 0.8
            }
          }).addTo(mapRef.current!)
        }
      })
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [initialPosition, initialZoom, tracciati])

  return (
    <div className="w-full rounded-lg border-2 border-gray-800 overflow-hidden">
      <div ref={mapContainerRef} className="h-[400px] w-full z-0" />
    </div>
  )
}

export default TracksMap
