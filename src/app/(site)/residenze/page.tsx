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

  const residenze = await db.find({
    collection: 'residenze',
  }) //

  return (
    <main className="">
      <div className="bg-white p-3 pt-5">
        {testi.residenze.title ? (
          <div className="font-normal text-sm pt-4 pb-10 leading-4">
            <h1 className="font-bold text-[40px]">{testi.residenze.title}</h1>
          </div>
        ) : (
          <p></p>
        )}
        {testi.residenze ? renderContent(testi?.residenze.text) : <p></p>}
        <Suspense fallback={<div>Loading cards...</div>}>
          <ColorCardWrapper
            color="bg-stakeholderColor"
            docs={residenze.docs}
            previous="stakeholders"
          />
        </Suspense>
      </div>
    </main>
  )
}

export default Stakeholders
