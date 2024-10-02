'use client'
import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-gpx'

interface MapProps {
  posix: LatLngExpression
  zoom?: number
  gpxUrl?: string
}

const defaults = {
  zoom: 13,
}

export const Mappa: React.FC<MapProps> = ({ posix, zoom = defaults.zoom, gpxUrl }) => {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(posix, zoom)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current)

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
            mapRef.current?.fitBounds(e.target.getBounds())
          })
          .addTo(mapRef.current)
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [posix, zoom, gpxUrl])

  return <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
}
