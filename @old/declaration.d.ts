declare module 'gpx-parser-builder' {
  interface Point {
    lat: number
    lon: number
  }

  interface Track {
    points: Point[]
  }

  class GPXParser {
    tracks: Track[]
    parse(gpxData: string): void
  }

  export default GPXParser
}
