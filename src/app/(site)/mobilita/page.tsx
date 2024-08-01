import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import renderContent from '@/utils/renderElement'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Mobilita = async () => {
  const db = await loadDb()
  const mobilita = await db.findGlobal({
    slug: 'mobilita_sostenibile',
  })

  return (
    <main className="">
      <div className="bg-white p-3 pt-5">
        {mobilita.testo ? renderContent(mobilita.testo) : <p></p>}
      </div>
    </main>
  )
}

export default Mobilita
