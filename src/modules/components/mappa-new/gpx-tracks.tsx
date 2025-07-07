'use client'

import L, { LatLngExpression } from 'leaflet'
import { useState } from 'react'
import { useMap, CircleMarker, FeatureGroup } from 'react-leaflet'

//

export type GpxTrackProps = {
  url: string
  color?: string
  weight?: number
  opacity?: number
}

type GpxTracksProps = {
  gpxTracks: GpxTrackProps[]
  onLoaded?: () => void
}

export function GpxTracks(props: GpxTracksProps) {
  const { gpxTracks, onLoaded } = props
  const map = useMap()

  const [loadedGpxList, setLoadedGpxList] = useState<LoadedGpx[]>([])

  Promise.allSettled(gpxTracks.map(loadGpx)).then((results) => {
    const fulfilled = results.filter((res) => res.status === 'fulfilled').map((res) => res.value)
    setLoadedGpxList(fulfilled)

    const group = L.featureGroup(
      loadedGpxList.flatMap(({ gpx, points }) => [
        gpx,
        // We add circles only to get proper bounds, then we remove them
        ...points.map((p) => new L.Circle([p.lat, p.lng], { radius: 1 })),
      ]),
    )
    group.addTo(map)
    map.fitBounds(group.getBounds())

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer)
      }
    })
  })

  return (
    <FeatureGroup>
      {loadedGpxList.map(({ points, props }, i) =>
        points.map((p, j) => (
          <CircleMarker
            key={`${i}-${j}`}
            center={[p.lat, p.lng]}
            radius={10}
            fillOpacity={1}
            stroke={false}
            fillColor={props.color}
          />
        )),
      )}
    </FeatureGroup>
  )
}

//

type PointType = 'start' | 'end' | 'waypoint' | 'label'

type Point = {
  type: PointType
  lat: number
  lng: number
}

type LoadedGpx = {
  gpx: L.GPX
  points: Point[]
  props: GpxTrackProps
}

function loadGpx(props: GpxTrackProps): Promise<LoadedGpx> {
  return new Promise((resolve, reject) => {
    const points: Point[] = []

    new L.GPX(props.url, {
      async: true,
      polyline_options: {
        color: props.color || '#3388ff',
        weight: props.weight || 5,
        opacity: props.opacity || 0.8,
      },
    })
      .on('addpoint', (e) => {
        // @ts-ignore
        const type = e.point_type as PointType
        // @ts-ignore
        const rawPoint = e.point as { _latlng: { lat: number; lng: number } }
        points.push({
          type,
          ...rawPoint._latlng,
        })
      })
      .on('loaded', (e) => {
        const gpx = e.target as L.GPX
        resolve({ gpx, points, props })
      })
  })
}
