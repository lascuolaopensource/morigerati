import { loadDb } from '@/modules/utils/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Ottieni tracciato_id dalla query
  const { searchParams } = new URL(request.url)
  const tracciato_id = searchParams.get('tracciato_id')

  if (!tracciato_id) {
    return NextResponse.json({ error: 'tracciato_id richiesto' }, { status: 400 })
  }

  try {
    const db = await loadDb()

    // Query degli itinerari collegati al tracciato
    const itinerari = await db.find({
      collection: 'itinerari',
      depth: 2,
      where: {
        tracciato_gpx: {
          equals: tracciato_id,
        },
      },
    })

    return NextResponse.json({ itinerari: itinerari.docs })
  } catch (error) {
    console.error('Errore nel recupero itinerari:', error)
    return NextResponse.json({ error: 'Errore server' }, { status: 500 })
  }
}
