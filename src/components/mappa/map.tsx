import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-gpx'
import { Media } from '@/payload-types'

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

const createPopupContent = (media: Media | string) => {
  if (typeof media === 'string') {
    return `<img src="${media}" alt="Media" style="max-width: 100px; max-height: 100px;" />`
  }

  const isVideo = media.mimeType?.startsWith('video/')

  if (isVideo) {
    return `
      <video 
        src="${media.url}"
        style="max-width: 100px; max-height: 100px; object-fit: cover;"
        autoplay 
        muted 
        loop 
        playsinline
        onclick="this.paused ? this.play() : this.pause()"
      >
        Your browser does not support video playback.
      </video>
    `
  }

  return `<img src="${media.url}" alt="${media.alt || 'Media'}" style="max-width: 100px; max-height: 100px;" />`
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

  useEffect(() => {
    if (typeof window !== 'undefined' && mapContainerRef.current && !mapRef.current) {
      // Create map
      mapRef.current = L.map(mapContainerRef.current).setView(initialPosition, initialZoom)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current)

      // Add initial position marker if showPositionPin is true
      if (showPositionPin) {
        positionMarkerRef.current = L.marker(initialPosition).addTo(mapRef.current)
      }

      // Add GPX track if exists
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

      // Add geolocalized media markers
      if (localizedMedia) {
        localizedMedia.forEach((media) => {
          if (media.posizione) {
            const marker = L.marker(media.posizione)
            if (mapRef.current) {
              marker.addTo(mapRef.current)
            }

            // Create popup with media content
            const popupContent = createPopupContent(media.copertina)
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

  return <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} className="z-0" />
}
