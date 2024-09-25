import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import ColorCardWrapper from '@/components/colorCardWrapper'

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
      <div className="bg-white p-3">
        {testi.stakeholders.title ? (
          <div className="font-normal text-sm leading-4">
            <h1 className="font-bold text-[40px]">{testi.stakeholders.title}</h1>
          </div>
        ) : (
          <p></p>
        )}
        <StringToHTML htmlString={testi.stakeholders.text_html ?? ''} />
        <Suspense fallback={<div>Loading cards...</div>}>
          <ColorCardWrapper
            color="stakeholderColor"
            colorScuro="stakeScuro"
            docs={stakeholders.docs}
            previous="stakeholders"
          />
        </Suspense>
      </div>
    </main>
  )
}

export default Stakeholders
