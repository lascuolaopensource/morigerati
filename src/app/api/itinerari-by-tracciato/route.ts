/**
 * Questa API è stata rinominata da /api/itinerari a /api/itinerari-by-tracciato
 * per evitare conflitti con le API standard di Payload CMS.
 *
 * Usata nel componente tracksMapComponent.tsx per ottenere un itinerario in base al tracciato_id.
 */
import { loadDb } from '@/utils/db'
import { NextResponse } from 'next/server'
import { Locale } from '@/utils/localization'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const tracciato_id = url.searchParams.get('tracciato_id')
    const locale = (url.searchParams.get('locale') as Locale) || 'it'

    if (!tracciato_id) {
      return NextResponse.json({ error: 'tracciato_id is required' }, { status: 400 })
    }

    const db = await loadDb()
    const itinerari = await db.find({
      collection: 'itinerari',
      where: {
        and: [
          {
            tracciato_gpx: {
              equals: tracciato_id,
            },
          },
        ],
      },
      depth: 1,
      locale,
    })

    return NextResponse.json({ itinerari: itinerari.docs[0] || null })
  } catch (error) {
    console.error('Error in itinerari API route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
