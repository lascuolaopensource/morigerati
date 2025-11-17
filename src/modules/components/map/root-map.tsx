'use client'

import type { LatLngExpression } from 'leaflet'

import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'

// import 'leaflet-defaulticon-compatibility'
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
// // import 'leaflet-gpx'
// import 'leaflet/dist/leaflet.css'
// import { MapContainer, TileLayer } from 'react-leaflet'
import { coordinateMorigerati } from '@/modules/info'

//

export type MapProps = {
	initialPosition?: LatLngExpression
	initialZoom?: number
	children?: React.ReactNode
}

export function RootMap(props: MapProps) {
	const {
		initialPosition = coordinateMorigerati as LatLngExpression,
		initialZoom = 13,
		children,
	} = props

	return (
		<MapContainer
			center={initialPosition}
			zoom={initialZoom}
			scrollWheelZoom={false}
			className="h-full w-full"
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{children}
		</MapContainer>
	)
}
