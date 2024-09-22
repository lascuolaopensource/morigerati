import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import ArticoliCardWrapper from '@/components/articoli/articoliGridWrapper'

import StringToHTML from '@/components/serializer/stringToHTML'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Luoghi = async () => {
  const db = await loadDb()
  const testi = await db.findGlobal({
    slug: 'testi',
  })

  const articoli = await db.find({
    collection: 'articoli',
  })

  return (
    <main className="">
      <div className="bg-white p-3 pt-5">
        {testi.luoghi.title ? (
          <div className="font-normal text-sm  pb-4 leading-4">
            <h1 className="font-bold text-[40px]">{testi.articoli.title}</h1>
          </div>
        ) : (
          <p></p>
        )}

        <StringToHTML htmlString={testi.articoli.text_html ?? ''} />
        <Suspense fallback={<div>Loading Cards...</div>}>
          <ArticoliCardWrapper docs={articoli.docs} previous="articoli" />
        </Suspense>
      </div>
    </main>
  )
}

export default Luoghi
