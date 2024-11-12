import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import ColorCardWrapper from '@/components/colorCard/colorCardWrapper'

import StringToHTML from '@/components/serializer/stringToHTML'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Stakeholders = async () => {
  const db = await loadDb()
  const testi = await db.findGlobal({
    slug: 'testi',
  })

  const stakeholders = await db.find({
    collection: 'stakeholders',
  }) //

  return (
    <main className="">
      <div className="bg-white p-3 max-w-screen-xl mx-auto">
        {testi.stakeholders.title ? (
          <div className="font-normal text-sm leading-4">
            <h1 className="font-bold sm:text-center text-[40px]">{testi.stakeholders.title}</h1>
          </div>
        ) : (
          <p></p>
        )}
        <StringToHTML htmlString={testi.stakeholders.text_html ?? ''} />
        <Suspense fallback={<div>Loading cards...</div>}>
          <ColorCardWrapper docs={stakeholders.docs} category="stakeholders" />
        </Suspense>
      </div>
    </main>
  )
}

export default Stakeholders
