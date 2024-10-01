import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import ColorCardWrapper from '@/components/colorCardWrapper'
import StringToHTML from '@/components/serializer/stringToHTML'
import PassateFuture from '@/components/residenze/passateFuture'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function FilteredResidenze({ filter }: { filter: 'passata' | 'futura' }) {
  const db = await loadDb()
  const residenze = await db.find({
    collection: 'residenze',
    where: {
      passata_futura: {
        equals: filter,
      },
    },
  })

  return (
    <ColorCardWrapper
      color="residenzeColor"
      colorScuro="residenzeColorScuro"
      docs={residenze.docs}
      previous="residenze"
    />
  )
}

const Residenze = async ({ searchParams }: { searchParams: { filter?: string } }) => {
  const db = await loadDb()
  const testi = await db.findGlobal({
    slug: 'testi',
  })

  const filter = (searchParams.filter as 'passata' | 'futura') || 'passata'

  return (
    <main className="">
      <div className="bg-white p-3">
        {testi.residenze.title && (
          <div className="font-normal text-sm pt-4 leading-4">
            <h1 className="font-bold text-[40px]">{testi.residenze.title}</h1>
          </div>
        )}
        <StringToHTML htmlString={testi.residenze.text_html ?? ''} />
        <PassateFuture />
        <Suspense fallback={<div>Loading residenze...</div>}>
          <FilteredResidenze filter={filter} />
        </Suspense>
      </div>
    </main>
  )
}

export default Residenze
