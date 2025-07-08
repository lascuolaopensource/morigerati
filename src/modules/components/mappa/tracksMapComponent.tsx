'use client'
import { useEffect, useRef, useState } from 'react'
import type { Map as LeafletMap } from 'leaflet'
import type { Itinerari, Tracciati } from '@/payload-types'
import { getTracciatoUrl } from '#/utils/getTracciatoUrl'

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
      ${
        itinerario?.slug
          ? `<a href="/itinerari/${itinerario.slug}" class="text-blue-600 hover:text-blue-800 underline block py-1">Vai all'itinerario</a>`
          : ''
      }
    </div>
  `
}

/**
 * Una versione completamente riscritta del componente mappa per evitare
 * problemi di inizializzazione multipla di Leaflet
 */
const TracksMapComponent: React.FC<TracksMapProps> = ({
  tracciati,
  initialPosition = defaults.position,
  initialZoom = defaults.zoom,
}) => {
  // Referenza al container della mappa
  const mapContainerRef = useRef<HTMLDivElement>(null)

  // Stato per tener traccia se è client-side
  const [isClient, setIsClient] = useState(false)

  // Effetto per impostare isClient = true solo lato client
  useEffect(() => {
    setIsClient(true)

    // Cleanup per la mappa (se presente)
    const mapContainer = mapContainerRef.current
    return () => {
      // Reset dell'ID leaflet e pulizia del container
      if (mapContainer) {
        // Use type assertion to safely access Leaflet's internal property
        ;(mapContainer as any)._leaflet_id = null
        while (mapContainer.firstChild) {
          mapContainer.removeChild(mapContainer.firstChild)
        }
      }

      // Rimuovi globalmente tutti gli stili leaflet non necessari
      document.querySelectorAll('style').forEach((style) => {
        if (style.innerHTML.includes('leaflet')) {
          style.remove()
        }
      })
    }
  }, [])

  // Effetto che esegue il codice della mappa solo lato client e una volta sola
  useEffect(() => {
    // Skippa se non siamo lato client o se il container non è pronto
    if (!isClient || !mapContainerRef.current) return

    async function initializeMap() {
      try {
        // Carica CSS di Leaflet
        if (!(window as any).leafletCssLoaded) {
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
          document.head.appendChild(link)
          ;(window as any).leafletCssLoaded = true
        }

        // Importa Leaflet dinamicamente
        const L = (await import('leaflet')).default

        // Clear del container per sicurezza
        const container = mapContainerRef.current
        if (container) {
          while (container.firstChild) {
            container.removeChild(container.firstChild)
          }

          // Verifica se c'è già una mappa nel container
          if ((container as any)._leaflet_id) {
            console.warn('Rilevata mappa Leaflet esistente nel container, pulizia...')
            ;(container as any)._leaflet_id = null
          }
        }

        // Determina se siamo su mobile
        const isMobile = window.innerWidth < 768

        // Inizializza la mappa Leaflet
        if (!container) return // Exit if container is null

        const map = L.map(container, {
          zoomControl: !isMobile,
          attributionControl: true,
          dragging: true,
          tapTolerance: 15,
        }).setView(initialPosition, isMobile ? initialZoom - 1 : initialZoom)

        // Aggiungi il layer delle tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        // Aggiungi controlli di zoom personalizzati per mobile
        if (isMobile) {
          L.control
            .zoom({
              position: 'bottomright',
            })
            .addTo(map)
        }

        // Carica e visualizza tutti i tracciati
        for (let i = 0; i < tracciati.length; i++) {
          const tracciato = tracciati[i]
          const color = trackColors[i % trackColors.length]

          // Ottieni l'URL del file GPX
          const gpxUrl = getTracciatoUrl(tracciato)
          if (!gpxUrl) continue

          try {
            // Ottieni i dati dell'itinerario
            const response = await fetch(`/api/itinerari-by-tracciato?tracciato_id=${tracciato.id}`)
            const data = await response.json()

            // Estrai l'itinerario dalla struttura appropriata
            // A seconda di come è strutturata la risposta, potrebbe essere data.itinerari o data.itinerario
            const itinerarioObj = data.itinerari || data.itinerario

            // Se abbiamo un array, prendiamo il primo elemento
            const itinerario = Array.isArray(itinerarioObj) ? itinerarioObj[0] : itinerarioObj

            // Estrazione più sicura del nome e dello slug
            let itinerarioNome = 'Nessun nome disponibile'
            let itinerarioSlug = null

            // Cerca il nome in vari percorsi possibili
            if (itinerario) {
              if (typeof itinerario.nome === 'string') {
                itinerarioNome = itinerario.nome
              } else if (itinerario.nome && typeof itinerario.nome === 'object') {
                // Potrebbe essere un oggetto localizzato
                itinerarioNome =
                  itinerario.nome.it || itinerario.nome.en || Object.values(itinerario.nome)[0]
              }

              // Estrai lo slug
              if (typeof itinerario.slug === 'string') {
                itinerarioSlug = itinerario.slug
              } else if (itinerario.slug && typeof itinerario.slug === 'object') {
                // Potrebbe essere un oggetto localizzato
                itinerarioSlug =
                  itinerario.slug.it || itinerario.slug.en || Object.values(itinerario.slug)[0]
              }
            }

            // Carica e analizza il file GPX
            const gpxResponse = await fetch(gpxUrl)
            const gpxText = await gpxResponse.text()

            // Analizza il GPX per ottenere i punti
            const parser = new DOMParser()
            const gpx = parser.parseFromString(gpxText, 'text/xml')
            const points: L.LatLngTuple[] = []

            // Ottieni tutti i punti di traccia
            const trackpoints = gpx.getElementsByTagName('trkpt')
            for (let j = 0; j < trackpoints.length; j++) {
              const point = trackpoints[j]
              const lat = parseFloat(point.getAttribute('lat') || '0')
              const lon = parseFloat(point.getAttribute('lon') || '0')
              if (lat && lon) {
                points.push([lat, lon])
              }
            }

            if (points.length > 0) {
              // Crea il polyline per il tracciato
              const polyline = L.polyline(points, {
                color: color,
                weight: isMobile ? 4 : 3,
                opacity: 0.8,
                smoothFactor: isMobile ? 1 : 1.5,
              }).addTo(map)

              // Aggiungi il marker alla fine del tracciato
              const endPoint = points[points.length - 1]

              // Crea un'icona personalizzata per il marker con cursore pointer
              const customIcon = L.divIcon({
                className: 'track-marker-icon',
                html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.5); cursor: pointer; display: flex; align-items: center; justify-content: center;"></div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10],
              })

              // Crea un marker che non apre popup ma va direttamente all'itinerario
              const marker = L.marker(endPoint, {
                icon: customIcon,
                title: itinerarioNome, // Mostra il nome come tooltip al passaggio del mouse
                riseOnHover: true,
                keyboard: false,
                interactive: true,
              })

              // Aggiungi il marker alla mappa
              marker.addTo(map)

              // IMPORTANTE: Disabilita completamente il popup per evitare qualsiasi problema
              marker.unbindPopup()

              // Se abbiamo un itinerario con slug, facciamo in modo che il marker porti a quell'itinerario
              if (itinerarioSlug) {
                marker.on('click', function (e) {
                  // Previeni qualsiasi comportamento di default
                  if (e.originalEvent) {
                    e.originalEvent.preventDefault()
                    e.originalEvent.stopPropagation()
                  }

                  // Naviga all'itinerario
                  window.location.href = `/itinerari/${itinerarioSlug}`
                  return false
                })
              }

              // Aggiungi sempre un tooltip con il nome dell'itinerario
              marker.bindTooltip(`${itinerarioNome}`, {
                permanent: false,
                direction: 'top',
                offset: [0, -10],
                opacity: 0.8,
                className: 'itinerario-tooltip',
              })
            }
          } catch (error) {
            console.error(`Errore nel caricamento del tracciato ${tracciato.alt}:`, error)
          }
        }

        // Salva un riferimento alla mappa come attributo del container
        // per poter fare pulizia in seguito se necessario
        ;(container as any)._mapInstance = map
      } catch (error) {
        console.error("Errore durante l'inizializzazione della mappa:", error)
      }
    }

    // Inizializza la mappa
    initializeMap()

    // Funzione di pulizia
    return () => {
      if (mapContainerRef.current && (mapContainerRef.current as any)._mapInstance) {
        try {
          ;(mapContainerRef.current as any)._mapInstance.remove()
          ;(mapContainerRef.current as any)._mapInstance = null
        } catch (e) {
          console.error('Errore durante la pulizia della mappa:', e)
        }
      }
    }
  }, [isClient, tracciati, initialPosition, initialZoom]) // Dipendenze esplicite

  return (
    <div className="w-full rounded-lg border-2 border-gray-800 overflow-hidden">
      <div
        ref={mapContainerRef}
        className="h-[350px] md:h-[400px] w-full z-0"
        id={`map-container-${Math.random().toString(36).substr(2, 9)}`} // ID casuale per ogni istanza
      />
    </div>
  )
}

export default TracksMapComponent
