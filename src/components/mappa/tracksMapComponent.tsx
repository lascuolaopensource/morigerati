'use client'
import { useEffect, useRef, useState } from 'react'
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

// Stile personalizzato per i popup (più leggibili su mobile)
const popupCustomStyle = `
  <style>
    .custom-popup .leaflet-popup-content-wrapper {
      background: white;
      box-shadow: 0 3px 14px rgba(0,0,0,0.4);
      border-radius: 4px;
      min-width: 200px;
    }
    .custom-popup .leaflet-popup-content {
      margin: 11px 12px;
      font-size: 14px;
      line-height: 1.4;
    }
    .custom-popup .leaflet-popup-tip {
      background: white;
    }
    @media (max-width: 768px) {
      .custom-popup .leaflet-popup-content {
        font-size: 16px; /* Testo più grande su mobile */
        margin: 14px;
      }
      .custom-popup a {
        padding: 8px 0;
        display: inline-block; /* Target più ampio per il tap */
      }
    }
  </style>
`

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
    ${popupCustomStyle}
    <div class="p-2">
      <h3 class="font-bold mb-2 text-base">${itinerario?.nome || tracciato.alt}</h3>
      ${itinerario?.slug ? `<a href="/itinerari/${itinerario.slug}" class="text-blue-600 hover:text-blue-800 underline block py-1">Vai all'itinerario</a>` : ''}
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
  const [mapIsReady, setMapIsReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile devices
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check initially
    checkIfMobile()

    // Add listener for window resize
    window.addEventListener('resize', checkIfMobile)

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  // Initialize the map
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Cleanup function
    let isMounted = true

    // Dynamically import Leaflet and its styles
    Promise.all([
      import('leaflet'),
      import('leaflet/dist/leaflet.css'),
      import('leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'),
      import('leaflet-defaulticon-compatibility'),
    ])
      .then(([L]) => {
        if (!isMounted) return

        if (mapContainerRef.current && !mapRef.current) {
          try {
            // Create map with mobile-friendly options
            const map = L.default
              .map(mapContainerRef.current, {
                zoomControl: !isMobile, // Hide default zoom control on mobile
                attributionControl: true,
                dragging: true,

                tapTolerance: 15, // More forgiving tap detection for fat fingers
              })
              .setView(initialPosition, isMobile ? initialZoom - 1 : initialZoom) // Zoom out slightly on mobile

            // Add tile layer
            L.default
              .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution:
                  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              })
              .addTo(map)

            // Add custom zoom control position for mobile
            if (isMobile) {
              L.default.control
                .zoom({
                  position: 'bottomright', // Better position for thumb access on mobile
                })
                .addTo(map)
            }

            mapRef.current = map

            // Signal that the map is ready for adding tracks
            setMapIsReady(true)
          } catch (error) {
            console.error('Error initializing map:', error)
          }
        }
      })
      .catch((error) => {
        console.error('Error loading leaflet dependencies:', error)
      })

    return () => {
      isMounted = false
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        setMapIsReady(false)
      }
    }
  }, [initialPosition, initialZoom, isMobile])

  // Add tracks after map is ready
  useEffect(() => {
    if (!mapIsReady || !mapRef.current) return

    // Load Leaflet to add tracks
    import('leaflet')
      .then((L) => {
        // Add all tracks to the map and their starting point markers
        tracciati.forEach(async (tracciato, index) => {
          const gpxUrl = getTracciatoUrl(tracciato)
          if (!gpxUrl) return

          try {
            // Get the itinerario data from the API (usando il nuovo endpoint)
            const response = await fetch(`/api/itinerari-by-tracciato?tracciato_id=${tracciato.id}`)
            const data = await response.json()
            const itinerario = data.itinerari as Itinerari | null

            const gpxResponse = await fetch(gpxUrl)
            const gpxText = await gpxResponse.text()
            const points = parseGPX(gpxText)

            if (points.length > 0 && mapRef.current) {
              // Add the track line
              const color = trackColors[index % trackColors.length]
              try {
                const polyline = L.default.polyline(points, {
                  color: color,
                  weight: isMobile ? 4 : 3, // Thicker lines on mobile for better visibility
                  opacity: 0.8,
                  smoothFactor: isMobile ? 1 : 1.5, // Lower for mobile to improve performance
                })

                // Add to map with a null check
                if (mapRef.current) {
                  polyline.addTo(mapRef.current)
                }

                // Add marker at the end of the track
                const endPoint = points[points.length - 1]

                // Add marker with a null check
                if (mapRef.current) {
                  // Create marker with options optimal for mobile
                  const marker = L.default.marker(endPoint, {
                    keyboard: false, // Disable keyboard nav on mobile
                    title: itinerario?.nome || tracciato.alt, // Add title for accessibility
                  })

                  marker.addTo(mapRef.current)

                  // Create popup with custom options for mobile
                  const popupContent = createTracciatoPopupContent(tracciato, itinerario)
                  marker.bindPopup(popupContent, {
                    className: 'custom-popup',
                    closeButton: true,
                    closeOnClick: true,
                    autoPan: true,
                    maxWidth: isMobile ? 260 : 300,
                  })
                }
              } catch (error) {
                console.error('Error adding polyline or marker:', error)
              }
            }
          } catch (error) {
            console.error('Error loading GPX for tracciato:', tracciato.alt, error)
          }
        })
      })
      .catch((error) => {
        console.error('Error loading leaflet for tracks:', error)
      })
  }, [mapIsReady, tracciati, isMobile])

  return (
    <div className="w-full rounded-lg border-2 border-gray-800 overflow-hidden">
      <div ref={mapContainerRef} className="h-[350px] md:h-[400px] w-full z-0" />
    </div>
  )
}

export default TracksMapComponent
