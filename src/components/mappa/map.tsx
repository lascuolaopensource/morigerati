import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-gpx'
import { Media } from '@/payload-types'
import { X } from 'lucide-react'
import { MdOutlineFileDownload } from 'react-icons/md'

interface MapProps {
  initialPosition: LatLngExpression
  initialZoom?: number
  gpxUrl?: string
  localizedMedia?:
    | { posizione: [number, number]; copertina: string | Media; id?: string | null }[]
    | null
    | undefined
  showPositionPin?: boolean
}

const defaults = {
  zoom: 13,
}

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
          <img
            src={(media as Media).url || ''}
            alt={isString ? 'Media' : (media as Media).alt || 'Media'}
            className="max-w-[95%] max-h-[90vh] w-auto h-auto object-contain rounded-lg"
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
      <div class="cursor-pointer" onclick='window.openFullscreenMedia(${JSON.stringify(media)})' style="padding: 5px; text-align: center;">
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
    <div class="cursor-pointer" onclick='window.openFullscreenMedia(${JSON.stringify(media)})' style="padding: 5px; text-align: center;">
      <img src="${mediaUrl}" alt="${media.alt || 'Media'}" style="max-width: 120px; max-height: 120px; object-fit: contain; margin: 0 auto;" />
    </div>
  `
}

export const Mappa: React.FC<MapProps> = ({
  initialPosition,
  initialZoom = defaults.zoom,
  gpxUrl,
  localizedMedia,
  showPositionPin = false,
}) => {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [gpxBounds, setGpxBounds] = useState<L.LatLngBounds | null>(null)
  const positionMarkerRef = useRef<L.Marker | null>(null)
  const [selectedMedia, setSelectedMedia] = useState<Media | string | null>(null)

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
      mapRef.current = L.map(mapContainerRef.current).setView(initialPosition, initialZoom)

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
        positionMarkerRef.current = L.marker(initialPosition).addTo(mapRef.current)
      }

      if (gpxUrl) {
        new L.GPX(gpxUrl, {
          async: true,
          marker_options: {
            startIconUrl: '', // Rimuovi l'icona di start
            endIconUrl: '', // Rimuovi l'icona di end
            wptIconUrls: '', // Rimuovi l'icona dei waypoints
          },
        })
          .on('loaded', function (e: { target: L.GPX }) {
            const bounds = e.target.getBounds()
            setGpxBounds(bounds)
          })
          .addTo(mapRef.current)
      }

      // Check if localizedMedia is an array before using forEach
      if (localizedMedia && Array.isArray(localizedMedia)) {
        localizedMedia.forEach((media) => {
          if (media.posizione) {
            const marker = L.marker(media.posizione, {
              icon: L.divIcon({
                className: 'text-white bg-green-500 rounded-full p-2',
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

  useEffect(() => {
    if (mapRef.current && gpxBounds) {
      mapRef.current.fitBounds(gpxBounds)
    }
  }, [gpxBounds])

  return (
    <div className="w-full rounded-lg border-2 border-gray-800 overflow-hidden">
      <div ref={mapContainerRef} className="h-[400px] w-full z-0" />
      {selectedMedia && (
        <FullscreenMedia media={selectedMedia} onClose={() => setSelectedMedia(null)} />
      )}
      {gpxUrl && (
        <div className="w-full p-4 flex justify-center">
          <a
            href={gpxUrl}
            download
            className="group relative h-12 px-6 rounded-full overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-900 flex items-center justify-center gap-2"
            aria-label="Scarica tracciato GPX"
          >
            <MdOutlineFileDownload
              size={24}
              className="text-white transform transition-all duration-300 group-hover:scale-125"
            />
            <span className="text-base text-white">Download tracciato GPX</span>
          </a>
        </div>
      )}
    </div>
  )
}
