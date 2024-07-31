import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import ColorCardWrapper from '@/components/colorCardWrapper'

import renderContent from '@/utils/renderElement'

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
    <main className="mx-auto max-w-xl">
      <div className="bg-white p-3 pt-5">
        {testi.stakeholders.title ? (
          <div className="font-normal text-sm pt-4 pb-4 leading-4">
            <h1 className="font-bold text-[40px]">{testi.stakeholders.title}</h1>
          </div>
        ) : (
          <p>Error loading Itinerari text data</p>
        )}
        {testi.stakeholders ? (
          renderContent(testi?.stakeholders.text)
        ) : (
          <p>Error loading luoghi text data</p>
        )}
        <Suspense fallback={<div>Loading Itinerari component...</div>}>
          <ColorCardWrapper
            color="bg-stakeholderColor"
            jsonString={JSON.stringify(stakeholders)}
            previous="stakeholders"
          />
        </Suspense>
      </div>
    </main>
  )
}

export default Stakeholders
