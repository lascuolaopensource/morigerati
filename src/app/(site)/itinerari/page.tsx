import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import ColorCardWrapper from '@/components/colorCardWrapper'
import renderContent from '@/utils/renderElement'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const ItinerariPage = async () => {
  const db = await loadDb()
  const testi = await db.findGlobal({
    slug: 'testi',
  })

  const itinerari = await db.find({
    collection: 'itinerari',
  })

  return (
    <main className="mx-auto max-w-xl">
      <div className="bg-white p-3 pt-5">
        <div className="font-normal text-sm pt-4 pb-4 leading-4">
          <h1 className="font-bold text-[40px]">{testi.itinerari.title}</h1>
        </div>

        {testi.itinerari ? (
          renderContent(testi.itinerari.text)
        ) : (
          <p>Error loading about text data</p>
        )}
        <Suspense fallback={<div>Loading Itinerari component...</div>}>
          <ColorCardWrapper
            color="bg-itinerarioColor"
            jsonString={JSON.stringify(itinerari)}
            previous="itinerari"
          />
        </Suspense>
      </div>
    </main>
  )
}

export default ItinerariPage
