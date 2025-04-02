import { NextResponse } from 'next/server'
import { loadDb } from '@/utils/db'
import { defaultLocale } from '@/middleware'
import { Locale } from '@/utils/localization'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const locale = (searchParams.get('locale') || defaultLocale) as Locale

    const db = await loadDb()

    // Prima proviamo a ottenere il contenuto nella lingua richiesta
    let footerData = await db.findGlobal({ slug: 'footer', locale })

    // Se non troviamo il contenuto nella lingua richiesta, usiamo la lingua di default
    if (!footerData || (!footerData.testo_sinistra && !footerData.testo_destra)) {
      footerData = await db.findGlobal({ slug: 'footer', locale: defaultLocale })
    }

    return NextResponse.json(footerData)
  } catch (error) {
    console.error('Error loading footer:', error)
    return NextResponse.json({ error: 'Failed to load footer' }, { status: 500 })
  }
}
