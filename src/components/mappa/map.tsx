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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors"
        aria-label="Close fullscreen view"
      >
        <X size={24} />
      </button>

      {isVideo ? (
        <video
          src={(media as Media).url || ''}
          className="max-w-[90vw] max-h-[90vh] object-contain"
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
          className="max-w-[90vw] max-h-[90vh] object-contain"
        />
      )}
    </div>
  )
}

const createPopupContent = (
  media: Media | string,
  onMediaClick: (media: Media | string) => void,
) => {
  if (typeof media === 'string') {
    return `
      <div class="cursor-pointer" onclick='window.openFullscreenMedia("${media}")'>
        <img src="${media}" alt="Media" style="max-width: 100px; max-height: 100px;" />
        <div style="text-align: center; font-size: 12px; color: #666; margin-top: 4px;">
          clicca per espandere
        </div>
      </div>
    `
  }

  const isVideo = media.mimeType?.startsWith('video/')
  const mediaUrl = media.url || ''

  if (isVideo) {
    return `
      <div class="cursor-pointer" onclick='window.openFullscreenMedia(${JSON.stringify(media)})'>
        <video 
          src="${mediaUrl}"
          style="max-width: 100px; max-height: 100px; object-fit: cover;"
          muted 
          loop 
          playsinline
        >
          Your browser does not support video playback.
        </video>
        <div style="text-align: center; font-size: 12px; color: #666; margin-top: 4px;">
          clicca per espandere
        </div>
      </div>
    `
  }

  return `
    <div class="cursor-pointer" onclick='window.openFullscreenMedia(${JSON.stringify(media)})'>
      <img src="${mediaUrl}" alt="${media.alt || 'Media'}" style="max-width: 100px; max-height: 100px;" />
      <div style="text-align: center; font-size: 12px; color: #666; margin-top: 4px;">
        clicca per espandere
      </div>
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

      if (showPositionPin) {
        positionMarkerRef.current = L.marker(initialPosition).addTo(mapRef.current)
      }

      if (gpxUrl) {
        new L.GPX(gpxUrl, {
          async: true,
          marker_options: {
            startIconUrl:
              'https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.7.0/pin-icon-start.png',
            endIconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.7.0/pin-icon-end.png',
            wptIconUrls:
              'https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.7.0/pin-icon-wpt.png',
          },
        })
          .on('loaded', function (e: { target: L.GPX }) {
            const bounds = e.target.getBounds()
            setGpxBounds(bounds)
          })
          .addTo(mapRef.current)
      }

      if (localizedMedia) {
        localizedMedia.forEach((media) => {
          if (media.posizione) {
            const marker = L.marker(media.posizione)
            if (mapRef.current) {
              marker.addTo(mapRef.current)
            }

            const popupContent = createPopupContent(media.copertina, setSelectedMedia)
            marker.bindPopup(popupContent, {
              maxWidth: 120,
              maxHeight: 120,
            })
          }
        })
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
        <div className="w-full bg-white hover:bg-gray-100 transition-colors">
          <a
            href={gpxUrl}
            download
            className="flex items-center justify-center gap-2 px-4 py-3 text-black"
          >
            <MdOutlineFileDownload size={24} />
            <span className="text-base">Scarica tracciato GPX</span>
          </a>
        </div>
      )}
    </div>
  )
}
