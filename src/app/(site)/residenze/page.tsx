import React, { Suspense } from 'react'
import { loadDb } from '@/utils/db'
import ColorCardWrapper from '@/components/colorCard/colorCardWrapper'
import StringToHTML from '@/components/serializer/stringToHTML'
import { Residenze as ResidenzaType } from '@/payload-types'
import PassateFuture from '@/components/residenze/passateFuture'

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
      // If there's no end date, use start date for comparison
      const comparisonDate = residenza.data_fine
        ? new Date(residenza.data_fine)
        : residenza.data_inizio
          ? new Date(residenza.data_inizio)
          : null

      if (!comparisonDate) {
        // If no dates are available, consider it as past
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

  // Show only the section that matches the current filter
  return (
    <div className="space-y-8">
      {filter === 'futura' && future.length > 0 && (
        <ColorCardWrapper
          color="residenzeColor"
          colorScuro="residenzeColorScuro"
          docs={future}
          previous="residenze"
        />
      )}

      {filter === 'passata' && past.length > 0 && (
        <ColorCardWrapper
          color="residenzeColor"
          colorScuro="residenzeColorScuro"
          docs={past}
          previous="residenze"
        />
      )}

      {((filter === 'futura' && future.length === 0) ||
        (filter === 'passata' && past.length === 0)) && (
        <div className="text-center py-4">
          Nessuna residenza {filter === 'passata' ? 'passata' : 'futura'} disponibile
        </div>
      )}
    </div>
  )
}

const Residenze = async ({ searchParams }: { searchParams: { filter?: string } }) => {
  const db = await loadDb()
  const testi = await db.findGlobal({
    slug: 'testi',
  })

  // Default to 'passata' if no filter is specified
  const filter = (searchParams.filter as 'passata' | 'futura') || 'passata'

  return (
    <main className="min-h-screen">
      <div className="bg-white p-3">
        {testi.residenze.title && (
          <div className="font-normal text-sm pt-4 leading-4">
            <h1 className="font-bold text-[40px]">{testi.residenze.title}</h1>
          </div>
        )}
        <StringToHTML htmlString={testi.residenze.text_html ?? ''} />
        <PassateFuture />
        <Suspense fallback={<div className="py-8 text-center">Caricamento residenze...</div>}>
          <FilteredResidenze filter={filter} />
        </Suspense>
      </div>
    </main>
  )
}

export default Residenze
