import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import StringToHTML from '@/components/serializer/stringToHTML'
import { Residenze as ResidenzaType } from '@/payload-types'
import PassateFuture from '@/components/residenze/passateFuture'
import CardGrid from '@/components/card/cardsGrid'
import NoResidenze from '@/components/residenze/noResidenze'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface SortedResidenze {
  past: ResidenzaType[]
  future: ResidenzaType[]
}

const sortResidenze = (residenze: ResidenzaType[]): SortedResidenze => {
  const now = new Date()

  return residenze.reduce(
    (acc: SortedResidenze, residenza) => {
      const comparisonDate = residenza.data_fine
        ? new Date(residenza.data_fine)
        : residenza.data_inizio
          ? new Date(residenza.data_inizio)
          : null

      if (!comparisonDate) {
        acc.past.push(residenza)
      } else {
        if (comparisonDate < now) {
          acc.past.push(residenza)
        } else {
          acc.future.push(residenza)
        }
      }

      return acc
    },
    { past: [], future: [] },
  )
}

async function FilteredResidenze({ filter }: { filter: 'passata' | 'futura' }) {
  const db = await loadDb()
  const residenzeData = await db.find({
    collection: 'residenze',
    depth: 2,
  })

  const { past, future } = sortResidenze(residenzeData.docs)

  return (
    <div className="space-y-8">
      {filter === 'futura' && future.length > 0 && (
        <CardGrid items={future} category="residenze" singleRow />
      )}

      {filter === 'passata' && past.length > 0 && (
        <CardGrid items={past} category="residenze" singleRow />
      )}

      {filter === 'futura' && future.length === 0 && <NoResidenze />}
    </div>
  )
}

const Residenze = async ({ searchParams }: { searchParams: { filter?: string } }) => {
  const db = await loadDb()
  const testi = await db.findGlobal({
    slug: 'testi',
  })

  const filter = (searchParams.filter as 'passata' | 'futura') || 'futura'

  return (
    <main className="min-h-screen">
      <div className=" p-3 max-w-screen-xl mx-auto ">
        {testi.residenze.title && (
          <div className="font-normal text-sm pt-4 leading-4">
            <h1 className="font-bold text-[40px] sm:text-center">{testi.residenze.title}</h1>
          </div>
        )}
        <StringToHTML htmlString={testi.residenze.text_html ?? ''} classs="prose-custom" />
        <PassateFuture />
        <Suspense fallback={<div className="py-8 text-center">Caricamento residenze...</div>}>
          <FilteredResidenze filter={filter} />
        </Suspense>
      </div>
    </main>
  )
}

export default Residenze
