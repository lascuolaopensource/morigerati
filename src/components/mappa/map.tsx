import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-gpx'
import type { Media } from '@/payload-types'
import { X } from 'lucide-react'
import { MdOutlineFileDownload } from 'react-icons/md'
import Image from 'next/image'
import { MoonLoader } from 'react-spinners'

//

export interface MapProps {
  initialPosition?: LatLngExpression | null | undefined
  initialZoom?: number
  gpxUrl?: string
  localizedMedia?:
    | { posizione: [number, number]; copertina: string | Media; id?: string | null }[]
    | null
    | undefined
  showPositionPin?: boolean
  showGpxDownload?: boolean
}

const defaults = {
  zoom: 13,
}

export function Mappa(props: MapProps) {
  const {
    initialPosition,
    initialZoom = defaults.zoom,
    gpxUrl,
    localizedMedia,
    showPositionPin = false,
    showGpxDownload = false,
  } = props

  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const positionMarkerRef = useRef<L.Marker | null>(null)
  const [selectedMedia, setSelectedMedia] = useState<Media | string | null>(null)
  const [gpxLoaded, setGpxLoaded] = useState(!Boolean(gpxUrl))

  const actualInitialPosition = initialPosition ?? [40.14003842, 15.555298241]

  // Aggiungi la funzione al window object per essere accessibile dal popup
  useEffect(() => {
    ;(window as any).openFullscreenMedia = (media: Media | string) => {
      setSelectedMedia(media)
    }

    return () => {
      delete (window as any).openFullscreenMedia
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && mapContainerRef.current && !mapRef.current) {
      // Create map
      mapRef.current = L.map(mapContainerRef.current).setView(actualInitialPosition, initialZoom)

      // Override default Leaflet marker icon globally with a dot
      L.Marker.prototype.options.icon = L.divIcon({
        className: 'custom-dot-marker',
        html: `<div style="background-color: #3388ff; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current)

      // Add custom CSS for Leaflet popups
      const style = document.createElement('style')
      style.textContent = `
        .leaflet-popup-content {
          margin: 5px;
          text-align: center;
        }
        .leaflet-popup-content-wrapper {
          padding: 0;
          border-radius: 8px;
        }
        .leaflet-popup-tip {
          display: none;
        }
        .leaflet-popup-close-button {
          display: none !important;
        }
      `
      document.head.appendChild(style)

      if (showPositionPin) {
        // Create a blue dot for the position marker
        const positionIcon = L.divIcon({
          className: 'position-marker-icon',
          html: `<div style="background-color: #007bff; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.4);"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        })

        positionMarkerRef.current = L.marker(actualInitialPosition, {
          icon: positionIcon,
          title: 'Current position',
        }).addTo(mapRef.current)
      }

      if (gpxUrl) {
        // Crea icone circolari personalizzate per inizio e fine percorso
        const createCircleIcon = (color: string) => {
          return L.divIcon({
            className: 'track-endpoint-icon',
            html: `<div style="background-color: ${color}; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7],
          })
        }

        // Carica il GPX e gestisci inizio e fine tracciato
        const gpxTrack = new L.GPX(gpxUrl, {
          async: true,
          polyline_options: {
            color: '#3388ff',
            weight: 5,
            opacity: 0.8,
          },
          marker_options: {
            startIconUrl: null, // Completely disable default markers
            endIconUrl: null, // Completely disable default markers
            wptIconUrls: null, // Completely disable default markers
            shadowUrl: null, // Disable shadow
            clickable: false, // Make default markers not clickable
          },
          gpx_options: {
            parseElements: ['track', 'waypoint'], // Parse both tracks and waypoints
          },
        })
          .on('loaded', function (e: { target: any }) {
            setGpxLoaded(true)

            const bounds = e.target.getBounds()
            // setGpxBounds(bounds)

            if (mapRef.current) {
              mapRef.current.fitBounds(bounds)
            }

            // Find the first and last layer in the GPX (they should be polylines)
            let startPoint: L.LatLng | null = null
            let endPoint: L.LatLng | null = null

            // Replace any default markers with dot markers - critical for the blue pin in the screenshot
            if (mapRef.current) {
              mapRef.current.eachLayer((layer) => {
                // Check if it's a marker but not one of our custom markers
                if (
                  layer instanceof L.Marker &&
                  (!layer.options.icon ||
                    (layer.options.icon instanceof L.Icon &&
                      !(layer.options.icon instanceof L.DivIcon)))
                ) {
                  const position = layer.getLatLng()
                  const title = layer.options.title || 'Location'

                  // Create a new dot marker to replace it
                  const dotMarker = L.marker(position, {
                    icon: L.divIcon({
                      className: 'replaced-marker-icon',
                      html: `<div style="background-color: #3388ff; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>`,
                      iconSize: [14, 14],
                      iconAnchor: [7, 7],
                    }),
                    title: title,
                  })

                  // Remove the original marker and add the dot marker
                  if (mapRef.current) {
                    mapRef.current.removeLayer(layer)
                    dotMarker.addTo(mapRef.current)
                  }
                }
              })
            }

            e.target.eachLayer((layer: any) => {
              if (layer instanceof L.Polyline) {
                const latlngs = layer.getLatLngs()
                if (latlngs && latlngs.length > 0) {
                  // Handle potential nested arrays (multi-polylines)
                  const firstPoint =
                    Array.isArray(latlngs[0]) && !('lat' in latlngs[0])
                      ? (latlngs[0] as L.LatLng[])[0]
                      : (latlngs[0] as L.LatLng)

                  const lastArray = latlngs[latlngs.length - 1]
                  const lastPoint =
                    Array.isArray(lastArray) && !('lat' in lastArray)
                      ? (lastArray as L.LatLng[])[lastArray.length - 1]
                      : (lastArray as L.LatLng)

                  if (!startPoint) startPoint = firstPoint
                  endPoint = lastPoint
                }
              }

              // Handle waypoints separately (remove and replace with dot markers)
              if (layer instanceof L.Marker && mapRef.current) {
                // Get waypoint position and name (if any)
                const waypointPos = layer.getLatLng()
                const waypointName = layer.options.title || 'Waypoint'

                // Remove the default waypoint marker
                mapRef.current.removeLayer(layer)

                // Create a new dot marker for the waypoint
                const dotMarker = L.marker(waypointPos, {
                  icon: L.divIcon({
                    className: 'waypoint-dot-icon',
                    html: `<div style="background-color: #3388ff; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>`,
                    iconSize: [14, 14],
                    iconAnchor: [7, 7],
                  }),
                  title: waypointName,
                })

                // Add the dot marker to the map
                dotMarker.addTo(mapRef.current)

                // Add a tooltip with the waypoint name
                dotMarker.bindTooltip(waypointName, {
                  permanent: false,
                  direction: 'top',
                  offset: [0, -5],
                })
              }
            })

            // Aggiungi marker circolari all'inizio e alla fine
            if (startPoint && mapRef.current) {
              L.marker(startPoint, {
                icon: createCircleIcon('#22c55e'), // Verde per l'inizio
                title: 'Inizio percorso',
              }).addTo(mapRef.current)
            }

            if (endPoint && mapRef.current) {
              L.marker(endPoint, {
                icon: createCircleIcon('#ef4444'), // Rosso per la fine
                title: 'Fine percorso',
              }).addTo(mapRef.current)
            }
          })
          .addTo(mapRef.current)
      }

      // Check if localizedMedia is an array before using forEach
      if (localizedMedia && Array.isArray(localizedMedia)) {
        localizedMedia.forEach((media) => {
          if (media.posizione) {
            const marker = L.marker(media.posizione, {
              icon: L.divIcon({
                className: 'media-marker-icon',
                html: `<div style="background-color: #22c55e; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>`,
                iconSize: [14, 14],
                iconAnchor: [7, 7],
              }),
            })
            if (mapRef.current) {
              marker.addTo(mapRef.current)
            }

            const popupContent = createPopupContent(media.copertina, setSelectedMedia)
            marker.bindPopup(popupContent, {
              maxWidth: 140,
              maxHeight: 140,
              minWidth: 130,
              className: 'custom-popup',
            })
          }
        })
      } else {
        console.warn('localizedMedia is not an array:', localizedMedia)
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      if (positionMarkerRef.current) {
        positionMarkerRef.current = null
      }
    }
  }, [initialPosition, initialZoom, gpxUrl, localizedMedia, showPositionPin])

  return (
    <div className="w-full h-full rounded-lg border-2 border-gray-800 overflow-hidden relative">
      <div ref={mapContainerRef} className="h-full w-full z-0" />

      {selectedMedia && (
        <FullscreenMedia media={selectedMedia} onClose={() => setSelectedMedia(null)} />
      )}

      {gpxUrl && showGpxDownload && (
        <div className="w-full p-4 absolute bottom-0 left-0">
          <a
            href={gpxUrl}
            download
            className="text-white w-full p-3 rounded-full transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-900 flex items-center justify-center gap-2"
            aria-label="Scarica tracciato GPX"
          >
            <MdOutlineFileDownload size={24} />
            <span>Download tracciato GPX</span>
          </a>
        </div>
      )}

      {!gpxLoaded && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="flex bg-white rounded-md p-4 items-center justify-center gap-4 border shadow-md">
            <MoonLoader color="#7fcbae" size={20} />
            <span className="text-itinerariColor">Caricamento tracciato...</span>
          </div>
        </div>
      )}
    </div>
  )
}

