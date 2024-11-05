import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import ColorCardWrapper from '@/components/colorCard/colorCardWrapper'

import StringToHTML from '@/components/serializer/stringToHTML'

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
    <main className="">
      <div className="bg-white p-3 ">
        <div className="font-normal text-sm  leading-4">
          <h1 className="font-bold sm:text-center text-[40px]">{testi.itinerari.title}</h1>
        </div>

        <StringToHTML htmlString={testi.itinerari.text_html ?? ''} />
        <p></p>
        <Suspense fallback={<div>Loading Itinerari component...</div>}>
          <ColorCardWrapper
            color="itinerarioColor"
            colorScuro="itinerarioColorScuro"
            docs={itinerari.docs}
            previous="itinerari"
          />
        </Suspense>
      </div>
    </main>
  )
}

export default ItinerariPage
