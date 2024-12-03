'use client'
import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
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

function parseGPX(gpxStr: string): [number, number][] {
  const parser = new DOMParser();
  const gpx = parser.parseFromString(gpxStr, "text/xml");
  const points: [number, number][] = [];
  
  // Get all track points
  const trackpoints = gpx.getElementsByTagName('trkpt');
  for (let i = 0; i < trackpoints.length; i++) {
    const point = trackpoints[i];
    const lat = parseFloat(point.getAttribute('lat') || '0');
    const lon = parseFloat(point.getAttribute('lon') || '0');
    if (lat && lon) {
      points.push([lat, lon]);
    }
  }
  
  return points;
}

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
      tracciati.forEach(async (tracciato, index) => {
        const gpxUrl = getTracciatoUrl(tracciato)
        if (gpxUrl) {
          try {
            const response = await fetch(gpxUrl);
            const gpxText = await response.text();
            const points = parseGPX(gpxText);
            
            if (points.length > 0) {
              const color = trackColors[index % trackColors.length];
              L.polyline(points, {
                color: color,
                weight: 3,
                opacity: 0.8,
              }).addTo(mapRef.current!);
            }
          } catch (error) {
            console.error('Error loading GPX:', error);
          }
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
