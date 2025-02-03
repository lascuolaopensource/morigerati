import { loadDb } from '@/utils/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const tracciato_id = url.searchParams.get('tracciato_id')

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
    })

    return NextResponse.json({ itinerari: itinerari.docs[0] || null })
  } catch (error) {
    console.error('Error in itinerari API route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
