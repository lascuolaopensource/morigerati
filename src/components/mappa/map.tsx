'use client'
import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-gpx'
import { Media } from '@/payload-types'
import { getMediaURL } from '@/utils/getMediaUrl' // Import della tua funzione

interface MapProps {
  initialPosition: LatLngExpression
  initialZoom?: number
  gpxUrl?: string
  localizedMedia?:
    | { posizione: [number, number]; copertina: string | Media; id?: string | null }[]
    | null
    | undefined
}

const defaults = {
  zoom: 13,
}

export const Mappa: React.FC<MapProps> = ({
  initialPosition,
  initialZoom = defaults.zoom,
  gpxUrl,
  localizedMedia,
}) => {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [gpxBounds, setGpxBounds] = useState<L.LatLngBounds | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && mapContainerRef.current && !mapRef.current) {
      // Creazione della mappa
      mapRef.current = L.map(mapContainerRef.current).setView(initialPosition, initialZoom)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current)

      // Aggiungi il percorso GPX se esiste
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

      // Aggiungi i media geolocalizzati sulla mappa
      if (localizedMedia) {
        localizedMedia.forEach((media) => {
          if (media.posizione) {
            const marker = L.marker(media.posizione)
            if (mapRef.current) {
              marker.addTo(mapRef.current)
            }

            const copertinaUrl = getMediaURL(media.copertina)

            console.log(copertinaUrl)

            // Aggiungi popup al marker con l'immagine di copertina (se disponibile)
            if (copertinaUrl) {
              const popupContent = `<img src="${copertinaUrl}" alt="Media" style="max-width: 100px; max-height: 100px;" />`
              marker.bindPopup(popupContent)
            }
          }
        })
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [initialPosition, initialZoom, gpxUrl, localizedMedia])

  useEffect(() => {
    if (mapRef.current && gpxBounds) {
      mapRef.current.fitBounds(gpxBounds)
    }
  }, [gpxBounds])

  return <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
}
