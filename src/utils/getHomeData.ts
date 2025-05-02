import { loadDb } from '@/utils/db'

export async function getHomeTracksData() {
  const db = await loadDb()

  // Fetch all tracciati instead of relying on the relationship field
  const { docs: tracciati } = await db.find({
    collection: 'tracciati',
    depth: 2,
  })

  return {
    tracciati: tracciati || [],
  }
}
