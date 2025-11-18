'use client'

import type { LatLngExpression } from 'leaflet'

import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-gpx'
import 'leaflet/dist/leaflet.css'
// Must come afterwards
import { MapContainer, TileLayer } from 'react-leaflet'

import { coordinateMorigerati } from '@/modules/info'

import { GpxTracks } from './gpx-tracks'

//

export type MapProps = {
	initialPosition?: LatLngExpression
	initialZoom?: number
	children?: React.ReactNode
	gpxTracks?: (string | null | undefined)[]
}

export function RootMap(props: MapProps) {
	const {
		initialPosition = coordinateMorigerati as LatLngExpression,
		initialZoom = 13,
		children,
		gpxTracks = [],
	} = props

	return (
		<MapContainer
			center={initialPosition}
			zoom={initialZoom}
			scrollWheelZoom={false}
			className="h-full w-full z-0"
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{children}
			<GpxTracks urls={gpxTracks.filter((u) => typeof u === 'string')} />
		</MapContainer>
	)
}
