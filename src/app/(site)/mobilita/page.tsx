import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'

import StringToHTML from '@/components/serializer/stringToHTML'

import MobilitaPixel from '@/public/pixels/mobilitas.svg'

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
          <MobilitaPixel width={200} className="absolute right-0" />
        </div>
        <StringToHTML htmlString={mobilita.testo_html ?? ''} />
      </div>
    </main>
  )
}

export default Mobilita
