'use client'
import dynamic from 'next/dynamic'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-gpx'
// import type { Media } from '@/payload-types'
// import { X } from 'lucide-react'
// import { MdOutlineFileDownload } from 'react-icons/md'
// import Image from 'next/image'
// import { MoonLoader } from 'react-spinners'

// import { LatLngExpression } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { MoonLoader } from 'react-spinners'
import { appConfig } from '@/app-config'

//

type MapProps = {
  initialPosition?: LatLngExpression
  initialZoom?: number
  children?: React.ReactNode
}

export function RootMap(props: MapProps) {
  const {
    initialPosition = appConfig.coordinateMorigerati as LatLngExpression,
    initialZoom = 13,
    children,
  } = props

  return (
    <MapContainer
      center={initialPosition}
      zoom={initialZoom}
      scrollWheelZoom={false}
      className="h-full w-full rounded-md border-2 border-black"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  )
}
