import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import renderContent from '@/utils/renderElement'

import MobilitaPixel from '@/public/pixels/mobilita.svg'

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
        <div className="absolute inset-0 flex justify-end">
          <MobilitaPixel className="absolute right-0" />
        </div>
        {mobilita.testo ? renderContent(mobilita.testo) : <p></p>}
      </div>
    </main>
  )
}

export default Mobilita