//

// Componente per la visualizzazione a schermo intero
const FullscreenMedia = ({ media, onClose }: { media: Media | string; onClose: () => void }) => {
  const isString = typeof media === 'string'
  const isVideo = !isString && media.mimeType?.startsWith('video/')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 bg-black bg-opacity-50 rounded-full text-white hover:text-gray-300 transition-colors z-10"
        aria-label="Close fullscreen view"
      >
        <X size={28} />
      </button>

      <div className="w-full h-full flex items-center justify-center p-8">
        {isVideo ? (
          <video
            src={(media as Media).url || ''}
            className="max-w-[95%] max-h-[90vh] w-auto h-auto object-contain rounded-lg"
            controls
            autoPlay
            loop
            playsInline
          >
            Your browser does not support video playback.
          </video>
        ) : (
          <Image
            src={(media as Media).url || ''}
            alt={isString ? 'Media' : (media as Media).alt || 'Media'}
            className="max-w-[95%] max-h-[90vh] w-auto h-auto object-contain rounded-lg"
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, 90vw"
          />
        )}
      </div>
    </div>
  )
}

const createPopupContent = (
  media: Media | string,
  onMediaClick: (media: Media | string) => void,
) => {
  if (typeof media === 'string') {
    return `
      <div class="cursor-pointer" onclick='window.openFullscreenMedia("${media}")' style="padding: 5px; text-align: center;">
        <img src="${media}" alt="Media" style="max-width: 120px; max-height: 120px; object-fit: contain; margin: 0 auto;" />
      </div>
    `
  }

  const isVideo = media.mimeType?.startsWith('video/')
  const mediaUrl = media.url || ''

  if (isVideo) {
    return `
      <div class="cursor-pointer" onclick='window.openFullscreenMedia(${JSON.stringify(
        media,
      )})' style="padding: 5px; text-align: center;">
        <video 
          src="${mediaUrl}"
          style="max-width: 120px; max-height: 120px; object-fit: contain; margin: 0 auto;"
          muted 
          loop 
          playsinline
        >
          Your browser does not support video playback.
        </video>
      </div>
    `
  }

  return `
    <div class="cursor-pointer" onclick='window.openFullscreenMedia(${JSON.stringify(
      media,
    )})' style="padding: 5px; text-align: center;">
      <img src="${mediaUrl}" alt="${
    media.alt || 'Media'
  }" style="max-width: 120px; max-height: 120px; object-fit: contain; margin: 0 auto;" />
    </div>
  `
}
