'use client'
import { useEffect, useRef } from 'react'
import type { Map as LeafletMap } from 'leaflet'
import { Itinerari, Tracciati } from '@/payload-types'
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

function parseGPX(gpxStr: string): [number, number][] {
  const parser = new DOMParser()
  const gpx = parser.parseFromString(gpxStr, 'text/xml')
  const points: [number, number][] = []

  // Get all track points
  const trackpoints = gpx.getElementsByTagName('trkpt')
  for (let i = 0; i < trackpoints.length; i++) {
    const point = trackpoints[i]
    const lat = parseFloat(point.getAttribute('lat') || '0')
    const lon = parseFloat(point.getAttribute('lon') || '0')
    if (lat && lon) {
      points.push([lat, lon])
    }
  }

  return points
}

const createTracciatoPopupContent = (tracciato: Tracciati, itinerario: Itinerari | null) => {
  return `
    <div class="p-2">
      <h3 class="font-bold mb-2">${itinerario?.nome || tracciato.alt}</h3>
      ${itinerario?.slug ? `<a href="/itinerari/${itinerario.slug}" class="text-blue-600 hover:text-blue-800 underline">Vai all'itinerario</a>` : ''}
    </div>
  `
}

const TracksMapComponent: React.FC<TracksMapProps> = ({
  tracciati,
  initialPosition = defaults.position,
  initialZoom = defaults.zoom,
}) => {
  const mapRef = useRef<LeafletMap | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    console.log('Map initialization with:', {
      tracciati: tracciati.map((t) => ({ id: t.id, alt: t.alt })),
      initialPosition,
      initialZoom,
    })

    // Dynamically import Leaflet and its styles
    Promise.all([
      import('leaflet'),
      import('leaflet/dist/leaflet.css'),
      import('leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'),
      import('leaflet-defaulticon-compatibility'),
    ]).then(([L]) => {
      if (mapContainerRef.current && !mapRef.current) {
        console.log('Creating map with initial position:', initialPosition)

        // Create map
        mapRef.current = L.default
          .map(mapContainerRef.current)
          .setView(initialPosition, initialZoom)

        L.default
          .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          })
          .addTo(mapRef.current)

        // Add all tracks to the map and their starting point markers
        tracciati.forEach(async (tracciato, index) => {
          const gpxUrl = getTracciatoUrl(tracciato)
          if (gpxUrl) {
            try {
              // Get the itinerario data from the API
              const response = await fetch(`/api/itinerari?tracciato_id=${tracciato.id}`)
              const data = await response.json()
              const itinerario = data.itinerari as Itinerari | null

              const gpxResponse = await fetch(gpxUrl)
              const gpxText = await gpxResponse.text()
              const points = parseGPX(gpxText)

              if (points.length > 0) {
                // Add the track line
                const color = trackColors[index % trackColors.length]
                L.default
                  .polyline(points, {
                    color: color,
                    weight: 3,
                    opacity: 0.8,
                  })
                  .addTo(mapRef.current!)

                // Add marker at the start of the track
                const startPoint = points[0]
                console.log(
                  'Adding marker for tracciato:',
                  tracciato.alt,
                  'at position:',
                  startPoint,
                )
                try {
                  const marker = L.default.marker(startPoint)
                  if (mapRef.current) {
                    marker.addTo(mapRef.current)
                    const popupContent = createTracciatoPopupContent(tracciato, itinerario)
                    marker.bindPopup(popupContent)
                  }
                } catch (error) {
                  console.error('Error adding marker for tracciato:', tracciato.alt, error)
                }
              }
            } catch (error) {
              console.error('Error loading GPX:', error)
            }
          }
        })
      }
    })

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

export default TracksMapComponent
