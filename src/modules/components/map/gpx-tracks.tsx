import * as L from 'leaflet'
import 'leaflet-gpx'
import { useMap } from 'react-leaflet'

//

type Props = {
	urls: string[]
}

export function GpxTracks(props: Props) {
	const { urls } = props
	const map = useMap()
	if (urls.length > 0) addGpxTracksToMap(urls, map)
	return null
}

//

type LoadGpxTrackOptions = {
	url: string
	layerGroup: L.LayerGroup
	options: L.GPXOptions
	onClick?: (e: L.LeafletMouseEvent) => void
}

function resolveGpxTrack(props: LoadGpxTrackOptions): Promise<L.GPX> {
	const { url, layerGroup, options, onClick = () => {} } = props
	// leaflet-gpx assigns the constructor to the global Leaflet object.
	// Turbopack's `import * as L` snapshot does not include that later property.
	const GPX = (window.L as typeof L | undefined)?.GPX
	if (typeof GPX !== 'function') {
		return Promise.reject(new TypeError('L.GPX is not a constructor'))
	}
	return new Promise((resolve) => {
		new GPX(url, options)
			.on('loaded', (e) => {
				resolve(e.target as L.GPX)
			})
			.on('click', onClick)
			.addTo(layerGroup)
	})
}

async function addGpxTracksToMap(tracksUrls: string[], map: L.Map) {
	const mapsLayer = new L.LayerGroup()
	mapsLayer.addTo(map)

	const tracks = await Promise.all(
		tracksUrls.map((url, i) =>
			resolveGpxTrack({
				url,
				layerGroup: mapsLayer,
				options: {
					async: true,
					polyline_options: {
						color: trackColors[i % trackColors.length],
						className: 'hover:stroke-10 hover:z-10',
					},
				},
			}),
		),
	)

	const bounds = getTracksBounds(tracks)
	map.fitBounds(bounds)
	// map.setMaxBounds(bounds)
}

// Utils

const trackColors = [
	'#FF5733',
	'#33FF57',
	'#3357FF',
	'#FF33F6',
	'#33FFF6',
	'#F6FF33',
	'#9933FF',
	'#FF8333',
	'#33FF99',
	'#FF3333',
]

function getTracksBounds(tracks: L.GPX[]): L.LatLngBoundsExpression {
	if (tracks.length === 0) throw new Error('No tracks provided')
	const [head, ...tail] = tracks
	const bounds = head.getBounds()
	tail.forEach((track) => bounds.extend(track.getBounds()))
	return bounds
}
