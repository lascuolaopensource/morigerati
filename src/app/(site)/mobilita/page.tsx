import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'

import StringToHTML from '@/components/serializer/stringToHTML'
import { RandomPixel } from '@/components/uiElements/pixels'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Mobilita = async () => {
  const db = await loadDb()
  const mobilita = await db.findGlobal({
    slug: 'mobilita_sostenibile',
  })
  //
  return (
    <main>
      <div className="relative bg-white p-3 pt-5">
        <RandomPixel />
        <StringToHTML htmlString={mobilita.testo_html ?? ''} />
      </div>
    </main>
  )
}

export default Mobilita
