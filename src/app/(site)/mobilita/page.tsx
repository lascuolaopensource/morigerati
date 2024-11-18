import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import StringToHTML from '@/components/serializer/stringToHTML'
import { RandomPixel } from '@/components/uiElements/pixels'
import Copertina from '@/components/uiElements/copertina'
import { type Media } from '@/payload-types'
import Galleria from '@/components/galleria/galleria'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Mobilita = async () => {
  const db = await loadDb()
  const mobilita = await db.findGlobal({
    slug: 'mobilita_sostenibile',
  })
  return (
    <main className='max-w-screen-xl mx-auto pb-4'>
      {mobilita.copertina && <Copertina copertina={mobilita.copertina as Media | undefined} />}
      <div className="relative bg-white p-3 pt-5 max-w-screen-xl mx-auto">
        <RandomPixel />
        <StringToHTML htmlString={mobilita.testo_html ?? ''} />
      </div>
    
      <Galleria items={mobilita.galleria as Media[] | undefined} />

    </main>
  )
}

export default Mobilita
