import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import ColorCardWrapper from '@/components/colorCardWrapper'

import StringToHTML from '@/components/serializer/stringToHTML'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Residenze = async () => {
  const db = await loadDb()
  const testi = await db.findGlobal({
    slug: 'testi',
  })

  const residenze = await db.find({
    collection: 'residenze',
  }) //

  return (
    <main className="">
      <div className="bg-white p-3">
        {testi.residenze.title ? (
          <div className="font-normal text-sm pt-4  leading-4">
            <h1 className="font-bold text-[40px]">{testi.residenze.title}</h1>
          </div>
        ) : (
          <p></p>
        )}
        <StringToHTML htmlString={testi.residenze.text_html ?? ''} />
        <Suspense fallback={<div>Loading cards...</div>}>
          <ColorCardWrapper
            color="bg-residenzeColor"
            colorScuro="r"
            docs={residenze.docs}
            previous="residenze"
          />
        </Suspense>
      </div>
    </main>
  )
}

export default Residenze
