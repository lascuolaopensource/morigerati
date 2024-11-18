import { loadDb } from '@/utils/db'

export async function getHomeTracksData() {
  const db = await loadDb()
  const home = await db.findGlobal({
    slug: 'home',
    depth: 2,
  })

  return {
    tracciati: home.tracciati_mappa || [],
    mappaTitle: home.mappa?.title || '',
    mappaText: home.mappa?.text_html || '',
  }
}
