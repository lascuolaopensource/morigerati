import * as L from 'leaflet'

declare module 'leaflet' {
  namespace GPX {
    interface GPXOptions extends L.LayerOptions {
      async?: boolean
      marker_options?: L.MarkerOptions & {
        startIconUrl?: string
        endIconUrl?: string
        wptIconUrls?: string
      }
      polyline_options?: L.PolylineOptions
      gpx_options?: { parseElements: string[] }
    }
  }

  class GPX extends L.FeatureGroup {
    constructor(gpx: string, options?: GPX.GPXOptions)
    on(type: 'loaded', fn: (event: { target: GPX }) => void, context?: any): this
    getBounds(): L.LatLngBounds
    addTo(map: L.Map | L.LayerGroup): this
  }

  namespace L {
    function gpx(gpx: string, options?: GPX.GPXOptions): GPX
  }
}
